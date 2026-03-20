# Oasiz Developer

Welcome to Oasiz Developer. This repository is the starter kit for external developers building games for the Oasiz platform.

It includes:
- the Oasiz CLI and upload pipeline
- a reusable game template
- two example games: `block-blast/` and `extended-golf/`
- platform guidance for SDK integration, performance, quality, and submission readiness

## Welcome Developers

We want developers to get to gameplay fast, ship polished games, and test directly on Oasiz with as little setup friction as possible.

Use this repo if you want to:
- build a new HTML5 or Unity WebGL game for Oasiz
- learn from working examples
- upload drafts to the Oasiz platform
- contribute examples or tooling improvements back to Oasiz

## Privacy And Contribution Workflow

Choose the workflow that matches your goal:

### Option 1: Private development
If you want privacy, clone this repository locally and push it to your own private repository. Do not use a public fork if you want your in-progress source to stay private.

```bash
git clone https://github.com/oasiz-ai/oasiz-developer.git
cd oasiz-developer
```

Then create your own private repo and push your copy there.

### Option 2: Contribute back to Oasiz
If you want to contribute your game or tooling changes back to this repository, fork this repo, make your changes, and submit a pull request when ready.

Important:
- a fork of a public GitHub repository is public
- if you need privacy before contribution, use a private copy instead of a public fork

## Repository Contents

```text
oasiz-developer/
├── block-blast/        # Example game
├── extended-golf/      # Example game
├── scripts/            # CLI and upload pipeline
├── template/           # Reusable starter project
├── templates/          # Main.ts scaffolding templates for the CLI
├── AGENTS.md           # Oasiz gameplay and platform rules
├── env.example         # Upload environment template
└── README.md
```

## Quick Start

### 1. Install Bun
Oasiz developer tooling uses Bun. Install Bun first if you do not already have it.

### 2. Clone the repository
```bash
git clone https://github.com/oasiz-ai/oasiz-developer.git
cd oasiz-developer
```

### 3. Install root tooling
```bash
bun install
```

### 4. Inspect the CLI
```bash
bun run oasiz info
```

### 5. Create a new game
```bash
bun run oasiz create my-new-game
```

### 6. Start building
```bash
cd my-new-game
bun install
bun run dev
```

## Example Games

Use these as references for production-quality structure and platform integration:
- `block-blast/`
- `extended-golf/`

## How To Develop Games On Oasiz

### Core rules
- Use TypeScript for gameplay code.
- Keep CSS in `index.html` when using the standard HTML5 starter layout.
- Test on both desktop and mobile.
- Respect safe areas for top controls and HUD.
- Every game must include a settings button with toggles for Music, FX, and Haptics.
- Do not store best score or leaderboard state locally. Oasiz handles score persistence.
- Stop animation loops when the game is backgrounded or hidden.

### Recommended workflow
1. Start from `bun run oasiz create my-game` or duplicate one of the examples.
2. Build the core loop first.
3. Integrate the Oasiz SDK early.
4. Add responsive HUD, settings, haptics, and score submission.
5. Test locally.
6. Upload a draft to Oasiz and test on the app.
7. Iterate until it meets the submission bar.

## Oasiz SDK

### HTML5 / TypeScript games
Install the SDK inside your game project:

```bash
bun add @oasiz/sdk
```

Import it in your game code:

```ts
import { oasiz } from "@oasiz/sdk";
```

Typical usage:

```ts
oasiz.emitScoreConfig({
  anchors: [
    { raw: 10, normalized: 100 },
    { raw: 30, normalized: 300 },
    { raw: 75, normalized: 600 },
    { raw: 200, normalized: 950 }
  ]
});

oasiz.gameplayStart();
oasiz.submitScore(score);
oasiz.triggerHaptic("medium");
```

Use the SDK for:
- `submitScore()`
- `emitScoreConfig()`
- `triggerHaptic()`
- `gameplayStart()` / `gameplayStop()`
- `loadGameState()` / `saveGameState()` / `flushGameState()`
- `onPause()` / `onResume()`
- `shareRoomCode()` for multiplayer games

### Unity WebGL games
For Unity WebGL or no-build HTML integrations, use the CDN version of the SDK:

```html
<script src="https://www.oasiz.gg/sdk/v1/oasiz.min.js"></script>
```

This exposes `window.oasiz`. Your Unity WebGL bridge layer should call into `window.oasiz` for score submission, haptics, lifecycle hooks, and room sharing.

Recommended Unity integration points:
- call `window.oasiz.submitScore(score)` at game over
- call `window.oasiz.gameplayStart()` when active play begins
- call `window.oasiz.gameplayStop()` on pause, menu, or game over
- call `window.oasiz.triggerHaptic("light" | "medium" | "heavy" | "success" | "error")` for gameplay feedback
- wire pause and resume behavior so your render loop or time scale behaves correctly when the app backgrounds

## CLI And Upload Pipeline

The Oasiz CLI is included in this repository.

### Authentication
Browser login:

```bash
bun run oasiz login
```

Verify auth:

```bash
bun run oasiz whoami
```

If needed, set your registered account email in the shell:

```bash
export OASIZ_EMAIL="your-registered-email@example.com"
```

### Main commands
```bash
bun run oasiz info
bun run oasiz create my-game
bun run oasiz list
bun run oasiz upload my-game
bun run oasiz upload my-game --dry-run
bun run oasiz upload my-game horizontal
bun run oasiz versions my-game
bun run oasiz activate my-game
```

### Environment setup
Copy `env.example` and set the values in your shell or local env file.

```bash
export OASIZ_UPLOAD_TOKEN="your_upload_token"
export OASIZ_EMAIL="your-registered-email@example.com"
# Optional
export OASIZ_API_URL="http://localhost:3001/api/upload/game"
```

### Upload flow
1. Build the game.
2. The CLI reads `dist/index.html`.
3. Static assets from `dist/` are collected and uploaded.
4. A thumbnail is included if `thumbnail/` exists.
5. The upload is created as a draft or activated live depending on your command.

## Game Requirements

### File size limits
A key factor of a web game's success is the time it takes for a user to start playing. This is why we enforce strict file size limits.

| Limit | Requirement |
| --- | --- |
| Initial download | `<= 50 MB` |
| Total file size | `<= 250 MB` |

The initial download size is measured from the start of loading until the game reaches a playable state. This includes menus and any intermediate loading steps.

For externally hosted or lazy-loaded assets, our team evaluates based on time to reach gameplay. Target under 20 seconds on a standard connection.

### Gameplay review requirements
Our team performs several visual and functional checks on each submitted game. Ensure your game meets the following criteria.

- Readable content: text and images must be legible on a `devicePixelRatio: 1` screen at common iframe sizes. Key targets are `907x510`, `1216x684`, `1366x768`, `1920x1080` on desktop and `800x450` on mobile.
- Language support: the game must have English localization. If translations are included they must be accurate and high quality.
- No cross-promotion: the game must not cross-promote external platforms or unrelated titles. Community links such as Discord or a developer website are allowed in the menu as long as they do not lead to another playable game.
- Content rating: the game must be appropriate for audiences aged 13 and above.

### Onboarding and first impression
For a game to be successful, users must reach gameplay quickly, understand what the game is about, and know how to control it.

- New players should land directly in gameplay. If a start screen is necessary, a maximum of one click from it to active gameplay is allowed.
- Implement onboarding inside gameplay rather than in a separate tutorial screen. Focus on the core mechanic so players can start immediately.
- Make the onboarding phase skippable.
- Buttons must be clearly labeled to indicate how to proceed. Avoid ambiguous or unlabeled actions.
- Buttons must not have artificial delays or be sized to encourage unintended behavior.

### Quality guidelines
These guidelines are not mandatory, but they are strongly recommended based on our experience with high-performing games on Oasiz.

- Clear goals: players should always know what they are working toward. Provide clear objectives, feedback loops, and progression signals.
- Intuitive controls: controls must be consistent and intuitive throughout the game. Avoid re-mapping actions between scenes or states.
- High-quality graphics: games should be visually consistent at high resolution, free of compression artifacts, graphical defects, and sudden style shifts.
- High-quality audio: audio levels must be consistent throughout the game. Music and sound effects should support the experience without being too loud or too quiet.
- Unique identity: the game name and imagery must accurately reflect what the player will experience. Avoid using well-known identifiers unless you own the IP.
- Keyboard layout awareness: prefer key bindings that adapt to the player's keyboard layout rather than requiring remapping. Note that WASD maps to ZQSD on AZERTY layouts.

## Submission Checklist

Before uploading, make sure your game:
- works on both desktop and mobile
- handles resize cleanly
- has a settings modal with Music, FX, and Haptics toggles
- submits score at the correct time
- uses haptics thoughtfully
- respects top safe areas on desktop and mobile
- avoids heavy first-load downloads
- is polished enough for storefront-quality presentation

## Additional Guidance

Read `AGENTS.md` for the full Oasiz gameplay, SDK, lifecycle, and performance rules.
