"use client";

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Cpu, Binary } from 'lucide-react';
import { useFaction, FACTION_INFO } from './ThemeProvider';

const ICONS = { terran: Shield, protoss: Cpu, zerg: Binary };
const LINKS = [
  { id: 'work', label: 'Work' },
  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Contact' },
];

export default function Navbar() {
  const { faction, setFaction } = useFaction();
  const [active, setActive] = useState('');

  useEffect(() => {
    const els = LINKS.map((l) => document.getElementById(l.id)).filter(Boolean);
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-40% 0px -55% 0px' }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <header className="site-header sticky top-0 z-50">
      <div className="shell flex h-14 items-center justify-between gap-4">
        <a href="#top" className="font-mono text-sm font-medium text-ink">
          DBM
          <span className="ml-2 hidden text-dim sm:inline">/ {FACTION_INFO[faction].designation}</span>
        </a>

        <nav aria-label="Primary" className="hidden items-center gap-7 md:flex">
          {LINKS.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              className={`text-sm transition-colors duration-200 ${
                active === l.id ? 'text-ink' : 'text-dim hover:text-ink'
              }`}
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div
          role="radiogroup"
          aria-label="Faction theme"
          className="faction-switch flex items-center border border-line"
        >
          {Object.values(FACTION_INFO).map((f) => {
            const Icon = ICONS[f.id];
            const isActive = faction === f.id;
            return (
              <button
                key={f.id}
                role="radio"
                aria-checked={isActive}
                aria-label={f.name}
                onClick={() => setFaction(f.id)}
                className={`relative flex items-center gap-1.5 px-2.5 py-1.5 font-mono text-xs transition-colors duration-200 ${
                  isActive ? 'text-accent' : 'text-dim hover:text-ink'
                }`}
              >
                <Icon size={13} aria-hidden="true" />
                <span className="hidden sm:inline">{f.name}</span>
                {isActive && (
                  <motion.span
                    layoutId="faction-indicator"
                    className="absolute inset-x-0 -bottom-px h-px bg-accent"
                    transition={{ duration: 0.25, ease: [0.22, 0.61, 0.36, 1] }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
}