import Reveal from './Reveal';

export default function About() {
  return (
    <section id="about" className="section-shell">
      <div className="page-shell">
        <Reveal className="glass-panel p-8 sm:p-10 lg:p-14" y={28}>
          <p className="kicker">About</p>
          <div className="space-y-7">
            <p className="font-heading text-[clamp(1.5rem,2.8vw,2.7rem)] leading-[1.35] text-accentSoft/95">
              Freelance Creative Designer and 3D Visualizer based in Hyderabad, with completed client projects
              across hospitality, construction, food and beverage, sports, architecture, and media.
            </p>
            <p className="max-w-4xl text-lg leading-9 text-accentSoft/72">
              I deliver brand identity, print design, 3D visualization, and architectural renders to production
              standards — scoped clearly, executed consistently, and handed off ready for immediate use.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
