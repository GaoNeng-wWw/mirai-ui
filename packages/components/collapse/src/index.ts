import { withInstall } from '@miraiui-org/internal-utils';
import MCollapse from './collapse.vue';
import MCollapseItem from './collapse-item.vue';
import MCollapseHeader from './collapse-header.vue';
import MCollapseContent from './collapse-content.vue';

export default withInstall({
  name: 'Collapse',
  components: [MCollapse, MCollapseItem, MCollapseHeader, MCollapseContent],
});

export { MCollapse, MCollapseItem, MCollapseHeader, MCollapseContent };

export * from './collapse.props';
