// 通过setTimeout执行的前后时间差和实际经过的时间差来判断IPhone设备是否处于低电量

// 参数全是基于经验
const OFFSET = 4;
const CHECK_TIME = 30;
const NEED_PASS_RESULT_PERCENTAGE = 0.4;
const INTERVAL = 16;

const checkInterval = (interval: number): boolean => {
  return interval > INTERVAL * 2 - OFFSET;
};

const checkPercentage = (checkResult: number[]): boolean => {
  return checkResult.filter((item) => item).length / checkResult.length > NEED_PASS_RESULT_PERCENTAGE;
};

export default (): Promise<boolean> => {
  return new Promise((resolve) => {
    let checkTime = 0;
    let lastTime = Date.now();
    const checkResult = [];
    const fn = () => {
      setTimeout(() => {
        const now = Date.now();
        checkResult.push(checkInterval(now - lastTime));
        lastTime = now;
        checkTime += 1;
        if (checkTime < CHECK_TIME) {
          fn();
        } else {
          resolve(checkPercentage(checkResult));
        }
      }, INTERVAL);
    };
    fn();
  });
};
