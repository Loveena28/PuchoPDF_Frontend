# PuchoPDF — Frontend

A modern, dark-themed Angular application that lets users upload PDF documents and ask questions in natural language — powered by RAG and Google Gemini AI.

## 🚀 Live Demo
**App:** https://pucho-pdf-frontend.vercel.app/
**Backend API:** https://pushpdf-backend.onrender.com

> ⚠️ Backend is hosted on Render free tier — first request may take 30-60 seconds to wake up.

---

## ✨ Features

- 📄 **Drag & Drop PDF Upload** — simply drag your PDF or browse to select
- 🤖 **AI-Powered Q&A** — ask questions in natural language
- 📍 **Source Citations** — every answer shows which page it came from
- 💬 **Chat Interface** — ask multiple questions in a conversation
- ⚡ **Suggestion Chips** — quick starter questions to get going

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| **Angular 17** | Frontend framework |
| **TypeScript** | Type-safe JavaScript |
| **RxJS** | Async API calls |
| **CSS3** | Light theme styling |
| **Vercel** | Static site hosting |

---

## 📁 Project Structure

```
src/app/
├── components/
│   ├── upload/             # PDF upload with drag & drop
│   └── chat/               # Chat interface with message bubbles
├── services/
│   └── api.service.ts      # HTTP calls to FastAPI backend
├── models/
│   └── document.model.ts   # TypeScript interfaces
├── app.component.ts        # Root component — controls upload/chat flow
└── app.config.ts           # Angular providers
```

---

## 🎯 How It Works

```
1. User lands on upload screen
         ↓
2. Drags PDF or clicks Choose File
         ↓
3. PDF sent to FastAPI backend
         ↓
4. Backend processes document (OCR + embeddings)
         ↓
5. Chat screen appears
         ↓
6. User types a question
         ↓
7. Question sent to backend RAG pipeline
         ↓
8. Answer returned with source page numbers
         ↓
9. User asks more questions or uploads new document
```

---

## ⚙️ Run Locally

### Prerequisites
- Node.js 18+
- Angular CLI
- Backend running locally or on Render

### Setup

```bash
# Clone the repo
git clone https://github.com/Loveena28/PuchoPDF_Frontend.git
cd PuchoPDF_Frontend

# Install dependencies
npm install

# Update API URL in src/app/services/api.service.ts
# Change baseUrl to your backend URL

# Run the app
ng serve
```

Open http://localhost:4200

---

## 🔧 Configuration

Update the backend URL in `src/app/services/api.service.ts`:

```typescript
// For local development
private baseUrl = 'http://localhost:8000/api';

// For production
private baseUrl = 'https://pushpdf-backend.onrender.com';
```

---

## 🌐 Deployment

Deployed on **Vercel** as a static site:
- **Build Command:** `ng build --configuration production`
- **Output Directory:** `dist/PuchoPDF_Frontend/browser`
- **Auto-deploys** on every push to main branch

---

## 🔗 Related

- [Backend Repository](https://github.com/Loveena28/PushPDF_Backend)
- [API Documentation](https://pushpdf-backend.onrender.com/docs)

---

## 👩‍💻 Author

**Loveena Ramchandani**  
Python Developer | Backend Engineer  
[LinkedIn](https://linkedin.com/in/loveenaramchandani) · [GitHub](https://github.com/Loveena28)
