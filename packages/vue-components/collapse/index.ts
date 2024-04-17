
import type { App } from 'vue';
import Collapse from './src/collapse.vue';
import CollapseItem from './src/collapse-item.vue';

export * from './src/collapse.props';

export { Collapse, CollapseItem };

export default {
  name: 'Collapse',
  install: (app:App) => {
    app.component(Collapse.name!, Collapse);
    app.component(CollapseItem.name!, CollapseItem);
  }
};
