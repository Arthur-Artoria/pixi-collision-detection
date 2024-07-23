import * as PIXI from 'pixi.js';

export class PIXIApp {
  static instance: PIXIApp;

  static getInstance(): PIXIApp {
    if (!PIXIApp.instance) {
      this.instance = new PIXIApp();
    }
    return PIXIApp.instance;
  }

  app!: PIXI.Application;

  get width(): number {
    return this.app?.screen?.width;
  }

  get height(): number {
    return this.app?.screen?.height;
  }

  constructor() {
    if (PIXIApp.instance) {
      throw new Error('PIXIApp is a singleton class');
    }
  }

  async init(container: HTMLElement = document.body) {
    await this.createApp(container);
  }

  destroy() {
    this.app.destroy();
  }

  private async createApp(container: HTMLElement) {
    const options = this.getPIXIOptions(container);

    this.app = new PIXI.Application();
    await this.app.init(options);
    container.appendChild(this.app.canvas);
  }

  private getPIXIOptions(container: HTMLElement): Partial<PIXI.ApplicationOptions> {
    const resizeTo = container;
    const backgroundColor = 'rgb(0, 0, 0)';
    return { resizeTo, backgroundColor };
  }
}
