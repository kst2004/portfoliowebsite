'use client';

import { motion } from 'framer-motion';
import { processSteps } from '../data/content';
import Reveal from './Reveal';

export default function Process() {
  return (
    <section id="process" className="section-shell">
      <div className="page-shell space-y-12">
        <Reveal>
          <p className="kicker">Process</p>
          <h2 className="section-heading">A clear four-step flow from intent to polished outputs.</h2>
        </Reveal>

        <div className="relative grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          <div className="pointer-events-none absolute left-8 right-8 top-7 hidden h-px bg-gradient-to-r from-transparent via-accentGold/30 to-transparent xl:block" />
          {processSteps.map((step, index) => (
            <Reveal key={step.title} delay={index * 0.09}>
              <motion.article
                className="glass-panel relative h-full p-6"
                whileHover={{ y: -4 }}
                transition={{ duration: 0.45 }}
              >
                <div className="absolute left-6 top-6 h-3 w-3 rounded-full bg-accentGold/70" />
                <div className="space-y-4 pt-7">
                  <p className="text-xs uppercase tracking-[0.24em] text-accentGold/80">0{index + 1}</p>
                  <h3 className="font-heading text-2xl text-accentSoft">{step.title}</h3>
                  <p className="muted-copy">{step.description}</p>
                </div>
              </motion.article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
