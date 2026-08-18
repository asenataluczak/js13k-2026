import { Bullet } from "./Bullet.js";
import { Enemy } from "./Enemy.js";
import { Turret } from "./Turret.js";
import { Player } from "./Player.js";

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const mousePosition = { x: 0, y: 0 };
document.addEventListener("mousemove", (e) => {
  mousePosition.x = e.clientX;
  mousePosition.y = e.clientY;
});

const colors = [
  { r: 148, g: 0, b: 211 }, // violet
  { r: 75, g: 0, b: 130 }, // indigo
  { r: 0, g: 0, b: 255 }, // blue
  { r: 0, g: 128, b: 0 }, // green
  { r: 255, g: 255, b: 0 }, // yellow
  { r: 255, g: 127, b: 0 }, // orange
  { r: 255, g: 0, b: 0 }, // red
];

function interpolateColor(a, b, t) {
  return {
    r: Math.round(a.r + (b.r - a.r) * t),
    g: Math.round(a.g + (b.g - a.g) * t),
    b: Math.round(a.b + (b.b - a.b) * t),
  };
}

const durationPerColor = 60000;
const startIndex = 0;

let manualShootingInProgress = false;
document.addEventListener("mousedown", (e) => {
  manualShootingInProgress = true;
});

document.addEventListener("mouseup", (e) => {
  manualShootingInProgress = false;
});

let currColor = colors[startIndex];

let redBullets = [];
let enemies = [];
document.addEventListener("click", (e) => {
  const dx = e.clientX - player.x;
  const dy = e.clientY - (canvas.height - 10);

  const newBullet = new Bullet({
    ctx,
    color: currColor,
    x: player.x + 15,
    y: player.y,
  });
  redBullets.push(newBullet);
});

const turret = new Turret(ctx, currColor);

const player = new Player(ctx, mousePosition.x, canvas.height - 10, currColor);

function updatePhysics(previousTimeMs) {
  if (previousTimeMs % 7 === 0 || enemies.length < 2) {
    const newEnemy = new Enemy({
      ctx,
    });
    enemies.push(newEnemy);
  }
  redBullets.forEach((b) => {
    b.update();
    if (b.y < 0) {
      const newEnemy = new Enemy({
        ctx,
        x: b.x,
        size: 15,
        speed: 3,
        maxHealth: 50,
      });
      enemies.push(newEnemy);
    }
  });

  redBullets = redBullets.filter((b) => !b.checkCollision(enemies));

  enemies.forEach((e) => {
    e.update();
  });
  enemies = enemies.filter((e) => !e.isDead);

  // turret.targetEnemy(enemies);
  // turret.update();

  player.update(mousePosition.x);
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // red bullets
  redBullets.forEach((b) => {
    b.draw();
  });
  // enemies
  enemies.forEach((e) => {
    e.draw();
  });

  // turret
  // turret.draw();
  // player sprite
  player.draw(currColor, manualShootingInProgress, mousePosition);

  ctx.rect(0, 0, canvas.width, canvas.height);
  ctx.strokeStyle = currColor;
  ctx.stroke();
}

const MAX_FPS = 60;
const FRAME_INTERVAL_MS = 1000 / MAX_FPS;
let previousTimeMs = 0;

function update(timestamp) {
  const deltaTimeMs = timestamp - previousTimeMs;
  if (deltaTimeMs >= FRAME_INTERVAL_MS) {
    const transition =
      (startIndex + Math.floor(previousTimeMs / durationPerColor)) %
      colors.length;

    const t = (previousTimeMs % durationPerColor) / durationPerColor;

    const color1 = colors[transition];
    const color2 = colors[(transition + 1) % colors.length];

    const color = interpolateColor(color1, color2, t);
    currColor = `rgb(${color.r}, ${color.g}, ${color.b})`;

    updatePhysics(previousTimeMs);
    previousTimeMs = timestamp;
  }

  draw();

  requestAnimationFrame(update);
}
requestAnimationFrame(update);
