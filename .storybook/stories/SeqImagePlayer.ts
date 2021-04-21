export const parameters = {
  container: {
    description: '容器dom',
    table: {
      category: 'Parameters',
    },
  },
  frame: {
    control: {
      type: 'number',
    },
    description: '帧数',
    defaultValue: 60,
    table: {
      category: 'Parameters',
      defaultValue: {
        summary: 60,
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
      category: 'Parameters',

      defaultValue: {
        summary: 1,
      },
      type: {
        summary: '播放序列图的帧数',
      },
    },
  },
  imageNumber: {
    control: {
      type: 'number',
    },
    description: '图片数量',
    defaultValue: 50,
    table: {
      category: 'Parameters',

      type: {
        summary: '播放序列图的数量',
      },
    },
  },
  pathTemplate: {
    control: {
      type: 'text',
    },
    description: '图片路径模板',
    defaultValue: 'https://workvideo.vvtechnology.cn/%E5%BA%8F%E5%88%97%E5%9B%BE750-%20600_20s_19Mar{*}.jpg',
    table: {
      category: 'Parameters',

      type: {
        summary: '轮询播放的图片地址，{*}作为占位符，执行时会被数字替代',
      },
    },
  },
  wildcardLength: {
    control: {
      type: 'number',
    },
    description: '占位符长度',
    defaultValue: 4,
    table: {
      category: 'Parameters',

      type: {
        summary: '按照占位符长度在索引值前面补0',
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
