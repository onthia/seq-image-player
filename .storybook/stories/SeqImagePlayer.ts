const getDemoImage = () => {
  const wildcardTemplate = 'https://workvideo.vvtechnology.cn/%E5%BA%8F%E5%88%97%E5%9B%BE750-%20600_20s_19Mar{*}.jpg';
  const wildcardLength = 4;
  const numberRange = [0, 20];
  const imagesPath = [];
  for (let i = numberRange[0]; i < numberRange[1]; i += 1) {
    const imageIndex = String(10 ** wildcardLength + i).substr(1);
    imagesPath.push(wildcardTemplate.replace(/{\*}/, imageIndex));
  }
  return imagesPath;
};

export const api = {
  container: {
    description: '容器dom',
    table: {
      category: 'Api',
    },
  },
  fps: {
    control: {
      type: 'number',
    },
    description: '帧数',
    defaultValue: 30,
    table: {
      category: 'Api',
      defaultValue: {
        summary: 30,
      },
      type: {
        summary: '播放序列图的帧数',
        // detail: '',
      },
    },
  },
  frameStep: {
    control: {
      type: 'number',
    },
    description: '跳帧数',
    defaultValue: 1,
    table: {
      category: 'Api',

      defaultValue: {
        summary: 1,
      },
      type: {
        summary: '播放序列图的帧数',
      },
    },
  },
  autoplay: {
    control: {
      type: 'boolean',
    },
    description: '是否自动播放',
    defaultValue: true,
    table: {
      category: 'Api',

      defaultValue: {
        summary: true,
      },
    },
  },
  imageSource: {
    control: {
      type: 'object',
    },
    description: '图片资源',
    defaultValue: getDemoImage(),
    table: {
      category: 'Api',
      type: {
        summary: '图片路径的数组',
      },
    },
  },
};

export const methods = {
  'play()': {
    description: '播放',
    table: {
      category: 'Methods',
    },
  },
  'destroy()': {
    description: '销毁',
    table: {
      category: 'Methods',
    },
  },
  'resize()': {
    description: '更新画布尺寸',
    table: {
      category: 'Methods',

      type: {
        summary: '更新画布尺寸以适配容器',
      },
    },
  },
};
