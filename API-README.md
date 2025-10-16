# Supreme One Website - AI Chatbot API

## Overview

This is the backend API server that powers Sarah AI - the intelligent sales and marketing chatbot for the Supreme One website.

## Features

✅ **Real AI Integration** - Uses OpenAI GPT-4 with Supreme One knowledge base
✅ **Passionate Consulting Brain** - Full F&I and Passionate Consulting methodology
✅ **Email Notifications** - All chat transcripts sent to sarahai@supremeone.net
✅ **Lead Capture** - Automatically captures and emails contact information
✅ **Calendly Integration** - Seamless appointment scheduling
✅ **Visitor Tracking** - Tracks website visitors and analytics
✅ **Sales Capabilities** - AI-powered lead qualification and closing

## Architecture

```
Frontend (sarah-ai.js) → Backend API (server.js) → OpenAI GPT-4
                                ↓
                        Email (nodemailer) → sarahai@supremeone.net
```

## How It Works

### 1. Chat Flow
1. User opens chat widget on website
2. User sends message
3. Frontend sends to `/api/chat`
4. Backend calls OpenAI with Sarah AI system prompt
5. AI response returned to user
6. Conversation stored in memory

### 2. Transcript Emails
- When chat window closes, backend sends full transcript to sarahai@supremeone.net
- Includes: Session ID, duration, message count, user info (if captured)
- Formatted as HTML email with all messages

### 3. Lead Capture
- When user provides contact info, immediately emails to sarahai@supremeone.net
- Separate notification from transcript
- Subject: "🎯 New Lead: [Name]"

### 4. Visitor Tracking
- Tracks all website visitors with unique IDs
- Stores total visitors, unique visitors, daily stats
- Persistent across page loads

## Running the Server

### Start Backend API:
```bash
cd api
npm start
```

Server runs on: `http://localhost:3031`

### Start Website Server:
```bash
python3 -m http.server 2000
```

Website runs on: `http://localhost:2000`

## API Endpoints

### POST /api/chat
Send a chat message and get AI response
```json
{
  "message": "What features does Supreme One have?",
  "sessionId": "session_123",
  "userInfo": {}
}
```

### POST /api/chat/end
End chat session and send transcript email
```json
{
  "sessionId": "session_123"
}
```

### POST /api/contact/capture
Capture lead contact information
```json
{
  "sessionId": "session_123",
  "contactInfo": {
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "(555) 123-4567",
    "dealership": "ABC Motors"
  }
}
```

### GET /api/calendly/availability
Get Calendly scheduling URL
```json
{
  "calendlyUrl": "https://calendly.com/sarahai-supremeone/30min"
}
```

### POST /api/visitor/track
Track website visitor
```json
{
  "visitorId": "visitor_123",
  "page": "/platform.html"
}
```

### GET /api/visitor/stats
Get visitor statistics
```json
{
  "totalVisitors": 1250,
  "uniqueVisitors": 450,
  "todayTotal": 75,
  "todayUnique": 32
}
```

## Environment Variables

Located in `api/.env`:

```env
OPENAI_API_KEY=sk-proj-... (from supreme-one-platform)
EMAIL_PASS=SupremeOne2025$
PORT=3031
NODE_ENV=production
CALENDLY_URL=https://calendly.com/sarahai-supremeone/30min
```

## Sarah AI Knowledge Base

The AI is trained on:

### 1. Passionate Consulting Methodology
- Core principles from Sean McNally's book
- Consulting vs. Selling approach
- Empathy framework
- Discovery process
- Change management

### 2. Supreme One Platform Features
- Sarah AI Coach (personalized coaching)
- Live Deal Analysis (5-category grading)
- Interactive Roleplay Training
- CFPB Compliance Monitoring
- Performance Dashboard

### 3. Supreme One Academy
- Video courses
- Certification programs
- Proctored exams

### 4. Sales & Marketing
- Lead qualification
- Objection handling
- Closing techniques
- Calendly booking

## Email Notifications

### Chat Transcript Email
**To:** sarahai@supremeone.net
**Subject:** Website Chat Transcript - [SessionID]
**Contains:**
- Session ID
- Chat duration
- Message count
- User contact info (if provided)
- Full conversation transcript

### Lead Capture Email
**To:** sarahai@supremeone.net
**Subject:** 🎯 New Lead: [Name]
**Contains:**
- Name, Email, Phone
- Dealership, Role
- Interest level
- Session ID for reference

## Visitor Tracking

Stored in `api/visitors.json`:
```json
{
  "total": 1250,
  "unique": ["visitor_1", "visitor_2", ...],
  "daily": {
    "2025-01-15": {
      "total": 75,
      "unique": ["visitor_1", ...]
    }
  }
}
```

## Testing

### Test Chat:
1. Open http://localhost:2000
2. Click chat widget
3. Type: "What is Supreme One?"
4. Check email: sarahai@supremeone.net
5. Close chat window
6. Verify transcript email received

### Test Lead Capture:
1. In chat, type: "I'd like a demo"
2. Sarah AI will request contact info
3. Provide name, email, phone
4. Check email for lead notification

### Test Calendly:
1. In chat, type: "I want to schedule"
2. Sarah AI provides Calendly link
3. Click to book appointment

## Troubleshooting

### Chat not responding?
- Check backend is running: `curl http://localhost:3031/health`
- Check browser console for errors
- Verify OpenAI API key in `.env`

### Emails not sending?
- Check email password in `.env`
- Verify SMTP settings (Office 365)
- Check spam folder

### Visitor tracking not working?
- Check `visitors.json` file permissions
- Verify localStorage in browser

## Production Deployment

When deploying to production:

1. Update API URL in `sarah-ai.js`:
   ```javascript
   this.apiUrl = 'https://your-domain.com/api';
   ```

2. Set environment to production:
   ```env
   NODE_ENV=production
   ```

3. Use process manager (PM2):
   ```bash
   npm install -g pm2
   pm2 start server.js --name supreme-one-api
   pm2 save
   pm2 startup
   ```

4. Set up SSL/HTTPS
5. Configure CORS for your domain
6. Set up domain DNS

## Support

For issues or questions:
- Email: sarahai@supremeone.net
- Phone: (864) 402-9723

---

Built with ❤️ for Supreme One - Igniting Passion, Inspiring Performance
