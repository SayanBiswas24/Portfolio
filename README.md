<div align="center">

# Sayan Biswas — Developer Portfolio

**An editorial, technical, and minimal personal portfolio built with React, TypeScript, Tailwind CSS, and Three.js.**

[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Three.js](https://img.shields.io/badge/Three.js-WebGL-black?style=flat-square&logo=three.js&logoColor=white)](https://threejs.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-005A36?style=flat-square)](LICENSE)

[Live Demo](https://github.com/SayanBiswas24/Portfolio) • [Report Issue](https://github.com/SayanBiswas24/Portfolio/issues) • [Get In Touch](mailto:sayan24982@gmail.com)

</div>

---

## ✦ Overview

This repository contains the source code for the personal developer portfolio of **Sayan Biswas**, a Flutter and Full-Stack Developer. Designed with an editorial aesthetic influenced by print monographs and high-end technical architecture documentation, the website emphasizes clarity, craftsmanship, fluid motion, and performance.

### ✨ Key Features

- **Interactive 3D Hero System Graph**: Built with Three.js and `@react-three/fiber`, featuring interactive floating network nodes that track mouse movement in 3D space with velocity damping.
- **Editorial Design Language**: Clean serif headings (`Playfair Display`), crisp sans body text (`Inter`), and monospace engineering indicators (`JetBrains Mono`).
- **Refined Dual-Theme System**:
  - **Light Mode**: Warm ivory canvas (`#F5F3EE`) with deep forest green accents (`#005A36`) and clean white cards.
  - **Dark Mode**: Subtle charcoal gray background (`#151815`) with vibrant emerald accents (`#00A865`), elevated dark surfaces (`#1D211D`), and balanced contrast to eliminate eye fatigue.
- **Interactive Project Showcase**:
  - Mockup device frames (smartphones and CAD widescreen viewports).
  - Built-in full-screen screenshot lightbox modal with keyboard navigation (Arrow keys + Escape).
- **Smooth GSAP Transitions**: Fluid reveal animations, micro-interactions, and 3D perspective hover tilts.
- **Accessible & Responsive**: Fully responsive across mobile, tablet, and widescreen viewports with reduced-motion support.

---

## 🛠️ Tech Stack

| Domain | Technologies |
| :--- | :--- |
| **Framework & Core** | [React 19](https://react.dev/), [TypeScript](https://www.typescriptlang.org/), [Vite 8](https://vitejs.dev/) |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) (using CSS variables & design tokens) |
| **3D & Graphics** | [Three.js](https://threejs.org/), [@react-three/fiber](https://docs.pmnd.rs/react-three-fiber), [@react-three/drei](https://github.com/pmndrs/drei) |
| **Animation** | [GSAP](https://greensock.com/gsap/) with ScrollTrigger |
| **Icons** | [Lucide React](https://lucide.dev/) |
| **Code Quality** | [Oxlint](https://oxc.rs/) |

---

## 📂 Project Structure

```bash
portfolio/
├── public/                 # Static assets, project screenshots & CAD visuals
│   ├── favicon.svg
│   └── images/
│       └── projects/       # High-res mobile mockups & game scene captures
├── src/
│   ├── components/         # Reusable UI elements
│   │   ├── Button/         # Editorial buttons with micro-interactions
│   │   ├── CustomCursor/   # Fluid custom desktop cursor
│   │   ├── Footer/         # Monospace technical footer
│   │   ├── Navigation/     # Sticky blurred header with quick jump links
│   │   ├── ProjectCard/    # 3D tilt project card with modal lightbox
│   │   └── ThemeToggle/    # Smooth Sun/Moon theme switcher
│   ├── context/
│   │   └── ThemeContext.tsx# Light/Dark mode state & meta theme-color sync
│   ├── data/               # Structured content & metadata
│   │   ├── credentials.ts  # Hackathons, recognition & awards
│   │   ├── experience.ts   # Work trajectory & academic background
│   │   ├── personal.ts     # Bio, contact, & social profiles
│   │   ├── projects.ts     # Project details, tags & screenshot galleries
│   │   └── skills.ts       # Categorized technical skillsets
│   ├── sections/           # Main page sections
│   │   ├── Hero/           # 3D interactive hero network
│   │   ├── About/          # Bio, principles & core competencies
│   │   ├── Skills/         # Multi-column technology matrix
│   │   ├── Projects/       # Selected works & interactive phone showcases
│   │   ├── Experience/     # Professional internship & academic foundation
│   │   ├── Credentials/    # Hackathon finalist achievements
│   │   └── Contact/        # Communication channels & links
│   ├── three/              # Three.js / WebGL canvas components
│   │   └── HeroNetwork/    # Network graph, physics, and shader materials
│   ├── App.tsx             # Root layout with architectural grid lines
│   ├── index.css           # Design tokens, fonts, and dark mode palette
│   └── main.tsx            # React application entry point
├── index.html              # HTML shell with Google Fonts & SEO metadata
├── package.json            # Dependencies and scripts
├── tsconfig.json           # TypeScript configuration
└── vite.config.ts          # Vite configuration with Tailwind plugin
```

---

## 🚀 Getting Started

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) (version 18 or later) and `npm` installed.

### Installation

1. Clone the repository:
   ```bash
   git clone git@github.com:SayanBiswas24/Portfolio.git
   cd Portfolio
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the local development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to:
   ```
   http://localhost:5173/
   ```

### Production Build

To validate TypeScript types and build the production bundle:

```bash
npm run build
```

To preview the built production site locally:

```bash
npm run preview
```

---

## 🎨 Design Philosophy

- **Editorial Hierarchy**: Inspired by Swiss typography, architectural portfolios, and editorial monographs.
- **Intentional Contrast**: Avoids harsh pitch-black backgrounds; uses tailored charcoal (`#151815`) in dark mode and warm natural ivory (`#F5F3EE`) in light mode.
- **Subtle Curvature**: Cards utilize balanced `rounded-xl` and `rounded-lg` borders to strike a clean balance between sharp technical precision and soft modern aesthetics.
- **Physical Feedback**: Tactile hover elevations, subtle glows, and custom spring-damped interactions.

---

## 📬 Contact & Links

- **Author**: Sayan Biswas
- **Email**: [sayan24982@gmail.com](mailto:sayan24982@gmail.com)
- **LinkedIn**: [sayan-biswas](https://www.linkedin.com/in/sayan-biswas-2b8313327)
- **GitHub**: [@SayanBiswas24](https://github.com/SayanBiswas24)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
