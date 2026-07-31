'use client';

import { processSteps } from '../data/content';
import Reveal from './Reveal';
import GlassCard from './GlassCard';

const icons = [
  /* Discover — magnifying glass */
  <svg key="discover" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="7" /><path d="M21 21l-4.35-4.35" />
  </svg>,
  /* Design — pen tool */
  <svg key="design" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 19l7-7 3 3-7 7-3-3z" /><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" /><path d="M2 2l7.586 7.586" /><circle cx="11" cy="11" r="2" />
  </svg>,
  /* Refine — sliders */
  <svg key="refine" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="4" y1="21" x2="4" y2="14" /><line x1="4" y1="10" x2="4" y2="3" /><line x1="12" y1="21" x2="12" y2="12" /><line x1="12" y1="8" x2="12" y2="3" /><line x1="20" y1="21" x2="20" y2="16" /><line x1="20" y1="12" x2="20" y2="3" /><line x1="1" y1="14" x2="7" y2="14" /><line x1="9" y1="8" x2="15" y2="8" /><line x1="17" y1="16" x2="23" y2="16" />
  </svg>,
  /* Deliver — package */
  <svg key="deliver" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="3" x2="12" y2="15" /><path d="M4.22 10.22l7.78 7.78 7.78-7.78" /><path d="M3 20h18" />
  </svg>,
];

export default function Process() {
  return (
    <section id="process" className="section-shell">
      <div className="page-shell space-y-14 overflow-x-hidden">
        <Reveal>
          <p className="kicker">Process</p>
          <h2 className="section-heading">From intent to polished output, every time.</h2>
        </Reveal>

        {/* Sheets rather than divided rows — the glass edge separates them, so
            a rule between would double up. */}
        <div className="space-y-4">
          {processSteps.map((step, index) => (
            <Reveal key={step.title} delay={index * 0.07}>
              <GlassCard
                className="group grid grid-cols-[3.5rem_1fr] gap-x-6 gap-y-4 px-5 py-9 sm:grid-cols-[5rem_9rem_1fr] sm:gap-x-8 sm:px-7 lg:grid-cols-[6rem_11rem_1fr] lg:gap-x-12 lg:py-11"
              >
                {/* Step number */}
                <div className="self-start pt-1">
                  <span className="font-heading text-[2.8rem] font-semibold leading-none tracking-tight text-white/20 transition-colors duration-500 group-hover:text-white/50 sm:text-[3.8rem]">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>

                {/* Title column — hidden on mobile, shown sm+ */}
                <div className="hidden self-start pt-[0.6rem] sm:block">
                  <div className="mb-3 text-white/45 transition-colors duration-500 group-hover:text-white/90">
                    {icons[index]}
                  </div>
                  <h3 className="font-heading text-[1.25rem] font-medium uppercase tracking-[0.12em] text-white/75 transition-colors duration-500 group-hover:text-white">
                    {step.title}
                  </h3>
                </div>

                {/* Content */}
                <div className="space-y-5">
                  {/* Mobile-only title */}
                  <div className="flex items-center gap-3 sm:hidden">
                    <span className="text-white/60">{icons[index]}</span>
                    <h3 className="font-heading text-xl font-medium uppercase tracking-[0.1em] text-white">
                      {step.title}
                    </h3>
                  </div>

                  <p className="muted-copy max-w-[520px] leading-[1.85]">
                    {step.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {step.outputs.map((output) => (
                      <span
                        key={output}
                        className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 text-[11px] uppercase tracking-[0.2em] text-white/50 transition-all duration-500 group-hover:border-white/30 group-hover:bg-white/[0.09] group-hover:text-white/85"
                      >
                        {output}
                      </span>
                    ))}
                  </div>
                </div>

              </GlassCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
