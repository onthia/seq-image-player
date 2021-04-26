import { checkLowBattery, cover, checkIPhone } from './utils';

const isIPhone = checkIPhone();

const BASE_FPS = 60;
export interface SeqImagePlayerOption {
  fps?: number;
  frameStep?: number;
  container: HTMLElement;
  imageSource: string[];
  autoplay?: boolean;
}

export default class SeqImagePlayer {
  fps: number; // 播放帧数
  frameStep: number; // 跳帧数
  container: HTMLElement; // 容器dom
  imageSource: string[]; // 图片资源

  canvas: HTMLCanvasElement; // 绘制dom
  requestId: number; // 动画id

  constructor({ fps = 30, frameStep = 1, container, imageSource = [], autoplay = true }: SeqImagePlayerOption) {
    if (!container) {
      throw new Error('container cant not be null');
    }

    this.fps = fps;
    this.frameStep = frameStep;
    this.imageSource = imageSource;
    this.container = container;

    this.canvas = document.createElement('canvas');
    this.destroy();
    this.container.appendChild(this.canvas);

    if (autoplay) this.handlePlay();
  }

  destroy = (): void => {
    cancelAnimationFrame(this.requestId);
  };

  handleResize = (): void => {
    this.canvas.width = this.container.offsetWidth;
    this.canvas.height = this.container.offsetHeight;
  };

  handlePlay = async (): Promise<void> => {
    if (this.requestId) this.destroy();
    if (isIPhone) {
      const isLowBattery = await checkLowBattery();
      if (isLowBattery) this.fps *= 2;
    }
    const images = await this.loadImages();
    this.handleResize();
    this.playImages(images);
  };

  loadImages = (): Promise<HTMLImageElement[]> => {
    const { frameStep } = this;
    const images = [];
    const length = this.imageSource.length;
    let loaded = 0;
    return new Promise((resolve) => {
      const iterateFn = () => {
        loaded += 1;
        if (loaded >= length / frameStep) {
          resolve(images);
        }
      };
      for (let i = 0; i < length; i += frameStep) {
        const imgDom = new Image();
        imgDom.src = this.imageSource[i];
        images.push(imgDom);

        imgDom.addEventListener('load', iterateFn);
        imgDom.addEventListener('error', iterateFn);
      }
    });
  };

  playImages = (images: HTMLImageElement[]): void => {
    const { canvas, container, fps } = this;
    let imgIndex = 0;
    let i = 0;
    const interval = Math.round(BASE_FPS / fps);
    const ctx = canvas.getContext('2d');

    // 假定每一张图片的尺寸一致，以cover的形式绘入canvas
    const { offsetX, offsetY, width, height } = cover({
      parentWidth: container.offsetWidth,
      parentHeight: container.offsetHeight,
      childWidth: images[0].width,
      childHeight: images[0].height,
    });

    const update = (): void => {
      ctx.drawImage(images[imgIndex], offsetX, offsetY, width, height);
      i += 1;
      if (i % interval === 0) {
        imgIndex += 1;
        if (imgIndex >= images.length) imgIndex = 0;
      }
      requestAnimationFrame(update);
    };

    update();
  };
}
