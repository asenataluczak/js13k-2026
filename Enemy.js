export class Enemy {
  size = 30;
  color = "#fff";
  x;
  y;
  speed = 1;
  ctx;
  damaged = false;
  targetedByOrangeTurret = false;

  constructor(ctx) {
    this.ctx = ctx;
    this.x = Math.random() * (600 - this.size);
    this.y = 0;
    this.draw();
  }

  update() {
    this.y += this.speed;
  }

  draw() {
    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(this.x, this.y, this.size, this.size);

    if (this.targetedByOrangeTurret) {
      this.ctx.strokeStyle = "#FF7F00";
      this.ctx.setLineDash([8, 3]);
      this.ctx.lineWidth = 2;
      this.ctx.strokeRect(this.x, this.y, this.size, this.size);
      this.ctx.setLineDash([]);
    }
  }

  damage() {
    this.damaged = true;
  }
}
