'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Reveal from './Reveal';
import Lightbox from './Lightbox';

type GalleryItem = string | { src: string; playbackRate?: number };

type CaseStudyProject = {
  slug: string;
  title: string;
  category: string;
  year: string;
  tools: string[];
  heroImage: string;
  overview: string;
  creativeDirection: string;
  designGoals: string[];
  visualIdentity: string;
  gallery: GalleryItem[];
  process: { title: string; description: string }[];
  outcome: string;
  industry?: string;
  location?: string;
  role?: string;
  services?: string[];
  deliverables?: string[];
};

type ProjectCaseStudyProps = {
  project: CaseStudyProject;
};

function VideoCard({ src, playbackRate = 1 }: { src: string; playbackRate?: number }) {
  const ref = useRef<HTMLVideoElement>(null);
  const handleCanPlay = () => {
    if (ref.current) ref.current.playbackRate = playbackRate;
  };
  return (
    <video
      ref={ref}
      src={src}
      autoPlay
      loop
      muted
      playsInline
      preload="metadata"
      onCanPlay={handleCanPlay}
      className="h-full w-full object-cover"
    />
  );
}

export default function ProjectCaseStudy({ project }: ProjectCaseStudyProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  return (
    <div className="relative min-h-screen bg-bgPrimary text-accentSoft">
      <main id="main-content" className="overflow-x-clip">
        <section className="relative isolate pt-28 sm:pt-32 lg:pt-36">
          <div className="page-shell">
            <div className="relative overflow-hidden rounded-[32px] border border-white/10 shadow-soft">
              <div className="relative min-h-[520px] w-full sm:min-h-[600px] lg:h-[68vh] lg:min-h-[560px]">
                <motion.div className="absolute inset-0" initial={{ scale: 1.04 }} animate={{ scale: 1 }} transition={{ duration: 1.4, ease: 'easeOut' }}>
                  <Image src={project.heroImage} alt={project.title} fill priority className="object-cover" />
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/15" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(181,84,0,0.22),transparent_35%),radial-gradient(circle_at_80%_75%,rgba(255,255,255,0.08),transparent_30%)]" />

                {/* Back to home — pinned to top-left, goes to works section */}
                <div className="absolute left-0 top-0 z-20 p-5 sm:p-10 lg:p-14">
                  <Link href="/#works" className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-accentSoft/70 transition hover:text-accentGold">
                    ← Back to home
                  </Link>
                </div>

                <div className="relative z-10 flex min-h-[520px] items-end sm:min-h-[600px] lg:h-full lg:min-h-0">
                  <div className="w-full p-5 sm:p-10 lg:p-14">
                    <Reveal>
                      <div className="max-w-4xl space-y-3 sm:space-y-5">
                        {/* Category + year on same compact row */}
                        <div className="flex flex-wrap items-center gap-2 text-[10px] uppercase tracking-[0.22em] text-accentSoft/75">
                          <span className="rounded-full border border-white/15 bg-black/25 px-2.5 py-1 backdrop-blur-md">{project.category}</span>
                          <span className="rounded-full border border-white/15 bg-black/25 px-2.5 py-1 backdrop-blur-md">{project.year}</span>
                        </div>
                        {/* Smaller title min on mobile so it doesn't dominate */}
                        <h1 className="font-heading text-[clamp(2rem,7vw,6.5rem)] leading-[0.92] tracking-tight text-accentSoft">
                          {project.title}
                        </h1>
                        <div className="flex flex-wrap gap-1.5">
                          {project.tools.map((tool) => (
                            <span key={tool} className="rounded-full border border-white/15 bg-white/[0.07] px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-accentSoft/80 backdrop-blur-md">
                              {tool}
                            </span>
                          ))}
                        </div>
                        {(project.industry || project.location || project.role) && (
                          <div className="grid grid-cols-2 gap-x-4 gap-y-3 pt-1 sm:grid-cols-4">
                            {project.industry && (
                              <div className="space-y-0.5">
                                <p className="text-[8px] uppercase tracking-[0.28em] text-accentSoft/35">Industry</p>
                                <p className="text-[11px] leading-snug text-accentSoft/75">{project.industry}</p>
                              </div>
                            )}
                            {project.location && (
                              <div className="space-y-0.5">
                                <p className="text-[8px] uppercase tracking-[0.28em] text-accentSoft/35">Location</p>
                                <p className="text-[11px] leading-snug text-accentSoft/75">{project.location}</p>
                              </div>
                            )}
                            {project.role && (
                              <div className="space-y-0.5">
                                <p className="text-[8px] uppercase tracking-[0.28em] text-accentSoft/35">Role</p>
                                <p className="text-[11px] leading-snug text-accentSoft/75">{project.role}</p>
                              </div>
                            )}
                            {project.services && project.services.length > 0 && (
                              <div className="space-y-0.5">
                                <p className="text-[8px] uppercase tracking-[0.28em] text-accentSoft/35">Services</p>
                                <div className="flex flex-col gap-0.5">
                                  {project.services.map((s) => (
                                    <p key={s} className="text-[11px] leading-snug text-accentSoft/75">{s}</p>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </Reveal>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section-shell">
          <div className="page-shell space-y-10">
            <Reveal>
              <p className="kicker">Project Overview</p>
              <h2 className="section-heading">Project background, objectives, and design decisions.</h2>
            </Reveal>
            <div className="grid gap-6 lg:grid-cols-[1.25fr_0.75fr]">
              <Reveal>
                <div className="glass-panel h-full space-y-6 p-7 sm:p-9">
                  <div className="space-y-3">
                    <p className="text-xs uppercase tracking-[0.28em] text-accentGold/85">Project Overview</p>
                    <p className="muted-copy">{project.overview}</p>
                  </div>
                  <div className="space-y-3">
                    <p className="text-xs uppercase tracking-[0.28em] text-accentGold/85">Design Approach</p>
                    <p className="muted-copy">{project.creativeDirection}</p>
                  </div>
                </div>
              </Reveal>
              <Reveal delay={0.05}>
                <div className="glass-panel h-full space-y-6 p-7 sm:p-9">
                  <div className="space-y-3">
                    <p className="text-xs uppercase tracking-[0.28em] text-accentGold/85">Objectives</p>
                    <ul className="space-y-3 text-sm leading-7 text-accentSoft/82">
                      {project.designGoals.map((goal) => (
                        <li key={goal} className="flex gap-3">
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accentGold" />
                          <span>{goal}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="space-y-3">
                    <p className="text-xs uppercase tracking-[0.28em] text-accentGold/85">Challenge</p>
                    <p className="muted-copy">{project.visualIdentity}</p>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        <section className="section-shell pt-0">
          <div className="page-shell space-y-10">
            <Reveal>
              <p className="kicker">Gallery</p>
              <h2 className="section-heading">Deliverables, renders, and project output.</h2>
            </Reveal>

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {project.gallery.map((item, index) => {
                const isVideo = typeof item !== 'string';
                const key = typeof item === 'string' ? item : item.src;
                return (
                  <Reveal key={key} delay={index * 0.05}>
                    <motion.div
                      whileHover={{ y: -5 }}
                      transition={{ duration: 0.6, ease: [0.2, 1, 0.2, 1] }}
                      className="group relative cursor-pointer overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.04] shadow-soft"
                      onClick={() => setLightboxIndex(index)}
                    >
                      {isVideo ? (
                        <div className="relative aspect-[4/5] overflow-hidden">
                          <VideoCard src={item.src} playbackRate={item.playbackRate} />
                        </div>
                      ) : (
                        <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.9 }} className="relative aspect-[4/5]">
                          <Image src={item} alt={`${project.title} gallery ${index + 1}`} fill className="object-cover" />
                        </motion.div>
                      )}
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10 opacity-80 transition duration-700 group-hover:opacity-100" />

                      {/* Expand hint */}
                      <div className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-black/30 opacity-0 backdrop-blur-md transition duration-500 group-hover:opacity-100">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                          <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                        </svg>
                      </div>

                      <div className="pointer-events-none absolute inset-x-0 bottom-0 p-5 opacity-0 transition duration-700 group-hover:opacity-100">
                        <div className="glass-panel border-white/10 bg-black/30 px-4 py-3 text-xs uppercase tracking-[0.26em] text-accentSoft/80 backdrop-blur-xl">
                          {isVideo ? 'Motion render' : 'Click to expand'}
                        </div>
                      </div>
                    </motion.div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        <section className="section-shell pt-0">
          <div className="page-shell space-y-10">
            <Reveal>
              <p className="kicker">Process</p>
              <h2 className="section-heading">Sketches, moodboards, iterations, and workflow decisions.</h2>
            </Reveal>
            <div className="grid gap-5 lg:grid-cols-4">
              {project.process.map((step, index) => (
                <Reveal key={step.title} delay={index * 0.06}>
                  <div className="glass-panel h-full p-6 sm:p-7">
                    <p className="mb-4 text-xs uppercase tracking-[0.3em] text-accentGold/85">0{index + 1}</p>
                    <h3 className="mb-3 font-heading text-2xl text-accentSoft">{step.title}</h3>
                    <p className="muted-copy">{step.description}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="section-shell pt-0">
          <div className="page-shell grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
            <Reveal>
              <div className="glass-panel h-full p-7 sm:p-9">
                <p className="kicker">Tools Used</p>
                <div className="flex flex-wrap gap-2">
                  {project.tools.map((tool) => (
                    <span key={tool} className="rounded-full border border-white/15 bg-white/[0.05] px-4 py-2 text-xs uppercase tracking-[0.26em] text-accentSoft/80">
                      {tool}
                    </span>
                  ))}
                </div>
                {project.deliverables && project.deliverables.length > 0 && (
                  <div className="mt-6 space-y-3">
                    <p className="text-xs uppercase tracking-[0.28em] text-accentGold/85">Deliverables</p>
                    <ul className="space-y-1.5">
                      {project.deliverables.map((d) => (
                        <li key={d} className="flex items-start gap-2 text-sm text-accentSoft/75">
                          <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accentGold/60" />
                          {d}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </Reveal>
            <Reveal delay={0.05}>
              <div className="glass-panel h-full p-7 sm:p-9">
                <p className="kicker">Outcome</p>
                <p className="muted-copy text-base leading-8">{project.outcome}</p>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            items={project.gallery}
            startIndex={lightboxIndex}
            onClose={() => setLightboxIndex(null)}
            projectTitle={project.title}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
