'use client';

import { capabilityGroups } from '../data/content';
import Reveal from './Reveal';

export default function Capabilities() {
  return (
    <section id="capabilities" className="section-shell">
      <div className="page-shell space-y-12">
        <Reveal>
          <p className="kicker">Capabilities</p>
          <h2 className="section-heading">A focused toolkit for branding, visualization, and visual systems.</h2>
        </Reveal>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {capabilityGroups.map((group, index) => (
            <Reveal key={group.title} delay={index * 0.08}>
              <article className="glass-panel h-full p-6 transition duration-700 hover:border-accentGold/35 hover:shadow-glow">
                <h3 className="font-heading text-2xl text-accentGold">{group.title}</h3>
                <ul className="mt-5 space-y-3">
                  {group.items.map((item) => (
                    <li key={item} className="flex items-center gap-3 text-accentSoft/80">
                      <span className="h-2 w-2 rounded-full bg-accentGold/65" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
