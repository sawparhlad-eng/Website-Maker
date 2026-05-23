export interface BusinessInfo {
  name: string;
  industry: string;
  tagline?: string;
  description?: string;
  address?: string;
  phone?: string;
  email?: string;
  heroImage?: string;
  images?: string[];
  gallery?: string[];
  aboutUs?: string;
  stats?: { label: string; value: string }[];
  socialLinks?: { platform: string; url: string }[];
  ctaText?: string;
  features?: { title: string; description: string }[];
  testimonials?: { name: string; content: string; role: string }[];
}

export type TemplateId = 'minimalist' | 'modern-service' | 'restaurant' | 'elegant-portfolio';

export interface Template {
  id: TemplateId;
  name: string;
  description: string;
  thumbnail: string;
}
