import { ExtractPropTypes, PropType } from 'vue';

export type MaskTypeItem = 'blur' | 'fill' | 'transparent'
export type MaskType = `${MaskTypeItem}-${MaskTypeItem}` | `${MaskTypeItem} ${MaskTypeItem}` | MaskTypeItem | MaskTypeItem[]

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
  },

  /**
   * @description {zh} 遮罩类型
   * @description {en} mask type
   * @demo {zh} #不同类型
   */
  type: {
    type: Object as PropType<MaskType>,
    default: 'fill'
  }
};

export type MaskProps = ExtractPropTypes<typeof maskProps>;