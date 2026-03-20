# Oasiz Developer Rules

Use these rules for any game built in this repository.

## SDK Integration
- Install the SDK in HTML5 projects with `bun add @oasiz/sdk`.
- Import once in game logic files: `import { oasiz } from "@oasiz/sdk";`
- For Unity WebGL or no-build HTML, use `<script src="https://www.oasiz.gg/sdk/v1/oasiz.min.js"></script>` and call `window.oasiz` from your bridge layer.
- Use `oasiz.*` methods instead of custom platform bridge code.

## Required Platform Features
- Call `oasiz.emitScoreConfig()` once during initialization with four anchors.
- Call `oasiz.submitScore(score)` at the correct scoring moment for the game type.
- Call `oasiz.gameplayStart()` and `oasiz.gameplayStop()` on play, pause, resume, and game-over transitions.
- Wire `oasiz.onPause()` and `oasiz.onResume()` so game loops stop when backgrounded and resume safely.
- Use `oasiz.loadGameState()` and `oasiz.saveGameState()` for cross-session game progress.
- For multiplayer games, use Playroom Kit and call `oasiz.shareRoomCode()` when the room is active.

## Visual And UX Requirements
- Games must be polished, professional, and fully playable on desktop and mobile.
- Every game must have a settings button with toggles for Music, FX, and Haptics.
- Settings and top-corner controls must respect safe areas: `45px` from the top on desktop and `120px` on mobile.
- Start screens should be clean and fast. If present, active gameplay must be reachable in one click.
- Onboarding should happen inside gameplay, be clear, and be skippable.
- Text and imagery must remain readable at common iframe sizes.

## Technical Requirements
- Use TypeScript for gameplay logic.
- Put CSS in `index.html` when using the starter template.
- Handle resize events and support both portrait and landscape contexts where appropriate.
- Do not use random values inside render loops.
- Do not keep requestAnimationFrame running while the app is backgrounded.
- Do not track persistent leaderboard or best-score state locally.

## Submission Requirements
- Initial download must stay at or below `50 MB`.
- Total file size must stay at or below `250 MB`.
- Externally hosted or lazy-loaded content must still reach gameplay in under 20 seconds on a standard connection.
- The game must support English.
- The game must not cross-promote unrelated games or external platforms.
- The game must be appropriate for audiences aged 13 and above.

## Recommended Examples
- `block-blast/` for an HTML5 example.
- `extended-golf/` for a more advanced example structure.
