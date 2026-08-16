import { Bullet } from "./Bullet.js";
import { Enemy } from "./Enemy.js";
import { Turret } from "./Turret.js";

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const WIDTH = 600;
const HEIGHT = 600;

const mousePosition = { x: 0, y: 0 };
document.addEventListener("mousemove", (e) => {
  mousePosition.x = e.clientX;
  mousePosition.y = e.clientY;
});

let redBullets = [];
let enemies = [];
document.addEventListener("click", (e) => {
  const dx = e.clientX - WIDTH / 2;
  const dy = e.clientY - (HEIGHT - 50);

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
  enemies = enemies.filter((e) => !e.damaged);

  turret.targetEnemy(enemies);
  turret.update();
}

function draw() {
  ctx.clearRect(0, 0, WIDTH, HEIGHT);

  // player sprite
  ctx.fillStyle = "#f00";
  ctx.fillRect(WIDTH / 2 - 20, HEIGHT - 10, 40, 10);

  // aim line
  ctx.strokeStyle = "#f00";
  ctx.beginPath();
  ctx.moveTo(WIDTH / 2, HEIGHT - 10);
  ctx.lineTo(mousePosition.x, mousePosition.y);
  ctx.stroke();

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
