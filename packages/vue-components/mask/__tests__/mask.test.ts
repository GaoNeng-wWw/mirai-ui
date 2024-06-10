import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import mask from '../src/mask.vue';
describe('mask', () => {
  it('should to be defined', () => {
    expect(mount(mask)).toBeDefined();
  });
  it('emits', async () => {
    const f = vi.fn();
    const wrapper = mount(
      mask, 
      {
        props: {
          onClick: f
        }
      }
    );
    await wrapper.trigger('click');
    expect(wrapper.emitted().click).toHaveLength(1);
  });
  it('inline', () => {
    const wrapper = mount(
      mask,
      {
        props: {
          fullScreen: false
        }
      }
    );
    expect(wrapper.classes()).toContain('absolute');
    expect(wrapper.classes()).not.include('fixed');
  });
});
    