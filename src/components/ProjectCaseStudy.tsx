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
      onCanPlay={handleCanPlay}
      className="h-full w-full object-cover"
    />
  );
}

export default function ProjectCaseStudy({ project }: ProjectCaseStudyProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  return (
    <div className="relative min-h-screen bg-bgPrimary text-accentSoft">
      <main className="overflow-x-clip">
        <section className="relative isolate pt-28 sm:pt-32 lg:pt-36">
          <div className="page-shell">
            <div className="relative overflow-hidden rounded-[32px] border border-white/10 shadow-soft">
              <div className="relative h-[68vh] min-h-[560px] w-full">
                <motion.div className="absolute inset-0" initial={{ scale: 1.04 }} animate={{ scale: 1 }} transition={{ duration: 1.4, ease: 'easeOut' }}>
                  <Image src={project.heroImage} alt={project.title} fill priority className="object-cover" />
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/15" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(181,84,0,0.22),transparent_35%),radial-gradient(circle_at_80%_75%,rgba(255,255,255,0.08),transparent_30%)]" />
                <div className="relative z-10 flex h-full items-end">
                  <div className="w-full p-6 sm:p-10 lg:p-14">
                    <Reveal>
                      <div className="max-w-4xl space-y-5">
                        <Link href="/" className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-accentSoft/70 transition hover:text-accentGold">
                          ← Back to home
                        </Link>
                        <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.26em] text-accentSoft/75">
                          <span className="rounded-full border border-white/15 bg-black/25 px-3 py-1 backdrop-blur-md">{project.category}</span>
                          <span className="rounded-full border border-white/15 bg-black/25 px-3 py-1 backdrop-blur-md">{project.year}</span>
                        </div>
                        <h1 className="font-heading text-[clamp(3rem,7vw,6.5rem)] leading-[0.92] tracking-tight text-accentSoft">
                          {project.title}
                        </h1>
                        <div className="flex flex-wrap gap-2">
                          {project.tools.map((tool) => (
                            <span key={tool} className="rounded-full border border-white/15 bg-white/[0.07] px-4 py-2 text-xs uppercase tracking-[0.26em] text-accentSoft/80 backdrop-blur-md">
                              {tool}
                            </span>
                          ))}
                        </div>
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
              <h2 className="section-heading">A cinematic case study built around story, form, and atmosphere.</h2>
            </Reveal>
            <div className="grid gap-6 lg:grid-cols-[1.25fr_0.75fr]">
              <Reveal>
                <div className="glass-panel h-full space-y-6 p-7 sm:p-9">
                  <div className="space-y-3">
                    <p className="text-xs uppercase tracking-[0.28em] text-accentGold/85">Project Story</p>
                    <p className="muted-copy">{project.overview}</p>
                  </div>
                  <div className="space-y-3">
                    <p className="text-xs uppercase tracking-[0.28em] text-accentGold/85">Creative Direction</p>
                    <p className="muted-copy">{project.creativeDirection}</p>
                  </div>
                </div>
              </Reveal>
              <Reveal delay={0.05}>
                <div className="glass-panel h-full space-y-6 p-7 sm:p-9">
                  <div className="space-y-3">
                    <p className="text-xs uppercase tracking-[0.28em] text-accentGold/85">Design Goals</p>
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
                    <p className="text-xs uppercase tracking-[0.28em] text-accentGold/85">Visual Identity</p>
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
              <h2 className="section-heading">Full-frame imagery arranged like an editorial spread.</h2>
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
                          {isVideo ? 'Motion render' : 'Cinematic detail view'}
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
              </div>
            </Reveal>
            <Reveal delay={0.05}>
              <div className="glass-panel h-full p-7 sm:p-9">
                <p className="kicker">Final Outcome</p>
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
          />
        )}
      </AnimatePresence>
    </div>
  );
}
