import React from 'react';
import { BusinessInfo } from '../../types';
import { UtensilsCrossed, Clock, MapPin } from 'lucide-react';

export const Restaurant: React.FC<{ data: BusinessInfo }> = ({ data }) => {
  return (
    <div className="bg-[#FAF9F6] min-h-screen text-[#2D2D2D] font-serif">
      <header className="relative h-[70vh] flex items-center justify-center text-center px-6 overflow-hidden">
        <img 
          src={data.heroImage || "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=2070"} 
          className="absolute inset-0 w-full h-full object-cover brightness-50"
          alt="hero"
          referrerPolicy="no-referrer"
        />
        <div className="relative z-10 max-w-4xl">
          <UtensilsCrossed className="w-12 h-12 text-orange-400 mx-auto mb-8" />
          <h1 className="text-6xl md:text-8xl font-bold text-white mb-6 italic tracking-tight">{data.name}</h1>
          <p className="text-2xl text-orange-100 mb-10 font-sans tracking-[0.2em] uppercase">{data.tagline}</p>
          <button className="bg-orange-500 text-white px-10 py-5 font-sans font-bold uppercase tracking-widest hover:bg-orange-600 transition-all">
            {data.ctaText}
          </button>
        </div>
      </header>

      <main className="py-24 max-w-5xl mx-auto px-6 font-sans">
        <section className="grid md:grid-cols-2 gap-16 items-center mb-32">
          <div>
            <h2 className="text-4xl font-serif italic mb-8">Our Story</h2>
            <p className="text-xl text-slate-600 leading-relaxed italic">
              {data.aboutUs}
            </p>
          </div>
          <div className="relative group">
            <div className="absolute -inset-4 border border-orange-200 -z-10 group-hover:inset-0 transition-all duration-500" />
            <img src={data.gallery?.[0]} className="w-full h-[500px] object-cover rounded-none" alt="about" />
          </div>
        </section>

        <section className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-32 text-center py-12 bg-white shadow-xl shadow-orange-950/5">
          {data.stats?.map((s, i) => (
            <div key={i}>
              <p className="font-serif text-3xl italic tracking-tighter mb-1">{s.value}</p>
              <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-orange-500">{s.label}</p>
            </div>
          ))}
        </section>

        <section className="grid md:grid-cols-3 gap-16 mb-32 border-y border-orange-100 py-20">
          <div className="text-center">
            <Clock className="w-8 h-8 text-orange-500 mx-auto mb-4" />
            <h3 className="font-bold uppercase tracking-wider mb-2">Hours</h3>
            <p className="text-slate-500 italic">Mon - Sun: 11am - 11pm</p>
          </div>
          <div className="text-center">
            <MapPin className="w-8 h-8 text-orange-500 mx-auto mb-4" />
            <h3 className="font-bold uppercase tracking-wider mb-2">Location</h3>
            <p className="text-slate-500 italic">{data.address}</p>
          </div>
          <div className="text-center">
            <UtensilsCrossed className="w-8 h-8 text-orange-500 mx-auto mb-4" />
            <h3 className="font-bold uppercase tracking-wider mb-2">Experience</h3>
            <p className="text-slate-500 italic">Farm to Table</p>
          </div>
        </section>

        <section className="mb-32">
          <h2 className="text-4xl font-serif italic text-center mb-16">Signature Selection</h2>
          <div className="grid md:grid-cols-2 gap-12">
            {data.features?.map((f, i) => (
              <div key={i} className="flex gap-6 items-start group">
                <div className="w-24 h-24 rounded-full overflow-hidden flex-shrink-0 border border-orange-100 group-hover:scale-110 transition-transform">
                  <img src={data.gallery?.[i % (data.gallery?.length || 1)]} className="w-full h-full object-cover" alt="feat" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">{f.title}</h3>
                  <p className="text-slate-600 leading-relaxed font-serif italic">{f.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-[#2D2D2D] text-white p-12 md:p-24 rounded-none text-center">
          <h2 className="text-4xl font-serif italic mb-8">Reservations & Contact</h2>
          <p className="mb-12 text-slate-400 text-lg">Call us at {data.phone} or email {data.email}</p>
          <div className="flex justify-center gap-8 border-t border-slate-700 pt-12">
            <div className="group hidden md:block">
              <p className="text-orange-500 uppercase tracking-widest text-xs mb-2">Social</p>
              <p className="font-bold cursor-pointer underline-offset-4 group-hover:underline">Instagram</p>
            </div>
            <div className="group">
              <p className="text-orange-500 uppercase tracking-widest text-xs mb-2">Social</p>
              <p className="font-bold cursor-pointer underline-offset-4 group-hover:underline">Facebook</p>
            </div>
          </div>
        </section>
      </main>

      <footer className="p-12 text-center text-slate-400 text-sm font-sans tracking-widest uppercase">
        © {new Date().getFullYear()} {data.name}
      </footer>
    </div>
  );
};
