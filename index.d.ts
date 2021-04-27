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
    fps: number;
    frameStep: number;
    container: HTMLElement;
    imageSource: string[];
    canvas: HTMLCanvasElement;
    requestId: number;
    canvasOption: ICanvasOption;
    imageSize: [number, number];
    constructor({ fps, frameStep, container, imageSource, autoplay }: ISeqImagePlayerOption);
    destroy: () => void;
    resize: () => void;
    play: () => Promise<void>;
    updateCanvasOption: () => void;
    loadImages: () => Promise<HTMLImageElement[]>;
    playImages: (images: HTMLImageElement[]) => void;
}
export {};
