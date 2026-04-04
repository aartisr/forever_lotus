# Awaricon Integration Guide
## Add the Trust Badge to Your Website in 10 Minutes

---

## **What You'll Get**

After completing this guide:
- ✅ Awaricon badge displayed on your website
- ✅ Links to your public trust profile
- ✅ Start collecting trust score analytics
- ✅ Backwards-compatible with WordPress, Next.js, static sites

**Time Required:** 10 minutes  
**Technical Skill:** Beginner (copy-paste HTML)  
**Tools Needed:** Code editor or FTP access

---

## **Step 1: Get Your Awaricon Certificate Number (2 min)**

### Prerequisites
- ✅ You've completed Awaricon certification at `/awaricon/apply`
- ✅ You have your certificate ID (starts with `aw-`)
- ✅ Certification status is `approved` or higher

### Find Your ID
1. Go to: `forever-lotus.com/awaricon/status`
2. Enter your certificate ID
3. Verify you see: ✓ Organization name ✓ Badge tier ✓ Score

**Example ID:** `aw-giveirectly-2026-1847`

---

## **Step 2: Choose Your Badge Style (2 min)**

Awaricon offers 4 badge styles. Pick one:

### **Style 1: Full Badge (Recommended)**
```
[Awaricon Gold Badge Icon] Awaricon Certified
Gold — Aw 87 — Verified Presence
```
- Shows: Tier, score, what it means
- Size: 300px wide (responsive)
- Where: Header, footer, or trust section

### **Style 2: Badge + Score**
```
[Awaricon Icon] Aw 87
```
- Compact version
- Size: 80px square
- Where: Footer, sidebar, trust bar

### **Style 3: Badge Only**
```
[Awaricon Icon]
```
- Just the sigil
- Clickable → links to public profile
- Size: 60px square
- Where: Anywhere compact space needed

### **Style 4: Text Link**
```
"Awaricon Certified (Gold)" → links to profile
```
- For minimal design
- Accessible (screen reader friendly)
- Size: Fits any text

**Recommended:** Style 1 or 2 for homepage trust section

---

## **Step 3: Copy the Integration Code (3 min)**

### **For HTML Websites / Static Sites:**

```html
<!-- Place this in your <head> tag or before </body> -->
<script src="https://forever-lotus.com/awaricon/badge.js"></script>

<!-- Place this where you want the badge to appear -->
<div class="awaricon-badge" data-certificate-id="aw-YOURORGNAME-2026-XXXX" data-style="full"></div>
```

### **For WordPress Sites:**

1. Install plugin: **Awaricon Verification Badge** 
   - Go to: Plugins → Add New
   - Search: "Awaricon"
   - Install & Activate
   
2. Add to your site:
   - Go: Dashboard → Awaricon Settings
   - Paste: Your certificate ID
   - Select: Badge style
   - Choose: Display location (top of page, footer, widget area)
   - Click: Save & Publish

### **For Next.js / React:**

```tsx
import { AwaricoBadge } from '@forever-lotus/awaricon-react';

export default function HomePage() {
  return (
    <div>
      <h1>Welcome</h1>
      <AwaricoBadge 
        certificateId="aw-YOURORGNAME-2026-XXXX"
        style="full"
        position="footer"
      />
    </div>
  );
}
```

### **For Shopify Stores:**

1. Install app: **Awaricon Certified Badge**
   - From: Shopify App Store
   - Click: "Add app"
   - Authorize
   
2. Configure:
   - Settings → Awaricon Badge
   - Paste: Certificate ID
   - Choose: Badge style
   - Select: Display on product pages, checkout, header
   - Save

### **For Custom Applications (API)**

```javascript
fetch('https://forever-lotus.com/api/awaricon/certification/verify?certificateId=aw-YOURORGNAME-2026-XXXX')
  .then(res => res.json())
  .then(data => {
    console.log(data.tier);        // e.g., "gold"
    console.log(data.score);       // e.g., 87
    console.log(data.aura);        // e.g., "Solar Lotus Flame"
    // Render badge in your UI
  });
```

---

## **Step 4: Choose Badge Placement (2 min)**

Pick 1-3 locations:

### **Option A: Homepage Hero Section** (Most Visible)
- Place badge near your value prop
- Example: "Trusted by 50K+ organizations" + Awaricon badge
- Impact: Visitors see trust score immediately
- Code location: Top of homepage, after headline

### **Option B: Footer Trust Section**
- Place with other certifications (B Corp, Fair Trade, ISO, etc.)
- Example: 3-column footer with badges
- Impact: Signals maturity + peer companies
- Code location: Before `</footer>` tag

### **Option C: Product/Service Pages**
- Place near pricing or CTA button
- Example: "Choose us. We're Awaricon Certified Gold."
- Impact: Increases purchase confidence
- Code location: Above "Sign Up" / "Buy" button

### **Option D: Trust / About Page**
- Dedicated page: "Why you can trust us"
- Include: Badge + what it means + link to full scores
- Impact: Educational + credibility
- Code location: Center of page

### **Best Practice**
Use **Option A + B**: Hero section (instant trust) + Footer (peer credibility)

---

## **Step 5: Customize Badge Appearance (1 min)**

### **Change Style Attribute**

In any of the above code snippets, change `data-style`:

```html
<!-- Full badge with score and description -->
<div data-style="full"></div>

<!-- Compact: just badge + score -->
<div data-style="compact"></div>

<!-- Icon only with hover description -->
<div data-style="icon"></div>

<!-- Text link (accessible, minimal) -->
<div data-style="text"></div>
```

### **Change Sizing**

```html
<!-- Default: 300px wide (responsive) -->
<div data-width="300"></div>

<!-- Large (homepage hero) -->
<div data-width="400"></div>

<!-- Small (sidebar, footer) -->
<div data-width="150"></div>

<!-- Custom CSS -->
<style>
  .awaricon-badge { transform: scale(1.2); }
</style>
```

### **Change Color Theme** (coming soon)

```html
<!-- Default: Tier colors (gold, platinum, etc.) -->
<div data-theme="tierColor"></div>

<!-- Monochrome: works on any background -->
<div data-theme="monochrome"></div>

<!-- High contrast (accessibility) -->
<div data-theme="highContrast"></div>
```

---

## **Step 6: Test & Verify (1 min)**

### **Test Locally:**
```bash
# If you're using Next.js or React dev server
npm run dev
# Visit localhost:3000 (or your dev port)
# You should see the Awaricon badge rendering
```

### **Test Live:**
1. Deploy code to production
2. Visit your live website
3. Look for badge in chosen location
4. **Click on badge** → Should see your public Awaricon profile

### **Verify the Link Works:**
```
Expected URL: forever-lotus.com/awaricon/status?id=aw-YOURORGNAME-2026-XXXX
Shows: Your organization name, score, tier, verification date
```

---

## **Step 7: Monitor Performance (1 min)**

### **Track These Metrics**

**In your analytics tool (Google Analytics, Plausible, Mixpanel):**

Goal: Track click-through rate from badge

```javascript
// Add event tracking to badge click
ga.event({
  action: 'awaricon_badge_click',
  category: 'trust_signals',
  label: 'aw-YOURORGNAME-2026-XXXX'
});
```

### **What to Measure**

- **Badge Views:** How many visitors see the badge
- **Badge Clicks:** How many visit your Awaricon profile
- **CTR:** Click-through rate (clicks ÷ views)
- **Conversion Impact:** Did badge viewers convert more than others?

**Benchmark:**
- Average badge CTR: 2-5%
- High-performing (Platinum): 8-12%
- Strong conversion lift: 1.5-2x for badge viewers

---

## **Troubleshooting**

### **Badge Not Showing?**

**Issue:** Nothing appears where badge should be

**Fix 1:** Check certificate ID format
```
✗ Wrong: "giveirectly-2026-1847"
✓ Correct: "aw-giveirectly-2026-1847"
```

**Fix 2:** Verify your status is approved
- Go to: forever-lotus.com/awaricon/status
- Paste your ID
- Check: Status = "approved"

**Fix 3:** Clear browser cache
```bash
# Hard refresh in browser
Cmd+Shift+R (Mac) or Ctrl+Shift+R (Windows)
```

### **Badge Showing But Clickable?**

**Fix 1:** Verify JavaScript is loading
```html
<!-- Add this to debug -->
<script>
  if (window.AwaricoBadge) {
    console.log("Awaricon script loaded ✓");
  } else {
    console.log("Awaricon script NOT loaded ✗");
  }
</script>
```

**Fix 2:** Check for CSS conflicts
```html
<!-- Add z-index if badge is behind other elements -->
<style>
  .awaricon-badge { z-index: 100; }
</style>
```

### **Certificate Not Found / 404?**

**Fix:** Make sure you used the full certificate ID format
```
Format: aw-[orgname]-2026-[random]
Example: aw-giveirectly-2026-1847
```

---

## **Next Steps**

### **Once Badge is Live:**

1. **Share on social media:**
   - LinkedIn: "We're now Awaricon Certified Gold!"
   - Twitter: Link to badge + trust profile
   - Email: Send to stakeholders

2. **Add to email signature:**
   - Include Awaricon badge image in footer
   - Link to public profile

3. **Monitor performance:**
   - Set up analytics tracking
   - Review weekly: badge clicks, CTR, conversion impact

4. **Improve your score:**
   - Check your Awaricon dashboard
   - See what factors drive score (Phi, Df, Omega, Integrity)
   - Plan improvements for next review cycle

---

## **Support**

**Questions?**
- Docs: docs.forever-lotus.com/awaricon
- Email: hello@forever-lotus.com
- Status Page: forever-lotus.com/awaricon/status
- GitHub Issues: github.com/aartisr/forever_lotus/issues

**Report a Bug:**
- Go to: GitHub Issues
- Include: certificate ID, screenshot, browser/platform
- We'll respond within 24 hours

---

## **Advanced Options** (Optional)

### **Custom Badge Colors**

Coming in v2.0:
```html
<!-- Use your brand colors -->
<div data-primaryColor="#your-color"></div>
```

### **Translation Support**

Coming in v2.0:
```html
<!-- Display badge in different languages -->
<div data-language="es"></div>  <!-- Spanish -->
<div data-language="fr"></div>  <!-- French -->
<div data-language="ja"></div>  <!-- Japanese -->
```

### **Analytics Dashboard**

Already available:
- Log in: dashboard.forever-lotus.com
- See: Real-time badge views, clicks, conversions
- Export: Weekly CSV reports

---

**Congratulations! Your website now displays proof of presence. 🌸🏆**

*Awaricon: Verified. Trusted. Forever.*
