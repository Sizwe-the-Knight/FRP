---
{
  "status": "published",
  "author": "FRP editorial desk",
  "reviewed": "2026-10-13",
  "keywords": [
    "ai",
    "voice",
    "voices",
    "audio",
    "speech",
    "text to speech",
    "tts",
    "videos",
    "narration"
  ],
  "aliases": [
    "Coqui",
    "coqui-tts",
    "TTS"
  ],
  "replaces": [
    "ElevenLabs"
  ],
  "sources": [
    {
      "id": "repo",
      "title": "Idiap maintained Coqui TTS repository",
      "url": "https://github.com/idiap/coqui-ai-TTS",
      "checked": "2026-10-13"
    }
  ],
  "githubGuide": true,
  "slug": "coqui-tts-voices-with-a-learning-curve",
  "title": "Coqui TTS: AI voices with a learning curve",
  "description": "A maintained speech toolkit for turning text into audio. Useful to investigate, but not a one-click voice studio.",
  "kind": "software",
  "sections": [
    "Fresh Drops",
    "From the Underground"
  ],
  "categories": [
    "AI audio"
  ],
  "order": 30,
  "art": "flower",
  "color": "orange",
  "creator": {
    "name": "Coqui TTS authors; maintained fork by Idiap and contributors",
    "url": "https://github.com/idiap/coqui-ai-TTS"
  },
  "officialUrl": "https://github.com/idiap/coqui-ai-TTS",
  "repositoryUrl": "https://github.com/idiap/coqui-ai-TTS",
  "docsUrl": "https://coqui-tts.readthedocs.io/",
  "reality": {
    "does": "Provides text-to-speech and voice-conversion tools through Python and command-line interfaces.",
    "free": "The code uses MPL-2.0. Downloaded models may have different licences; check the selected model before using its output.",
    "device": "The maintainers document Ubuntu 24.04 testing. Hardware needs vary by model; unknowns below are deliberate.",
    "difficulty": "FRP assessment: this is a technical toolkit. Expect Python environments and dependency setup rather than a simple voice-editor app.",
    "catch": "A search match for ElevenLabs does not imply equivalent voices, rights or convenience. Use voices you have permission to use."
  },
  "requirements": {
    "systems": [
      {
        "os": "Linux",
        "versions": "Tested on Ubuntu 24.04",
        "architectures": null
      }
    ],
    "cpu": null,
    "ramGb": null,
    "gpu": null,
    "storageGb": null,
    "installation": "command line / Python",
    "scope": "Maintained Python toolkit; no universal model hardware minimum verified.",
    "limitations": [
      "The README says Mac and Windows should also work; this is not equivalent to its documented Ubuntu testing.",
      "Documented Python range: 3.10 to below 3.15; PyTorch 2.2 or newer. Follow current dependency instructions.",
      "Model-specific RAM, GPU and disk requirements remain unverified."
    ],
    "evidence": [
      "repo"
    ]
  }
}
---

## Read before you install

This entry covers the [Idiap-maintained fork](https://github.com/idiap/coqui-ai-TTS), not a claim about a hosted Coqui service. It may suit a curious reader willing to learn technical setup.

FRP has not generated sample audio or measured performance. Read the project's installation instructions and the selected model's terms before deciding whether it fits your video workflow.
