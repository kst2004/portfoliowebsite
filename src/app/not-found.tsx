import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#050505] px-6 text-center text-white">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_45%,rgba(220,38,38,0.13),transparent_52%)]" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(255,255,255,.2)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.2)_1px,transparent_1px)] [background-size:72px_72px]" />
      <div className="relative z-10 max-w-2xl">
        <div className="mb-8 flex items-center justify-center gap-3 text-[10px] uppercase tracking-[0.28em] text-white/45">
          <span className="h-px w-8 bg-[#ed3434]" /> SK / ROUTE UNAVAILABLE <span className="h-px w-8 bg-[#ed3434]" />
        </div>
        <p className="font-mono text-[clamp(6rem,20vw,13rem)] font-medium leading-[0.8] tracking-[-0.1em]">404<span className="text-[#ed3434]">.</span></p>
        <h1 className="mt-8 text-xl font-medium tracking-tight sm:text-2xl">This page isn&apos;t in the system.</h1>
        <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-white/50 sm:text-base">
          The destination you&apos;re looking for could not be found. The rest of the workspace is still here.
        </p>
        <Link href="/" className="mt-9 inline-flex items-center gap-4 border border-white/20 px-5 py-3 text-xs uppercase tracking-[0.18em] transition hover:border-[#ed3434] hover:bg-[#ed3434]/10">
          <span className="h-1.5 w-1.5 rounded-full bg-[#ed3434]" /> Return to home <span aria-hidden="true">↗</span>
        </Link>
      </div>
      <p className="absolute bottom-7 left-6 text-[9px] uppercase tracking-[0.2em] text-white/25 sm:left-10">Saiteja Kolan / Workspace</p>
      <span aria-hidden="true" className="absolute bottom-7 right-6 h-2 w-2 rounded-full bg-[#ed3434] shadow-[0_0_16px_rgba(237,52,52,.7)] sm:right-10" />
    </main>
  );
}
