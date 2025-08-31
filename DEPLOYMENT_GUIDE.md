# 🚀 Deployment Guide: Vercel + Custom Domain

## Step 1: Deploy to Vercel (2 minutes)

### Option A: GitHub Integration (Recommended)
1. Go to [vercel.com](https://vercel.com)
2. Sign up/Login with GitHub
3. Click "Import Project"
4. Connect your GitHub repo: `akshay-modern-portfolio`
5. Configure:
   - **Framework**: Next.js
   - **Root Directory**: `./` (leave default)
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next` (auto-detected)
6. Click "Deploy" ✨

### Option B: CLI Deployment
```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy from project directory
vercel

# Follow prompts:
# - Link to existing project? N
# - What's your project's name? akshay-modern-portfolio
# - In which directory is your code located? ./
# - Override settings? N
```

## Step 2: Custom Domain Setup (5 minutes)

### Choose & Purchase Domain
**Top Recommendations**:
- `akshay.ai` 🔥 (Perfect for AI focus - ~$15/year)
- `akshaynaidu.dev` (~$12/year)
- `akshay.codes` (~$10/year)

**Where to buy**:
- Namecheap.com (cheapest)
- Porkbun.com (privacy-focused)
- Google Domains (reliable)

### Connect Domain to Vercel
1. In Vercel Dashboard → Your Project → Settings → Domains
2. Add your custom domain
3. Vercel will show DNS records to add
4. Go to your domain registrar and add these records:
   - **Type**: CNAME
   - **Name**: `www` (or `@` for root)
   - **Value**: `cname.vercel-dns.com`
5. Wait 5-15 minutes for DNS propagation
6. Enable SSL (Vercel does this automatically)

## Step 3: Final Configuration

### Environment Variables (Optional)
If you want to use real Google Analytics:
```bash
# In Vercel Dashboard → Project Settings → Environment Variables
GA_MEASUREMENT_ID = "G-XXXXXXXXXX"  # Your GA4 ID
```

### Custom Domain Redirect
Set up `www` to redirect to root domain:
- Add both `yoursite.com` and `www.yoursite.com`
- Vercel handles the redirect automatically

## Step 4: Verify Everything Works

✅ **Test these URLs**:
- `https://yoursite.com` (your custom domain)
- `https://yoursite.com/projects`
- `https://yoursite.com/projects/rml-architecture`

✅ **Test mobile responsiveness**
✅ **Test AI chatbot functionality**
✅ **Test theme switching**
✅ **Check all links work**

## 🎯 Pro Tips

### Performance Optimization
- Vercel automatically optimizes images and bundles
- Enable "Analytics" in Vercel for performance insights
- Set up monitoring alerts for downtime

### SEO & Analytics
- Google Search Console: Add your property
- Bing Webmaster Tools: Submit sitemap
- Monitor Google Analytics for visitor behavior

### Custom Domain Benefits
- **Credibility**: Looks professional to recruiters
- **Branding**: Matches your personal brand
- **SEO**: Better search rankings
- **Trust**: No more "vercel.app" in URL

---

## 🚀 Your Portfolio is Live!

**Default Vercel URL**: `https://akshay-modern-portfolio.vercel.app`
**Custom Domain**: `https://akshay.ai` (after setup)

**Share everywhere**:
- LinkedIn posts
- Twitter announcements
- GitHub README
- Email signatures
- Business cards

---

## 🔧 Troubleshooting

**Build fails?**
- Check `npm run build` locally first
- Ensure all dependencies are in package.json
- Check for TypeScript errors

**Domain not working?**
- Wait 15-30 minutes for DNS propagation
- Check DNS records are correct
- Clear DNS cache: `sudo dscacheutil -flushcache` (macOS)

**Need help?**
- Vercel Docs: https://vercel.com/docs
- Next.js Deployment: https://nextjs.org/docs/deployment

---

**🎉 Your award-winning portfolio is now live and ready to impress recruiters!**</content>
</xai:function_call">Wrote contents to /Users/lite/akshay-modern-portfolio/DEPLOYMENT_GUIDE.md
