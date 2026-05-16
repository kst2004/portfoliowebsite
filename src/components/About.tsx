'use client';

import Reveal from './Reveal';

export default function About() {
  return (
    <section id="about" className="section-shell">
      <div className="page-shell">
        <Reveal className="glass-panel p-8 sm:p-10 lg:p-14" y={28}>
          <p className="kicker">About</p>
          <div className="space-y-7">
            <p className="font-heading text-[clamp(1.5rem,2.8vw,2.7rem)] leading-[1.35] text-accentSoft/95">
              I&apos;m a self-taught creative designer and visual artist based in Hyderabad, focused on building immersive
              digital experiences through branding, UI design, and cinematic visualization.
            </p>
            <p className="max-w-4xl text-lg leading-9 text-accentSoft/72">
              My work combines modern aesthetics, storytelling, and technical experimentation to create visually
              engaging experiences across digital and print media.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
