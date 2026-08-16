import { Bullet } from "./Bullet.js";
import { Enemy } from "./Enemy.js";
import { Turret } from "./Turret.js";

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const mousePosition = { x: 0, y: 0 };
document.addEventListener("mousemove", (e) => {
  mousePosition.x = e.clientX;
  mousePosition.y = e.clientY;
});

let redBullets = [];
let enemies = [];
document.addEventListener("click", (e) => {
  const dx = e.clientX - canvas.width / 2;
  const dy = e.clientY - (canvas.height - 10);

  const newBullet = new Bullet({
    ctx,
    angle: Math.atan2(dy, dx),
  });
  redBullets.push(newBullet);

  const newEnemy = new Enemy(ctx);
  enemies.push(newEnemy);
});

const turret = new Turret(ctx);

function updatePhysics() {
  redBullets.forEach((b) => {
    b.update();
  });

  redBullets = redBullets.filter((b) => !b.checkCollision(enemies));

  enemies.forEach((e) => {
    e.update();
  });
  enemies = enemies.filter((e) => !e.isDead);

  turret.targetEnemy(enemies);
  turret.update();
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
  turret.draw();

  // player sprite
  ctx.fillStyle = "#f00";
  ctx.fillRect(canvas.width / 2 - 20, canvas.height - 10, 40, 10);

  // aim line
  ctx.strokeStyle = "#f00";
  ctx.beginPath();
  ctx.moveTo(canvas.width / 2, canvas.height - 10);
  ctx.lineTo(mousePosition.x, mousePosition.y);
  ctx.stroke();
  ctx.lineWidth = 2;
  const gap = 3;
  const size = 4;
  ctx.moveTo(mousePosition.x - gap, mousePosition.y - gap - size);
  ctx.lineTo(mousePosition.x - gap, mousePosition.y - gap);
  ctx.lineTo(mousePosition.x - gap - size, mousePosition.y - gap);
  ctx.moveTo(mousePosition.x + gap, mousePosition.y - gap - size);
  ctx.lineTo(mousePosition.x + gap, mousePosition.y - gap);
  ctx.lineTo(mousePosition.x + gap + size, mousePosition.y - gap);
  ctx.moveTo(mousePosition.x + gap + size, mousePosition.y + gap);
  ctx.lineTo(mousePosition.x + gap, mousePosition.y + gap);
  ctx.lineTo(mousePosition.x + gap, mousePosition.y + gap + size);
  ctx.moveTo(mousePosition.x - gap - size, mousePosition.y + gap);
  ctx.lineTo(mousePosition.x - gap, mousePosition.y + gap);
  ctx.lineTo(mousePosition.x - gap, mousePosition.y + gap + size);
  ctx.stroke();
}

const MAX_FPS = 60;
const FRAME_INTERVAL_MS = 1000 / MAX_FPS;
let previousTimeMs = 0;

function update(timestamp) {
  const deltaTimeMs = timestamp - previousTimeMs;
  if (deltaTimeMs >= FRAME_INTERVAL_MS) {
    updatePhysics();
    previousTimeMs = timestamp;
  }

  draw();

  requestAnimationFrame(update);
}
requestAnimationFrame(update);
