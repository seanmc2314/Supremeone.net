# Supreme One API - Render Deployment Guide

## ✅ Your API is Ready to Deploy!

The analytics dashboard has been styled to match the Supreme One platform, and the server is configured for Render deployment.

---

## 🚀 Deployment Steps

### Step 1: Push Code to GitHub

Your code needs to be on GitHub for Render to access it.

```bash
# Add a GitHub remote (replace with your repo URL)
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

# Add and commit any changes
git add .
git commit -m "Update analytics styling and prepare for Render deployment"

# Push to GitHub
git push -u origin main
```

### Step 2: Deploy to Render

1. **Go to [render.com](https://render.com)** and sign in
2. **Click "New +" → "Web Service"**
3. **Connect your GitHub repository**
4. **Configure the service:**

   - **Name:** `supreme-one-api`
   - **Region:** Choose closest to your users
   - **Branch:** `main`
   - **Root Directory:** `api`
   - **Runtime:** Node
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Instance Type:** Free (or upgrade for better performance)

### Step 3: Set Environment Variables

In Render dashboard, add these environment variables:

| Key | Value |
|-----|-------|
| `OPENAI_API_KEY` | Your OpenAI API key from api/.env file |
| `EMAIL_PASS` | Your email password from api/.env file |
| `NODE_ENV` | `production` |
| `CALENDLY_URL` | `https://calendly.com/sarahai-supremeone/30min` |

⚠️ **Note:** PORT is automatically set by Render, so don't add it.

### Step 4: Deploy!

1. Click **"Create Web Service"**
2. Render will automatically build and deploy
3. Wait 3-5 minutes for the first deployment
4. You'll get a URL like: `https://supreme-one-api.onrender.com`

---

## ✅ Verification

Once deployed, verify it's working:

1. **Health Check:** Visit `https://supreme-one-api.onrender.com/health`
   - Should return: `{"status":"ok","service":"supreme-one-website-api"}`

2. **Analytics Dashboard:**
   - Upload `analytics.html` to your Netlify site
   - Visit it to see click tracking data

---

## 📊 What's Tracked

Your API now tracks:

- ✅ **Page Views** - Every page visit on supremeone.net
- ✅ **Visitor Stats** - Total, unique, and daily visitors
- ✅ **Chat Sessions** - Sarah AI conversations with transcripts
- ✅ **Button Clicks** - User interactions across the site
- ✅ **Contact Forms** - Lead capture with email notifications

---

## 🔄 Auto-Deploy

After initial setup, Render will automatically deploy whenever you:

1. Make changes to your code
2. Commit and push to GitHub
3. Render detects the change and redeploys

---

## 🛠️ Local Development

The PM2 process is running locally for testing:

```bash
# View status
pm2 list

# View logs
pm2 logs supremeone-api

# Restart
pm2 restart supremeone-api

# Stop
pm2 stop supremeone-api
```

---

## 📝 Next Steps

1. Deploy to Render using steps above
2. Update your Netlify site with the new `analytics.html`
3. Visit `https://supremeone.net/analytics.html` to view your dashboard
4. Monitor clicks and visitor data in real-time!

---

## 🆘 Troubleshooting

**Build fails:**
- Check that Root Directory is set to `api`
- Verify all environment variables are set correctly

**API not responding:**
- Check Render logs for errors
- Verify OPENAI_API_KEY is valid
- Check EMAIL_PASS is correct

**Analytics not showing data:**
- Verify website is pointing to correct API URL
- Check browser console for CORS errors
- Ensure Render service is running

---

**Need help?** Check Render logs or local PM2 logs for error messages.
