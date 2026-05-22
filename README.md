# South African School Management System (SMS) - Front-End Foundation

A professional, client-ready, fully interactive front-end prototype designed for South African private schools (Grade R–12). The system is scale-optimized for a target size of **~300 learners** (operating within the 251–500 learner band) and features a dynamic presentation-level package switcher to preview tier-locked system capabilities.

---

## 🚀 Quick Start (Local Development)

To run the project locally, ensure you have [Node.js](https://nodejs.org/) installed, and execute:

```bash
# 1. Install dependencies
npm install

# 2. Start the local development server (with HMR)
npm run dev

# 3. Open your browser to the local URL (usually http://localhost:5173/School__System/)
```

---

## 📦 Deployment & Git Workflow

This project is configured for direct deployment to **GitHub Pages** using `HashRouter` to prevent reload `404` errors. The Vite base path is set to `/School__System/`.

### Deployment Command
Running the deployment script will compile the assets and push them to the `gh-pages` branch:
```bash
npm run deploy
```
*(This automatically runs `npm run build` as a pre-deploy hook).*

### Git Commands
To save your changes and push them back to your main repository:
```bash
git add .
git commit -m "Feat: Complete South African SMS front-end foundation"
git push origin main
```

---

## 🔑 Demo Accounts (Autofill Enabled)
The login screen features an interactive credentials panel. Clicking any role will autofill the fields. The app accepts **any email/password** combinations for demo convenience.

| Role | Username / Email | Password | Allowed View Scope |
| :--- | :--- | :--- | :--- |
| **Principal** | `principal@demo.school` | `demo123` | Full Access (Super Admin & Reports) |
| **Administrator** | `admin@demo.school` | `demo123` | Operational Access (Learners, Parents, Staff) |
| **Finance Officer** | `finance@demo.school` | `demo123` | Financial Access (Billing, Cashbook, Payments) |
| **Teacher** | `teacher@demo.school` | `demo123` | Academic Scope (Registers, Marks Entry, Attendance) |
| **Parent / Guardian** | `parent@demo.school` | `demo123` | Parent Portal (Invoices, Child Progress) |

---

## 🇿🇦 South African Context & Compliance

This platform is custom-built for South African educational institutions:
1. **Locale & Currency**: South African Rand (`ZAR`) format throughout, SA phone numbers (+27), Grade R–12 class mappings, and the 4-term academic school calendar.
2. **POPIA Compliance**: Built with the Protection of Personal Information Act (Act 4 of 2013) guidelines in mind. Features audit notifications, encrypted data flags, and strict consent banners.
3. **SASAMS Compatibility**: Structured with metadata fields matching the South African School Administration and Management System standard, preparing files and reports for direct state compliance export.

---

## 💳 Subscription Planner & 12-Month Agreement

Pricing is structured as a **lock-in 12-month subscription agreement**, calculated based on the selected **System Tier** (capabilities) and the **Learner Scale Band** (number of registered learners). 

### 1. Once-Off Onboarding Setup Fees
Onboarding setup costs cover database provisioning, branding configurations, staff onboarding, and deployment:
* **Tier 1 (Core)**: R6,500 once-off
* **Tier 2 (Operations)**: R9,500 once-off
* **Tier 3 (Full Platform)**: R14,500 once-off

### 2. Pricing Matrix (ZAR / Month)

| Learner Scale Band | Tier 1: Core | Tier 2: Operations (Recommended) | Tier 3: Full Platform |
| :--- | :--- | :--- | :--- |
| **Up to 250 Learners** | R2,650 /mo | R4,900 /mo | R8,600 /mo |
| **251 – 500 Learners** *(School Size)* | R3,500 /mo | **R6,500 /mo** | R11,500 /mo |
| **501 – 800 Learners** | R4,900 /mo | R9,100 /mo | R16,100 /mo |
| **800+ Learners** | Custom Quote | Custom Quote | Custom Quote |

*Note: Prepaying upfront grants 2 months free subscription.*

---

## 🛠️ Presentation-Level Package Preview Switcher

The dashboard and pages feature a **Tier Switcher** at the top right (or via the **System Packages & Subscription Planner** view). 
This allows prospective clients to toggle:
- **Tier 1 (Core School Management)**: Simplifies navigation, hides complex accounting indicators, and locks analytics/attendance/results modules with informative "Upgrade to Unlock" cards.
- **Tier 2 (School Operations)**: Unlocks full operations, attendance monitoring, basic finance dashboards, HOD feedback webinar portals, and academic lists.
- **Tier 3 (Full School Digital Platform)**: Unlocks the full administrative platform, custom reports, advanced document structures, and automated payroll pipelines.
