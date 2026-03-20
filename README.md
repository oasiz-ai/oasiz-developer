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

- **HTML5 / TypeScript:** [**@oasiz/sdk** on npm](https://www.npmjs.com/package/@oasiz/sdk) — install in your game project (`bun add @oasiz/sdk@latest` for the latest registry release). The npm package README is the canonical API reference.
- **Unity WebGL:** use the **Unity SDK** (`.unitypackage`) below so your WebGL build talks to the host through the bundled bridge. For bare HTML templates without the package, you can still load the **CDN** script.

### HTML5 / TypeScript games

```bash
bun add @oasiz/sdk
```

```ts
import { oasiz } from "@oasiz/sdk";
```

Typical flow:

```ts
// 1. Score normalization — call once on startup (four anchors, strictly increasing raw values)
oasiz.emitScoreConfig({
  anchors: [
    { raw: 30, normalized: 100 },
    { raw: 60, normalized: 300 },
    { raw: 120, normalized: 600 },
    { raw: 300, normalized: 950 },
  ],
});

// 2. Persisted state (plain JSON object; validate fields after load)
const state = oasiz.loadGameState();
oasiz.saveGameState({ level: 1 });
oasiz.flushGameState(); // optional: force write before unload / game over

// 3. Gameplay feedback and final score
oasiz.triggerHaptic("medium");
oasiz.submitScore(score);

// 4. App lifecycle — pause loops and audio when backgrounded
oasiz.onPause(() => {
  /* stop rAF, pause audio */
});
oasiz.onResume(() => {
  /* resume when safe */
});
```

**Score and haptics**

| API | Role |
| --- | --- |
| `submitScore(score: number)` | Submit the final score once per session at game over (non-negative integer; floats are floored). |
| `emitScoreConfig(config)` | Map raw scores to the platform scale. Exactly four anchors; `normalized` must be `100`, `300`, `600`, and `950` in order; `raw` values strictly increasing. |
| `triggerHaptic(type)` | `"light"` \| `"medium"` \| `"heavy"` \| `"success"` \| `"error"` — respect the player’s haptics setting in your game. |

**Game state**

| API | Role |
| --- | --- |
| `loadGameState()` | Returns `Record<string, unknown>` (empty object if none). |
| `saveGameState(state)` | Debounced save to the platform. |
| `flushGameState()` | Immediate write (e.g. before close or game over). |

**Lifecycle**

| API | Role |
| --- | --- |
| `onPause(cb)` / `onResume(cb)` | Subscribe to host foreground/background; each returns an unsubscribe function. |

**Navigation**

| API | Role |
| --- | --- |
| `onBackButton(cb)` | Handle platform back / Escape while subscribed. |
| `onLeaveGame(cb)` | Host is closing the game — light cleanup (e.g. flush state). |
| `leaveGame()` | Ask the host to exit the game (e.g. Quit button). |

**Multiplayer**

| API | Role |
| --- | --- |
| `shareRoomCode(code, options?)` | Set active room code, or `null` when leaving. Optional `{ inviteOverride: true }` if your UI owns the invite entry point. |
| `openInviteModal()` | Open the platform invite sheet when a room code is already set. |

**Debugging**

| API | Role |
| --- | --- |
| `enableLogOverlay(options?)` | Optional in-iframe log mirror for local QA; returns `{ show, hide, clear, destroy, isVisible }`. |

**Injected read-only values** (check for `undefined` before use)

| Property | Role |
| --- | --- |
| `oasiz.gameId` | Platform game id. |
| `oasiz.roomCode` | Pre-filled room for join flows. |
| `oasiz.playerName` / `oasiz.playerAvatar` | Player identity for multiplayer UI. |

The same helpers are available as **named exports** (for example `submitScore`, `shareRoomCode`, `getGameId`, `getRoomCode`, `getPlayerName`, `getPlayerAvatar`, …) if you prefer not to use the `oasiz` object. Type-only imports include `GameState`, `HapticType`, `ScoreConfig`, `ScoreAnchor`, `LogOverlayOptions`, and others.

When the host bridge is not present (local dev), calls are safe no-ops and the SDK may log a console notice.

### Unity SDK

If your Unity game needs the Oasiz SDK, install it into the Unity project **before** building WebGL.

**Download the Unity package:** [OasizSDK.unitypackage](https://assets.oasiz.ai/sdk/unity/OasizSDK.unitypackage)

**In Unity:**

1. Open your Unity project under `Unity/YourGame/`.
2. Go to **Assets → Import Package → Custom Package…**
3. Select `OasizSDK.unitypackage` and import it into the project.

The SDK should end up inside your Unity project’s `Assets/` folder, for example:

```text
Unity/
└── YourGame/
    ├── Assets/
    │   └── OasizSDK/
    │       ├── Runtime/
    │       │   ├── OasizSDK.cs
    │       │   ├── OasizTypes.cs
    │       │   ├── com.oasiz.sdk.Runtime.asmdef
    │       │   └── Plugins/
    │       │       └── WebGL/
    │       │           └── OasizBridge.jslib
    │       └── ...
    ├── ProjectSettings/
    ├── Packages/
    ├── publish.json
    └── Build/
```

Keep **all** Unity game files inside `Unity/YourGame/`. Do not put Unity scenes, scripts, textures, or project settings at the repo root.

#### Unity SDK quick start

Initialize the SDK early in your game’s lifecycle so it can register WebGL bridge listeners and survive scene changes:

```csharp
using System.Collections.Generic;
using Oasiz;
using UnityEngine;

public class GameManager : MonoBehaviour
{
    private void Awake()
    {
        _ = OasizSDK.Instance;

        var state = OasizSDK.LoadGameState();
        // Restore progress from `state` as needed
        OasizSDK.OnPause += HandlePause;
        OasizSDK.OnResume += HandleResume;
    }

    private void OnGameOver(int score, int currentLevel)
    {
        OasizSDK.SaveGameState(new Dictionary<string, object>
        {
            ["level"] = currentLevel,
        });
        OasizSDK.FlushGameState();
        OasizSDK.SubmitScore(score);
        OasizSDK.TriggerHaptic(HapticType.Error);
    }

    private void HandlePause()
    {
        // Pause gameplay/audio here
    }

    private void HandleResume()
    {
        // Resume gameplay/audio here
    }
}
```

### Unity WebGL (CDN only)

If you are **not** using the Unity package, inject the CDN build in your host or template HTML:

```html
<script src="https://www.oasiz.gg/sdk/v1/oasiz.min.js"></script>
```

This exposes `window.oasiz` with the same surface as the npm package: score APIs, haptics, game state, pause/resume, back/leave navigation, room code and invite modal, log overlay, and the read-only `gameId` / `roomCode` / `playerName` / `playerAvatar` properties.

Suggested calls from JavaScript or a minimal bridge:

- `window.oasiz.emitScoreConfig(...)` once during initialization
- `window.oasiz.submitScore(score)` at game over
- `window.oasiz.saveGameState` / `flushGameState` as needed
- `window.oasiz.onPause` / `onResume` so time scale and audio follow the app lifecycle
- `window.oasiz.shareRoomCode` / `openInviteModal` for multiplayer
- `window.oasiz.triggerHaptic(...)` when the player has haptics enabled

## CLI And Upload Pipeline

The Oasiz CLI is included in this repository.

### Before you upload

1. **Create an Oasiz account** using whatever email you want.
2. Copy `env.example` to `.env`.
3. Set **`OASIZ_EMAIL`** in `.env` to your own Oasiz account email.
4. Keep **`OASIZ_API_URL`** set to `https://oasiz.gg/api/upload/game`.
5. Set **`OASIZ_UPLOAD_TOKEN`** to the shared upload token provided by the Oasiz team.

### Environment setup

Copy the template and update your email:

```bash
cp env.example .env
```

Your `.env` should look like this:

```bash
OASIZ_EMAIL="you@example.com"
OASIZ_API_URL="https://oasiz.gg/api/upload/game"
OASIZ_UPLOAD_TOKEN="your_shared_upload_token"
```

Use your **own** Oasiz account email for `OASIZ_EMAIL`. The API URL and upload token are shared values.

The CLI reads values from the shell environment. Before running `bun run oasiz ...`, load `.env` into your shell:

```bash
set -a
source .env
set +a
```

Then you can verify the env is available:

```bash
bun run oasiz whoami
```

### Commands reference

| Command | What it does |
| --- | --- |
| `bun run oasiz info` | Prints the same help as `bun run oasiz` with no arguments: all commands and upload flags. |
| `bun run oasiz create [name]` | Interactive wizard: game name/slug, pick a template from `templates/`, scaffolds a new folder with `publish.json`, `src/main.ts`, and `index.html`. Optional `--template <name>` (or a second positional) selects the template without the menu. |
| `bun run oasiz list` | Lists local game folders next to the repo (each with ✓ if `publish.json` exists, ○ otherwise). |
| `bun run oasiz games` | Calls the platform API and lists your games (title, draft count, live label, last updated). Requires auth. |
| `bun run oasiz upload <game>` | Validates the game folder, runs the project build (unless skipped), bundles `dist/index.html` and assets, optionally attaches `thumbnail/`, uploads to the platform, then walks you through draft vs live (unless flags override). Requires auth unless `--dry-run`. |
| `bun run oasiz versions <game>` | Resolves the game by local folder / `publish.json` title, fetches drafts from the platform, prints labels with relative upload time and which build is live. Requires auth. |
| `bun run oasiz activate <game>` | Lists remote drafts for that title and prompts you to choose one to promote to **live** (replaces the current live build). Requires auth. |

`oasiz new` is accepted as a deprecated alias for `oasiz create`.

### `upload` flags and orientation

Append these to `bun run oasiz upload <game>`:

| Flag / argument | What it does |
| --- | --- |
| `--dry-run` | Builds (unless `--skip-build`), prints payload summary and size breakdown, **does not** upload or require auth. |
| `--skip-build` | Uses existing `dist/` without running the game’s build script. |
| `--draft` | Upload only as a draft; skips the interactive “make live?” prompt afterward. |
| `--activate` | Upload and set the new build live immediately (no draft-only prompt). |
| `horizontal` | Forces landscape: sets `verticalOnly` to false for this upload (overrides `publish.json` for this run). |
| `vertical` | Forces portrait-only: sets `verticalOnly` to true for this upload. |

Examples:

```bash
bun run oasiz upload my-game --dry-run
bun run oasiz upload my-game horizontal
```

### Environment setup

Use the **same email** you used for your Oasiz account. Upload authentication comes from the shared environment token, not from browser login.

```bash
cp env.example .env
set -a
source .env
set +a
```

Set `OASIZ_EMAIL` in `.env` to your own email. Keep `OASIZ_API_URL` and `OASIZ_UPLOAD_TOKEN` aligned with the shared team values from `env.example`.

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
- works on mobile
- handles resize cleanly
- has a settings modal with Music, FX, and Haptics toggles
- submits score at the correct time
- uses haptics thoughtfully
- respects top safe areas on mobile
- avoids heavy first-load downloads
- is polished enough for storefront-quality presentation

## Additional Guidance

Read `AGENTS.md` for the full Oasiz gameplay, SDK, lifecycle, and performance rules.
