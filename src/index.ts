import { checkLowBattery, cover, checkIPhone } from './utils';

const isIPhone = checkIPhone();

const BASE_FRAME = 60;

interface WildcardOption {
  numberRange: [number, number];
  wildcardTemplate: string;
  wildcardLength: number;
}

const getImagePath = (arg: string[] | WildcardOption): string[] => {
  if (Array.isArray(arg)) {
    return arg;
  } else if (typeof arg === 'object') {
    const { numberRange, wildcardTemplate, wildcardLength } = arg;
    const imagesPath = [];
    for (let i = numberRange[0]; i < numberRange[1]; i += 1) {
      const imageIndex = String(Math.pow(10, wildcardLength) + i).substr(1);
      imagesPath.push(wildcardTemplate.replace(/{\*}/, imageIndex));
    }
    return imagesPath;
  }
};

export interface SeqImagePlayerOption {
  frame?: number;
  frameStep?: number;
  container: HTMLElement;
  imageSource: WildcardOption;
  autoplay?: boolean;
}

export class SeqImagePlayer {
  frame: number; // 播放帧数
  frameStep: number; // 跳帧数
  container: HTMLElement; // 容器dom
  imageSource: string[] | WildcardOption; // 图片资源

  canvas: HTMLCanvasElement; // 绘制dom
  requestId: number; // 动画id
  imagePath: string[]; // 图片路径

  constructor({ frame = BASE_FRAME, frameStep = 1, container, imageSource, autoplay = true }: SeqImagePlayerOption) {
    if (!container) {
      throw new Error('container cant not be null');
    }

    this.frame = frame;
    this.frameStep = frameStep;
    this.container = container;
    this.canvas = document.createElement('canvas');
    this.destroy();
    this.container.appendChild(this.canvas);
    this.imagePath = getImagePath(imageSource);

    if (autoplay) this.handlePlay();
  }

  destroy = (): void => {
    this.container.innerHTML = '';
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
      if (isLowBattery) this.frame *= 2;
    }
    const images = await this.loadImages();
    this.handleResize();
    this.playImages(images);
  };

  loadImages = (): Promise<HTMLImageElement[]> => {
    const { frameStep } = this;
    const images = [];
    const length = this.imagePath.length;
    let loaded = 0;
    return new Promise((resolve) => {
      for (let i = 0; i < length; i += frameStep) {
        const imgDom = new Image();
        imgDom.addEventListener('load', () => {
          loaded += 1;
          if (loaded >= length / frameStep) {
            resolve(images);
          }
        });
        imgDom.src = this.imagePath[i];
        images.push(imgDom);
      }
    });
  };

  playImages = (images: HTMLImageElement[]): void => {
    const { canvas, container, frame } = this;
    let imgIndex = 0;
    let i = 0;
    const interval = Math.round(BASE_FRAME / frame);
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
