import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import button from '../src/button.vue';
describe('Button', () => {
  it('should to be defined', () => {
    expect(mount(button)).toBeDefined();
  });
  it('props.type', () => {
    const wrapper = mount(button, {
      props: {
        type: 'primary'
      }
    });
    expect(wrapper.classes()).not.contain('bg-default');
  });
  it('props.shape', () => {
    const wrapper = mount(button, {
      props: {
        shape: 'outline'
      }
    });
    expect(wrapper.classes()).not.contain('bg-default');
    expect(wrapper.classes()).contain('border-default');
  });
  it('empty props', () => {
    const wrapper = mount(button);
    expect(wrapper.classes()).contain('bg-default');
    expect(wrapper.classes()).not.contain('border-default');
  });
});
    