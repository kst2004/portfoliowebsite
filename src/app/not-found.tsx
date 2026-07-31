import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-ink px-6 text-center text-white">
      <p className="mb-4 text-[11px] uppercase tracking-[0.32em] text-white/55">404</p>
      <h1 className="font-heading text-[clamp(2.5rem,8vw,6rem)] font-semibold leading-none tracking-tight text-white">
        Page not found
      </h1>
      <p className="mt-6 max-w-sm text-base leading-7 text-white/60">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link
        href="/"
        className="mt-10 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/[0.07] px-7 py-3 text-sm tracking-wide text-white/80 transition hover:border-white/50 hover:text-white"
      >
        ← Back to home
      </Link>
    </div>
  );
}
