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
  },
  accordion: {
    type: Boolean,
    default: false
  },
  disabledKeys: {
    type: Array as PropType<(string|number|symbol)[]>,
    default: []
  }
} as const;

export const collapseItemProps = {
  title: {
    type: String,
    required: true
  }
};

export const CONSTANT = Symbol('collapse');

export type CollapseProps = ExtractPropTypes<typeof collapseProps>;