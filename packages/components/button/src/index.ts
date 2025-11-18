import { withInstall } from '@miraiui-org/internal-utils';
import MButton from './button.vue';

export default withInstall({
  name: 'Button',
  components: [MButton],
});

export { MButton };

export * from './button.props';
