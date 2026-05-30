'use client';

import Image from 'next/image';
import Reveal from './Reveal';

const row1 = [
  { label: 'Crave Theory',      src: '/works/CraveTheory/crave-theory-logo.png' },
  { label: 'Web Design',        src: '/works/CraveTheory/websitescreenshot1.png' },
  { label: 'Web Interface',     src: '/works/CraveTheory/websitescreenshot2.png' },
  { label: 'Nashta Tiffins',    src: '/works/NashtaTiffins/nashta-tiffins-logo.png' },
  { label: 'Print Design',      src: '/works/NashtaTiffins/nashta.jpg' },
  { label: 'Fantasy Character', src: '/works/FantasyCharacterRenders/tojomour9.png' },
  { label: 'Character Render',  src: '/works/FantasyCharacterRenders/tojomour10.png' },
];

const row2 = [
  { label: 'Interior Viz',   src: '/works/Interiorvisualization/004.png' },
  { label: 'Interior Viz',   src: '/works/Interiorvisualization/003.png' },
  { label: 'Interior Viz',   src: '/works/Interiorvisualization/007.png' },
  { label: 'Interior Viz',   src: '/works/Interiorvisualization/009.png' },
  { label: 'PPR Branding',   src: '/works/PPRInfra/ppr-logo.jpg' },
  { label: 'PPR Poster',     src: '/works/PPRInfra/Logo_poster.jpg' },
  { label: 'Jersey Render',  src: '/works/jerseyshocasereel/untitled.png' },
];

function MarqueeRow({ items, direction }: { items: typeof row1; direction: 'left' | 'right' }) {
  const cls = direction === 'left' ? 'animate-marquee-left' : 'animate-marquee-right';
  const doubled = [...items, ...items];

  return (
    <div className="overflow-hidden">
      <div className={`flex gap-4 ${cls}`} style={{ width: 'max-content' }}>
        {doubled.map((item, i) => (
          <figure
            key={i}
            className="group relative h-[200px] w-[280px] shrink-0 overflow-hidden rounded-[20px] border border-white/10"
          >
            <Image
              src={item.src}
              alt={item.label}
              fill
              sizes="280px"
              className="object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105"
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            {/* Label */}
            <figcaption className="absolute inset-x-0 bottom-0 translate-y-2 p-4 text-[10px] uppercase tracking-[0.28em] text-accentSoft/90 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
              {item.label}
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}

export default function GalleryStrip() {
  return (
    <section className="section-shell pt-8 pb-0">
      {/* Header */}
      <div className="page-shell mb-12">
        <Reveal>
          <p className="kicker">Work Samples</p>
          <h2 className="section-heading">A visual snapshot across every discipline.</h2>
        </Reveal>
      </div>

      {/* Full-bleed marquee — hover pauses both rows */}
      <div className="marquee-outer relative overflow-hidden">
        {/* Edge fade masks */}
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-32 bg-gradient-to-r from-bgPrimary to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-32 bg-gradient-to-l from-bgPrimary to-transparent" />

        <div className="flex flex-col gap-4 pb-24 sm:pb-28 lg:pb-32">
          <MarqueeRow items={row1} direction="left" />
          <MarqueeRow items={row2} direction="right" />
        </div>
      </div>
    </section>
  );
}
