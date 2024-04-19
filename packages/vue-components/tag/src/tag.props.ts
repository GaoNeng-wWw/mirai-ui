import { ExtractPropTypes, PropType } from 'vue';

export type TagColors = 'default' | 'primary' | 'warning' | 'danger';
export type TagSize = 'sm' | 'md' | 'lg';
export const tagProps = {

  /**
   * @description {zh} 颜色
   * @demo {zh} #基础使用
   */
  colors: {
    type: String as PropType<TagColors>,
    default: 'default',
  },

  /**
   * @description {zh} 大小
   * @demo {zh} #不同大小
   */
  size: {
    type: String as PropType<TagSize>,
    default: 'md'
  }
};

export type ColorProp = ExtractPropTypes<typeof tagProps>;