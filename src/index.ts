import { checkLowBattery, cover, checkIPhone } from './utils';

const isIPhone = checkIPhone();

const BASE_FPS = 60;
export interface ISeqImagePlayerOption {
  fps?: number;
  frameStep?: number;
  container: HTMLElement;
  imageSource: string[];
  autoplay?: boolean;
}

interface ICanvasOption {
  offsetX: number;
  offsetY: number;
  width: number;
  height: number;
}

export default class SeqImagePlayer {
  fps: number; // 播放帧数
  frameStep: number; // 跳帧数
  container: HTMLElement; // 容器dom
  imageSource: string[]; // 图片资源

  canvas: HTMLCanvasElement; // 绘制dom
  requestId: number; // 动画id

  canvasOption: ICanvasOption; // canvas的fit结果
  imageSize: [number, number]; // 计算fit的image参数

  constructor({ fps = 30, frameStep = 1, container, imageSource = [], autoplay = true }: ISeqImagePlayerOption) {
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

    if (autoplay) this.play();
  }

  destroy = (): void => {
    cancelAnimationFrame(this.requestId);
    if (this.canvas) {
      this.canvas.remove();
    }
  };

  resize = (): void => {
    this.canvas.width = this.container.offsetWidth;
    this.canvas.height = this.container.offsetHeight;
    this.updateCanvasOption();
  };

  play = async (): Promise<void> => {
    if (this.requestId) this.destroy();
    if (isIPhone) {
      const isLowBattery = await checkLowBattery();
      if (isLowBattery) this.fps *= 2;
    }
    const images = await this.loadImages();
    if (!images.length) {
      throw new Error('no available image source');
    }
    const { width, height } = images[0];
    this.imageSize = [width, height];
    this.resize();
    this.playImages(images);
  };

  updateCanvasOption = (): void => {
    // 假定每一张图片的尺寸一致，以cover的形式绘入canvas
    const { container } = this;
    if (!this.imageSize) return;

    const [width, height] = this.imageSize;
    this.canvasOption = cover({
      parentWidth: container.offsetWidth,
      parentHeight: container.offsetHeight,
      childWidth: width,
      childHeight: height,
    });
  };

  loadImages = (): Promise<HTMLImageElement[]> => {
    const { frameStep } = this;
    const images = [];
    const length = this.imageSource.length;
    let loaded = 0;
    const loadedError = [];

    return new Promise((resolve) => {
      const iterateFn = () => {
        loaded += 1;
        if (loaded >= length / frameStep) {
          // 加载错误直接在结果中过滤掉
          resolve(images.filter((image) => !loadedError.includes(image)));
        }
      };
      for (let i = 0; i < length; i += frameStep) {
        const imgDom = new Image();
        imgDom.src = this.imageSource[i];
        images.push(imgDom);

        imgDom.addEventListener('load', iterateFn);
        imgDom.addEventListener('error', () => {
          loadedError.push(imgDom);
          iterateFn();
        });
      }
    });
  };

  playImages = (images: HTMLImageElement[]): void => {
    const { canvas, fps } = this;
    let imgIndex = 0;
    let i = 0;
    const interval = Math.round(BASE_FPS / fps);
    const ctx = canvas.getContext('2d');
    const update = (): void => {
      const { offsetX, offsetY, width, height } = this.canvasOption;
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
