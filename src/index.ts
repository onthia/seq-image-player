import { checkLowBattery, cover, checkIPhone } from './utils';

const isIPhone = checkIPhone();

const BASE_FRAME = 60;

export interface SeqImagePlayerOption {
  frame?: number;
  frameStep?: number;
  imageNumber: number;
  container: HTMLElement;
  pathTemplate: string;
  wildcardLength: number;
}

export class SeqImagePlayer {
  frame: number; // 播放帧数
  frameStep: number; // 跳帧数
  imageNumber: number; // 图片数量
  container: HTMLElement; // 容器dom
  canvas: HTMLCanvasElement; // 绘制dom
  requestId: number; // 动画id
  pathTemplate: string; // 图片path模板
  wildcardLength: number; // 数字占位符长度，根据长度补0

  constructor({
    frame = BASE_FRAME,
    frameStep = 1,
    imageNumber = 0,
    container,
    pathTemplate,
    wildcardLength = 1,
  }: SeqImagePlayerOption) {
    this.frame = frame;
    this.frameStep = frameStep;
    this.imageNumber = imageNumber;
    if (!container) return;

    this.container = container;
    this.pathTemplate = pathTemplate;
    this.wildcardLength = wildcardLength;

    this.canvas = document.createElement('canvas');
    this.container.innerHTML = '';
    this.container.appendChild(this.canvas);

    this.handlePlay();
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
      if (isLowBattery) this.frame *= 2;
    }
    const images = await this.loadImages();
    this.handleResize();
    this.playImages(images);
  };

  loadImages = (): Promise<HTMLImageElement[]> => {
    const { imageNumber, frameStep, wildcardLength, pathTemplate } = this;
    const images = [];
    let loaded = 0;
    return new Promise((resolve) => {
      for (let i = 0; i < imageNumber; i += frameStep) {
        const imageIndex = String(Math.pow(10, wildcardLength) + i).substr(1);
        const filePath = pathTemplate.replace(/{\*}/, imageIndex);
        const imgDom = new Image();
        imgDom.addEventListener('load', () => {
          loaded += 1;
          if (loaded >= imageNumber / frameStep) {
            resolve(images);
          }
        });
        imgDom.src = filePath;
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
