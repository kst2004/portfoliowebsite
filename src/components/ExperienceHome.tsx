'use client';

import Link from 'next/link';
import { useMemo, useRef, useState } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { works } from '../data/content';
import Logo from './Logo';

const filters = ['All', 'Design', 'Development', '3D & Visuals'];
const snippets = [
  'const curiosity = true;',
  'build(idea, constraints);',
  '01001011 01001111 01001100',
  'const next = experiment();',
  'if (idea) { makeItReal(); }',
  '0x53 0x4B 0x20 0x26 0x20 0x42',
];

function projectGroup(category: string) {
  const value = category.toLowerCase();
  if (value.includes('web') || value.includes('app') || value.includes('development')) return 'Development';
  if (value.includes('3d') || value.includes('visualization') || value.includes('render')) return '3D & Visuals';
  return 'Design';
}

export default function ExperienceHome() {
  const journeyRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const [query, setQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const { scrollYProgress } = useScroll({ target: journeyRef, offset: ['start start', 'end end'] });

  const titleOpacity = useTransform(scrollYProgress, [0, 0.07, 0.15], [1, 1, 0]);
  const titleY = useTransform(scrollYProgress, [0, 0.16], [0, -72]);
  const dataOpacity = useTransform(scrollYProgress, [0.13, 0.25, 0.43, 0.58], [0, 0.85, 0.85, 0]);
  const monitorOpacity = useTransform(scrollYProgress, [0.12, 0.22, 0.46, 0.66, 0.76], [0, 1, 1, 0.75, 0]);
  const monitorScale = useTransform(scrollYProgress, [0.12, 0.3, 0.52, 0.74], [0.62, 1, 1.18, 3.4]);
  const monitorY = useTransform(scrollYProgress, [0.12, 0.3, 0.48, 0.72], [-260, 0, -35, -110]);
  const monitorRotate = useTransform(scrollYProgress, [0.12, 0.3, 0.48], [-5, 0, 0]);
  const diveScale = useTransform(scrollYProgress, [0.28, 0.45, 0.65], [0.96, 1.05, 1.35]);
  const dataY = useTransform(scrollYProgress, [0.12, 0.7], [180, -180]);
  const roomOpacity = useTransform(scrollYProgress, [0.38, 0.58, 0.72], [0, 1, 1]);
  const roomY = useTransform(scrollYProgress, [0.38, 0.72], [34, 0]);
  const lineScale = useTransform(scrollYProgress, [0, 0.2], [0.1, 1]);

  const visibleWorks = useMemo(() => works.filter((work) => {
    const matchesFilter = activeFilter === 'All' || projectGroup(work.category) === activeFilter;
    const haystack = `${work.title} ${work.category} ${work.description} ${work.tools.join(' ')}`.toLowerCase();
    return matchesFilter && haystack.includes(query.toLowerCase());
  }), [activeFilter, query]);

  return (
    <main className="experience-shell min-h-screen overflow-clip bg-[#050505] text-white">
      <header className="experience-nav fixed inset-x-0 top-0 z-50 flex items-center justify-between px-5 py-5 sm:px-8 lg:px-12">
        <Link href="#top" aria-label="Saiteja Kolan home" className="inline-flex items-center"><Logo className="h-6 w-auto text-white sm:h-7" /></Link>
        <nav className="flex items-center gap-6 text-[10px] uppercase tracking-[0.2em] text-white/70 sm:gap-10 sm:text-xs">
          <Link className="transition-colors hover:text-white" href="#projects">Explore</Link>
          <Link className="transition-colors hover:text-white" href="#about">About</Link>
        </nav>
      </header>

      <section id="top" ref={journeyRef} className="experience-journey relative h-[280vh] md:h-[280vh]">
        <div className="sticky top-0 flex h-[100svh] items-center justify-center overflow-hidden">
          <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_55%,rgba(255,255,255,0.035),transparent_52%)]" />
          <div aria-hidden="true" className="absolute inset-0 opacity-[0.06] [background-image:linear-gradient(rgba(255,255,255,.18)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.18)_1px,transparent_1px)] [background-size:80px_80px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />

          <motion.div style={{ opacity: dataOpacity }} aria-hidden="true" className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden">
            <motion.div style={{ y: dataY, scale: diveScale }} className="experience-data-wall flex -rotate-[8deg] flex-col gap-3 whitespace-nowrap font-mono text-[10px] leading-none text-white/[0.12] sm:text-sm md:text-base">
              {Array.from({ length: 13 }, (_, row) => (
                <div key={row} className={row % 2 ? '-translate-x-[8vw]' : 'translate-x-[5vw]'}>
                  {Array.from({ length: 4 }, (_, col) => (
                    <span key={col} className="mr-8 sm:mr-14">{snippets[(row + col) % snippets.length]} <span className="text-[#ed3434]/60">0x{(row * 17 + col * 23).toString(16).padStart(2, '0').toUpperCase()}</span></span>
                  ))}
                </div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div style={{ scaleY: lineScale }} className="absolute left-1/2 top-[23%] h-20 w-px origin-top bg-gradient-to-b from-[#ed3434] to-transparent sm:h-28" />
          <motion.div style={{ opacity: dataOpacity }} className="absolute left-1/2 top-[calc(23%+4.5rem)] h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-[#ed3434] shadow-[0_0_14px_rgba(237,52,52,.8)] sm:top-[calc(23%+7rem)]" />

          <div className="relative z-10 mx-auto flex h-full w-full max-w-6xl flex-col items-center justify-center px-5 text-center">
            <motion.div style={{ opacity: titleOpacity, y: titleY }} className="flex flex-col items-center">
              <p className="mb-7 text-[10px] uppercase tracking-[0.35em] text-white/40 sm:text-xs">Scroll to enter</p>
              <h1 className="font-heading text-[clamp(3.3rem,10vw,9rem)] font-medium leading-[0.84] tracking-[-0.08em]">SAITEJA<span className="text-white/35">.</span><br />KOLAN<span className="text-[#ed3434]">.</span></h1>
              <p className="mt-8 max-w-lg text-xs leading-6 text-white/50 sm:text-sm">Design, software, experiments, and everything in between.</p>
            </motion.div>

            <motion.div style={{ opacity: monitorOpacity, scale: monitorScale, x: "-50%", y: monitorY, rotateZ: monitorRotate }} className="experience-monitor absolute left-1/2 top-[35%] w-[min(88vw,850px)]">
              <div className="relative rounded-[12px] border border-white/25 bg-[#111] p-[5px] shadow-[0_35px_120px_rgba(0,0,0,.8)] sm:rounded-[18px] sm:p-2">
                <div className="relative aspect-[16/9] overflow-hidden rounded-[7px] border border-white/10 bg-[#090909] sm:rounded-[11px]">
                  <div className="absolute inset-x-0 top-0 flex h-8 items-center justify-between border-b border-white/10 px-3 text-[8px] tracking-[0.15em] text-white/45 sm:h-10 sm:px-5 sm:text-[10px]"><span>SK / WORKSPACE</span><span className="flex items-center gap-2"><i className="h-1.5 w-1.5 rounded-full bg-[#ed3434]" /> SYSTEM READY</span></div>
                  <div className="grid h-full grid-cols-[1fr_0.72fr] gap-2 p-3 pt-10 sm:gap-4 sm:p-6 sm:pt-14">
                    <div className="flex flex-col justify-center gap-2 font-mono text-[7px] leading-relaxed text-white/60 sm:gap-3 sm:text-xs">
                      <span className="text-[#ed3434]">01 // A MIND THAT BUILDS</span><span>const interests = [</span><span className="pl-3 sm:pl-6">'design', 'code',</span><span className="pl-3 sm:pl-6">'aviation', 'hardware',</span><span className="pl-3 sm:pl-6">'experiments'</span><span>];</span><span className="mt-1 text-white/35 sm:mt-3">await createSomethingNew();</span>
                      <motion.span animate={reduceMotion ? undefined : { opacity: [0.2, 1, 0.2] }} transition={{ duration: 1.5, repeat: Infinity }} className="h-3 w-1.5 bg-[#ed3434] sm:h-4 sm:w-2" />
                    </div>
                    <div className="relative my-3 flex items-center justify-center overflow-hidden border border-white/10 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,.1),transparent_65%)] sm:my-5">
                      <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(255,255,255,.2)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.2)_1px,transparent_1px)] [background-size:22px_22px] sm:[background-size:32px_32px]" />
                      <div className="relative flex h-24 w-24 items-center justify-center rounded-full border border-white/30 sm:h-40 sm:w-40"><div className="absolute inset-3 rounded-full border border-white/20" /><div className="absolute inset-7 rotate-45 border border-[#ed3434]/70 sm:inset-10" /><Logo className="h-8 w-auto text-white sm:h-12" decorative /></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mx-auto h-7 w-[18%] bg-gradient-to-b from-[#777] via-[#252525] to-[#090909] sm:h-10" /><div className="mx-auto h-1.5 w-[35%] rounded-full bg-gradient-to-b from-[#777] to-[#222]" /><div className="mx-auto mt-4 h-px w-[74%] bg-gradient-to-r from-transparent via-white/30 to-transparent" />
            </motion.div>

            <motion.div style={{ opacity: roomOpacity, y: roomY }} className="absolute left-1/2 top-[calc(50%+min(30vw,250px))] w-full -translate-x-1/2 px-6 text-center sm:top-[calc(50%+290px)]">
              <p className="text-[10px] uppercase tracking-[0.28em] text-white/45">Beyond the interface</p><p className="mt-3 text-sm text-white/80 sm:text-lg">Scroll in. Discover what gets built.</p>
            </motion.div>
          </div>
          <div className="absolute bottom-7 left-5 flex items-center gap-3 text-[9px] uppercase tracking-[0.22em] text-white/30 sm:bottom-9 sm:left-12"><span className="h-px w-7 bg-[#ed3434]" /><span>Scroll to explore</span></div>
          <div className="absolute bottom-7 right-5 font-mono text-[9px] text-white/30 sm:bottom-9 sm:right-12">01 / 04</div>
        </div>
      </section>

      <section id="interests" className="relative border-t border-white/10 px-5 py-24 sm:px-8 sm:py-32 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="mb-14 grid gap-5 md:grid-cols-[0.8fr_1.2fr] md:items-end"><div><p className="mb-4 text-[10px] uppercase tracking-[0.3em] text-[#ed3434]">Beyond one discipline</p><h2 className="font-heading text-4xl tracking-[-0.06em] sm:text-6xl">Curiosity has<br />many outputs.</h2></div><p className="max-w-xl text-sm leading-7 text-white/55 md:justify-self-end md:text-base">I move between visual design, software, aviation, electronics, security research, and the mechanics of how things work. The common thread is making, testing, and figuring things out.</p></div>
          <div className="grid gap-px overflow-hidden border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { no: '01', title: 'Design', detail: 'Brand systems, visual storytelling, 3D and digital experiences.', code: 'VISUAL / 01' },
              { no: '02', title: 'Development', detail: 'Websites, apps, automation and useful tools.', code: 'BUILD / 02' },
              { no: '03', title: 'Aviation', detail: 'Flight, aircraft, study and the road toward the cockpit.', code: 'FLIGHT / 03' },
              { no: '04', title: 'Security', detail: 'Cybersecurity learning, labs and system thinking.', code: 'SYSTEMS / 04' },
              { no: '05', title: 'Hardware', detail: 'Electronics, home automation, repairs and experiments.', code: 'HARDWARE / 05' },
              { no: '06', title: 'Machines', detail: 'Cars, bikes, mechanics and how things are engineered.', code: 'MOTION / 06' },
            ].map((item) => <motion.article key={item.no} initial={reduceMotion ? false : { opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.55 }} className="group relative min-h-[210px] bg-[#080808] p-6 transition-colors duration-500 hover:bg-[#101010] sm:min-h-[240px] sm:p-8"><div className="flex items-center justify-between text-[9px] tracking-[0.2em] text-white/35"><span>{item.no} / 06</span><span>{item.code}</span></div><div className="mt-12 flex items-end justify-between gap-4"><div><h3 className="font-heading text-2xl tracking-tight sm:text-3xl">{item.title}</h3><p className="mt-3 max-w-xs text-sm leading-6 text-white/50">{item.detail}</p></div><span className="mb-1 text-xl text-[#ed3434] transition-transform duration-300 group-hover:translate-x-1">↗</span></div><div className="absolute bottom-0 left-0 h-px w-0 bg-[#ed3434] transition-all duration-500 group-hover:w-full" /></motion.article>)}
          </div>
        </div>
      </section>

      <section id="projects" className="border-t border-white/10 px-5 py-24 sm:px-8 sm:py-32 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between"><div><p className="mb-4 text-[10px] uppercase tracking-[0.3em] text-[#ed3434]">Selected work / archive</p><h2 className="font-heading text-4xl tracking-[-0.06em] sm:text-6xl">Things made real.</h2></div><p className="max-w-md text-sm leading-7 text-white/50">A growing archive of client work, visual experiments, and digital products. Search or filter to find your way through.</p></div>
          <div className="mt-10 flex flex-col gap-4 border-b border-white/15 pb-5 sm:flex-row sm:items-center sm:justify-between"><div className="flex flex-wrap gap-2">{filters.map((filter) => <button key={filter} type="button" onClick={() => setActiveFilter(filter)} aria-pressed={activeFilter === filter} className={`rounded-full border px-4 py-2 text-xs transition-colors ${activeFilter === filter ? 'border-white bg-white text-black' : 'border-white/15 text-white/55 hover:border-white/40 hover:text-white'}`}>{filter}</button>)}</div><label className="flex items-center gap-3 border-b border-white/20 py-2 text-sm text-white/45 focus-within:border-[#ed3434]"><span aria-hidden="true">⌕</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search projects" className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/35 sm:w-48" /></label></div>
          <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {visibleWorks.map((work, index) => <motion.article key={work.slug} initial={reduceMotion ? false : { opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.12 }} transition={{ duration: 0.45, delay: Math.min(index * 0.04, 0.16) }} className="group overflow-hidden border border-white/10 bg-[#090909]"><Link href={`/works/${work.slug}`} className="block"><div className="relative aspect-[4/3] overflow-hidden bg-[#151515]"><img src={work.image} alt={work.title} loading="lazy" className="h-full w-full object-cover grayscale transition duration-700 group-hover:scale-[1.035] group-hover:grayscale-0" /><div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" /><span className="absolute left-4 top-4 border border-white/20 bg-black/60 px-2.5 py-1 text-[9px] uppercase tracking-[0.18em] text-white/75">{projectGroup(work.category)}</span><span className="absolute bottom-4 right-4 flex h-9 w-9 items-center justify-center rounded-full border border-white/40 bg-black/50 text-lg transition group-hover:border-[#ed3434] group-hover:bg-[#ed3434]">↗</span></div><div className="p-5"><div className="flex items-start justify-between gap-4"><h3 className="text-lg tracking-tight">{work.title}</h3><span className="pt-1 text-[10px] text-white/35">{work.year}</span></div><p className="mt-2 text-sm text-white/50">{work.category}</p><p className="mt-4 line-clamp-2 text-sm leading-6 text-white/45">{work.description}</p><div className="mt-5 flex flex-wrap gap-2">{work.tools.slice(0, 3).map((tool) => <span key={tool} className="border border-white/10 px-2 py-1 text-[10px] text-white/45">{tool}</span>)}</div></div></Link></motion.article>)}
          </div>
          {visibleWorks.length === 0 && <p className="py-16 text-center text-sm text-white/45">No projects match that search. Try another term.</p>}
          <p className="mt-7 text-xs text-white/35">{visibleWorks.length} {visibleWorks.length === 1 ? 'project' : 'projects'} shown</p>
        </div>
      </section>

      <section id="about" className="border-t border-white/10 px-5 py-24 sm:px-8 sm:py-32 lg:px-12"><div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-2 md:items-end"><div><p className="mb-4 text-[10px] uppercase tracking-[0.3em] text-[#ed3434]">A little about me</p><h2 className="font-heading text-4xl leading-[1.05] tracking-[-0.06em] sm:text-6xl">Curiosity builds<br />better things<span className="text-[#ed3434]">.</span></h2></div><div><p className="text-base leading-8 text-white/65">I like understanding how things work, finding a better way to make them, and taking ideas from rough experiments to something people can actually use. My work crosses design, software, visualization, and hands-on technology.</p><Link href="mailto:kolansaiteja15@gmail.com" className="mt-8 inline-flex items-center gap-3 border-b border-[#ed3434] pb-2 text-sm transition-colors hover:text-white/65">Have something interesting in mind? <span className="text-[#ed3434]">↗</span></Link></div></div></section>

      <footer id="contact" className="border-t border-white/10 px-5 py-10 sm:px-8 lg:px-12"><div className="mx-auto flex max-w-7xl flex-col gap-6 sm:flex-row sm:items-end sm:justify-between"><div><p className="font-heading text-2xl tracking-tight">Saiteja Kolan<span className="text-[#ed3434]">.</span></p><p className="mt-2 text-xs text-white/40">Independent by curiosity. Multidisciplinary by practice.</p></div><div className="flex flex-wrap gap-x-6 gap-y-3 text-xs text-white/60"><a href="mailto:kolansaiteja15@gmail.com" className="hover:text-white">Email ↗</a><a href="https://github.com/kst2004" target="_blank" rel="noreferrer" className="hover:text-white">GitHub ↗</a><a href="https://www.linkedin.com/in/kolansaiteja" target="_blank" rel="noreferrer" className="hover:text-white">LinkedIn ↗</a><Link href="#top" className="hover:text-white">Back to top ↑</Link></div></div></footer>
    </main>
  );
}
