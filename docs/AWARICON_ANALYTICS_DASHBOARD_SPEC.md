# Awaricon Analytics Dashboard Spec
## Real-Time Tracking & Weekly Review Framework

---

## **Purpose**

This dashboard provides real-time visibility into:
- Certification funnel health (applications → approvals)
- Trust score distribution across tiers
- Adoption velocity + viral growth signals
- Strategic decision data for go-to-market adjustments

**Access:** `dashboard.forever-lotus.com` (admin-only)  
**Update Frequency:** Real-time events + daily aggregation  
**Review Cadence:** Weekly (Mondays) + monthly strategic review

---

## **Section 1: Acquisition Funnel** (Top of Dashboard)

### **KPI Cards (Large, Immediately Visible)**

```
┌─────────────────────────┬──────────────────────────┬──────────────────────┐
│ Applications This Week  │ Under Review             │ Approvals This Week  │
│         +24            │       -3 from last week  │       +18  (75%)     │
│ 💡 1.2x vs. last week  │ Avg: 62 hours           │ 💡 Conversion rate   │
└─────────────────────────┴──────────────────────────┴──────────────────────┘
```

### **Funnel Visualization (Waterfall Chart)**

```
Applications Submitted (Week)           [████████] 24
    ├─ Auto-rejected (missing fields)   [██] 2           (8%)
    ├─ Under Review                     [██████] 14      (58%)
    ├─ Approved to Tier                 [███████] 18     (75%)
    │   ├─ Platinum                     [██] 3
    │   ├─ Gold                         [████] 8
    │   ├─ Silver                       [███] 5
    │   └─ Bronze                       [██] 2
    └─ Rejected                         [█] 1            (4%)
```

**Metrics Tracked:**
- Total applications received (WoW growth)
- Drop-off rate at each stage
- Average time in each stage (target: <48 hours "under review")
- Conversion rate by tier
- Rejection rate + top rejection reasons

---

## **Section 2: Tier Distribution** (Pie Chart + Table)

### **Current Tier Breakdown (Pie Chart)**

```
Awaricon Certified Organizations: 247 total

Platinum  25 (10%)  [████]
Gold      89 (36%)  [████████████████]
Silver   102 (41%)  [████████████████████]
Bronze    31 (13%)  [██████]
```

### **Tier Details Table**

| Tier | Count | Target | % of Total | Avg Score | Trend |
|------|-------|--------|-----------|-----------|-------|
| **Platinum** | 25 | 50 | 10% | 95.2 | ↑ +3/wk |
| **Gold** | 89 | 200 | 36% | 84.1 | ↑ +8/wk |
| **Silver** | 102 | 300 | 41% | 72.3 | ↑ +12/wk |
| **Bronze** | 31 | 100 | 13% | 58.7 | ↑ +2/wk |

**Insights from Table:**
- Platinum growth is strong (3/week → on track to hit 50 by month 6)
- Silver tier is largest (natural distribution: bell curve)
- Goal: Bronze → Silver tier-up (current path: ?% promote)

---

## **Section 3: Source Attribution** (Where Applicants Find Awaricon)

### **Top Traffic Sources (Horizontal Bar Chart)**

```
Organic Search (Google, etc.)        [████████████████] 45% (111 orgs)
Direct URL                           [████████] 18% (45 orgs)
LinkedIn (founder posts)             [███████] 15% (37 orgs)
Referral (anchor tenant mention)     [████] 10% (25 orgs)
Twitter/X                            [██] 7% (17 orgs)
PR/Media mentions                    [█] 5% (12 orgs)
```

**Interpretation:**
- Strong organic search = SEO working
- High direct = word-of-mouth + brand awareness
- LinkedIn = founder+ organic growth (great ROI)
- Anchor tenants = viral coefficient starting to work

**Decision:** Which channels are underperforming? Double down there.

---

## **Section 4: Scoring Insights** (What Drives High Scores?)

### **Average Score Components by Tier**

```
PLATINUM (95.2 avg)
├─ Phi (Presence)           92/100  🟢 Strong
├─ Df (Depth of Field)      96/100  🟢 Strong  
├─ Omega (Operating Years)  98/100  🟢 Mature
└─ Integrity Flags          92/100  🟢 6/6 checkboxes

GOLD (84.1 avg)
├─ Phi                      81/100  🟡 Moderate
├─ Df                       85/100  🟡 Moderate
├─ Omega                    87/100  🟡 Reasonable
└─ Integrity Flags          79/100  🟡 5/6 checkboxes

SILVER (72.3 avg)
├─ Phi                      70/100  🟠 Developing
├─ Df                       71/100  🟠 Developing
├─ Omega                    75/100  🟠 Emerging
└─ Integrity Flags          65/100  🟠 4/6 checkboxes

BRONZE (58.7 avg)
├─ Phi                      55/100  🔴 Weak
├─ Df                       58/100  🔴 Weak
├─ Omega                    62/100  🔴 Early
└─ Integrity Flags          52/100  🔴 3/6 checkboxes
```

**Decision Insights:**
- What's holding Bronze orgs back? (Usually: Omega age, Integrity commitments)
- What differentiates Gold from Platinum? (Usually: Phi + Integrity)
- Create tier-up roadmap: "Here's how to reach Gold from Silver"

---

## **Section 5: Time-Series Trends** (Weekly Growth Chart)

### **Certifications Over Time (Line Graph)**

```
Week of:      Cumulative Certified Orgs
Apr 1-7       82  ●
Apr 8-14      124 ●─ (+42 week-over-week, +51% growth)
Apr 15-21     189 ●─ (+65 week-over-week, +52% growth)
Apr 22-28     247 ●─ (+58 week-over-week, +31% growth)
May 1-7       [forecast: 305] ↗ [+58/week trend]
May 8-14      [forecast: 365] ↗ [current velocity]
```

**Key Metrics:**
- Week-over-week growth rate
- Projected month-end total
- Growth trend: accelerating? plateauing? declining?

**Decision:** If growth slowing → increase marketing spend. If accelerating → amp up integrations to capture demand.

---

## **Section 6: Review Approval Metrics**

### **Admin Performance Dashboard**

```
Average Time to Approval: 42 hours (target: <48)
┌─────────────────────┬──────────────────────┐
│ This Week           │ Last Week            │
│ 18 approvals        │ 16 approvals         │
│ 1 rejection         │ 0 rejections         │
│ 3 marked "review"   │ 2 marked "review"    │
└─────────────────────┴──────────────────────┘

Top Rejection Reasons (This Month):
1. Insufficient integrity commitments (40%)
2. Conflicting mission statement (25%)
3. Incomplete application (20%)
4. Auto-flagged for manual review (15%)
```

**Admin Efficiency:**
- Who approves fastest? (Quality control)
- Which orgs reapply? (After rejection feedback)
- What feedback helps orgs improve?

---

## **Section 7: Industry Breakdown** (Categorization)

### **Certifications by Sector**

```
NGO / Humanitarian       │████████████      │ 54 (22%)
Media / Publishing       │██████            │ 28 (11%)
Sustainable / Ethical    │███████████       │ 42 (17%)
Tech / SaaS             │██████████        │ 39 (16%)
Education / Research    │██████            │ 27 (11%)
E-Commerce              │████████          │ 35 (14%)
Other                   │████              │ 15 (6%)
```

**Strategic Questions:**
- Which sector is underrepresented? (Invest there)
- Which sector adopts fastest? (Double down)
- Are anchor tenants' sectors growing fastest? (network effect working?)

---

## **Section 8: Geographic Distribution** (Map + Table)

### **Certified Orgs by Region**

```
North America     125 (51%)  🇺🇸 USA 88, 🇨🇦 Canada 37
Europe            78 (32%)   🇩🇪 Germany 18, 🇬🇧 UK 16, Others 44
Asia-Pacific      36 (15%)   🇮🇳 India 12, 🇯🇵 Japan 8, Others 16
Latin America     6 (2%)     🇧🇷 Brazil 4, Others 2
Africa            2 (<1%)    🇿🇦 South Africa 2
```

**Insight:**
- North America dominance = expected (English-speaking, startup-heavy)
- Europe growing = EU AI Act pressure
- Asia lagging = opportunity zone

---

## **Section 9: Viral Coefficient Signals**

### **Early Signs of Virality**

```
New Apps Mentioning "Anchor Tenant X"    8 this week
├─ 5 citing: "Saw GiveDirectly got Platinum"
├─ 2 citing: "Forbes article made us apply"
└─ 1 citing: "LinkedIn post from their CEO"

Average Time Between Anchor Approval → Next App: 3 days
├─ Hypothesis: Anchor press → media coverage → new apps
└─ Action: Time more anchor approvals for media impact
```

**Viral Metrics:**
- K-factor: How many new apps per anchor approval? (target: 2-3x)
- Doubling time: How fast does cert count grow? (target: <2 weeks)
- Reach multiplier: How many people each anchor tenant reaches? (track via LinkedIn mentions)

---

## **Section 10: Revenue & Pricing Signals** (Forward-Looking)

### **Pricing Tier Readiness**

```
Organizations Ready for Pro Plan ($500-1K/month):
├─ Platinum & curious about analytics      → 8 of 25 (32%)
├─ Gold with scale needs                   → 12 of 89 (13%)
└─ Total ICP contacts: ~20 orgs

Estimated Rev if 15 convert to Pro:        $90K/month
Estimated Rev if 8 convert to Enterprise:  $480K/month
Year 1 projected revenue:                  $1.4M+ 🎯

Pro Tier Feature Requests (This Month):
1. Industry-specific benchmarking (4 requests)
2. Custom tier definitions (2 requests)
3. Team onboarding (3 requests)
```

---

## **Weekly Review Checklist** (Mondays 10am)

Use this template each Monday:

```markdown
## Awaricon Weekly Review — Week of [DATE]

### 📊 Key Numbers
- [ ] Apps submitted: _____ (target: +15/week)
- [ ] Approvals: _____ (target: 75% conversion)
- [ ] New Platinum: _____ (target: +3/week)
- [ ] Avg approval time: _____ (target: <48 hrs)

### 📈 Growth Signal
- [ ] Week-over-week growth rate: ___% (target: +50%)
- [ ] Top source this week: _____________
- [ ] Biggest surprise or anomaly: _____________

### 🎯 What's Working
1. _____________
2. _____________
3. _____________

### ⚠️ What Needs Attention
1. _____________
2. _____________
3. _____________

### 🚀 Actions for Next Week
- [ ] Action 1: _____________ (Owner: _______, Due: _______) 
- [ ] Action 2: _____________ (Owner: _______, Due: _______) 
- [ ] Action 3: _____________ (Owner: _______, Due: _______) 

### 📞 Decisions Needed
- [ ] Decision 1: _____________ (Owner: _______, Deadline: _______)
```

---

## **Monthly Strategic Review** (1st of Month)

```markdown
## Awaricon Monthly Strategic Review — [MONTH]

### Tier Progress vs. Targets
| Tier | Target | Actual | Growth | On Track? |
|------|--------|--------|--------|-----------|
| Plat | 50 | 25 | +3/wk | ✓ Yes, accelerating |
| Gold | 200 | 89 | +8/wk | ⚠️ Slightly behind |
| Silver | 300 | 102 | +12/wk | ✓ On track |
| Bronze | 100 | 31 | +2/wk | ❌ Behind |

### Top Wins This Month
1. _________________________
2. _________________________
3. _________________________

### Top Challenges
1. _________________________
2. _________________________
3. _________________________

### Go-To-Market Adjustments Needed?
- [ ] Increase marketing spend? Where?
- [ ] Adjust messaging? How?
- [ ] New anchor tenant targets? Who?
- [ ] Feature release timing? What?

### Financial Forecast
- Month-end projected: _____ orgs
- Year-end projected: _____ orgs
- Revenue projection update: $_____/year
```

---

## **Implementation Roadmap**

### **Phase 1: Core Analytics (Week 1-2)**
- [ ] Set up event tracking on `/awaricon/apply` page
- [ ] Track conversions: form starts → submissions → approvals
- [ ] Export weekly data to CSV

### **Phase 2: Dashboard UI (Week 2-4)**
- [ ] Build dashboard at `dashboard.forever-lotus.com`
- [ ] Implement real-time DB updates (Firebase/Supabase)
- [ ] Add charts: funnel, tier distribution, trends

### **Phase 3: Attribution (Week 3-5)**
- [ ] UTM parameters for all marketing campaigns
- [ ] Integration with Google Analytics 4
- [ ] Attribution model: multi-touch

### **Phase 4: Predictive Signals (Week 5-6)**
- [ ] Viral coefficient calculation
- [ ] Doubling time forecast
- [ ] Churn risk scoring

---

## **Data Sources**

- **Primary:** Forever Lotus application DB (`app_records` table)
- **Traffic:** Google Analytics 4 (organic, referral, direct)
- **Social:** Mentions API (Twitter, LinkedIn)
- **Business:** Stripe (future revenue tracking)

---

## **Access & Permissions**

- **Public:** Anyone can see `/awaricon/status` for individual org
- **Private Dashboard:** Awaricon leadership only (password-protected)
- **Admin Panel:** Certification reviewers see individual applications
- **Export:** CSV downloads available for authorized users

---

**Questions?**  
Contact: hello@forever-lotus.com  
Last Updated: April 4, 2026
