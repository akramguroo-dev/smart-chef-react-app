Here’s the updated `README.md` reflecting the **GPT-OSS 120B migration** and removing the outdated Llama 3.3 references:

````markdown
# Smart Chef 🍳

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://smart-chef-react-app.vercel.app)
[![Backend on Render](https://img.shields.io/badge/Backend-Render-46E3B7?style=for-the-badge&logo=render)](https://smart-chef-backend.onrender.com)

An AI-powered recipe generator that suggests recipes based on available ingredients.

## 🔗 Live Demo

- **Frontend**: https://smart-chef-react-app.vercel.app
- **Backend API**: https://smart-chef-backend.onrender.com

## 🚀 Features

- Input ingredients and get AI-generated recipes
- Fast response times using Groq infrastructure
- Clean, user-friendly interface
- Powered by OpenAI's GPT-OSS 120B model via Groq API
- Concise, beginner-friendly recipe generation
- Markdown-formatted recipes with ingredients and step-by-step instructions

## 🛠️ Tech Stack

- **Frontend**: React, Vite
- **Backend**: Node.js, Express
- **AI**: OpenAI GPT-OSS 120B via Groq API
- **API**: Groq OpenAI-compatible Chat Completions API

## 📦 Setup

### Backend

1. Navigate to the root directory.
2. Install dependencies:

```bash
npm install
````

3. Create a `.env` file with your Groq API key:

```env
GROQ_API_KEY=your_key_here
PORT=5000
```

4. Start the server:

```bash
node server.js
```

### Frontend

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm run dev
```

## 🌐 Deployment

* **Frontend**: Deployed on Vercel
* **Backend**: Deployed on Render
* **AI Inference**: Powered by Groq

## 🤖 AI Model

Smart Chef uses **OpenAI GPT-OSS 120B** through Groq's inference platform.

The model receives the user's available ingredients and generates a concise recipe containing:

1. Recipe name
2. Required ingredients
3. Simple step-by-step instructions

The backend communicates with Groq using its OpenAI-compatible Chat Completions API.

## 🔑 Environment Variables

The backend requires the following environment variables:

| Variable       | Description                     |
| -------------- | ------------------------------- |
| `GROQ_API_KEY` | Your Groq API key               |
| `PORT`         | Port used by the Express server |

> **Note:** Never commit your `.env` file or expose your Groq API key in the frontend.

## 📝 Note

Get your Groq API key from the [Groq Console](https://console.groq.com/).

---

Made with ❤️ by Akram Guroo

```
```
