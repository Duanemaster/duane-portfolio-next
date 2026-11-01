# Duane Benedict Mahinay: Personal Portfolio

A responsive, interactive portfolio for a Computer Engineer and Software Developer. The interface is styled as a command center with three switchable themes (Terran, Protoss, Zerg), each with its own frame style, color palette, and motion.

**Live demo:** [duane-portfolio-next.vercel.app](https://duane-portfolio-next.vercel.app)

## Features

- **Faction themes:** switch between Terran, Protoss, and Zerg from the footer. Each theme changes the frame shape, palette, button style, and entrance animation. Your choice is saved in the browser and applied before first paint, so there is no flash on reload.
- **Projects:** a browsable list with a detail view for each project: image, links (GitHub, live demo, Loom walkthrough), technologies, key features, and an optional case study.
- **Case studies:** a dialog with problem, solution, contribution, architecture diagram, and results.
- **Image lightbox:** click a project image to view it full size.
- **About, Timeline, and Contact:** skills, education, certifications, achievements, work experience, and a career timeline.
- **Contact form:** client-side validation, sends through EmailJS, and falls back to a direct email address if the service is not configured or fails.
- **Developer console:** an in-page terminal (bottom right). Type `help` to see the commands: `about`, `projects`, `skills`, `experience`, `education`, `contact`, `clear`. Supports command history with the arrow keys.
- **Accessibility:** keyboard navigation, focus restore for dialogs, Escape to close, ARIA roles and labels, and reduced-motion support.

## Tech Stack

- **Framework:** Next.js (React, App Router)
- **Styling:** Tailwind CSS v4 with CSS variables for the faction themes
- **Animation:** Framer Motion
- **Fonts:** IBM Plex Sans, IBM Plex Mono, and Chakra Petch via `next/font`
- **Contact:** EmailJS (REST API, no extra package)
- **Hosting:** Vercel

## Disclaimer

Faction themes are fan-inspired original designs. StarCraft is a trademark of Blizzard Entertainment; this project is not affiliated with or endorsed by Blizzard.
