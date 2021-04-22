export interface SeqImagePlayerOption {
    frame?: number;
    frameStep?: number;
    container: HTMLElement;
    imageSource: string[];
    autoplay?: boolean;
}
export declare class SeqImagePlayer {
    frame: number;
    frameStep: number;
    container: HTMLElement;
    imageSource: string[];
    canvas: HTMLCanvasElement;
    requestId: number;
    constructor({ frame, frameStep, container, imageSource, autoplay }: SeqImagePlayerOption);
    destroy: () => void;
    handleResize: () => void;
    handlePlay: () => Promise<void>;
    loadImages: () => Promise<HTMLImageElement[]>;
    playImages: (images: HTMLImageElement[]) => void;
}
