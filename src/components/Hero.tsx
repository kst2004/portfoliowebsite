'use client';

import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { rotatingTaglines } from '../data/content';
import Reveal from './Reveal';

export default function Hero() {
  const [taglineIndex, setTaglineIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setTaglineIndex((current) => (current + 1) % rotatingTaglines.length);
    }, 3800);

    return () => clearInterval(timer);
  }, []);

  return (
    <section id="top" className="section-shell relative overflow-hidden pt-32 sm:pt-36">
      <div className="absolute inset-0 bg-cinematic-vignette opacity-95" />
      <div className="page-shell relative z-10 grid items-center gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">

        <Reveal className="space-y-9" y={34}>
          <div className="space-y-5">
            <p className="kicker">Creative Portfolio</p>
            <h1 className="font-heading text-[clamp(2.8rem,6.4vw,6.6rem)] font-semibold uppercase leading-[0.92] tracking-[0.08em] text-accentSoft">
              SAITEJA KOLAN
            </h1>
            <h2 className="font-heading text-[clamp(1.25rem,2.4vw,2rem)] font-medium tracking-wide text-accentGold">
              Creative Designer & 3D Visualizer
            </h2>

            <div className="min-h-9 overflow-hidden text-sm uppercase tracking-[0.19em] text-accentSoft/70 sm:text-base">
              <AnimatePresence mode="wait">
                <motion.p
                  key={rotatingTaglines[taglineIndex]}
                  initial={{ opacity: 0, y: 18, filter: 'blur(6px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, y: -18, filter: 'blur(6px)' }}
                  transition={{ duration: 0.8, ease: [0.2, 1, 0.2, 1] }}
                >
                  {rotatingTaglines[taglineIndex]}
                </motion.p>
              </AnimatePresence>
            </div>
          </div>

          <p className="max-w-xl text-lg leading-8 text-accentSoft/75">
            Freelance Creative Designer and 3D Visualizer with real client experience across hospitality, construction, food & beverage, sports, architecture, and media.
          </p>

          <div className="flex flex-wrap gap-4">
            <a href="#works" className="glass-button">
              View Works
            </a>
            <a href="#contact" className="glass-button border-accentGold/45 bg-accentGold/[0.08]">
              Contact Me
            </a>
          </div>
        </Reveal>

        <Reveal className="relative" delay={0.18}>
          {/* Ambient glow behind portrait */}
          <motion.div
            className="absolute -inset-8 rounded-[36px] bg-accentGold/[0.18] blur-3xl"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="glass-panel relative overflow-hidden p-3"
            initial={{ scale: 0.97, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 1.1, ease: [0.2, 1, 0.2, 1] }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/40" />
            {/* Float animation instead of nearly-invisible scale loop */}
            <motion.div
              className="relative"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Image
                src="/IMG_0010.jpg"
                alt="Cinematic black and white portrait"
                width={900}
                height={1200}
                priority
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="h-[460px] w-full rounded-[24px] object-cover object-[center_18%] grayscale sm:h-[560px] lg:h-[680px]"
              />
            </motion.div>
          </motion.div>
        </Reveal>
      </div>

      {/* Scroll indicator */}
      <div className="page-shell relative z-10 mt-16 flex justify-center lg:justify-start">
        <motion.a
          href="#works"
          className="flex flex-col items-center gap-2 text-accentSoft/40 transition hover:text-accentSoft/70"
          animate={{ y: [0, 7, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <span className="text-[10px] uppercase tracking-[0.32em]">Scroll</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </motion.a>
      </div>
    </section>
  );
}
