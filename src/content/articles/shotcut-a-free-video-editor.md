---
{
  "status": "published",
  "author": "FRP editorial desk",
  "reviewed": "2026-10-13",
  "keywords": [
    "video",
    "editor",
    "editing",
    "free",
    "timeline",
    "clips"
  ],
  "aliases": [
    "Shotcut"
  ],
  "replaces": [
    "CapCut"
  ],
  "sources": [
    {
      "id": "faq",
      "title": "Shotcut FAQ and requirements",
      "url": "https://www.shotcut.org/FAQ/",
      "checked": "2026-10-13"
    },
    {
      "id": "repo",
      "title": "Shotcut project and GPLv3 licence",
      "url": "https://github.com/mltframework/shotcut",
      "checked": "2026-10-13"
    }
  ],
  "githubGuide": true,
  "slug": "shotcut-a-free-video-editor",
  "title": "Shotcut: a free video editor, minus the subscription",
  "description": "Cut footage, arrange a timeline and export a video. A starting point for people looking beyond CapCut.",
  "kind": "software",
  "sections": [
    "Fresh Drops",
    "The Current"
  ],
  "categories": [
    "Video editing"
  ],
  "featured": true,
  "order": 10,
  "art": "flower",
  "color": "pink",
  "creator": {
    "name": "Dan Dennedy, Meltytech and Shotcut contributors",
    "url": "https://www.shotcut.org/"
  },
  "officialUrl": "https://www.shotcut.org/",
  "repositoryUrl": "https://github.com/mltframework/shotcut",
  "docsUrl": "https://www.shotcut.org/FAQ/",
  "reality": {
    "does": "Edits existing footage on a timeline. It is not an AI video generator.",
    "free": "The project is open-source under GPLv3. Its FAQ permits commercial use.",
    "device": "Windows, macOS and Linux builds exist. The requirements below are for basic SD editing.",
    "difficulty": "FRP assessment: expect to learn timeline editing and exporting. Start with one short clip.",
    "catch": "Saving a project is not the same as exporting a video. Higher-resolution work needs more resources."
  },
  "requirements": {
    "scope": "Basic standard-definition (SD) editing; not HD or 4K.",
    "systems": [
      {
        "os": "Windows",
        "versions": "Windows 10 build 1809 through 11, 64-bit",
        "architectures": [
          "x64",
          "arm64"
        ]
      },
      {
        "os": "macOS",
        "versions": "macOS 12–27",
        "architectures": [
          "x64",
          "arm64"
        ]
      },
      {
        "os": "Linux",
        "versions": "64-bit; glibc 2.35 or newer",
        "architectures": [
          "x64",
          "arm64"
        ]
      }
    ],
    "cpu": "At least one 2 GHz core for SD; documented x86-64 or 64-bit ARM.",
    "ramGb": 4,
    "gpu": {
      "description": "Windows: Direct3D 11. Linux: working OpenGL 2.0. No numeric VRAM minimum verified.",
      "minVramGb": null
    },
    "storageGb": null,
    "installation": "desktop app",
    "limitations": [
      "FAQ lists 8 GB RAM / 4 cores for HD and 16 GB / 8 cores for 4K.",
      "Check the download offered for your exact OS and architecture. Storage needs grow with footage."
    ],
    "evidence": [
      "faq"
    ]
  }
}
---

## A useful first edit

Shotcut is an option when your goal is to edit footage you already have. The [official project](https://github.com/mltframework/shotcut) describes a cross-platform, open-source editor. A CapCut search match here means overlapping editing needs, not identical features or project-file compatibility.

FRP's suggested first step: try a short, non-sensitive clip and make one cut. Use the [official FAQ](https://www.shotcut.org/FAQ/) for exporting and troubleshooting. We have reviewed documentation, not benchmarked this release.
