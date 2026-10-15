"use client";

import { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { useTheme } from 'next-themes';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Para iwas error sa Next.js hydration
  useEffect(() => setMounted(true), []);

  const links = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Work', href: '#work' },
    { name: 'Experience', href: '#experience' },
  ];

  return (
    <nav className="fixed w-full z-50 bg-background/80 backdrop-blur-md border-b border-border transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 h-20 flex items-center justify-between">
        <a href="#home" className="text-2xl font-serif font-bold tracking-tighter text-foreground">
          DBM.
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-secondary">
          {links.map((link) => (
            <a key={link.name} href={link.href} className="hover:text-foreground transition-colors">
              {link.name}
            </a>
          ))}
          <a href="/Duane_Benedict_Resume.pdf" target="_blank" rel="noreferrer" className="text-foreground hover:text-accent transition-colors flex items-center gap-1">
            Resume
          </a>
          
          {/* Theme Toggle Button */}
          {mounted && (
            <button 
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 rounded-full hover:bg-surface transition-colors text-foreground"
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          )}
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden flex items-center gap-4">
          {mounted && (
            <button 
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="text-foreground"
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          )}
          <button className="text-foreground" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden absolute top-20 left-0 w-full bg-background border-b border-border py-6 px-6 flex flex-col gap-6 shadow-lg"
          >
            {links.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                onClick={() => setIsOpen(false)}
                className="text-lg font-serif text-secondary hover:text-foreground transition-colors"
              >
                {link.name}
              </a>
            ))}
            <a href="/Duane_Benedict_Resume.pdf" target="_blank" rel="noreferrer" className="text-lg font-serif text-foreground">
              Resume
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}