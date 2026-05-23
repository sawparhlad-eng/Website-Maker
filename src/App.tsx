import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Wand2, 
  Layout, 
  ChevronRight, 
  ChevronLeft, 
  Eye, 
  Building2, 
  MapPin, 
  Phone, 
  Mail, 
  CheckCircle2,
  Loader2,
  RefreshCcw,
  ExternalLink
} from 'lucide-react';
import { BusinessInfo, TemplateId } from './types';
import { Minimalist } from './components/templates/Minimalist';
import { ModernService } from './components/templates/ModernService';
import { Restaurant } from './components/templates/Restaurant';
import { cn } from './lib/utils';

const templates = [
  { id: 'minimalist' as const, name: 'Minimalist', description: 'Clean, spacious, and focused on typography.', color: 'bg-white' },
  { id: 'modern-service' as const, name: 'Tech/Service', description: 'Dark, modern, and high-energy with gradients.', color: 'bg-slate-900' },
  { id: 'restaurant' as const, name: 'Restaurant', description: 'Elegant, serif-based, and warm for hospitality.', color: 'bg-orange-50' },
];

export default function App() {
  const [step, setStep] = useState<'info' | 'preview'>('info');
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState('AI is composing...');
  const [rawInput, setRawInput] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateId>('minimalist');
  const [mode, setMode] = useState<'manual' | 'magic'>('magic');
  const [businessInfo, setBusinessInfo] = useState<BusinessInfo>({
    name: '',
    industry: '',
    tagline: '',
    description: '',
    address: '',
    phone: '',
    email: '',
    ctaText: 'Get Started',
    features: [],
    testimonials: []
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setBusinessInfo(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const generateWithAI = async () => {
    if (mode === 'manual' && !businessInfo.name && !businessInfo.industry) {
      alert("Please enter at least a business name or industry.");
      return;
    }
    if (mode === 'magic' && !rawInput) {
      alert("Please paste some business information first.");
      return;
    }

    setLoading(true);
    setLoadingText('Researching business details...');
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          businessInfo: mode === 'manual' ? businessInfo : {}, 
          rawText: mode === 'magic' ? rawInput : undefined 
        }),
      });
      setLoadingText('Generating premium visuals...');
      const data = await res.json();
      setBusinessInfo(data);
      if (mode === 'magic') setMode('manual'); // Switch to manual to let user tweak
    } catch (error) {
      console.error(error);
      alert("AI generation failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const renderTemplate = () => {
    switch (selectedTemplate) {
      case 'minimalist': return <Minimalist data={businessInfo} />;
      case 'modern-service': return <ModernService data={businessInfo} />;
      case 'restaurant': return <Restaurant data={businessInfo} />;
      default: return <Minimalist data={businessInfo} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-slate-900 font-sans antialiased overflow-x-hidden">
      <AnimatePresence mode="wait">
        {step === 'info' ? (
          <motion.div 
            key="info"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: -100 }}
            className="max-w-[1400px] mx-auto px-6 py-12"
          >
            <div className="flex flex-col lg:flex-row gap-12">
              {/* Sidebar: Form */}
              <div className="w-full lg:w-[450px] space-y-8 bg-white p-8 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100">
                <div>
                  <h1 className="text-3xl font-black tracking-tight mb-2 flex items-center gap-3">
                    <Wand2 className="text-indigo-600" />
                    SiteSnap AI
                  </h1>
                  <p className="text-slate-500 font-medium">Build your digital presence in seconds.</p>
                </div>

                <div className="space-y-6">
                  <div className="flex bg-slate-100 p-1 rounded-2xl">
                    <button 
                      onClick={() => setMode('magic')}
                      className={cn(
                        "flex-1 py-2 rounded-xl text-sm font-bold transition-all",
                        mode === 'magic' ? "bg-white shadow-sm text-indigo-600" : "text-slate-500"
                      )}
                    >
                      Magic Mode
                    </button>
                    <button 
                      onClick={() => setMode('manual')}
                      className={cn(
                        "flex-1 py-2 rounded-xl text-sm font-bold transition-all",
                        mode === 'manual' ? "bg-white shadow-sm text-indigo-600" : "text-slate-500"
                      )}
                    >
                      Manual Entry
                    </button>
                  </div>

                  <AnimatePresence mode="wait">
                    {mode === 'magic' ? (
                      <motion.div 
                        key="magic-mode"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 10 }}
                        className="space-y-4"
                      >
                        <div className="space-y-2">
                          <label className="text-sm font-bold uppercase tracking-wider text-slate-400 block px-1">Deep Scan Input</label>
                          <textarea 
                            value={rawInput}
                            onChange={(e) => setRawInput(e.target.value)}
                            placeholder="Paste anything... business cards, emails, rough notes, or just describe your idea in 3 sentences."
                            className="w-full h-48 p-5 bg-slate-50 border-0 rounded-3xl focus:ring-2 focus:ring-indigo-500 transition-all outline-none resize-none text-slate-700 leading-relaxed"
                          />
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div 
                        key="manual-mode"
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        className="space-y-4"
                      >
                        <div className="space-y-4">
                          <label className="text-sm font-bold uppercase tracking-wider text-slate-400 block px-1">Identity</label>
                          <div className="relative group">
                            <Building2 className="absolute left-4 top-3.5 w-5 h-5 text-slate-300 group-focus-within:text-indigo-500 transition-colors" />
                            <input 
                              name="name"
                              value={businessInfo.name}
                              onChange={handleInputChange}
                              placeholder="Business Name"
                              className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border-0 rounded-2xl focus:ring-2 focus:ring-indigo-500 transition-all outline-none"
                            />
                          </div>
                          <div className="relative group">
                            <Layout className="absolute left-4 top-3.5 w-5 h-5 text-slate-300 group-focus-within:text-indigo-500 transition-colors" />
                            <input 
                              name="industry"
                              value={businessInfo.industry}
                              onChange={handleInputChange}
                              placeholder="Industry"
                              className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border-0 rounded-2xl focus:ring-2 focus:ring-indigo-500 transition-all outline-none"
                            />
                          </div>
                        </div>

                        <div className="space-y-4 pt-4 border-t border-slate-50">
                          <label className="text-sm font-bold uppercase tracking-wider text-slate-400 block px-1">Details</label>
                          <div className="grid grid-cols-1 gap-3">
                            <div className="relative group">
                              <MapPin className="absolute left-4 top-3.5 w-5 h-5 text-slate-300" />
                              <input name="address" value={businessInfo.address} onChange={handleInputChange} placeholder="Address" className="w-full pl-12 pr-4 py-3 bg-slate-50 border-0 rounded-2xl outline-none focus:ring-1 focus:ring-indigo-500" />
                            </div>
                            <div className="relative group">
                              <Mail className="absolute left-4 top-3.5 w-5 h-5 text-slate-300" />
                              <input name="email" value={businessInfo.email} onChange={handleInputChange} placeholder="Email" className="w-full pl-12 pr-4 py-3 bg-slate-50 border-0 rounded-2xl outline-none focus:ring-1 focus:ring-indigo-500" />
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="pt-2">
                    <button 
                      onClick={generateWithAI}
                      disabled={loading}
                      className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-slate-800 active:scale-95 transition-all shadow-lg shadow-slate-200 disabled:opacity-50"
                    >
                      {loading ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                      ) : (
                        <Wand2 className="w-5 h-5" />
                      )}
                      {loading ? loadingText : mode === 'magic' ? 'Magic Scan & Fill' : 'Refine with AI'}
                    </button>
                  </div>
                </div>
              </div>

              {/* Main: Template Selection & Live Small Preview */}
              <div className="flex-1 space-y-12">
                <div className="space-y-6">
                  <div className="flex justify-between items-end">
                    <div>
                      <h2 className="text-4xl font-black tracking-tight text-slate-900 mb-2">Select a Template</h2>
                      <p className="text-slate-500 font-medium text-lg">Choose a visual identity that resonates with your brand.</p>
                    </div>
                    {businessInfo.name && (
                      <button 
                        onClick={() => setStep('preview')}
                        className="bg-indigo-600 text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-3 hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100"
                      >
                        Launch Preview
                        <Eye className="w-5 h-5" />
                      </button>
                    )}
                  </div>

                  <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {templates.map((t) => (
                      <button 
                        key={t.id}
                        onClick={() => setSelectedTemplate(t.id)}
                        className={cn(
                          "relative group text-left p-6 rounded-3xl border-2 transition-all overflow-hidden",
                          selectedTemplate === t.id 
                            ? "bg-white border-indigo-500 shadow-2xl shadow-indigo-100" 
                            : "bg-white border-transparent hover:border-slate-200"
                        )}
                      >
                        <div className={cn("aspect-square rounded-2xl mb-6 relative overflow-hidden", t.color)}>
                          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-black/5 flex items-center justify-center">
                             <CheckCircle2 className={cn("w-12 h-12", selectedTemplate === t.id ? "text-indigo-500 opacity-100" : "text-white opacity-0")} />
                          </div>
                        </div>
                        <h3 className="text-xl font-bold mb-2">{t.name}</h3>
                        <p className="text-slate-500 text-sm leading-relaxed">{t.description}</p>
                        
                        {selectedTemplate === t.id && (
                          <div className="absolute top-4 right-4 animate-in zoom-in duration-300">
                             <div className="bg-indigo-500 text-white p-1.5 rounded-full">
                               <CheckCircle2 className="w-4 h-4" />
                             </div>
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quick Info Preview */}
                <div className="bg-indigo-600 rounded-[32px] p-10 text-white relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500 rounded-full -translate-y-1/2 translate-x-1/2 opacity-50 blur-3xl group-hover:scale-150 transition-transform duration-1000" />
                  <div className="relative z-10">
                    <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                      Current Site Snapshot
                      {loading && <RefreshCcw className="w-5 h-5 animate-spin" />}
                    </h3>
                    <div className="grid md:grid-cols-2 gap-8">
                      <div className="space-y-4">
                        <div className="opacity-70 text-sm font-bold uppercase tracking-widest">Brand Voice</div>
                        <p className="text-xl font-medium leading-relaxed italic">
                          "{businessInfo.tagline || 'Your catchy tagline will appear here...'}"
                        </p>
                      </div>
                      <div className="space-y-4">
                        <div className="opacity-70 text-sm font-bold uppercase tracking-widest">Growth Engine</div>
                        <div className="flex flex-wrap gap-2">
                          {businessInfo.features?.length ? businessInfo.features.map((f, i) => (
                            <span key={i} className="px-4 py-1.5 bg-white/10 rounded-full text-sm font-medium border border-white/10">
                              {f.title}
                            </span>
                          )) : (
                            <span className="text-white/40 italic">Generate or add features to see them here</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="preview"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            className="fixed inset-0 z-50 bg-white overflow-y-auto"
          >
            <div className="fixed top-6 right-6 z-[60] flex gap-3">
              <button 
                onClick={() => setStep('info')}
                className="bg-white/90 backdrop-blur text-slate-900 border border-slate-200 px-6 py-3 rounded-2xl font-bold flex items-center gap-2 hover:bg-white shadow-xl transition-all"
              >
                <ChevronLeft className="w-5 h-5" />
                Back to Editor
              </button>
              <button 
                 onClick={() => window.print()}
                 className="bg-slate-900 text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 hover:bg-slate-800 shadow-xl transition-all"
              >
                Export / Print
                <ExternalLink className="w-5 h-5" />
              </button>
            </div>
            
            {renderTemplate()}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
