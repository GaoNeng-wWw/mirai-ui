import { FORWARD_REF_INJECTION_KEY, useForwardRefDirective } from '@miraiui-org/vue-hooks';
import { defineComponent, inject, VNode, Fragment, createVNode, cloneVNode, withDirectives, warn } from 'vue';
import { NOOP, isObject } from '@vue/shared';

const name = 'MChildOnly';
export const ChildOnly = defineComponent({
  name,
  setup(_, { slots, attrs }) {
    const forwardInject = inject(FORWARD_REF_INJECTION_KEY);
    const forwardRefDirective = useForwardRefDirective(
      forwardInject?.setForwardRef ?? NOOP
    );
    return () => {
      const defaultSlot = slots.default?.(attrs);
      if (!defaultSlot) { return null; }

      if (defaultSlot.length > 1) {
        warn(`${name} requires exact only one valid child.`);
        return null;
      }

      const firstLegitNode = findFirstLegitChild(defaultSlot);
      if (!firstLegitNode) {
        warn(`${name} no valid child node found`);
        return null;
      }

      return withDirectives(cloneVNode(firstLegitNode!, attrs), [
        [forwardRefDirective],
      ]);
    };
  }
});

function findFirstLegitChild(node: VNode[] | undefined): VNode | null {
  if (!node) { return null; }
  const children = node as VNode[];
  for (const child of children) {

    /**
     * when user uses h(Fragment, [text]) to render plain string,
     * this switch case just cannot handle, when the value is primitives
     * we should just return the wrapped string
     */
    if (isObject(child)) {
      switch (child.type) {
      case Comment:
        continue;
      case Text:
      case 'svg':
        return wrapTextContent(child);
      case Fragment:
        return findFirstLegitChild(child.children as VNode[]);
      default:
        return child;
      }
    }
    return wrapTextContent(child);
  }
  return null;
}

const wrapTextContent = (child: string | VNode) => createVNode('span', null, child);