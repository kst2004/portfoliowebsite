import Reveal from './Reveal';
import GlassCard from './GlassCard';

export default function About() {
  return (
    <section id="about" className="section-shell">
      <div className="page-shell">
        <Reveal y={28}>
          {/* Passive surface — a full-width panel that lifts under a passing
              cursor reads as twitchy rather than responsive. */}
          <GlassCard interactive={false} className="p-8 sm:p-10 lg:p-14">
            <p className="kicker">About</p>
            <div className="space-y-7">
              <p className="font-heading text-[clamp(1.5rem,2.8vw,2.7rem)] leading-[1.35] text-white">
                Freelance Creative Designer and 3D Visualizer based in Hyderabad, with completed client
                projects across hospitality, construction, food and beverage, sports, architecture, and media.
              </p>
              <p className="max-w-4xl text-lg leading-9 text-white/70">
                I deliver brand identity, print design, 3D visualization, and architectural renders to production
                standards — scoped clearly, executed consistently, and handed off ready for immediate use.
              </p>
            </div>
          </GlassCard>
        </Reveal>
      </div>
    </section>
  );
}
