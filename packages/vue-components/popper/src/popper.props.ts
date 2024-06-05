import { ExtractPropTypes, ModelRef, PropType, Ref } from 'vue';

export const PopperProp = {
  virtualTrigger: {
    type: Boolean,
    default: false
  },
  triggerRef: {
    type: Object as PropType<HTMLElement>
  }
};
export const PopperTriggerProp = {
  virtualTrigger: {
    type: Boolean,
    default: false,
  },
  triggerRef: {
    type: Object as PropType<HTMLElement>
  }
};

export type PopperProp = ExtractPropTypes<typeof PopperProp>;
export interface PopperContext {
  trigger: Ref<HTMLElement | undefined>,
  content: Ref<HTMLElement | undefined>,
  safePoly: Ref<HTMLElement | undefined>,
  visible: ModelRef<boolean | undefined, string>,
  virtualTrigger: Ref<boolean>
}

export const KEY = Symbol();