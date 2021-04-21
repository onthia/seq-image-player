export interface SeqImagePlayerOption {
    frame?: number;
    frameStep?: number;
    imageNumber: number;
    container: HTMLElement;
    pathTemplate: string;
    wildcardLength: number;
}
export declare class SeqImagePlayer {
    name: string;
    frame: number;
    frameStep: number;
    imageNumber: number;
    container: HTMLElement;
    canvas: HTMLCanvasElement;
    requestId: number;
    pathTemplate: string;
    wildcardLength: number;
    constructor({ frame, frameStep, imageNumber, container, pathTemplate, wildcardLength, }: SeqImagePlayerOption);
    destroy: () => void;
    handleResize: () => void;
    handlePlay: () => Promise<void>;
    loadImages: () => Promise<HTMLImageElement[]>;
    playImages: (images: HTMLImageElement[]) => void;
}
