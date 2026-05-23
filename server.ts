import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini
const ai = new GoogleGenAI({ 
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

// API Routes
app.post("/api/generate", async (req, res) => {
  try {
    const { businessInfo, rawText } = req.body;

    const prompt = `
      You are a branding and research expert. 
      Your goal is to build a comprehensive, PREMIUM business profile.
      
      STEP 1: RESEARCH
      Research the business "${businessInfo.name || 'a business'}" in "${businessInfo.industry || 'this industry'}". 
      Try to find their actual mission, services, address, and tone from their online presence (Google, Instagram, etc.).
      
      STEP 2: ENRICH
      Based on your research (or creative generation if not found), complete the following profile:
      ${rawText ? `RAW TEXT: """${rawText}"""` : `Current Data: ${JSON.stringify(businessInfo)}`}

      IMPORTANT: Generate a HIGH-END, LUXURY feel for the copy. 
      Fill in: name, industry, tagline (compelling), description (150 words), aboutUs (brand philosophy), 
      address (real if found), phone, email, ctaText (action-oriented), 
      features (3 sophisticated points), testimonials (3 realistic reviews), 
      and stats (3 impressive KPIs).
      
      Return ONLY valid JSON.
    `;

    // Generate Content with Google Search Grounding
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            name: { type: Type.STRING },
            industry: { type: Type.STRING },
            tagline: { type: Type.STRING },
            description: { type: Type.STRING },
            aboutUs: { type: Type.STRING },
            address: { type: Type.STRING },
            phone: { type: Type.STRING },
            email: { type: Type.STRING },
            ctaText: { type: Type.STRING },
            stats: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  label: { type: Type.STRING },
                  value: { type: Type.STRING }
                },
                required: ["label", "value"]
              }
            },
            features: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING },
                  description: { type: Type.STRING }
                },
                required: ["title", "description"]
              }
            },
            testimonials: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING },
                  role: { type: Type.STRING },
                  content: { type: Type.STRING }
                },
                required: ["name", "role", "content"]
              }
            }
          },
          required: ["name", "industry", "tagline", "description", "aboutUs", "address", "phone", "email", "ctaText", "features", "testimonials", "stats"]
        }
      }
    });

    const result = JSON.parse(response.text || "{}");

    // Generate Hero and Gallery Images
    try {
      const imgCount = 4;
      const imagePrompts = [
        `Main hero banner image for ${result.name} (${result.industry}). High-end, premium aesthetic.`,
        `Commercial interior or lifestyle image for ${result.name}. Professional photography.`,
        `Detail shot or product-in-use for ${result.name}. Minimalist and clean.`,
        `Team working or customer experience at ${result.name}. Authentic and warm.`
      ];

      const images = await Promise.all(imagePrompts.map(async (p, idx) => {
        try {
          const res = await ai.models.generateContent({
            model: 'gemini-3.1-flash-image-preview',
            contents: { parts: [{ text: p }] },
            config: {
              imageConfig: { aspectRatio: "16:9", imageSize: "1K" },
              tools: [{ googleSearch: { searchTypes: { webSearch: {}, imageSearch: {} } } }]
            }
          });
          for (const part of res.candidates?.[0]?.content?.parts || []) {
            if (part.inlineData) return `data:image/png;base64,${part.inlineData.data}`;
          }
        } catch (e) {
          return `https://picsum.photos/seed/${encodeURIComponent(result.name + idx)}/1200/800`;
        }
        return `https://picsum.photos/seed/${encodeURIComponent(result.name + idx)}/1200/800`;
      }));

      result.heroImage = images[0];
      result.gallery = images.slice(1);
    } catch (imgError) {
      console.error("Image generation failed:", imgError);
      result.heroImage = `https://picsum.photos/seed/${encodeURIComponent(result.name)}/1920/1080`;
      result.gallery = [
        `https://picsum.photos/seed/${encodeURIComponent(result.name)}1/800/600`,
        `https://picsum.photos/seed/${encodeURIComponent(result.name)}2/800/600`,
        `https://picsum.photos/seed/${encodeURIComponent(result.name)}3/800/600`
      ];
    }

    res.json(result);
  } catch (error: any) {
    console.error("Gemini Error:", error);
    res.status(500).json({ error: "Failed to generate business info" });
  }
});

// Vite Setup
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
