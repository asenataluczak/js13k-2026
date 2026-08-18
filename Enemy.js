export class Enemy {
  size = 30;
  color = "#fff";
  x;
  y;
  speed = 1;
  ctx;
  maxHealth;
  currentHealth;
  isDead = false;
  isDamagedByColor;
  targetedByOrangeTurret = false;

  constructor({
    ctx,
    maxHealth = 100,
    size = 30,
    x = Math.random() * (600 - this.size),
    speed = Math.ceil(Math.random() * 2),
  }) {
    this.ctx = ctx;
    this.x = x;
    this.y = 0;
    this.size = size;
    this.maxHealth = maxHealth;
    this.currentHealth = this.maxHealth;

    this.speed = speed;

    console.log(this.x, this.size, this.maxHealth, this.speed);

    this.draw();
  }

  update() {
    this.y += this.speed;
  }

  draw() {
    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(this.x, this.y, this.size, this.size);

    if (this.isDamagedByColor) {
      this.ctx.strokeStyle = this.isDamagedByColor;
      this.ctx.lineWidth = 2;
      this.ctx.strokeRect(this.x, this.y, this.size, this.size);
      this.ctx.fillStyle = this.isDamagedByColor;

      const damageSize = Math.round(
        ((this.maxHealth - this.currentHealth) / this.maxHealth) * this.size,
      );
      this.ctx.fillRect(
        this.x,
        this.y + (this.size - damageSize),
        this.size,
        damageSize > this.size ? this.size : damageSize,
      );
    }

    if (this.targetedByOrangeTurret) {
      this.ctx.strokeStyle = "hsl(30, 100%, 50%)";
      this.ctx.setLineDash([8, 3]);
      this.ctx.lineWidth = 2;
      this.ctx.strokeRect(this.x, this.y, this.size, this.size);
      this.ctx.setLineDash([]);
    }
  }

  damage(damagePoints, color) {
    if (this.currentHealth === 100) {
      this.isDamagedByColor = color;
    }

    this.currentHealth -= damagePoints;
    if (this.currentHealth <= 0) {
      this.isDead = true;
    }
  }
}
