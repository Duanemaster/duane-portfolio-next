export default function Footer() {
  return (
    <footer className="rule-t">
      <div className="shell flex flex-col gap-4 py-10 text-sm text-dim sm:flex-row sm:items-center sm:justify-between">
        <div>
          <span className="font-serif text-lg text-ink">DBM</span>
          <span className="ml-3">Computer Engineer & Software Developer</span>
        </div>
        <div className="flex items-center gap-6 font-mono text-xs">
          <a href="mailto:duanemahinay@gmail.com" className="transition-colors hover:text-accent">
            Email
          </a>
          <a
            href="https://github.com/Duanemaster"
            target="_blank"
            rel="noreferrer"
            className="transition-colors hover:text-accent"
          >
            GitHub
          </a>
          <span>© {new Date().getFullYear()} DBM</span>
        </div>
      </div>
    </footer>
  );
}