export class Bullet {
  size;
  color;
  x;
  y;
  speed;
  angle;
  ctx;

  constructor({
    ctx,
    angle,
    x = 600 / 2 - 5,
    y = 600 - 10,
    size = 10,
    color = "#f00",
    speed = 6,
  }) {
    this.ctx = ctx;
    this.angle = angle;
    this.x = x;
    this.y = y;
    this.size = size;
    this.color = color;
    this.speed = speed;
    this.draw();
  }

  update() {
    this.x += this.speed * Math.cos(this.angle);
    this.y += this.speed * Math.sin(this.angle);
  }

  draw() {
    this.ctx.fillStyle = this.color;
    this.ctx.strokeStyle = this.color;
    this.ctx.strokeRect(this.x, this.y, this.size, this.size);
    this.ctx.fillRect(this.x, this.y, this.size, this.size);
  }

  checkCollision(colliders) {
    const outOfBounds =
      this.x < 0 || this.x > 600 || this.y < 0 || this.y > 600;
    if (outOfBounds) return true;

    for (const collider of colliders) {
      const bulletRight = this.x + this.size;
      const bulletTop = this.y;
      const bulletLeft = this.x;
      const bulletBottom = this.y + this.size;
      const enemyRight = collider.x + collider.size;
      const enemyBottom = collider.y + collider.size;
      const enemyLeft = collider.x;
      const enemyTop = collider.y;

      if (
        bulletRight > enemyLeft &&
        bulletLeft < enemyRight &&
        bulletBottom > enemyTop &&
        bulletTop < enemyBottom
      ) {
        collider.damage();
        return true;
      }
    }

    return false;
  }
}
