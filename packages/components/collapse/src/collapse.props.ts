import { ComputedRef, InjectionKey } from 'vue';

export type CollapseKey = string | number;
export type CollapseSize = 'sm' | 'md' | 'lg';

export type CollapseProps = {
  /**
   * @zh 是否启用手风琴模式, 如果启用则表示只能打开一个Item
   * @en
   * @default false
   */
  accordion?: boolean;
  /**
   * @zh 大小
   * @en
   * @default 'md'
   */
  size?: CollapseSize;
  /**
   * @zh 大小
   * @en
   * @default []
   */
  disabled?: CollapseKey[];

  /**
   * @zh 是否禁用样式
   * @en
   * @default []
   */
  pure?: boolean;
};
export type CollapseItemProps = {
  /**
   * @zh 收起展开项的id
   * @en
   * @default []
   */
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
  disabled?: ComputedRef<CollapseKey[]>;
};

export type CollapseContentContext = {
  id: string;
};

export const CollapseContextKey: InjectionKey<CollapseContext> = Symbol('collapse.root');
export const CollapseItemKey: InjectionKey<CollapseContentContext> = Symbol('collapse.root.content');
