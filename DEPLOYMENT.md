# Dictionary App - Vercel Deployment Guide

## 🚀 Deploying to Vercel

This dictionary app is now configured for seamless deployment on Vercel.

### Prerequisites

1. A [Vercel account](https://vercel.com/signup)
2. A [Gemini API key](https://makersuite.google.com/app/apikey)

### Deployment Steps

#### Option 1: Deploy via Vercel Dashboard (Recommended)

1. **Push your code to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```

2. **Import to Vercel**
   - Go to [vercel.com/new](https://vercel.com/new)
   - Click "Import Project"
   - Select your GitHub repository
   - Vercel will auto-detect Vite framework settings

3. **Configure Environment Variables**
   - In the deployment settings, add the following environment variable:
     - **Name:** `VITE_GEMINI_API_KEY`
     - **Value:** Your Gemini API key
   - Click "Deploy"

4. **Done!** Your app will be live at `https://your-project-name.vercel.app`

#### Option 2: Deploy via Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   vercel
   ```

4. **Add Environment Variable**
   ```bash
   vercel env add VITE_GEMINI_API_KEY
   ```
   - Select "Production" scope
   - Paste your Gemini API key when prompted

5. **Redeploy with environment variables**
   ```bash
   vercel --prod
   ```

### Important Notes

- ⚠️ **Never commit your `.env` file** - It's already in `.gitignore`
- 🔑 **Always set environment variables in Vercel dashboard** before deployment
- 🔄 **Automatic deployments** - Vercel will automatically redeploy when you push to main branch
- 🌐 **Custom domain** - You can add a custom domain in Project Settings → Domains

### Build Configuration

The project is configured with:
- **Framework Preset:** Vite
- **Build Command:** `npm run build` (automatic)
- **Output Directory:** `dist` (automatic)
- **Install Command:** `npm install` (automatic)

### Vercel Configuration

The `vercel.json` file ensures proper client-side routing for the React SPA.

### Local Testing

To test the production build locally:

```bash
npm run build
npm run preview
```

This will build your app and serve it locally, simulating the production environment.

---

**Need help?** Check out the [Vercel Documentation](https://vercel.com/docs) or [Vite Documentation](https://vitejs.dev/guide/).
