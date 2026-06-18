"""
VarshuOS v3 — Short. Visual. Everything on screen.
No dropdowns. No walls of text. Pure animated eye candy.
"""

import datetime
import os

IST = datetime.timezone(datetime.timedelta(hours=5, minutes=30))
today = datetime.datetime.now(IST)
day = today.strftime("%A")
short_date = today.strftime("%d %b %Y")

DISTROS = {
    "Monday":    {"distro": "RedStrike OS",  "ver": "14.2",  "kernel": "6.8.0-redstrike",  "accent": "#FF0000", "accent2": "#FF6B6B", "glow": "#FF000044", "border": "#8B0000", "codename": "Inferno",  "motd": "New week. New exploits. No mercy.", "bg": "#0D1117"},
    "Tuesday":   {"distro": "DeepBlue OS",   "ver": "12.1",  "kernel": "6.8.0-deepblue",   "accent": "#0074D9", "accent2": "#7FDBFF", "glow": "#0074D944", "border": "#001F54", "codename": "Abyss",    "motd": "Silence the noise. Enter the flow.", "bg": "#0D1117"},
    "Wednesday": {"distro": "NeonArc OS",    "ver": "3.7",   "kernel": "6.8.0-neonarc",    "accent": "#FF00FF", "accent2": "#DA70D6", "glow": "#FF00FF44", "border": "#6C0BA9", "codename": "Glitch",   "motd": "Midweek. Maximum output.", "bg": "#0D1117"},
    "Thursday":  {"distro": "ForestRoot OS", "ver": "22.04", "kernel": "6.8.0-forestroot", "accent": "#00FF41", "accent2": "#A8E6CF", "glow": "#00FF4144", "border": "#0B3D0B", "codename": "Banyan",   "motd": "Grow one commit at a time.", "bg": "#0D1117"},
    "Friday":    {"distro": "GoldRush OS",   "ver": "40.1",  "kernel": "6.8.0-goldrush",   "accent": "#FFD700", "accent2": "#FFE066", "glow": "#FFD70044", "border": "#B8860B", "codename": "Midas",    "motd": "Ship it. Its Friday. YOLO.", "bg": "#0D1117"},
    "Saturday":  {"distro": "CyberKali OS",  "ver": "2024.3","kernel": "6.8.0-cyberkali",  "accent": "#00FFFF", "accent2": "#FF1493", "glow": "#00FFFF44", "border": "#008B8B", "codename": "Phantom",  "motd": "No rules. No deadlines. Pure chaos.", "bg": "#0D1117"},
    "Sunday":    {"distro": "ZenMint OS",    "ver": "21.3",  "kernel": "6.8.0-zenmint",    "accent": "#FF6347", "accent2": "#FF8C00", "glow": "#FF634744", "border": "#8B4513", "codename": "Satori",   "motd": "Rest day. Opens laptop anyway.", "bg": "#0D1117"},
}

d = DISTROS[day]
ac = d["accent"]
ac2 = d["accent2"]
bg = d["bg"]
glow = d["glow"]


# ═══════════════════════════════════════════════
# SVG 1: BOOT + ABOUT (compact, one screen)
# ═══════════════════════════════════════════════

def make_boot_svg():
    checks = [
        ("CPU", "Varshan Gowda @ mass_clock"),
        ("RAM", "Unlimited Creativity"),
        ("REPOS", "197+ and expanding"),
        ("CHAI", "Filter Coffee Module"),
        ("AUDIO", "Lo-fi Hip Hop Radio"),
    ]

    check_lines = ""
    for i, (key, val) in enumerate(checks):
        delay = 0.2 + i * 0.15
        y = 65 + i * 24
        check_lines += f'''
    <text x="30" y="{y}" class="bio" style="animation-delay:{delay}s">  {key:<8} : {val:<40} <tspan class="ok">[  OK  ]</tspan></text>'''

    about_y = 65 + len(checks) * 24 + 20
    about_lines_data = [
        ("Handle", "@VarshuAi"),
        ("From", "India"),
        ("Title", "just a guy who codes"),
        ("Student?", "nah"),
        ("Why", "because its fun"),
        ("Repos", "197+ mass uploaded"),
        ("Sleep", "optional"),
        ("Chai", "mandatory"),
    ]

    about_lines = ""
    for i, (k, v) in enumerate(about_lines_data):
        delay = 1.0 + i * 0.12
        y = about_y + 25 + i * 22
        about_lines += f'''
    <text x="30" y="{y}" class="about" style="animation-delay:{delay}s">  <tspan class="key">{k:<10}</tspan> {v}</text>'''

    total_h = about_y + 25 + len(about_lines_data) * 22 + 60
    motd_y = total_h - 40
    cursor_y = total_h - 15

    return f'''<svg xmlns="http://www.w3.org/2000/svg" width="850" height="{total_h}" viewBox="0 0 850 {total_h}">
  <style>
    @keyframes fadeIn {{ from {{ opacity: 0; }} to {{ opacity: 1; }} }}
    @keyframes blink {{ 0%,100% {{ opacity: 1; }} 50% {{ opacity: 0; }} }}
    @keyframes glowPulse {{ 0%,100% {{ opacity: 0.2; }} 50% {{ opacity: 0.5; }} }}
    @keyframes scanMove {{ 0% {{ transform: translateY(0); }} 100% {{ transform: translateY({total_h}px); }} }}

    .bg {{ fill: {bg}; }}
    .frame {{ fill: none; stroke: {ac}; stroke-width: 1; opacity: 0.25; }}
    .title {{ font-family: 'Courier New', monospace; font-size: 13px; fill: {ac}; font-weight: bold; }}
    .bio {{ font-family: 'Courier New', monospace; font-size: 12.5px; fill: #8B949E; animation: fadeIn 0.3s forwards; opacity: 0; }}
    .ok {{ fill: {ac}; font-weight: bold; }}
    .section {{ font-family: 'Courier New', monospace; font-size: 12px; fill: {ac}; opacity: 0.4; }}
    .about {{ font-family: 'Courier New', monospace; font-size: 12.5px; fill: #C9D1D9; animation: fadeIn 0.3s forwards; opacity: 0; }}
    .key {{ fill: {ac}; font-weight: bold; }}
    .motd {{ font-family: 'Courier New', monospace; font-size: 13px; fill: {ac2}; font-style: italic; animation: fadeIn 0.5s forwards; opacity: 0; }}
    .cursor {{ font-family: 'Courier New', monospace; font-size: 13px; fill: {ac}; animation: blink 1s infinite; }}
    .prompt {{ font-family: 'Courier New', monospace; font-size: 12.5px; fill: {ac}; animation: fadeIn 0.3s forwards; opacity: 0; }}
    .glow {{ fill: {glow}; filter: blur(50px); animation: glowPulse 4s infinite; }}
  </style>

  <rect width="850" height="{total_h}" class="bg"/>
  <rect x="4" y="4" width="842" height="{total_h - 8}" rx="8" class="frame"/>
  <ellipse cx="425" cy="40" rx="250" ry="25" class="glow"/>

  <text x="30" y="35" class="title">VARSHUOS BIOS v4.20  //  {d["distro"]} v{d["ver"]} "{d["codename"]}"  //  {day}</text>
  <line x1="30" y1="44" x2="820" y2="44" stroke="{ac}" stroke-width="0.4" opacity="0.2"/>

  {check_lines}

  <line x1="30" y1="{about_y}" x2="820" y2="{about_y}" stroke="{ac}" stroke-width="0.4" opacity="0.2"/>
  <text x="30" y="{about_y + 5}" class="section">// cat /home/varshuai/about.txt</text>

  {about_lines}

  <text x="30" y="{motd_y}" class="motd" style="animation-delay:2.2s">"{d["motd"]}"</text>
  <text x="30" y="{cursor_y}" class="prompt" style="animation-delay:2.5s">varshuai@mass-coder:~$ <tspan class="cursor">_</tspan></text>

  <rect x="0" y="0" width="850" height="1.5" fill="{ac}" opacity="0.03">
    <animateTransform attributeName="transform" type="translate" from="0 0" to="0 {total_h}" dur="5s" repeatCount="indefinite"/>
  </rect>
</svg>'''


# ═══════════════════════════════════════════════
# SVG 2: SKILL BARS (compact)
# ═══════════════════════════════════════════════

def make_skills_svg():
    skills = [
        ("Security", 95), ("Python", 93), ("Cloud/DevOps", 92),
        ("JavaScript", 90), ("Bash", 90), ("TypeScript", 87),
        ("Java", 85), ("Go", 82), ("AI/ML", 80), ("Rust", 75),
    ]

    row_h = 32
    h = 55 + len(skills) * row_h + 15
    lines = ""
    for i, (name, pct) in enumerate(skills):
        y = 55 + i * row_h
        delay = 0.15 + i * 0.12
        bar_w = int(pct * 4.2)

        lines += f'''
    <g style="animation: fadeIn 0.3s {delay}s forwards; opacity: 0;">
      <text x="30" y="{y + 14}" style="font-family:'Courier New',monospace;font-size:12px;fill:#8B949E">{name}</text>
      <rect x="170" y="{y + 2}" width="430" height="16" rx="3" fill="#161B22"/>
      <rect x="170" y="{y + 2}" width="0" height="16" rx="3" fill="{ac}" opacity="0.75">
        <animate attributeName="width" from="0" to="{bar_w}" dur="0.8s" begin="{delay}s" fill="freeze"/>
      </rect>
      <rect x="170" y="{y + 2}" width="0" height="16" rx="3" fill="{glow}">
        <animate attributeName="width" from="0" to="{bar_w}" dur="0.8s" begin="{delay}s" fill="freeze"/>
      </rect>
      <text x="620" y="{y + 14}" style="font-family:'Courier New',monospace;font-size:11px;fill:{ac};font-weight:bold">{pct}%</text>
    </g>'''

    return f'''<svg xmlns="http://www.w3.org/2000/svg" width="850" height="{h}" viewBox="0 0 850 {h}">
  <style>
    @keyframes fadeIn {{ from {{ opacity: 0; }} to {{ opacity: 1; }} }}
  </style>
  <rect width="850" height="{h}" fill="{bg}"/>
  <rect x="4" y="4" width="842" height="{h - 8}" rx="8" fill="none" stroke="{ac}" stroke-width="1" opacity="0.25"/>
  <text x="30" y="30" style="font-family:'Courier New',monospace;font-size:13px;fill:{ac};font-weight:bold">varshuai@mass-coder:~$ cat /proc/skill-levels</text>
  <line x1="30" y1="40" x2="820" y2="40" stroke="{ac}" stroke-width="0.4" opacity="0.2"/>
  {lines}
</svg>'''


# ═══════════════════════════════════════════════
# SVG 3: NEOFETCH (compact)
# ═══════════════════════════════════════════════



# ═══════════════════════════════════════════════
# README — SHORT. No dropdowns. All visible.
# ═══════════════════════════════════════════════

def make_readme():
    ah = d["accent"].replace("#", "")
    a2h = d["accent2"].replace("#", "")
    bh = d["border"].replace("#", "")

    return f"""<!--
  VarshuOS v{d["ver"]} "{d["codename"]}" | {short_date}
  This README boots into a different OS every day. All animated.
-->

<div align="center">

<!-- ANIMATED BOOT SEQUENCE + ABOUT -->
<img src="https://raw.githubusercontent.com/VarshuAi/VarshuAi/main/assets/boot.svg" width="100%"/>

<br>
<img src="https://user-images.githubusercontent.com/73097560/115834477-dbab4500-a447-11eb-908a-139a6edaec5c.gif" width="100%">
<br>

<!-- TECH STACK — icons grid -->
<img src="https://skillicons.dev/icons?i=python,javascript,typescript,go,rust,cpp,java,dart,kotlin,bash&perline=10&theme=dark" />
<br><br>
<img src="https://skillicons.dev/icons?i=react,nextjs,nodejs,express,fastapi,flask,django,flutter,tailwind,graphql&perline=10&theme=dark" />
<br><br>
<img src="https://skillicons.dev/icons?i=kali,docker,kubernetes,terraform,aws,gcp,azure,firebase,mongodb,redis&perline=10&theme=dark" />

<br>
<img src="https://user-images.githubusercontent.com/73097560/115834477-dbab4500-a447-11eb-908a-139a6edaec5c.gif" width="100%">
<br>

<!-- ANIMATED SKILL BARS -->
<img src="https://raw.githubusercontent.com/VarshuAi/VarshuAi/main/assets/skills.svg" width="100%"/>

<br>
<img src="https://user-images.githubusercontent.com/73097560/115834477-dbab4500-a447-11eb-908a-139a6edaec5c.gif" width="100%">
<br>

<!-- GITHUB STATS — compact row -->
<a href="https://github.com/VarshuAi">
  <img src="https://github-readme-stats-sigma-five.vercel.app/api?username=VarshuAi&show_icons=true&bg_color=0D1117&border_color={bh}&title_color={ah}&icon_color={a2h}&text_color=8B949E&count_private=true&include_all_commits=true&hide_title=true" height="170px">
</a>
<a href="https://github.com/VarshuAi">
  <img src="https://streak-stats.demolab.com?user=VarshuAi&background=0D1117&border={bh}&ring={ah}&fire={a2h}&currStreakLabel={a2h}&sideLabels={ah}&currStreakNum=C9D1D9&sideNums=C9D1D9&dates=555555&hide_total_contributions=true" height="170px">
</a>

<br><br>

<img src="https://github-readme-activity-graph.vercel.app/graph?username=VarshuAi&bg_color=0D1117&color={ah}&line={a2h}&point={ah}&area_color={ah}22&area=true&hide_border=true" width="98%">

<br>
<img src="https://user-images.githubusercontent.com/73097560/115834477-dbab4500-a447-11eb-908a-139a6edaec5c.gif" width="100%">
<br>

<!-- ANIME NEOFETCH -->
<table>
<tr>
<td width="40%" align="center">
<img src="https://media.giphy.com/media/qgQUggAC3Pfv687qPC/giphy.gif" width="280px" alt="coding"/>
</td>
<td width="60%">

```bash
varshuai@mass-coder:~$ neofetch

  OS      {d["distro"]} v{d["ver"]} "{d["codename"]}"
  Kernel  {d["kernel"]}
  Shell   /bin/mass_code
  Uptime  mass_days (since day one)
  Repos   197+ (mass uploaded)
  Lang    Python JS TS Go Rust C++
          Dart Java Kotlin Bash SQL
  Chai    filter > instant (always)
  Editor  VS Code / Vim
  Theme   {d["distro"]} [{day}]
  Status  {d["motd"]}
```

</td>
</tr>
</table>

<br>

<img src="https://komarev.com/ghpvc/?username=VarshuAi&label=ssh+connections&style=flat-square&color={ah}"/>

<br>

<sub><code>VarshuOS v{d["ver"]} "{d["codename"]}" // boots into a new OS daily // {day} // powered by mass chai</code></sub>

<br>

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:0D1117,50:{ah},100:0D1117&height=100&section=footer" width="100%"/>

</div>
"""


# ═══════════════════════════════════════════════
# MAIN
# ═══════════════════════════════════════════════

if __name__ == "__main__":
    script_dir = os.path.dirname(os.path.abspath(__file__))
    repo_root = os.path.dirname(script_dir)
    assets_dir = os.path.join(repo_root, "assets")
    os.makedirs(assets_dir, exist_ok=True)

    with open(os.path.join(assets_dir, "boot.svg"), "w", encoding="utf-8") as f:
        f.write(make_boot_svg())
    with open(os.path.join(assets_dir, "skills.svg"), "w", encoding="utf-8") as f:
        f.write(make_skills_svg())
    with open(os.path.join(repo_root, "README.md"), "w", encoding="utf-8") as f:
        f.write(make_readme())

    print("[OK] VarshuOS v3 generated!")
    print(f"Day: {day} | Distro: {d['distro']} v{d['ver']}")
