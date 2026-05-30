export default function Footer() {
  return (
    <footer className="border-t border-white/10 py-10">
      <div className="page-shell flex flex-col items-center justify-between gap-6 sm:flex-row sm:gap-4">
        <div className="flex flex-col items-center gap-1 sm:items-start">
          <span className="font-heading text-sm tracking-[0.22em] text-accentSoft/80">SK</span>
          <p className="text-xs text-accentSoft/40">© 2026 Saiteja Kolan. All rights reserved.</p>
        </div>

        <div className="flex items-center gap-6 text-xs uppercase tracking-[0.22em] text-accentSoft/50">
          <a href="https://www.linkedin.com/in/kolansaiteja/" className="transition duration-300 hover:text-accentGold">
            LinkedIn
          </a>
          <a href="https://instagram.com/saitejakolan" className="transition duration-300 hover:text-accentGold">
            Instagram
          </a>
          <a href="mailto:kolansaiteja15@gmail.com" className="transition duration-300 hover:text-accentGold">
            Email
          </a>
        </div>
      </div>
    </footer>
  );
}
