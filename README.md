# CyberGuard — Cybersecurity for Everyone

A modern UI **fullstack** app (Node.js + Tailwind + Gemini API) that displays **social media safety highlights** and provides a **Gemini-powered chatbot** for cybersecurity help.

## ✨ Features
- 🌐 Highlights grid for popular platforms (Instagram, WhatsApp, Telegram, Facebook, X, YouTube)
- 🤖 Chatbot backed by **Google Gemini** for quick, actionable guidance
- 🔒 Secure server defaults with `helmet`
- ⚡ Tailwind via CDN (no build step), modern glassmorphism UI
- 🧩 Clean, hackathon-ready codebase

## 📦 Tech Stack
- Node.js + Express
- Tailwind CSS (CDN)
- @google/generative-ai (Gemini)
- Helmet, dotenv

## 🚀 Quick Start
```bash
# 1) Extract and install
npm install

# 2) Create .env
cp .env.example .env
# Edit .env and paste your key

# 3) Run
npm run dev
# open http://localhost:3000
```

## 🔑 Environment
Create a `.env` file:
```
GEMINI_API_KEY=your_api_key_here
PORT=3000
```

Get a Gemini API key: https://ai.google.dev

## 📁 Structure
```
cyberguard/
  public/
    data/highlights.json
    index.html
    script.js
  server.js
  package.json
  .env.example
  README.md
```

## 🛡️ Notes
- The chatbot returns **concise, safe advice** for students, teachers, rural users, and admins.
- Do **not** commit `.env` to version control.
- For production, consider adding rate-limiting and request validation.
