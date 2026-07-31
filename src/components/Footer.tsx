import Logo from './Logo';

export default function Footer() {
  return (
    <footer className="border-t border-white/10 py-10">
      <div className="page-shell flex flex-col items-center justify-between gap-6 sm:flex-row sm:gap-4">
        <div className="flex flex-col items-center gap-1 sm:items-start">
          <Logo className="h-8 w-auto text-white/80" />
          <p className="text-xs text-white/40">© 2026 Saiteja Kolan. All rights reserved.</p>
        </div>

        <div className="flex items-center gap-6 text-xs uppercase tracking-[0.22em] text-white/50">
          <a href="https://www.linkedin.com/in/kolansaiteja" target="_blank" rel="noopener noreferrer" className="transition duration-300 hover:text-white">
            LinkedIn
          </a>
          <a href="https://instagram.com/saitejakolan" target="_blank" rel="noopener noreferrer" className="transition duration-300 hover:text-white">
            Instagram
          </a>
          <a href="mailto:kolansaiteja15@gmail.com" className="transition duration-300 hover:text-white">
            Email
          </a>
        </div>
      </div>
    </footer>
  );
}
