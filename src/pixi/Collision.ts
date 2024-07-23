import { Bump } from '../libs/bump';
import { PIXIApp } from './PIXIApp';
import { Square } from './Square';

export class Collision {
  bump!: Bump;
  squareList: Square[] = [];

  init() {
    this.createBump()
    this.createSquareList()
    this.addListenerList()
  }

  destroy() {
    this.removeListenerList()
  }

  private createBump() {
    this.bump = new Bump(PIXIApp.getInstance());
  }

  private createSquareList() {
    this.squareList = [];
    Array(20)
      .fill(null)
      .forEach(() => {
        const square = new Square();
        this.squareList.push(square);
        PIXIApp.instance.app.stage.addChild(square);
      });
  }

  private addListenerList() {
    PIXIApp.instance.app.ticker.add(this.handleTicker);
    window.addEventListener('devicemotion', this.handleDevicemotion, true);
  }

  private removeListenerList() {
    PIXIApp.instance.app.ticker.remove(this.handleTicker);
    window.removeEventListener('devicemotion', this.handleDevicemotion, true);
  }

  private handleDevicemotion = (event: DeviceMotionEvent) => {
    // 获取加速度数据
    const acceleration = event.accelerationIncludingGravity;

    if (!acceleration) return;

    // 计算摇晃的幅度
    const x = acceleration.x ?? 0;
    const y = acceleration.y ?? 0;
    const z = acceleration.z ?? 0;
    const accelerationVector = Math.sqrt(x * x + y * y + z * z);

    // 设定一个阈值来判断是否为摇晃
    const threshold = 15; // 这个值可以根据需要调整

    if (accelerationVector > threshold) {
      this.squareList.forEach(square => {
        square.accelerate(accelerationVector * 0.02);
      });
    }
  };

  private handleTicker = () => {
    const { width, height } = PIXIApp.instance;
    const container = { x: 0, y: 0, width, height }

    this.squareList.forEach(square => {
      square.move();
      this.bump.contain(square, container, true);
    });
    this.bump.multipleCircleCollision(this.squareList);
  };
}
