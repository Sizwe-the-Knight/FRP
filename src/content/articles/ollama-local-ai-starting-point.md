---
{
  "status": "published",
  "author": "FRP editorial desk",
  "reviewed": "2026-10-13",
  "keywords": [
    "ai",
    "local",
    "locally",
    "computer",
    "model",
    "llm",
    "offline"
  ],
  "aliases": [
    "Ollama"
  ],
  "replaces": [],
  "sources": [
    {
      "id": "repo",
      "title": "Ollama repository and MIT licence",
      "url": "https://github.com/ollama/ollama",
      "checked": "2026-10-13"
    },
    {
      "id": "win",
      "title": "Ollama Windows requirements",
      "url": "https://docs.ollama.com/windows",
      "checked": "2026-10-13"
    },
    {
      "id": "mac",
      "title": "Ollama macOS requirements",
      "url": "https://docs.ollama.com/macos",
      "checked": "2026-10-13"
    },
    {
      "id": "faq",
      "title": "Ollama local and cloud behaviour",
      "url": "https://docs.ollama.com/faq",
      "checked": "2026-10-13"
    }
  ],
  "githubGuide": true,
  "slug": "ollama-local-ai-starting-point",
  "title": "Ollama: what “running AI locally” actually means",
  "description": "A tool for running supported AI models on your computer. The model you choose changes the hardware question.",
  "kind": "software",
  "sections": [
    "Fresh Drops",
    "The Current"
  ],
  "categories": [
    "Local AI"
  ],
  "order": 20,
  "art": "folder",
  "color": "lime",
  "creator": {
    "name": "Ollama and contributors",
    "url": "https://github.com/ollama/ollama"
  },
  "officialUrl": "https://ollama.com/",
  "repositoryUrl": "https://github.com/ollama/ollama",
  "docsUrl": "https://docs.ollama.com/faq",
  "reality": {
    "does": "Runs supported language models. A model is the downloaded set of learned patterns used to generate responses.",
    "free": "The Ollama software repository uses the MIT licence. Model licences and hosted offerings have their own terms.",
    "device": "There is no single RAM figure for every model. Start with the official platform instructions and the specific model.",
    "difficulty": "FRP assessment: a desktop installer helps, but model choice and troubleshooting still take some learning.",
    "catch": "Local and cloud models are different choices. Do not assume every request stays on your computer; check the mode you selected."
  },
  "requirements": {
    "systems": [
      {
        "os": "Windows",
        "versions": "Windows 10 22H2 or newer, Home or Pro",
        "architectures": null
      },
      {
        "os": "macOS",
        "versions": "macOS Sonoma 14 or newer",
        "architectures": [
          "arm64",
          "x64"
        ]
      }
    ],
    "cpu": "macOS: Apple M series supports CPU/GPU; Intel x86 is CPU-only.",
    "ramGb": null,
    "gpu": null,
    "storageGb": null,
    "installation": "desktop app",
    "scope": "Desktop app overview, not a minimum for any particular model. Linux is not assessed in this starter entry.",
    "limitations": [
      "RAM and GPU suitability depend on the chosen model and configuration.",
      "Windows documentation lists 4 GB for the application alone; models require additional space. No cross-platform total is verified here.",
      "Missing platforms in this assessment are not a declaration that the project cannot run there."
    ],
    "evidence": [
      "win",
      "mac",
      "faq"
    ]
  }
}
---

## The app is only one part

Ollama runs models; the model supplies the capabilities. Think of the app as a player and the model as something it can load. The [project repository](https://github.com/ollama/ollama) links to its official downloads and documentation.

Before downloading, choose a specific model and check its licence and size. FRP has not tested speed or quality on your machine. The [FAQ](https://docs.ollama.com/faq) explains local and cloud behaviour; a local installation alone is not a blanket privacy guarantee.
