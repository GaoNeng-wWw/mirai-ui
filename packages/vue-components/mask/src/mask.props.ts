import { ExtractPropTypes } from 'vue';

export const maskProps = {

  /**
   * @description {zh} 是否全屏显示
   * @description {en} full screen show
   * @demo {zh} #非全屏
   */
  fullScreen: {
    type: Boolean,
    default: true
  },

  /**
   * @description {zh} 锁定滚动
   * @description {en} lock scroll
   * @demo {zh} #锁定滚动
   */
  lockScroll: {
    type: Boolean,
    default: false
  }
};

export type MaskProps = ExtractPropTypes<typeof maskProps>;