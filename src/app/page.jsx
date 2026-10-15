"use client";

import Image from 'next/image';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Download, Code, User, Mail, Sparkles, ChevronDown, X, Maximize } from 'lucide-react';
import { projects, skills, experience, awards, currentlyLearning } from './data/portfolio';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};

export default function Home() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [fullscreenImage, setFullscreenImage] = useState(null);

  return (
    <div className="min-h-screen selection:bg-accent/30 selection:text-foreground">
      
      {/* HERO SECTION */}
      <section id="home" className="pt-40 pb-20 px-6 lg:px-12 max-w-7xl mx-auto min-h-screen flex flex-col justify-center">
        <motion.div initial="hidden" animate="visible" variants={fadeUp} className="grid md:grid-cols-12 gap-10 md:gap-14 items-end">

          <div className="md:col-span-8 max-w-4xl">
            <p className="text-sm font-medium text-secondary tracking-widest uppercase mb-6 flex items-center gap-3">
              <span className="w-12 h-[1px] bg-secondary/50"></span>
              Computer Engineer & Software Developer
            </p>

            <h1 className="text-6xl md:text-8xl md:leading-[1.1] font-serif font-medium tracking-tight text-foreground mb-8">
              Building intelligent <br className="hidden md:block"/>
              systems & practical <br className="hidden md:block"/>
              <span className="italic text-secondary">software solutions.</span>
            </h1>

            <p className="text-lg md:text-xl text-secondary mb-12 max-w-2xl leading-relaxed font-light">
              I am Duane Benedict Mahinay, an engineering graduate from STI Global City. I take complex ideas and quietly forge them into working software—from embedded AI to full-stack enterprise workflows.
            </p>

            <div className="flex flex-wrap gap-6 items-center">
              <a href="#work" className="bg-foreground text-background px-8 py-4 rounded-full font-medium hover:scale-105 transition-transform flex items-center gap-2">
                Explore Work <ArrowRight size={18} />
              </a>
              <a href="/Duane_Benedict_Resume.pdf" target="_blank" rel="noreferrer" className="px-8 py-4 font-medium text-foreground hover:text-accent transition-colors flex items-center gap-2">
                <Download size={18} /> Download Resume
              </a>
            </div>
          </div>

          <div className="md:col-span-4 flex md:justify-end">
            <div className="w-full max-w-[280px] aspect-[3/4] overflow-hidden rounded-sm border border-border">
              <img
                src="/Duane Benedict Mahinay.png"
                alt="Duane Benedict Mahinay"
                className="w-full h-full object-cover grayscale-0 md:grayscale md:hover:grayscale-0 transition-all duration-700"
              />
            </div>
          </div>

        </motion.div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-32 px-6 lg:px-12 max-w-7xl mx-auto border-t border-border grid md:grid-cols-12 gap-16">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="md:col-span-6">
          <h2 className="text-4xl md:text-5xl font-serif text-foreground mb-8">About</h2>
          <p className="text-lg text-secondary leading-relaxed font-light mb-6">
            Computer Engineering graduate (July 2026) with hands-on experience in systems development, network administration, and IoT integration. Comfortable across Python, Java, and C++, with practical exposure to AI-based solutions, hardware configuration, and software deployment.
          </p>
          <p className="text-lg text-secondary leading-relaxed font-light">
            Currently looking to apply that technical foundation and analytical mindset in a professional IT environment.
          </p>
        </motion.div>

        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="md:col-span-5 md:col-start-8">
          <h3 className="text-sm font-bold tracking-widest uppercase mb-6 text-foreground">Awards & Recognition</h3>
          <ul className="flex flex-col gap-6">
            {awards.map((award, i) => (
              <li key={i} className="border-l-2 border-border pl-4">
                <p className="text-foreground font-serif text-lg">{award.title}</p>
                <p className="text-secondary text-sm">{award.event} — {award.date}</p>
              </li>
            ))}
          </ul>
        </motion.div>
      </section>

      {/* FEATURED WORK (Editorial Grid) */}
      <section id="work" className="py-32 px-6 lg:px-12 max-w-7xl mx-auto border-t border-border">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp}>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <h2 className="text-4xl md:text-5xl font-serif text-foreground mb-4">Selected Works</h2>
              <p className="text-secondary max-w-md">A showcase of systems where I designed, built, and experimented with real-world technology.</p>
            </div>
            <p className="text-sm text-secondary font-mono">01 // 2024 - 2026</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-x-8 gap-y-16">
            {projects.map((project, index) => (
              <div key={project.id} className={`group flex flex-col ${index % 2 !== 0 ? 'md:mt-24' : ''}`}>
                <div className="aspect-[4/3] bg-surface overflow-hidden relative mb-6 rounded-sm">
                 
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      onClick={() => setFullscreenImage(project.image)}
                      className="w-full h-full object-cover grayscale-0 md:grayscale group-hover:grayscale-0 md:group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-in-out cursor-pointer md:cursor-default"
                    />
                 
                  <div className="absolute top-4 left-4 flex flex-col gap-2 z-10 pointer-events-none">
                    {project.inDevelopment && (
                      <span className="bg-background/90 text-foreground text-xs font-medium px-3 py-1 rounded-full backdrop-blur-md border border-border">
                        In Development
                      </span>
                    )}
                    {project.aiAssisted && (
                      <span className="bg-background/90 text-foreground text-xs font-medium px-3 py-1 rounded-full backdrop-blur-md border border-border flex items-center gap-1">
                        <Sparkles size={12} /> AI-Assisted
                      </span>
                    )}
                  </div>

                  {/* Expand Image Button (Visible always on mobile, hover on desktop) */}
                  <button
                    onClick={() => setFullscreenImage(project.image)}
                    className="absolute top-4 right-4 z-10 p-2 bg-background/90 text-foreground backdrop-blur-md border border-border rounded-full opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:scale-110"
                    aria-label="View Full Image"
                  >
                    <Maximize size={16} />
                  </button>

                </div>

                <div>
                  <span className="text-xs font-bold tracking-widest text-secondary uppercase mb-3 block">{project.category}</span>
                  <h3 className="text-2xl font-serif text-foreground mb-3 group-hover:text-accent transition-colors">{project.title}</h3>
                  <p className="text-secondary mb-6 leading-relaxed font-light">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.slice(0,4).map(tech => (
                      <span key={tech} className="text-xs font-medium text-foreground bg-surface px-3 py-1 rounded-full border border-border">{tech}</span>
                    ))}
                  </div>

                  {project.caseStudy && (
                    <button
                      onClick={() => setSelectedProject(project)}
                      className="flex items-center gap-2 text-sm font-medium text-accent hover:gap-3 transition-all self-start"
                    >
                      View Case Study <ArrowRight size={16} />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* EXPERIENCE & EDUCATION */}
      <section id="experience" className="py-32 px-6 lg:px-12 max-w-7xl mx-auto border-t border-border grid md:grid-cols-12 gap-16">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="md:col-span-5">
          <h2 className="text-4xl font-serif text-foreground mb-12">Experience</h2>
          <div className="flex flex-col gap-12">
            {experience.map(exp => (
              <div key={exp.id} className="relative">
                <span className="text-sm font-mono text-secondary block mb-2">{exp.date}</span>
                <h3 className="text-xl font-serif text-foreground mb-1">{exp.role}</h3>
                <div className="text-accent text-sm font-medium mb-4">{exp.company}</div>
                <ul className="flex flex-col gap-2 text-secondary list-none font-light">
                  {exp.achievements.map((item, i) => (
                    <li key={i} className="flex gap-3">
                      <span className="text-accent mt-1">→</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="md:col-span-6 md:col-start-7">
          <h2 className="text-4xl font-serif text-foreground mb-12">Education & Skills</h2>
          <div className="mb-12">
            <h3 className="text-xl font-serif text-foreground mb-2">BS Computer Engineering</h3>
            <p className="text-secondary mb-1">STI Global City</p>
            <p className="text-sm font-mono text-secondary mb-6">Graduated July 2026</p>
          </div>
          
          <div className="grid grid-cols-2 gap-x-4 gap-y-10">
            {Object.entries(skills).map(([category, items]) => (
              <div key={category}>
                <h3 className="text-sm font-bold tracking-widest uppercase mb-4 text-foreground">{category}</h3>
                <ul className="flex flex-col gap-3 text-secondary font-light">
                  {items.map(skill => <li key={skill}>{skill}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* CONTACT */}
      <section className="py-40 px-6 lg:px-12 text-center max-w-4xl mx-auto border-t border-border">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <h2 className="text-5xl md:text-7xl font-serif text-foreground mb-8">Let&apos;s build something.</h2>
          <p className="text-xl text-secondary mb-12 font-light">
            I&apos;m open to opportunities, collaborations, and interesting software projects.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
            <a href="mailto:duanemahinay@gmail.com" 
                className="bg-foreground text-background px-8 py-4 rounded-full font-medium hover:scale-105 transition-transform flex items-center gap-2"
                  >   
                 <Mail size={18} /> Get in touch
            </a>
            <a href="https://github.com/Duanemaster" target="_blank" rel="noopener noreferrer" className="p-4 rounded-full border border-border text-foreground hover:bg-surface transition-colors">
              <Code size={20} />
            </a>
            <a href="#about" className="p-4 rounded-full border border-border text-foreground hover:bg-surface transition-colors">
              <User size={20} />
            </a>
          </div>
        </motion.div>
      </section>

      {/* CASE STUDY MODAL */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
            className="fixed inset-0 z-[100] bg-foreground/40 backdrop-blur-sm flex items-center justify-center p-4 md:p-10"
          >
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.98 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="bg-background border border-border rounded-sm w-full max-w-3xl max-h-[85vh] overflow-y-auto relative"
            >
              <button
                onClick={() => setSelectedProject(null)}
                className="sticky top-4 float-right mr-4 p-2 rounded-full bg-surface hover:bg-border text-foreground transition-colors z-10"
                aria-label="Close"
              >
                <X size={20} />
              </button>

              <div className="p-8 md:p-12 clear-both">
                <span className="text-xs font-bold tracking-widest text-secondary uppercase mb-3 block">{selectedProject.category}</span>
                <h3 className="text-3xl md:text-4xl font-serif text-foreground mb-8">{selectedProject.title}</h3>

                <div className="flex flex-col gap-8">
                  <div>
                    <h4 className="text-xs font-bold tracking-widest uppercase text-secondary mb-2">Problem</h4>
                    <p className="text-secondary font-light leading-relaxed">{selectedProject.caseStudy.problem}</p>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold tracking-widest uppercase text-secondary mb-2">Solution</h4>
                    <p className="text-secondary font-light leading-relaxed">{selectedProject.caseStudy.solution}</p>
                  </div>
                  {selectedProject.caseStudy.architecture && (
                    <div>
                      <h4 className="text-xs font-bold tracking-widest uppercase text-secondary mb-2">Architecture</h4>
                      <pre className="text-xs font-mono text-secondary bg-surface border border-border rounded-sm p-4 overflow-x-auto whitespace-pre">
                        {selectedProject.caseStudy.architecture}
                      </pre>
                    </div>
                  )}
                  {selectedProject.caseStudy.features && (
                    <div>
                      <h4 className="text-xs font-bold tracking-widest uppercase text-secondary mb-2">Key Features</h4>
                      <ul className="flex flex-col gap-1">
                        {selectedProject.caseStudy.features.map((f, i) => (
                          <li key={i} className="text-secondary font-light flex gap-2">
                            <span className="text-accent">→</span>{f}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  <div>
                    <h4 className="text-xs font-bold tracking-widest uppercase text-secondary mb-2">My Contribution</h4>
                    <p className="text-secondary font-light leading-relaxed">{selectedProject.caseStudy.contribution}</p>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold tracking-widest uppercase text-secondary mb-2">Results</h4>
                    <p className="text-secondary font-light leading-relaxed">{selectedProject.caseStudy.results}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FULLSCREEN IMAGE LIGHTBOX MODAL */}
      <AnimatePresence>
        {fullscreenImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setFullscreenImage(null)}
            className="fixed inset-0 z-[110] bg-background/95 backdrop-blur-md flex items-center justify-center p-4 md:p-8 cursor-zoom-out"
          >
            <button
              onClick={() => setFullscreenImage(null)}
              className="absolute top-6 right-6 p-3 rounded-full bg-surface hover:bg-border text-foreground transition-colors z-20"
              aria-label="Close fullscreen"
            >
              <X size={24} />
            </button>
            <motion.img
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              src={fullscreenImage}
              alt="Fullscreen View"
              className="w-full h-full object-contain cursor-default rounded-sm"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}