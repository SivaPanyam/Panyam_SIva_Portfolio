# Portfolio Website Design Spec

## Overview
A world-class, futuristic, cinematic AI-engineer portfolio website for "Siva Panyam" (sivapanyam.dev). The site features a monochrome aesthetic, a persistent 3D floating AI assistant ("Jarvis"), and a global command-line terminal overlay inspired by Claude Code.

## Architecture & Layout
- **Boot Sequence:** A premium cinematic AI initialization sequence that transitions seamlessly into the homepage.
- **Hero Section:** Full-screen immersive 3D canvas featuring neural architecture visuals and Jarvis. Contains primary CTA (View Projects) and secondary CTA (Talk to Jarvis).
- **Navigation:** Floating dock navbar.
- **Terminal UI:** A global modal overlay summoned via `Cmd+K` or `~`, offering a developer console experience to view projects, skills, and resume.
- **Scroll Content:** Below the hero, structured sections for Featured Projects, Experimental/Hackathon Lab, Skills, Certifications, Blog, and Contact. Each project opens in a premium modal with architecture overviews and tech stacks.

## Tech Stack
- **Frontend:** React + Vite, Tailwind CSS, Framer Motion (UI transitions), Three.js (3D elements/Jarvis), GSAP (cinematic scrolling).
- **Backend:** Node.js + Express.
- **AI Integration:** Real LLM integration via the backend, providing dynamic, context-aware responses to user queries.

## Data Flow
- **AI/Terminal Requests:** Frontend captures terminal commands or chat messages and sends them to the Node.js backend.
- **LLM Processing:** The backend injects Siva's portfolio data (resume, skills, projects) into a system prompt and forwards the request to the LLM API (OpenAI/Gemini).
- **Response:** The LLM's response is streamed or returned to the frontend and displayed in the terminal or assistant UI.

## Features & Easter Eggs
- **Command Palette:** Global quick actions.
- **Dev/Matrix Mode:** A visual theme override that transforms the site into a hacker/Matrix aesthetic.
- **Responsive:** Fully optimized for desktop, tablet, and mobile.
- **Performance & SEO:** PWA support, lazy loading, and semantic HTML for accessibility.

## Error Handling & Testing
- **AI Fallbacks:** If the LLM API is unavailable, the backend serves predefined, graceful fallback responses.
- **Form Validation:** Client-side and server-side validation for the contact form.
- **Unit Testing:** Critical API routes and UI utility functions will be tested using a standard testing framework (e.g., Vitest/Jest).

## Scope
This spec focuses on the core application setup, frontend UI structure, 3D integration, and backend API for the AI assistant. Deployment is out of scope for this immediate specification but the code will be deployment-ready.