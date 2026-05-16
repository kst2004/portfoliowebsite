'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { works } from '../data/content';
import Reveal from './Reveal';

export default function SelectedWorks() {
  return (
    <section id="works" className="section-shell">
      <div className="page-shell space-y-12">
        <Reveal>
          <p className="kicker">Selected Works</p>
          <h2 className="section-heading">Editorial projects shaped by storytelling and atmosphere.</h2>
        </Reveal>

        <div className="grid gap-7 md:grid-cols-2">
          {works.map((work, index) => (
            <Reveal key={work.title} delay={index * 0.07}>
              <Link href={`/works/${work.slug}`} className="block">
                <motion.article
                  className="glass-panel group overflow-hidden"
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.5, ease: [0.2, 1, 0.2, 1] }}
                >
                  <div className="relative overflow-hidden border-b border-white/10">
                    <motion.div whileHover={{ scale: 1.06 }} transition={{ duration: 0.9 }}>
                      <Image
                        src={work.image}
                        alt={work.title}
                        width={1200}
                        height={780}
                        className="h-64 w-full object-cover grayscale transition duration-700 group-hover:grayscale-0"
                      />
                    </motion.div>
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10" />
                    <div className="pointer-events-none absolute right-5 top-5 rounded-full border border-white/15 bg-black/30 px-3 py-1 text-[10px] uppercase tracking-[0.32em] text-accentSoft/80 backdrop-blur-md transition duration-700 group-hover:bg-accentGold/20">
                      Case Study
                    </div>
                  </div>

                  <div className="space-y-4 p-6 sm:p-7">
                    <div className="flex items-center justify-between gap-4">
                      <p className="text-xs uppercase tracking-[0.26em] text-accentGold/85">{work.category}</p>
                      <p className="text-xs uppercase tracking-[0.26em] text-accentSoft/45">{work.year}</p>
                    </div>
                    <h3 className="font-heading text-3xl leading-tight text-accentSoft">{work.title}</h3>
                    <p className="muted-copy">{work.description}</p>
                    <div className="flex flex-wrap gap-2 pt-1">
                      {work.tools.map((tool) => (
                        <span
                          key={tool}
                          className="rounded-full border border-white/15 bg-white/[0.05] px-3 py-1 text-xs tracking-wide text-accentSoft/78"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.article>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
