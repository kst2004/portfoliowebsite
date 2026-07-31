import { capabilityGroups } from '../data/content';
import Reveal from './Reveal';
import GlassCard from './GlassCard';
import GlassText from './GlassText';

export default function Capabilities() {
  return (
    <section id="capabilities" className="section-shell">
      <div className="page-shell space-y-12">
        <Reveal>
          <p className="kicker">Capabilities</p>
          <h2 className="section-heading">
            <GlassText>A focused toolkit for branding, visualization, and visual systems.</GlassText>
          </h2>
        </Reveal>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {capabilityGroups.map((group, index) => (
            <Reveal key={group.title} delay={index * 0.08}>
              <GlassCard as="article" className="glass-panel h-full p-6 hover:border-white/35">
                <h3 className="font-heading text-2xl text-white">{group.title}</h3>
                <ul className="mt-5 space-y-3" aria-label={`${group.title} services`}>
                  {group.items.map((item) => (
                    <li key={item} className="flex items-center gap-3 text-white/70">
                      <span aria-hidden="true" className="h-2 w-2 rounded-full bg-white/50" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
