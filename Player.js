export class Player {
  color;
  x;
  y;
  ctx;

  constructor(ctx, x, y, color) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.color = color;

    this.draw(this.color);
  }

  update(x) {
    if (x < 20) {
      this.x = 0;
      return;
    }
    if (x > 600 - 40) {
      this.x = 600 - 40;
      return;
    }
    this.x = x - 20;
  }

  draw(selectedManualColor, manualShootingInProgress, mousePos) {
    this.ctx.fillStyle = selectedManualColor;
    this.ctx.fillRect(this.x, this.y, 40, 10);

    // aim line
    if (mousePos) {
      this.ctx.strokeStyle = selectedManualColor;
      this.ctx.beginPath();
      this.ctx.save();
      if (manualShootingInProgress) {
        this.ctx.shadowColor = selectedManualColor;
        this.ctx.shadowBlur = 20;
      } else {
        this.ctx.shadowBlur = 0;
      }
      this.ctx.lineWidth = 2;
      const gap = 3;
      const size = 4;
      this.ctx.moveTo(mousePos.x - gap, mousePos.y - gap - size);
      this.ctx.lineTo(mousePos.x - gap, mousePos.y - gap);
      this.ctx.lineTo(mousePos.x - gap - size, mousePos.y - gap);
      this.ctx.moveTo(mousePos.x + gap, mousePos.y - gap - size);
      this.ctx.lineTo(mousePos.x + gap, mousePos.y - gap);
      this.ctx.lineTo(mousePos.x + gap + size, mousePos.y - gap);
      this.ctx.moveTo(mousePos.x + gap + size, mousePos.y + gap);
      this.ctx.lineTo(mousePos.x + gap, mousePos.y + gap);
      this.ctx.lineTo(mousePos.x + gap, mousePos.y + gap + size);
      this.ctx.moveTo(mousePos.x - gap - size, mousePos.y + gap);
      this.ctx.lineTo(mousePos.x - gap, mousePos.y + gap);
      this.ctx.lineTo(mousePos.x - gap, mousePos.y + gap + size);
    }
    this.ctx.stroke();
    this.ctx.restore();
  }
}
