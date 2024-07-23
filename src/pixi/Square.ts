import * as PIXI from 'pixi.js';
import { PIXIApp } from './PIXIApp';
import { random } from '../utils/random';

export class Square extends PIXI.Graphics {

  // 速度
  vx = random(-3, 3)
  vy = random(-3, 3)
  // 质量
  mass = random(1, 3)

  circular = true

  constructor() {
    super()
    this.init()
  }

  private init() {
    this.circle(10, 10, 10);
    this.fill(Math.random() * 0xffffff);
    this.setStyle();
    this.setPosition();
  }

  private setStyle() {
    this.width = 20;
    this.height = 20;
  }

  private setPosition() {
    const { width, height } = PIXIApp.instance;
    this.x = Math.random() * width;
    this.y = Math.random() * height;
  }

  accelerate(acceleration: number) {
    if (this.vx < 0) {
      this.vx -= acceleration;
    } else {
      this.vx += acceleration;
    }
    if (this.vy < 0) {
      this.vy -= acceleration;
    } else {
      this.vy += acceleration;
    }
  }

  move() {
    this.x += this.vx
    this.y += this.vy
  }
}
