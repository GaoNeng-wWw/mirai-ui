import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import tag from '../src/tag.vue';
describe('tag', () => {
  it('should to be defined', () => {
    expect(mount(tag)).toBeDefined();
  });
  it('event', async () => {
    const f = vi.fn();
    const wrapper = mount(tag, {
      props: {
        onClick: f
      }
    });
    await wrapper.trigger('click');
    expect(f).toBeCalled();
    expect(f).toHaveBeenCalledOnce();
  });
  it('props', async () => {
    const wrapper = mount(tag, {
      props: {
        colors: 'primary'
      }
    });
    expect(wrapper.classes()).contain('bg-primary-100');
    await wrapper.setProps({ colors: 'danger' });
    expect(wrapper.classes()).contain('bg-danger-100');
  });
});