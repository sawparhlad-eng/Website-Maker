import React from 'react';
import { BusinessInfo } from '../../types';
import { Shield, Zap, Star } from 'lucide-react';

const icons = [<Zap />, <Shield />, <Star />];

export const ModernService: React.FC<{ data: BusinessInfo }> = ({ data }) => {
  return (
    <div className="bg-slate-950 min-h-screen text-slate-50 font-sans selection:bg-indigo-500 selection:text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(79,70,229,0.15),transparent_50%)]" />
      {data.heroImage && (
        <div className="absolute inset-0 opacity-20 mask-image-gradient">
           <img src={data.heroImage} className="w-full h-full object-cover" referrerPolicy="no-referrer" alt="bg" />
        </div>
      )}
      
      <nav className="relative z-10 p-6 flex justify-between items-center max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight">{data.name}</span>
        </div>
        <button className="bg-indigo-600 px-6 py-2 rounded-lg font-medium hover:bg-indigo-500 transition-all shadow-[0_0_20px_-5px_rgba(79,70,229,0.5)]">
          Get Started
        </button>
      </nav>

      <main className="relative z-10">
        <section className="pt-32 pb-20 px-6 text-center max-w-4xl mx-auto">
          <span className="inline-block px-4 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-sm font-medium mb-8">
            {data.industry}
          </span>
          <h2 className="text-5xl md:text-7xl font-extrabold mb-8 tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-400">
            {data.tagline}
          </h2>
          <p className="text-lg text-slate-400 leading-relaxed max-w-2xl mx-auto">
            {data.description}
          </p>
          <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-slate-950 px-8 py-4 rounded-xl font-bold hover:bg-slate-200 transition-all">
              {data.ctaText}
            </button>
            <button className="border border-slate-800 px-8 py-4 rounded-xl font-bold hover:bg-slate-900 transition-all">
              Learn More
            </button>
          </div>
        </section>

        <section className="py-24 px-6 max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 text-center bg-slate-900/40 p-12 rounded-[40px] border border-slate-800">
            {data.stats?.map((s, i) => (
              <div key={i}>
                <p className="text-4xl md:text-6xl font-black text-indigo-500 mb-2">{s.value}</p>
                <p className="text-slate-500 uppercase tracking-widest text-xs font-bold">{s.label}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="py-24 px-6 max-w-7xl mx-auto gap-20 flex flex-col lg:flex-row items-center">
          <div className="flex-1 space-y-8">
            <h3 className="text-4xl font-bold">Our Story</h3>
            <p className="text-lg text-slate-400 leading-relaxed">
              {data.aboutUs}
            </p>
          </div>
          <div className="flex-1 grid grid-cols-2 gap-4">
             {data.gallery?.slice(0, 2).map((img, i) => (
               <div key={i} className={cn("rounded-3xl overflow-hidden aspect-square", i === 1 ? "mt-12" : "")}>
                 <img src={img} className="w-full h-full object-cover" alt="gallery" />
               </div>
             ))}
          </div>
        </section>

        <section className="py-24 px-6 max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
          {data.features?.map((f, i) => (
            <div key={i} className="p-8 rounded-3xl bg-slate-900/50 border border-slate-800 hover:border-indigo-500/50 transition-all">
              <div className="text-indigo-400 mb-6">{icons[i % icons.length]}</div>
              <h3 className="text-xl font-bold mb-4">{f.title}</h3>
              <p className="text-slate-400 leading-relaxed">{f.description}</p>
            </div>
          ))}
        </section>

        <section className="py-24 border-t border-slate-900">
          <div className="max-w-7xl mx-auto px-6">
            <h3 className="text-3xl font-bold mb-16 text-center">Loved by businesses worldwide</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {data.testimonials?.map((t, i) => (
                <div key={i} className="p-8 rounded-2xl bg-slate-900/30 border border-slate-800 italic text-slate-400 relative">
                  <span className="text-6xl absolute -top-4 -left-2 text-indigo-500/10 font-serif">"</span>
                  <p className="mb-6 relative z-10">{t.content}</p>
                  <div className="flex items-center gap-4 not-italic">
                    <div className="w-10 h-10 rounded-full bg-slate-800" />
                    <div>
                      <p className="font-bold text-slate-200">{t.name}</p>
                      <p className="text-sm text-slate-500">{t.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 bg-indigo-600">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-4xl font-bold mb-6">Ready to transform your business?</h2>
            <p className="text-indigo-100 mb-10 text-lg">Contact us at {data.email} or call {data.phone}</p>
            <p className="text-indigo-200 text-sm">{data.address}</p>
          </div>
        </section>
      </main>
    </div>
  );
};
