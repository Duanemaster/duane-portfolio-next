"use client";

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, MotionConfig } from 'framer-motion';
import {
  projects,
  skills,
  experience,
  awards,
  education,
  certifications,
  timeline,
  site,
} from './data/portfolio';
import { useFaction, FACTION_INFO } from '../components/ThemeProvider';

const EASE = [0.22, 0.61, 0.36, 1];

/* Motion character per faction */
const ENTER = {
  terran: {
    initial: { opacity: 0, x: -16 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.22, ease: 'easeOut' },
  },
  protoss: {
    initial: { opacity: 0, scale: 0.985 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.6, ease: EASE },
  },
  zerg: {
    initial: { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    transition: { type: 'spring', stiffness: 140, damping: 16 },
  },
};

const TABS = [
  { id: 'home', label: 'Home' },
  { id: 'archive', label: 'Projects' },
  { id: 'about', label: 'About' },
  { id: 'timeline', label: 'Timeline' },
  { id: 'contact', label: 'Contact' },
];

const SKILL_LABELS = {
  frontend: 'Frontend',
  backend: 'Backend',
  database: 'Database',
  ai: 'AI & Machine Learning',
  tools: 'Tools',
};

const pad = (n) => String(n).padStart(2, '0');

function dedent(str) {
  const lines = str.replace(/\t/g, '  ').split('\n');
  const filled = lines.filter((l) => l.trim());
  if (!filled.length) return '';
  const min = Math.min(...filled.map((l) => l.match(/^ */)[0].length));
  return lines.map((l) => l.slice(min)).join('\n').trim();
}

/* ---------- building blocks ---------- */

/* Original emblems (hindi kopya ng official logos) */
function Emblem({ faction, size = 30 }) {
  const common = {
    width: size,
    height: size,
    viewBox: '0 0 32 32',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.5,
    strokeLinejoin: 'round',
    strokeLinecap: 'round',
    'aria-hidden': true,
  };

  // Protoss: simetrikal na crystal na may core
  if (faction === 'protoss') {
    return (
      <svg {...common}>
        <path d="M16 2 L22 9 L22 23 L16 30 L10 23 L10 9 Z" />
        <path d="M16 2 L16 30" opacity="0.45" />
        <path d="M10 9 L22 9 M10 23 L22 23" opacity="0.45" />
        <circle cx="16" cy="16" r="2.6" fill="currentColor" stroke="none" />
      </svg>
    );
  }

  // Zerg: curved claw na may carapace segments
  if (faction === 'zerg') {
    return (
      <svg {...common}>
        <path d="M6 28 C4 18 9 8 21 4 C19 9 18 12 19 15 C22 12 25 11 28 11 C25 20 18 27 6 28 Z" />
        <path d="M10 24 C12 18 15 14 19 11" opacity="0.5" />
        <path d="M13 26 C15 22 18 19 22 17" opacity="0.5" />
      </svg>
    );
  }

  // Terran: angular armor plate na may rivets
  return (
    <svg {...common}>
      <path d="M3 9 L9 3 H23 L29 9 V20 L23 29 H9 L3 20 Z" />
      <path d="M9 11 H23 V19 L19 23 H13 L9 19 Z" opacity="0.5" />
      <path d="M16 11 V23" opacity="0.5" />
      <circle cx="7" cy="9" r="0.9" fill="currentColor" stroke="none" />
      <circle cx="25" cy="9" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}

function CloseMark() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <path d="M2 2 L12 12 M12 2 L2 12" />
    </svg>
  );
}

/* Staggered na pasok, may sariling galaw ang bawat faction */
function Rise({ as = 'div', i = 0, className = '', children }) {
  const { faction } = useFaction();
  const m = ENTER[faction];
  const Comp = motion[as];
  return (
    <Comp
      className={className}
      initial={m.initial}
      animate={m.animate}
      transition={{ ...m.transition, delay: 0.1 + i * 0.06 }}
    >
      {children}
    </Comp>
  );
}

function Frame({ title, meta, children, className = '', bodyClass = '', ...rest }) {
  const { faction } = useFaction();
  const m = ENTER[faction];
  return (
    <motion.section
      className={`frame ${className}`}
      initial={m.initial}
      animate={m.animate}
      transition={m.transition}
      {...rest}
    >
      <div className="frame-inner">
        {title && (
          <header className="titlebar">
            <span>{title}</span>
            {meta && <span className="text-dim">{meta}</span>}
          </header>
        )}
        <div className={`scroller min-h-0 flex-1 ${bodyClass}`}>{children}</div>
      </div>
    </motion.section>
  );
}

// Escape key + focus restore
function useDialog(onClose) {
  const closeRef = useRef(onClose);
  closeRef.current = onClose;
  useEffect(() => {
    const prevFocus = document.activeElement;
    const onKey = (e) => e.key === 'Escape' && closeRef.current();
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      prevFocus?.focus?.();
    };
  }, []);
}

/* ---------- top bar ---------- */

function TopBar({ tab, setTab }) {
  const { faction } = useFaction();
  const meta = FACTION_INFO[faction];

  return (
    <header className="topbar grid shrink-0 grid-cols-[1fr_auto] gap-2 lg:grid-cols-[1fr_auto_1fr]">
      <Frame className="order-3 col-span-2 lg:order-1 lg:col-span-1" bodyClass="flex items-center px-4 py-1">
        <nav aria-label="Sections" className="w-full min-w-0">
          <div role="tablist" aria-label="Sections" className="grid w-full grid-cols-5 gap-1.5 lg:flex">
            {TABS.map((t) => (
              <button
                key={t.id}
                role="tab"
                aria-selected={tab === t.id}
                onClick={() => setTab(t.id)}
                className="tab lg:flex-1"
              >
                {t.label}
              </button>
            ))}
          </div>
        </nav>
      </Frame>

      <Frame className="order-1 lg:order-2" bodyClass="flex items-center gap-2.5 px-4 py-1">
        <span className="text-accent">
          <Emblem faction={faction} size={24} />
        </span>
        <p className="font-display text-lg font-bold leading-none tracking-[0.14em]" title={meta.designation}>DBM</p>
      </Frame>

      <Frame className="order-2 lg:order-3" bodyClass="flex items-center justify-end gap-3 px-3 py-1">
        <div className="hidden min-w-0 text-right sm:block">
          <p className="truncate font-display text-sm font-semibold leading-tight">{site.name}</p>
          <p className="text-[11px] text-dim">{education.degree}</p>
        </div>
        <a href={site.resume} target="_blank" rel="noreferrer" className="btn btn-sm">
          Resume <span aria-hidden="true">↓</span>
        </a>
      </Frame>
    </header>
  );
}

/* ---------- HOME ---------- */

function Home({ setTab, openProject }) {
  const featured = projects.filter((p) => p.featured);
  const picks = (featured.length ? featured : projects).slice(0, 3);
  const latest = experience[experience.length - 1];
  const skillRows = Object.entries(skills);

  const facts = [
    ['Degree', education.degree],
    ['School', education.school],
    ['Status', education.year ? `${education.status} ${education.year}` : education.status],
    ['Availability', 'Available for opportunities'],
  ];

  return (
    <>
      <Frame title="Profile" bodyClass="flex flex-col lg:overflow-y-auto">
        <div className="flex flex-1 flex-col justify-between gap-12 p-5 md:p-8">
          <div>
            <Rise as="p" i={0} className="kicker">
              Computer Engineer · Software Developer
            </Rise>
            <Rise as="h1" i={1} className="mt-5 font-display text-4xl font-bold leading-[1.02] tracking-tight md:text-6xl xl:text-7xl">
              Duane Benedict
              <br />
              Mahinay
            </Rise>
            <Rise as="p" i={2} className="mt-6 max-w-xl text-base leading-relaxed text-ink/80 md:text-lg">
              I keep things simple: I take complex ideas and quietly build them into clean, reliable,
              and functional software—from embedded AI hardware to full-stack enterprise systems.
            </Rise>
            <Rise i={3} className="mt-8 flex flex-wrap gap-3">
              <button className="btn" onClick={() => setTab('archive')}>
                View projects <span aria-hidden="true">→</span>
              </button>
              <button className="btn btn-ghost" onClick={() => setTab('contact')}>
                Contact me
              </button>
              <a href={site.resume} target="_blank" rel="noreferrer" className="btn btn-ghost">
                Resume (PDF) <span aria-hidden="true">↓</span>
              </a>
              <a href={site.github} target="_blank" rel="noreferrer" className="btn btn-ghost">
                GitHub <span aria-hidden="true">↗</span>
              </a>
              {site.linkedin && (
                <a href={site.linkedin} target="_blank" rel="noreferrer" className="btn btn-ghost">
                  LinkedIn <span aria-hidden="true">↗</span>
                </a>
              )}
            </Rise>
            <p className="mt-8 max-w-xl text-sm leading-relaxed text-ink/70">
              Currently mastering modern tech architectures and using AI tools to code smarter,
              adapt faster, and build better software.
            </p>
          </div>

          <div className="grid gap-8 border-t border-line/50 pt-6 md:grid-cols-2 md:gap-10">
            <Rise i={4}>
              <p className="kicker">Featured projects</p>
              <ul className="rules mt-3">
                {picks.map((p) => (
                  <li key={p.id}>
                    <button
                      onClick={() => openProject(p.id)}
                      className="flex w-full items-baseline justify-between gap-4 py-2.5 text-left transition-colors hover:text-accent"
                    >
                      <span className="text-sm">{p.title}</span>
                      <span className="shrink-0 text-xs text-dim">{p.category}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </Rise>

            {latest && (
              <Rise i={5}>
                <p className="kicker">Latest experience</p>
                <p className="mt-3 font-mono text-[11px] text-dim">{latest.date}</p>
                <p className="mt-1 font-display text-lg font-semibold leading-tight">{latest.role}</p>
                <p className="mt-0.5 text-sm text-ink/70">{latest.company}</p>
                {latest.achievements?.[0] && (
                  <p className="mt-2 text-sm leading-relaxed text-ink/75">{latest.achievements[0]}</p>
                )}
              </Rise>
            )}
          </div>
        </div>
      </Frame>

      <Frame title="At a glance" bodyClass="flex flex-col lg:overflow-y-auto">
        <div className="flex flex-1 flex-col gap-6 p-5">
          <Rise i={1} className="flex gap-4">
            <div className="portrait aspect-[3/4] w-28 shrink-0">
              <img src="/Duane Benedict Mahinay.png" alt="Portrait of Duane Benedict Mahinay" />
            </div>
            <dl className="min-w-0 space-y-3 text-sm">
              {facts.map(([k, v]) => (
                <div key={k}>
                  <dt className="text-xs text-dim">{k}</dt>
                  <dd className="mt-0.5 leading-snug">
                    {k === 'Availability' && <span className="led" aria-hidden="true" />}
                    {v}
                  </dd>
                </div>
              ))}
            </dl>
          </Rise>

          <Rise i={2}>
            <div className="flex items-baseline justify-between">
              <p className="kicker">Stack</p>
              <button
                onClick={() => setTab('about')}
                className="text-xs text-dim transition-colors hover:text-accent"
              >
                All skills →
              </button>
            </div>
            <dl className="rules mt-2 text-sm">
              {skillRows.map(([category, items]) => (
                <div key={category} className="py-2">
                  <dt className="text-xs text-dim">{SKILL_LABELS[category] ?? category}</dt>
                  <dd className="mt-0.5 leading-relaxed text-ink/85">{items.join(', ')}</dd>
                </div>
              ))}
            </dl>
          </Rise>

          <Rise i={3} className="mt-auto border-t border-line/50 pt-4">
            <p className="kicker">Reach me</p>
            <div className="mt-2 space-y-1 text-sm">
              <a href={`mailto:${site.email}`} className="block break-all transition-colors hover:text-accent">
                {site.email}
              </a>
              <a href={site.github} target="_blank" rel="noreferrer" className="block transition-colors hover:text-accent">
                {site.githubLabel} ↗
              </a>
              {site.linkedin && (
                <a href={site.linkedin} target="_blank" rel="noreferrer" className="block transition-colors hover:text-accent">
                  LinkedIn ↗
                </a>
              )}
            </div>
          </Rise>
        </div>
      </Frame>
    </>
  );
}

/* ---------- PROJECTS ---------- */

function ProjectBrief({ p, openCase, openImage, go }) {
  const cs = p.caseStudy;

  const specs = [
    ['Category', p.category],
    p.inDevelopment && ['Status', 'In development'],
    p.aiAssisted && ['Assistance', 'AI-assisted'],
  ].filter(Boolean);

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: EASE }}
      className="p-5 md:p-8"
    >
      <button
        type="button"
        onClick={() => openImage({ src: p.image, alt: p.title })}
        aria-label={`View larger image: ${p.title}`}
        className="zoom relative block aspect-video w-full cursor-zoom-in overflow-hidden border border-line"
        style={{ backgroundColor: p.imageBg ?? '#000' }}
      >
        <img
          src={p.image}
          alt={p.title}
          decoding="async"
          className={`h-full w-full ${p.fit === 'contain' ? 'object-contain' : 'object-cover'}`}
        />
      </button>

      <h2 className="mt-8 font-display text-2xl font-bold leading-tight md:text-4xl">{p.title}</h2>

      <div className="mt-5 flex flex-wrap items-center gap-3">
        {p.github && (
          <a className="btn btn-sm" href={p.github} target="_blank" rel="noreferrer">
            GitHub <span aria-hidden="true">↗</span>
          </a>
        )}
        {p.live && (
          <a className="btn btn-sm" href={p.live} target="_blank" rel="noreferrer">
            Live demo <span aria-hidden="true">↗</span>
          </a>
        )}
        {p.loom && (
          <a className="btn btn-sm" href={p.loom} target="_blank" rel="noreferrer">
            Watch Loom <span aria-hidden="true">↗</span>
          </a>
        )}
        {!p.github && !p.live && !p.loom && (
          <span className="text-xs text-dim">No public links yet</span>
        )}
      </div>

      <div className="mt-8 max-w-2xl">
        <p className="text-sm leading-relaxed text-ink/80 md:text-base">{p.description}</p>

        <dl className="spec rules mt-6 text-sm">
          {specs.map(([k, v]) => (
            <div key={k}>
              <dt className="text-sm text-dim">{k}</dt>
              <dd className="leading-relaxed">{v}</dd>
            </div>
          ))}
        </dl>

        <p className="kicker mt-6">Technologies used</p>
        <ul className="mt-2 flex flex-wrap gap-2">
          {p.technologies.map((t) => (
            <li key={t} className="chip">
              {t}
            </li>
          ))}
        </ul>

        {p.features?.length > 0 && (
          <>
            <p className="kicker mt-6">Key features</p>
            <ul className="mt-2 space-y-1 text-sm text-ink/85">
              {p.features.map((f) => (
                <li key={f} className="flex gap-3">
                  <span aria-hidden="true" className="text-dim">›</span>
                  {f}
                </li>
              ))}
            </ul>
          </>
        )}
      </div>

      <div className="mt-10 flex flex-wrap items-center gap-3">
        {cs && (
          <button className="btn" onClick={() => openCase(p)}>
            Open case study <span aria-hidden="true">↗</span>
          </button>
        )}
        <button className="btn btn-ghost" onClick={() => go(-1)} aria-label="Previous project">
          ← Prev
        </button>
        <button className="btn btn-ghost" onClick={() => go(1)} aria-label="Next project">
          Next →
        </button>
      </div>
    </motion.div>
  );
}

function Archive({ selected, setSelectedId, openCase, openImage }) {
  const p = selected;
  const idx = projects.findIndex((x) => x.id === p.id);
  const go = (d) => setSelectedId(projects[(idx + d + projects.length) % projects.length].id);

  const select = (id) => {
    setSelectedId(id);
    // sa mobile, dalhin sa details
    if (window.matchMedia('(max-width: 1023px)').matches) {
      document.getElementById('brief')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>
      <Frame title="Projects" meta={`${projects.length} entries`} bodyClass="lg:overflow-y-auto">
        <ol className="rules">
          {projects.map((x, i) => (
            <Rise as="li" key={x.id} i={i}>
              <button
                type="button"
                className="row"
                data-active={x.id === p.id}
                aria-current={x.id === p.id ? 'true' : undefined}
                onClick={() => select(x.id)}
              >
                <span className="row-num">{pad(i + 1)}</span>
                <span className="min-w-0">
                  <span className="block font-display text-sm font-semibold leading-snug">{x.title}</span>
                  <span className="mt-0.5 block text-xs text-dim">{x.category}</span>
                </span>
                {x.inDevelopment && <span className="chip">Dev</span>}
              </button>
            </Rise>
          ))}
        </ol>
      </Frame>

      <Frame id="brief" title="Project details" meta={`${pad(idx + 1)} / ${pad(projects.length)}`} bodyClass="lg:overflow-y-auto">
        {/* key = balik sa taas tuwing magpapalit ng project */}
        <ProjectBrief key={p.id} p={p} openCase={openCase} openImage={openImage} go={go} />
      </Frame>
    </>
  );
}

/* ---------- ABOUT ---------- */

function About() {
  return (
    <>
      <Frame title="Skills & credentials" bodyClass="lg:overflow-y-auto">
        <div className="mx-5 my-5 space-y-10 md:mx-8 md:my-8">
          <section aria-labelledby="skills-h">
            <h2 id="skills-h" className="kicker">Technical skills</h2>
            <dl className="rules mt-3">
              {Object.entries(skills).map(([category, items], i) => (
                <Rise key={category} i={i} className="grid gap-1.5 py-4 sm:grid-cols-[8.5rem_minmax(0,1fr)] sm:gap-6">
                  <dt className="pt-0.5 text-sm text-ink/70">{SKILL_LABELS[category] ?? category}</dt>
                  <dd className="text-sm leading-relaxed text-ink/85">{items.join(', ')}</dd>
                </Rise>
              ))}
            </dl>
          </section>

          <section aria-labelledby="edu-h">
            <h2 id="edu-h" className="kicker">Education</h2>
            <div className="rules mt-3 py-4">
              <p className="font-display text-lg font-semibold leading-tight">{education.degree}</p>
              <p className="mt-0.5 text-sm text-ink/70">{education.school}</p>
              <p className="mt-1 text-xs text-dim">
                {education.status}
                {education.year ? ` · ${education.year}` : ''}
              </p>
            </div>
          </section>

          <section aria-labelledby="cert-h">
            <h2 id="cert-h" className="kicker">Certifications</h2>
            {certifications.length > 0 ? (
              <ul className="rules mt-3 text-sm">
                {certifications.map((c) => (
                  <li key={c.title} className="py-3">
                    <p className="text-ink/90">{c.title}</p>
                    <p className="text-xs text-dim">
                      {[c.issuer, c.date].filter(Boolean).join(' · ')}
                    </p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-3 text-xs text-dim">No certifications listed yet.</p>
            )}
          </section>

          <section aria-labelledby="ach-h">
            <h2 id="ach-h" className="kicker">Achievements</h2>
            <ul className="rules mt-3 text-sm">
              {awards.map((a) => (
                <li key={`${a.title}-${a.event}`} className="py-3">
                  <p className="text-ink/90">{a.title}</p>
                  <p className="text-xs text-dim">
                    {a.event} · {a.date}
                  </p>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </Frame>

      <Frame title="Professional experience" bodyClass="lg:overflow-y-auto">
        <ol className="m-5 ml-6 space-y-10 border-l border-line/60 pl-6 md:m-8 md:ml-9">
          {experience.map((exp, i) => (
            <Rise as="li" key={exp.id} i={i} className="relative">
              <span aria-hidden="true" className="absolute -left-[29px] top-1.5 h-1.5 w-1.5 bg-accent" />
              <p className="font-mono text-xs text-dim">{exp.date}</p>
              <h3 className="mt-1 font-display text-xl font-semibold leading-tight md:text-2xl">{exp.role}</h3>
              <p className="mt-0.5 text-sm text-ink/70">{exp.company}</p>
              <ul className="mt-3 space-y-2 text-sm leading-relaxed text-ink/80">
                {exp.achievements.map((item, j) => (
                  <li key={j} className="flex gap-3">
                    <span aria-hidden="true" className="text-dim">›</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Rise>
          ))}
        </ol>
      </Frame>
    </>
  );
}

/* ---------- CAREER TIMELINE ---------- */

function Timeline() {
  return (
    <Frame title="Career timeline" meta={`${timeline.length} events`} bodyClass="lg:overflow-y-auto">
      <ol className="m-5 ml-6 max-w-3xl space-y-8 border-l border-line/60 pl-6 md:m-8 md:ml-9">
        {timeline.map((t, i) => (
          <Rise as="li" key={t.id} i={i} className="relative">
            <span aria-hidden="true" className="absolute -left-[29px] top-1.5 h-1.5 w-1.5 bg-accent" />
            <div className="flex flex-wrap items-center gap-3">
              <span className="chip">{t.type}</span>
              {t.date && <span className="font-mono text-xs text-dim">{t.date}</span>}
            </div>
            <h3 className="mt-2 font-display text-lg font-semibold leading-tight md:text-xl">{t.title}</h3>
            <p className="mt-0.5 text-sm text-ink/70">{t.org}</p>
            {t.note && <p className="mt-2 text-sm leading-relaxed text-ink/75">{t.note}</p>}
          </Rise>
        ))}
      </ol>
    </Frame>
  );
}

/* ---------- CONTACT ---------- */

/* EmailJS (REST, walang dagdag na package). Ilagay sa .env.local:
   NEXT_PUBLIC_EMAILJS_SERVICE_ID, NEXT_PUBLIC_EMAILJS_TEMPLATE_ID, NEXT_PUBLIC_EMAILJS_PUBLIC_KEY */
const EMAILJS = {
  service: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
  template: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
  key: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY,
};
const EMAILJS_READY = Boolean(EMAILJS.service && EMAILJS.template && EMAILJS.key);

const EMPTY_FORM = { name: '', email: '', subject: '', message: '' };

function validate(v) {
  const e = {};
  if (v.name.trim().length < 2) e.name = 'Enter your full name.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email.trim())) e.email = 'Enter a valid email address.';
  if (v.subject.trim().length < 3) e.subject = 'Add a subject of at least 3 characters.';
  if (v.message.trim().length < 10) e.message = 'Write a message of at least 10 characters.';
  return e;
}

function Field({ id, label, error, as: Tag = 'input', ...props }) {
  return (
    <div>
      <label htmlFor={id} className="text-sm text-dim">
        {label}
      </label>
      <Tag
        id={id}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-err` : undefined}
        className="mt-1 block w-full rounded-[var(--btn-radius)] border border-line/70 bg-black/40 px-3 py-2 text-sm text-ink outline-none transition-colors focus:border-accent aria-[invalid=true]:border-accent"
        {...props}
      />
      {error && (
        <p id={`${id}-err`} className="mt-1 text-xs text-accent">
          {error}
        </p>
      )}
    </div>
  );
}

function ContactForm() {
  const [values, setValues] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | success | error | unconfigured

  const onChange = (e) => {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
    if (errors[name]) setErrors((er) => ({ ...er, [name]: undefined }));
  };

  async function onSubmit(ev) {
    ev.preventDefault();
    const errs = validate(values);
    setErrors(errs);
    const first = Object.keys(errs)[0];
    if (first) {
      setStatus('idle');
      document.getElementById(`cf-${first}`)?.focus();
      return;
    }
    if (!EMAILJS_READY) {
      setStatus('unconfigured');
      return;
    }
    setStatus('sending');
    try {
      const res = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          service_id: EMAILJS.service,
          template_id: EMAILJS.template,
          user_id: EMAILJS.key,
          template_params: {
            from_name: values.name.trim(),
            reply_to: values.email.trim(),
            subject: values.subject.trim(),
            message: values.message.trim(),
          },
        }),
      });
      if (!res.ok) throw new Error('send failed');
      setStatus('success');
      setValues(EMPTY_FORM);
    } catch {
      setStatus('error');
    }
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-4" aria-label="Contact form">
      <Field id="cf-name" name="name" label="Full name" autoComplete="name" value={values.name} onChange={onChange} error={errors.name} />
      <Field id="cf-email" name="email" type="email" label="Email address" autoComplete="email" value={values.email} onChange={onChange} error={errors.email} />
      <Field id="cf-subject" name="subject" label="Subject" value={values.subject} onChange={onChange} error={errors.subject} />
      <Field id="cf-message" name="message" as="textarea" rows={5} label="Message" value={values.message} onChange={onChange} error={errors.message} />

      <div className="flex flex-wrap items-center gap-4">
        <button type="submit" className="btn" disabled={status === 'sending'}>
          {status === 'sending' ? 'Sending...' : 'Send message'}
        </button>
        <p role="status" aria-live="polite" className="text-xs">
          {status === 'success' && <span className="text-signal">Message sent. I will reply to your email.</span>}
        </p>
      </div>

      {status === 'error' && (
        <p role="alert" className="text-xs text-accent">
          The message could not be sent. Try again, or email me directly at {site.email}.
        </p>
      )}
      {status === 'unconfigured' && (
        <p role="alert" className="text-xs leading-relaxed text-accent">
          The contact form is not connected to an email service yet. Please email me directly at {site.email}.
        </p>
      )}
    </form>
  );
}

function Contact() {
  const links = [
    ['Email', site.email, `mailto:${site.email}`, false],
    ['GitHub', site.githubLabel, site.github, true],
    site.linkedin && ['LinkedIn', site.linkedin.replace(/^https?:\/\/(www\.)?/, ''), site.linkedin, true],
    ['Resume', site.resume.replace(/^\//, ''), site.resume, true],
  ].filter(Boolean);

  return (
    <Frame title="Contact" bodyClass="lg:overflow-y-auto">
      <div className="grid gap-10 p-5 md:p-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:gap-16">
        <div className="flex flex-col gap-8">
          <div>
            <Rise as="p" i={0} className="kicker">
              <span className="led" aria-hidden="true" />
              Available for opportunities
            </Rise>
            <Rise as="h2" i={1} className="mt-5 font-display text-3xl font-bold leading-[1.1] md:text-5xl">
              Open for software development roles, contract work, and engineering collaborations.
            </Rise>
            <Rise as="p" i={2} className="mt-5 max-w-lg text-sm leading-relaxed text-ink/80">
              Tell me about the role or project. I usually reply by email.
            </Rise>
          </div>

          <ul className="rules">
            {links.map(([label, text, href, external], i) => (
              <Rise as="li" key={label} i={3 + i}>
                <a
                  href={href}
                  {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
                  className="group flex items-center justify-between gap-4 py-4 transition-colors hover:text-accent"
                >
                  <span>
                    <span className="block text-xs text-dim">{label}</span>
                    <span className="mt-0.5 block break-all text-sm">{text}</span>
                  </span>
                  <span
                    aria-hidden="true"
                    className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  >
                    ↗
                  </span>
                </a>
              </Rise>
            ))}
          </ul>
        </div>

        <Rise i={3}>
          <p className="kicker mb-4">Send a message</p>
          <ContactForm />
        </Rise>
      </div>
    </Frame>
  );
}

/* ---------- DEVELOPER CONSOLE ---------- */

const CONSOLE_WELCOME = 'Developer console. Type "help" to see the commands.';

// Bumabalik ng string, o null kapag "clear"
function runCommand(raw) {
  const cmd = raw.trim().toLowerCase();
  switch (cmd) {
    case '':
      return '';
    case 'help':
      return [
        'Commands:',
        '  about       who I am',
        '  projects    list of projects',
        '  skills      technical skills',
        '  experience  work experience',
        '  education   degree and school',
        '  contact     how to reach me',
        '  clear       clear the console',
      ].join('\n');
    case 'about':
      return [
        `${site.name}`,
        `${education.degree}, ${education.school} (${education.status}).`,
        'Software developer working on web apps, system automation, AI integration, database management and IT systems.',
      ].join('\n');
    case 'projects':
      return [
        ...projects.map((p, i) => `${pad(i + 1)}  ${p.title}  [${p.category}]`),
        '',
        'Open the Projects tab for details.',
      ].join('\n');
    case 'skills':
      return Object.entries(skills)
        .map(([k, v]) => `${(SKILL_LABELS[k] ?? k).padEnd(22)}${v.join(', ')}`)
        .join('\n');
    case 'experience':
      return experience
        .map((e) => [`${e.role}`, `${e.company} | ${e.date}`, ...e.achievements.map((a) => `  - ${a}`)].join('\n'))
        .join('\n\n');
    case 'education':
      return [
        education.degree,
        education.school,
        education.year ? `${education.status}, ${education.year}` : education.status,
      ].join('\n');
    case 'contact':
      return [
        `Email:   ${site.email}`,
        `GitHub:  ${site.github}`,
        site.linkedin && `LinkedIn: ${site.linkedin}`,
        `Resume:  ${site.resume}`,
      ]
        .filter(Boolean)
        .join('\n');
    case 'clear':
      return null;
    default:
      return `Command not found: ${raw.trim()}. Type "help" to see the commands.`;
  }
}

function Console({ onClose }) {
  useDialog(onClose);
  const [lines, setLines] = useState([{ type: 'out', text: CONSOLE_WELCOME }]);
  const [value, setValue] = useState('');
  const [history, setHistory] = useState([]);
  const [hIdx, setHIdx] = useState(-1);
  const inputRef = useRef(null);
  const boxRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    const el = boxRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [lines]);

  const submit = (e) => {
    e.preventDefault();
    const raw = value;
    const out = runCommand(raw);
    if (raw.trim()) setHistory((h) => [raw, ...h]);
    setHIdx(-1);
    setValue('');
    if (out === null) {
      setLines([]);
      return;
    }
    setLines((l) => [...l, { type: 'cmd', text: raw }, ...(out ? [{ type: 'out', text: out }] : [])]);
  };

  const onKeyDown = (e) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      const next = Math.min(hIdx + 1, history.length - 1);
      if (next >= 0) {
        setHIdx(next);
        setValue(history[next]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const next = hIdx - 1;
      setHIdx(next);
      setValue(next >= 0 ? history[next] : '');
    }
  };

  return (
    <div
      id="dev-console"
      className="fixed bottom-20 right-3 z-40 w-[min(30rem,calc(100vw-1.5rem))]"
    >
      <Frame
        role="dialog"
        aria-label="Developer console"
        title="Developer console"
        meta="type help"
        className="h-auto!"
        bodyClass="flex flex-col"
      >
        <div
          ref={boxRef}
          className="max-h-[40dvh] min-h-[8rem] overflow-y-auto p-3 font-mono text-xs leading-relaxed"
          onClick={() => inputRef.current?.focus()}
        >
          {lines.map((l, i) =>
            l.type === 'cmd' ? (
              <p key={i} className="text-accent">
                <span aria-hidden="true">$ </span>
                {l.text}
              </p>
            ) : (
              <pre key={i} className="mb-2 whitespace-pre-wrap break-words font-mono text-ink/85">
                {l.text}
              </pre>
            )
          )}
        </div>
        <form onSubmit={submit} className="flex items-center gap-2 border-t border-line/50 px-3 py-2">
          <label htmlFor="console-input" className="font-mono text-xs text-accent">
            <span aria-hidden="true">$</span>
            <span className="sr-only">Command</span>
          </label>
          <input
            id="console-input"
            ref={inputRef}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={onKeyDown}
            autoComplete="off"
            autoCapitalize="off"
            spellCheck={false}
            className="min-w-0 flex-1 bg-transparent font-mono text-xs text-ink outline-none"
          />
          <button type="button" onClick={onClose} aria-label="Close console" className="p-1 text-dim transition-colors hover:text-ink">
            <CloseMark />
          </button>
        </form>
      </Frame>
    </div>
  );
}

/* ---------- bottom bar ---------- */

function BottomBar({ consoleOpen, toggleConsole }) {
  const { faction, setFaction } = useFaction();
  const [time, setTime] = useState('');

  useEffect(() => {
    const tick = () => setTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    tick();
    const id = setInterval(tick, 30000);
    return () => clearInterval(id);
  }, []);

  return (
    <footer className="shrink-0">
      <Frame bodyClass="flex flex-wrap items-center justify-between gap-2 px-3 py-2">
        <p className="font-mono text-[11px] text-dim">
          © {new Date().getFullYear()} Duane Benedict Mahinay
        </p>

        <div role="radiogroup" aria-label="Faction" className="flex items-center gap-1.5">
          {Object.values(FACTION_INFO).map((f) => (
            <button
              key={f.id}
              role="radio"
              aria-checked={faction === f.id}
              aria-label={f.name}
              onClick={() => setFaction(f.id)}
              className="tab"
            >
              <Emblem faction={f.id} size={15} />
              <span className="hidden sm:inline">{f.name}</span>
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            className="tab"
            aria-label="Developer console"
            aria-expanded={consoleOpen}
            aria-controls="dev-console"
            onClick={toggleConsole}
          >
            <span aria-hidden="true">&gt;_</span>
            <span className="hidden sm:inline">Console</span>
          </button>
          <span className="hidden min-w-[4.5rem] text-right font-mono text-xs text-dim md:block" suppressHydrationWarning>
            {time}
          </span>
        </div>
      </Frame>
    </footer>
  );
}

/* ---------- dialogs ---------- */

function CaseStudy({ project, onClose }) {
  useDialog(onClose);
  const cs = project.caseStudy;
  const sections = [
    ['Problem', cs.problem],
    ['Solution', cs.solution],
    ['My contribution', cs.contribution],
  ].filter(([, text]) => text);
  return (
    <motion.div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/75 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
    >
      <Frame
        role="dialog"
        aria-modal="true"
        aria-labelledby="case-title"
        title={`Case study · ${project.category}`}
        className="h-auto! max-h-[88dvh] w-full max-w-2xl"
        bodyClass="overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative p-5 md:p-8">
          <button
            autoFocus
            onClick={onClose}
            aria-label="Close case study"
            className="absolute right-3 top-3 p-2 text-dim transition-colors hover:text-ink"
          >
            <CloseMark />
          </button>
          <h3 id="case-title" className="pr-8 font-display text-2xl font-bold leading-tight md:text-3xl">
            {project.title}
          </h3>

          <div className="mt-6 space-y-5">
            {sections.map(([label, text]) => (
              <div key={label}>
                <p className="kicker">{label}</p>
                <p className="mt-1.5 text-sm leading-relaxed text-ink/85">{text}</p>
              </div>
            ))}

            {cs.features?.length > 0 && (
              <div>
                <p className="kicker">Features</p>
                <ul className="mt-2 space-y-1 text-sm text-ink/85">
                  {cs.features.map((f) => (
                    <li key={f} className="flex gap-3">
                      <span aria-hidden="true" className="text-dim">›</span>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {cs.architecture && (
              <div>
                <p className="kicker">Architecture</p>
                <pre className="mt-1.5 overflow-x-auto border border-line/60 bg-black/40 p-3 font-mono text-[11px] leading-relaxed text-ink/85">
                  {dedent(cs.architecture)}
                </pre>
              </div>
            )}

            {cs.results && (
              <div>
                <p className="kicker">Results</p>
                <p className="mt-1.5 text-sm leading-relaxed text-ink/85">{cs.results}</p>
              </div>
            )}
          </div>
        </div>
      </Frame>
    </motion.div>
  );
}

function Lightbox({ image, onClose }) {
  useDialog(onClose);
  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label="Image preview"
      className="fixed inset-0 z-[70] flex cursor-zoom-out items-center justify-center bg-black/90 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
    >
      <button
        autoFocus
        onClick={onClose}
        aria-label="Close image"
        className="btn btn-ghost absolute right-4 top-4 p-2!"
      >
        <CloseMark />
      </button>
      <motion.div
        className="frame h-auto! max-w-full"
        initial={{ scale: 0.98 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.25, ease: EASE }}
        onClick={(e) => e.stopPropagation()}
      >
        <img src={image.src} alt={image.alt} className="max-h-[80dvh] max-w-full cursor-default object-contain" />
      </motion.div>
    </motion.div>
  );
}

/* ---------- page ---------- */

export default function Page() {
  const { faction } = useFaction();
  const [tab, setTab] = useState('home');
  const [selectedId, setSelectedId] = useState(projects[0]?.id);
  const [caseProject, setCaseProject] = useState(null);
  const [lightbox, setLightbox] = useState(null);
  const [consoleOpen, setConsoleOpen] = useState(false);

  const selected = projects.find((p) => p.id === selectedId) ?? projects[0];

  // pamagat ng tab sa browser, sumusunod sa section
  useEffect(() => {
    const label = TABS.find((t) => t.id === tab)?.label;
    document.title =
      tab === 'home'
        ? 'Duane Benedict Mahinay | Computer Engineer & Software Developer'
        : `${label} | Duane Benedict Mahinay`;
  }, [tab]);

  const openProject = (id) => {
    setSelectedId(id);
    setTab('archive');
  };

  const cols = {
    home: 'lg:grid-cols-[minmax(0,1fr)_340px]',
    archive: 'lg:grid-cols-[340px_minmax(0,1fr)]',
    about: 'lg:grid-cols-[minmax(0,6fr)_minmax(0,6fr)]',
    timeline: 'lg:grid-cols-1',
    contact: 'lg:grid-cols-1',
  }[tab];

  return (
    <MotionConfig reducedMotion="user">
      <div className="mx-auto flex h-dvh max-w-[1600px] flex-col gap-2 p-2">
        <TopBar tab={tab} setTab={setTab} />

        {/* key: replay ng entrance pag nagpalit ng tab o faction */}
        <main key={`${tab}-${faction}`} className={`stage ${cols}`}>
          {tab === 'home' && <Home setTab={setTab} openProject={openProject} />}
          {tab === 'archive' && selected && (
            <Archive
              selected={selected}
              setSelectedId={setSelectedId}
              openCase={setCaseProject}
              openImage={setLightbox}
            />
          )}
          {tab === 'about' && <About />}
          {tab === 'timeline' && <Timeline />}
          {tab === 'contact' && <Contact />}
        </main>

        <BottomBar consoleOpen={consoleOpen} toggleConsole={() => setConsoleOpen((o) => !o)} />
      </div>

      {consoleOpen && <Console onClose={() => setConsoleOpen(false)} />}

      {/* faction switch: isang manipis na linya na tumatawid, walang glow */}
      <motion.div
        key={faction}
        aria-hidden="true"
        className="pointer-events-none fixed inset-x-0 top-0 z-30 h-px bg-accent"
        initial={{ y: 0, opacity: 0.8 }}
        animate={{ y: '100vh', opacity: 0 }}
        transition={{ duration: 0.7, ease: EASE }}
      />

      <AnimatePresence>
        {caseProject && <CaseStudy key="case" project={caseProject} onClose={() => setCaseProject(null)} />}
      </AnimatePresence>
      <AnimatePresence>
        {lightbox && <Lightbox key="lightbox" image={lightbox} onClose={() => setLightbox(null)} />}
      </AnimatePresence>
    </MotionConfig>
  );
}