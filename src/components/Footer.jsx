"use client";

import { Code, User, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-border bg-background py-12 px-6 lg:px-12 text-center md:text-left transition-colors duration-500">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div>
          <h2 className="text-2xl font-serif font-bold tracking-tighter text-foreground mb-1">DBM.</h2>
          <p className="text-sm font-light text-secondary">Computer Engineer & Software Developer</p>
        </div>
        
        <div className="flex gap-6 text-secondary">
          <a href="#" className="hover:text-foreground transition-colors"><Code size={20} /></a>
          <a href="#" className="hover:text-foreground transition-colors"><User size={20} /></a>
          <a href="mailto:duanemahinay@gmail.com" className="hover:text-foreground transition-colors"><Mail size={20} /></a>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-12 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-mono text-secondary/60">
        <p>© {new Date().getFullYear()} DBM. All rights reserved.</p>
      </div>
    </footer>
  );
}