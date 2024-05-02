import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import popper from '../src/popper.vue';
import { h } from 'vue';
describe('Popper', () => {
  it('should to be defined', () => {
    expect(mount(popper)).toBeDefined();
  });
  const mockHooks = () => ({
    onBeforeOpen: vi.fn(),
    onAfterOpen: vi.fn(),
    onBeforeClose: vi.fn(),
    onAfterClose: vi.fn()
  });
  it('click trigger', async () => {
    const hooks = mockHooks();
    const wrapper = mount(popper, {
      props: {
        trigger: 'click',
        ...hooks
      },
      slots: {
        reference: () => h('button', null, 'click'),
        floating: () => h('span', null, 'hello-world'),
      }
    });
    expect(wrapper.findAll('button')).toHaveLength(1);
    const btnComponent = wrapper.find('button');
    await btnComponent.trigger('click');
    expect(hooks.onBeforeOpen).toBeCalled();
    expect(hooks.onAfterOpen).toBeCalled();
    await btnComponent.trigger('click');
    expect(hooks.onBeforeClose).toBeCalled();
    expect(hooks.onAfterClose).toBeCalled();
    await btnComponent.trigger('click');
    expect(hooks.onBeforeOpen).toBeCalledTimes(2);
    expect(hooks.onAfterOpen).toBeCalledTimes(2);
  });
  it('hover trigger', async () => {
    const hooks = mockHooks();
    const wrapper = mount(popper, {
      props: {
        trigger: 'click',
        ...hooks
      },
      slots: {
        reference: () => h('button', null, 'click'),
        floating: () => h('span', null, 'hello-world'),
      }
    });
    expect(wrapper.findAll('button')).toHaveLength(1);
    const [, div,] = wrapper.findAll('div');
    await div.trigger('mouseenter');
    expect(hooks.onBeforeOpen).toBeCalled();
    expect(hooks.onAfterOpen).toBeCalled();
    await div.trigger('mouseleave');
    expect(hooks.onBeforeClose).toBeCalled();
    expect(hooks.onAfterClose).toBeCalled();
    await div.trigger('mouseenter');
    expect(hooks.onBeforeOpen).toBeCalledTimes(2);
    expect(hooks.onAfterOpen).toBeCalledTimes(2);
  });
  it('focus trigger', async () => {
    const hooks = mockHooks();
    const wrapper = mount(popper, {
      props: {
        trigger: 'click',
        ...hooks
      },
      slots: {
        reference: () => h('button', null, 'click'),
        floating: () => h('span', null, 'hello-world'),
      }
    });
    expect(wrapper.findAll('button')).toHaveLength(1);
    const [, div,] = wrapper.findAll('div');
    await div.trigger('focus');
    expect(hooks.onBeforeOpen).toBeCalled();
    expect(hooks.onAfterOpen).toBeCalled();
    await div.trigger('focus');
    expect(hooks.onBeforeOpen).toBeCalled();
    expect(hooks.onAfterOpen).toBeCalled();
    await div.trigger('blur');
    expect(hooks.onBeforeClose).toBeCalled();
    expect(hooks.onAfterClose).toBeCalled();
    await div.trigger('focus');
    expect(hooks.onBeforeOpen).toBeCalledTimes(3);
    expect(hooks.onAfterOpen).toBeCalledTimes(3);
  });
  
});