import { ComputedRef, InjectionKey } from 'vue';

export type CollapseKey = string | number;
export type CollapseSize = 'sm' | 'md' | 'lg';

export type CollapseProps = {
  accordion?: boolean;
  size?: CollapseSize;
};
export type CollapseItemProps = {
  id: string;
};

export type CollapseContext = {
  currentActive: ComputedRef<CollapseKey[]>;
  collapse: (val: CollapseKey) => void;
  clazz: ComputedRef<{
    base: string;
    content: string;
    item: string;
    header: string;
  }>;
};

export type CollapseContentContext = {
  id: string;
};

export const CollapseContextKey: InjectionKey<CollapseContext> = Symbol('collapse.root');
export const CollapseItemKey: InjectionKey<CollapseContentContext> = Symbol('collapse.root.content');
