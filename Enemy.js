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

  constructor(ctx) {
    this.ctx = ctx;
    this.x = Math.random() * (600 - this.size);
    this.y = 0;
    this.maxHealth = 100;
    this.currentHealth = this.maxHealth;

    const chanceOfPrefill = Math.round(Math.random() * 10);
    if (chanceOfPrefill === 1) {
      // const colors = ["#f00", "#ff7f00", "yellow", "green", "#0000FF", "#4B0082", "#9400D3"];
      const colors = ['#f00']
      this.isDamagedByColor = colors[Math.floor(Math.random() * colors.length)];
      this.currentHealth = this.maxHealth - Math.round(Math.random() * (this.maxHealth - 70) + 10);
    }
    const randomSpeed = Math.round(Math.random() * 2);
    this.speed = randomSpeed || this.speed;

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
    if (this.isDamagedByColor && this.isDamagedByColor !== color) return;

    this.currentHealth -= damagePoints;
    if (this.currentHealth <= 0) {
      this.isDead = true;
    }
  }
}
