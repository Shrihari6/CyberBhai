
import { exec } from 'child_process';
import express from 'express';
import helmet from 'helmet';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenerativeAI } from '@google/generative-ai';
//const express = require("express");

//const { exec } = require("child_process");
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(
    helmet({
        contentSecurityPolicy: false,
    })  
)

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));


// Nmap scan endpoint

app.get("/scan/:ip", (req, res) => {
    const ip = req.params.ip;


    // Run nmap with -sV
    const cmd = `nmap -sV ${ip}`;
    console.log(`Executing command: ${cmd}`);
    
    exec(`nmap -sV ${ip}`, (error, stdout, stderr) => {
        if (error) {
            return res.json({ error: stderr || error.message });
        }
       // res.json({ result: stdout });
    
    let trimmed = stdout.split("if you know the service")[0].trim();
    
    res.json({ result: trimmed });
    });
});


//Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ ok: true });
});   


// Gemini Chat Endpoint
app.post('/api/chat', async (req, res) => {
    try {
        const { message, context } = req.body || {};
        if (!process.env.GEMINI_API_KEY) {
            return res.status(500).json({ error: 'Missing GEMINI_API_KEY. See README.md to configure.' });
        }
        if (!message || typeof message !== 'string') {
            return res.status(400).json({ error: 'message is required' });
        }

        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        // You can switch to a different model if desired (e.g., 'gemini-1.5-pro')
        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

        const prompt = `You are a friendly cybersecurity assistant for everyone (students, teachers, rural users, sysadmins).
Provide concise, actionable, non-technical-by-default answers. If advice targets admins, mark it [Admin].
User message: ${message}
Optional context: ${context || ''}`;

        const result = await model.generateContent(prompt);
        const text = result.response.text();
        res.json({ reply: text });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Chat error', details: String(err) });
    }
});


// Fallback to index.html (SPA-like)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`🚀 CyberGuard listening on http://localhost:${PORT}`)  
    });






/*
// Serve static files (HTML, CSS, JS)
app.use(express.static("app"));

// Nmap scan route
app.get("/scan/:ip", (req, res) => {
    const ip = req.params.ip;

    // Run nmap with -sV
    exec(`nmap -sV ${ip}`, (error, stdout, stderr) => {
        if (error) {
            return res.json({ error: stderr || error.message });
        }
        res.json({ result: stdout });
    });
});


const app = express();
app.use(helmet({
  contentSecurityPolicy: false
}));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Health
app.get('/api/health', (req, res) => res.json({ ok: true }));

// Gemini Chat Endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { message, context } = req.body || {};
    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({ error: 'Missing GEMINI_API_KEY. See README.md to configure.' });
    }
    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'message is required' });
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    // You can switch to a different model if desired (e.g., 'gemini-1.5-pro')
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const prompt = `You are a friendly cybersecurity assistant for everyone (students, teachers, rural users, sysadmins).
Provide concise, actionable, non-technical-by-default answers. If advice targets admins, mark it [Admin].
User message: ${message}
Optional context: ${context || ''}`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();
    res.json({ reply: text });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Chat error', details: String(err) });
  }
});

// Fallback to index.html (SPA-like)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 CyberGuard listening on http://localhost:${PORT}`);
});


*/