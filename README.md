# 🦋 Flap Morty

A Flappy Bird-style arcade game starring **Butterfly Morty**, built from scratch with **vanilla JavaScript** and the **HTML5 Canvas API** — no frameworks, no dependencies, no build step.

Tap to flap your way through a city full of obstacles, rack up points, and earn medals. Simple to pick up, hard to master.

![JavaScript](https://img.shields.io/badge/JavaScript-Vanilla-F7DF1E?logo=javascript&logoColor=black)
![HTML5 Canvas](https://img.shields.io/badge/HTML5-Canvas-E34F26?logo=html5&logoColor=white)
![No dependencies](https://img.shields.io/badge/dependencies-none-brightgreen)

## 🎮 How to Play

- **Click / tap** anywhere to make Morty flap upward
- Gravity pulls him down — keep him airborne and dodge the obstacles
- Your score grows the longer you survive
- When you crash, check your score and medal, then hit **START** to try again

## 🏅 Medals

Your run is graded when the game ends:

| Medal | Score |
|-------|-------|
| 🥉 Bronze | 1 – 9 |
| 🥈 Silver | 10 – 14 |
| 🥇 Gold | 15 – 19 |
| 💎 Platinum | 20+ |

## ✨ Features

- **Smooth physics** tuned for that classic Flappy Bird feel — light gravity, gentle jump arc, and a capped fall speed so you always have a chance to recover
- **Progressive difficulty** — obstacles start slow and speed up as your score climbs
- **Fair hitboxes** — collision detection accounts for the sprite's transparent edges, so only real hits count
- **Animated sprites** — Morty's wings flap through a 3-frame animation cycle
- **Parallax scrolling** city skyline and moving ground
- **Sound effects** for jumps, points, and crashes
- **Score persistence** via `localStorage`
- **Responsive layout** — the game scales to your window height, framed by a sky-to-sunset gradient

## 🚀 Getting Started

No installation required. Clone and open:

```bash
git clone https://github.com/tonnon/flap-morty.git
cd flap-morty
```

Then open `index.html` in your browser — or serve it locally for the best experience:

```bash
npx serve .
```

## 🗂️ Project Structure

```
flap-morty/
├── index.html          # Page layout, styles and canvas
├── favicon.ico         # Butterfly Morty icon
├── sprites.png         # Sprite sheet (character, obstacles, UI, medals)
├── js/
│   └── game.js         # Game loop, physics, collisions and screens
└── assets/
    └── sounds/         # Jump, score and hit sound effects
```

## 🛠️ How It Works

The game runs on a `requestAnimationFrame` loop with a simple **screen state machine** (`INIT → GAME → GAME_OVER`). Each screen defines its own `draw`, `refresh` and `click` behavior. All visuals are drawn from a single sprite sheet, and physics are frame-based: gravity accumulates on the character's velocity every frame, and a click resets it to a fixed upward impulse.

## 📄 License

This is a fan-made project for learning purposes. Morty is a character from *Rick and Morty*, © Adult Swim.
