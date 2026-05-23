import React from 'react';
import { BusinessInfo } from '../../types';

export const Minimalist: React.FC<{ data: BusinessInfo }> = ({ data }) => {
  return (
    <div className="bg-white min-h-screen text-slate-900 font-sans">
      <nav className="p-8 flex justify-between items-center border-b border-slate-100">
        <h1 className="text-2xl font-bold tracking-tight">{data.name}</h1>
        <div className="space-x-8 text-sm font-medium text-slate-500">
          <a href="#">About</a>
          <a href="#">Services</a>
          <a href="#">Contact</a>
        </div>
      </nav>
      
      <main className="max-w-4xl mx-auto px-8 py-32">
        {data.heroImage && (
          <div className="mb-20 rounded-3xl overflow-hidden aspect-[21/9]">
            <img src={data.heroImage} className="w-full h-full object-cover" referrerPolicy="no-referrer" alt="hero" />
          </div>
        )}
        <header className="mb-24">
          <p className="text-blue-600 font-semibold mb-4 tracking-wider uppercase text-sm">{data.industry}</p>
          <h2 className="text-6xl font-bold mb-8 leading-tight">{data.tagline}</h2>
          <p className="text-xl text-slate-600 leading-relaxed max-w-2xl">{data.description}</p>
          <button className="mt-12 bg-slate-900 text-white px-10 py-4 rounded-full font-semibold hover:bg-slate-800 transition-colors">
            {data.ctaText}
          </button>
        </header>

        <section className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-32 border-y border-slate-100 py-12">
          {data.stats?.map((s, i) => (
            <div key={i}>
              <p className="text-3xl font-black mb-1">{s.value}</p>
              <p className="text-slate-400 text-xs uppercase tracking-widest font-bold">{s.label}</p>
            </div>
          ))}
        </section>

        <section className="mb-32">
          <h3 className="text-3xl font-bold mb-8">The Philosophy</h3>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <p className="text-slate-600 leading-relaxed text-lg italic">
              "{data.aboutUs}"
            </p>
            <div className="grid grid-cols-2 gap-4">
               {data.gallery?.map((img, i) => (
                 <img key={i} src={img} className="rounded-2xl w-full h-48 object-cover shadow-sm bg-slate-50" alt="gallery" />
               ))}
            </div>
          </div>
        </section>

        <section className="grid md:grid-cols-3 gap-12 mb-32">
          {data.features?.map((f, i) => (
            <div key={i} className="group">
              <div className="w-12 h-1  bg-blue-600 mb-6 group-hover:w-24 transition-all" />
              <h3 className="text-xl font-bold mb-4">{f.title}</h3>
              <p className="text-slate-600 leading-relaxed">{f.description}</p>
            </div>
          ))}
        </section>

        <section className="bg-slate-50 rounded-3xl p-12 md:p-20 text-center">
          <h3 className="text-3xl font-bold mb-4">Start your journey with us</h3>
          <p className="text-slate-600 mb-10">We're located at {data.address}</p>
          <div className="flex flex-col md:flex-row justify-center gap-4 text-sm font-medium">
            <span>{data.email}</span>
            <span className="hidden md:inline">•</span>
            <span>{data.phone}</span>
          </div>
        </section>
      </main>

      <footer className="p-12 text-center text-slate-400 text-sm border-t border-slate-100">
        © {new Date().getFullYear()} {data.name}. All rights reserved.
      </footer>
    </div>
  );
};
