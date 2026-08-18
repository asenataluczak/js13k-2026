import { Bullet } from "./Bullet.js";

export class Turret {
  size = 40;
  color = '#f00'; //"#ff7f00";
  x = 600 / 2 - this.size / 2;
  y = 600 / 2 - 100;
  speed = 6;
  ctx;
  radius = 150;

  enemy;
  bullet;

  constructor(ctx) {
    this.ctx = ctx;
    this.draw();
  }

  update(enemyX, enemyY) {
    if (!this.enemy) return;

    if (!this.bullet) {
      this.bullet = new Bullet({
        ctx: this.ctx,
        angle: Math.atan2(
          this.enemy.y +
            this.enemy.size / 2 -
            2.5 -
            (this.y + this.size / 2 - 2.5),
          this.enemy.x +
            this.enemy.size / 2 -
            2.5 -
            (this.x + this.size / 2 - 2.5),
        ),
        x: this.x + this.size / 2 - 2.5,
        y: this.y + this.size / 2 - 2.5,
        size: 5,
        color: this.color,
        speed: 8,
        damage: 40,
      });
      return;
    }
    this.bullet?.update(
      Math.atan2(
        this.enemy.y +
          this.enemy.size / 2 -
          2.5 -
          (this.y + this.size / 2 - 2.5),
        this.enemy.x +
          this.enemy.size / 2 -
          2.5 -
          (this.x + this.size / 2 - 2.5),
      ),
    );
    if (this.bullet?.checkCollision([this.enemy])) {
      this.bullet = null;
    }
  }

  targetEnemy(enemies) {
    this.enemy = enemies.find((enemy) => {
      const distance = Math.hypot(enemy.x - this.x, enemy.y - this.y);
      enemy.targetedByOrangeTurret = false;
      return (
        distance <= this.radius &&
        (!enemy.isDamagedByColor || enemy.isDamagedByColor === this.color)
      );
    });
    if (this.enemy) {
      this.enemy.targetedByOrangeTurret = true;
    }
  }

  draw() {
    // turret range
    this.ctx.beginPath();
    this.ctx.arc(
      this.x + this.size / 2,
      this.y + this.size / 2,
      this.radius,
      0,
      2 * Math.PI,
    );
    this.ctx.fillStyle = "rgba(255, 127, 0, 0.03)";
    this.ctx.fill();

    // turret body
    this.ctx.fillStyle = this.color;
    this.ctx.strokeStyle = this.color;
    this.ctx.strokeRect(this.x, this.y, this.size, this.size);
    this.ctx.fillRect(this.x, this.y, this.size, this.size);

    // aim line
    if (!this.enemy) return;
    this.ctx.strokeStyle = this.color;
    this.ctx.beginPath();
    this.ctx.setLineDash([5, 5]);
    this.ctx.moveTo(this.x + this.size / 2, this.y + this.size / 2);
    this.ctx.lineTo(
      this.enemy.x + this.enemy.size / 2,
      this.enemy.y + this.enemy.size / 2,
    );
    this.ctx.stroke();
    this.ctx.setLineDash([]);

    this.bullet?.draw();
  }
}
