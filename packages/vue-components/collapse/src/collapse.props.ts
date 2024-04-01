import { ExtractPropTypes, PropType } from 'vue';

export type CollapseSize = 'sm' | 'md' | 'lg';
export type CollapseRadius = 'none' | 'sm' | 'md' | 'lg' | 'full';
export type CollapseColor = 'default' | 'primary' | 'success'| 'danger' | 'warning';
export const collapseProps = {
  size: {
    type: String as PropType<CollapseSize>,
    default: 'md'
  },
  radius: {
    type: String as PropType<CollapseRadius>,
    default: 'md'
  },
  color: {
    type: String as PropType<CollapseColor>,
    default: 'default'
  }
} as const;

export const collapseItemProps = {
  title: {
    type: String,
    required: true
  }
};

export type CollapseProps = ExtractPropTypes<typeof collapseProps>;