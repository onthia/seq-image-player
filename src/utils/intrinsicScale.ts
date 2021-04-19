interface FitOption {
  parentWidth: number;
  parentHeight: number;
  childWidth: number;
  childHeight: number;
  scale?: number;
  offsetX?: number;
  offsetY?: number;
}

interface FitResult {
  width: number;
  height: number;
  offsetX: number;
  offsetY: number;
}

/**
 * 生成canvas使用的fit函数
 * @param contains
 * @returns
 */

const fit = (contains: boolean) => {
  return ({
    parentWidth,
    parentHeight,
    childWidth,
    childHeight,
    scale = 1,
    offsetX = 0.5,
    offsetY = 0.5,
  }: FitOption): FitResult => {
    const childRatio = childWidth / childHeight;
    const parentRatio = parentWidth / parentHeight;
    let width = parentWidth * scale;
    let height = parentHeight * scale;

    if (contains ? childRatio > parentRatio : childRatio < parentRatio) {
      height = width / childRatio;
    } else {
      width = height * childRatio;
    }

    return {
      width,
      height,
      offsetX: (parentWidth - width) * offsetX,
      offsetY: (parentHeight - height) * offsetY,
    };
  };
};

export const contain = fit(true);
export const cover = fit(false);
