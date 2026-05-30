'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import { works } from '../data/content';
import Reveal from './Reveal';

function WorkCard({ work, index }: { work: typeof works[0]; index: number }) {
  return (
    <motion.div
      className="group relative h-full w-full overflow-hidden rounded-[28px]"
      initial={{ opacity: 0, scale: 0.9, y: 24 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.8, ease: [0.2, 1, 0.2, 1] }}
      style={{
        boxShadow: '0 0 0 1px rgba(255,255,255,0.07)',
      }}
    >
      <Link href={`/works/${work.slug}`} className="block h-full">
        {/* Full-bleed image */}
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src={work.image}
            alt={work.title}
            fill
            sizes="(max-width: 1024px) 90vw, 480px"
            className="object-cover grayscale transition-all duration-700 ease-out group-hover:grayscale-0 group-hover:scale-[1.07]"
          />
        </div>

        {/* Gradient layers */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-transparent" />

        {/* Top bar */}
        <div className="absolute inset-x-0 top-0 flex items-center justify-between p-5">
          <span className="font-heading text-[11px] tracking-[0.34em] text-white/25 transition-colors duration-500 group-hover:text-accentGold/60">
            {String(index + 1).padStart(2, '0')}
          </span>
          <span className="rounded-full border border-white/10 bg-black/20 px-3 py-1 text-[9px] uppercase tracking-[0.3em] text-white/50 backdrop-blur-sm transition-all duration-500 group-hover:border-accentGold/35 group-hover:text-accentGold">
            Case Study
          </span>
        </div>

        {/* Default state — title at bottom, fades on hover */}
        <div className="absolute inset-x-0 bottom-0 p-6 transition-all duration-500 ease-out group-hover:translate-y-3 group-hover:opacity-0">
          <p className="mb-2 text-[10px] uppercase tracking-[0.28em] text-accentGold/80">{work.category}</p>
          <h3 className="font-heading text-[1.55rem] font-medium leading-tight text-white">{work.title}</h3>
        </div>

        {/* Hover overlay — fades in with full info */}
        <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/90 via-black/60 to-black/20 p-6 opacity-0 backdrop-blur-[2px] transition-opacity duration-500 group-hover:opacity-100">
          <p className="mb-1.5 text-[10px] uppercase tracking-[0.28em] text-accentGold/90">{work.category}</p>
          <h3 className="mb-3 font-heading text-xl font-medium leading-tight text-white">{work.title}</h3>
          <p className="mb-4 line-clamp-2 text-[13px] leading-relaxed text-white/60">{work.description}</p>

          <div className="mb-5 flex flex-wrap gap-1.5">
            {work.tools.map((tool) => (
              <span
                key={tool}
                className="rounded-full border border-white/15 bg-white/[0.07] px-2.5 py-0.5 text-[10px] tracking-wide text-white/60"
              >
                {tool}
              </span>
            ))}
          </div>

          {/* CTA */}
          <div className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.22em] text-accentGold">
            View Case Study
            <motion.svg
              width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
              initial={{ x: 0 }}
              animate={{ x: [0, 3, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            >
              <path d="M7 17L17 7M7 7h10v10" />
            </motion.svg>
          </div>
        </div>

        {/* Animated border glow on hover */}
        <motion.div
          className="pointer-events-none absolute inset-0 rounded-[28px] border border-transparent transition-colors duration-500 group-hover:border-accentGold/25"
        />
      </Link>
    </motion.div>
  );
}

function HorizontalScroll() {
  const outerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const [travelDistance, setTravelDistance] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const measure = () => {
      if (cardsRef.current) {
        const travel = cardsRef.current.scrollWidth - window.innerWidth;
        setTravelDistance(Math.max(0, travel));
      }
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  const { scrollYProgress } = useScroll({
    target: outerRef,
    offset: ['start start', 'end end'],
  });

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    setActiveIndex(Math.round(v * (works.length - 1)));
  });

  const x = useTransform(scrollYProgress, [0, 1], [0, -travelDistance]);

  const containerHeight = travelDistance > 0
    ? `calc(100vh + ${travelDistance}px)`
    : `${works.length * 100}vh`;

  return (
    <div ref={outerRef} style={{ height: containerHeight }}>
      <div className="sticky top-0 h-screen overflow-hidden">

        {/* Scrolling cards track */}
        <motion.div
          ref={cardsRef}
          className="flex h-full items-center gap-5 pl-5 sm:pl-8 lg:pl-12"
          style={{ x }}
        >
          {works.map((work, index) => (
            <div
              key={work.slug}
              className="h-[70vh] w-[min(80vw,440px)] shrink-0"
            >
              <WorkCard work={work} index={index} />
            </div>
          ))}
          {/* Right breathing room */}
          <div className="w-5 shrink-0 sm:w-8 lg:w-12" />
        </motion.div>

        {/* ── Bottom progress strip ── */}
        <div className="absolute inset-x-0 bottom-0 flex items-center gap-4 px-5 pb-6 sm:px-8 lg:px-12">

          {/* Active index counter */}
          <div className="shrink-0">
            <span className="font-heading text-[2rem] font-semibold tabular-nums leading-none text-white/70 sm:text-[2.4rem]">
              {String(activeIndex + 1).padStart(2, '0')}
            </span>
            <span className="ml-1.5 text-xs text-white/20">
              / {String(works.length).padStart(2, '0')}
            </span>
          </div>

          {/* Progress bar — driven directly by scroll motion value */}
          <div className="flex-1 overflow-hidden rounded-full" style={{ height: '2px', background: 'rgba(255,255,255,0.08)' }}>
            <motion.div
              className="h-full origin-left rounded-full"
              style={{
                scaleX: scrollYProgress,
                background: 'linear-gradient(90deg, #B55400 0%, #e07828 60%, rgba(181,84,0,0.3) 100%)',
              }}
            />
          </div>

          <span className="hidden shrink-0 text-[10px] uppercase tracking-[0.34em] text-white/18 sm:block">
            scroll
          </span>
        </div>
      </div>
    </div>
  );
}

function GridLayout() {
  return (
    <div className="page-shell">
      <div className="grid gap-6 md:grid-cols-2">
        {works.map((work, index) => (
          <Reveal key={work.slug} delay={index * 0.07}>
            <div className="h-[440px] sm:h-[500px]">
              <WorkCard work={work} index={index} />
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

export default function SelectedWorks() {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 1024);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  return (
    <section id="works">
      <div className="page-shell pt-24 pb-10 sm:pt-28 lg:pt-32">
        <Reveal>
          <p className="kicker">Selected Works</p>
          <h2 className="section-heading">Editorial projects shaped by storytelling and atmosphere.</h2>
        </Reveal>
      </div>

      {isDesktop ? <HorizontalScroll /> : <GridLayout />}

      {!isDesktop && <div className="pb-24 sm:pb-28 lg:pb-32" />}
    </section>
  );
}
