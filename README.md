# The Wired

> _"No matter where you go, everyone's connected."_

A case study project for **IPT2** — a _Serial Experiments Lain_-inspired multi-profile website featuring an atmospheric landing page with animated backgrounds and individual profile routes.

---

## Project Structure

```
the-wired/
├── index.html              # Landing page with profile selection
├── routes/                 # Individual profile pages
│   ├── sandara.html
│   ├── mike.html
│   ├── joseph.html
│   └── leewell.html
└── assets/
    ├── fonts/              # Custom typefaces
    ├── image/              # Profile images
    ├── music/              # Audio assets
    ├── scripts/            # JavaScript files
    ├── styles/             # CSS stylesheets
    └── video/              # Background video
```

## Features

- **Animated landing page** with a looping background video and typewriter title effect
- **Profile cards** — hover-reveal usernames linking to individual profile routes
- **Volume toggle** — mute/unmute the background audio via a FontAwesome icon button
- **4 profile pages** — Sandara, Mike, Joseph, and Leewell

## Tech Stack

| Technology             | Usage                                    |
| ---------------------- | ---------------------------------------- |
| HTML5                  | Page structure & semantics               |
| CSS3                   | Custom styles & CSS variables            |
| Tailwind CSS (via CDN) | Utility-first styling                    |
| Vanilla JavaScript     | Typewriter effect, video & audio control |
| FontAwesome            | Icon library                             |

## Getting Started

This is a static HTML project — no build step required.

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/the-wired.git
   ```
2. Open `index.html` in your browser, or serve it with any static file server:
   ```bash
   # Using VS Code Live Server extension, or:
   npx serve .
   ```

> **Note:** The background video (`assets/video/lain-background-video-test.mp4`) must be served over a local server — browser security restrictions may block autoplay from the file system directly.

## Contributors

This project was built collaboratively by a team of 4:

| Name    | Profile Page          |
| ------- | --------------------- |
| Sandara | `routes/sandara.html` |
| Mike    | `routes/mike.html`    |
| Joseph  | `routes/joseph.html`  |
| Leewell | `routes/leewell.html` |

---
