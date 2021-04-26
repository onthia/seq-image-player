export interface SeqImagePlayerOption {
    fps?: number;
    frameStep?: number;
    container: HTMLElement;
    imageSource: string[];
    autoplay?: boolean;
}
export default class SeqImagePlayer {
    fps: number;
    frameStep: number;
    container: HTMLElement;
    imageSource: string[];
    canvas: HTMLCanvasElement;
    requestId: number;
    constructor({ fps, frameStep, container, imageSource, autoplay }: SeqImagePlayerOption);
    destroy: () => void;
    handleResize: () => void;
    handlePlay: () => Promise<void>;
    loadImages: () => Promise<HTMLImageElement[]>;
    playImages: (images: HTMLImageElement[]) => void;
}
