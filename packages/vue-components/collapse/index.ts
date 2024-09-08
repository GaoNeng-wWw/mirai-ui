
import type { App } from 'vue';
import type { Key } from './src/collapse.vue';
import Collapse from './src/collapse.vue';
import CollapseItem from './src/collapse-item.vue';

export * from './src/collapse.props';

export { Collapse, CollapseItem };
export type { Key };

export default {
  name: 'Collapse',
  install: (app:App) => {
    app.component(Collapse.name!, Collapse);
    app.component(CollapseItem.name!, CollapseItem);
  }
};
