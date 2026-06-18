# 🎨 VarshuAi Auto-Rotating GitHub Profile README

This profile README **automatically changes its entire theme every day** using GitHub Actions.

## 📁 Structure

```
VarshuAi/
├── README.md                              ← auto-generated daily
├── scripts/
│   └── generate_readme.py                 ← 7 themes, picks by day
└── .github/
    └── workflows/
        └── rotate-theme.yml               ← cron job (midnight IST)
```

## 🎨 7 Daily Themes

| Day | Theme | Color | Vibe |
|-----|-------|-------|------|
| Monday | 🔴 WARZONE | Red | Attack mode. Ship hard. |
| Tuesday | 🔵 DEEP OCEAN | Blue | Deep focus. No distractions. |
| Wednesday | 🟣 NEON ARCADE | Purple | Midweek madness. |
| Thursday | 🟢 EMERALD FOREST | Green | Growth mode. Plant seeds. |
| Friday | 🟡 GOLDEN HOUR | Gold | Victory lap. Deploy day. |
| Saturday | 🩷 CYBER PUNK | Pink/Cyan | Side projects. No rules. |
| Sunday | 🟠 SUNSET CHILL | Orange | Recharge. (but still code) |

## 🚀 Setup Instructions

1. Create repo `VarshuAi/VarshuAi` on GitHub (your profile repo)
2. Copy ALL these files into it (README.md, scripts/, .github/)
3. Go to **Settings → Actions → General** → set "Workflow permissions" to **Read and write**
4. The Action runs daily at midnight IST automatically
5. You can also trigger manually: **Actions → Auto Rotate Theme → Run workflow**

## 🧪 Test Locally

```bash
python scripts/generate_readme.py
```

This generates `README.md` based on the current day of the week (IST timezone).
