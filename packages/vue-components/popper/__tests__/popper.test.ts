import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import popper from '../src/popper.vue';
import { h, nextTick } from 'vue';
describe('Popper', () => {
  const timeout = (delay:number=300) => new Promise((resolve) => setTimeout(() => {
    resolve(true);
  }, delay));
  it('should to be defined', () => {
    expect(mount(popper)).toBeDefined();
  });
  const mockHooks = () => ({
    onBeforeOpen: vi.fn(),
    onAfterOpen: vi.fn(),
    onBeforeClose: vi.fn(),
    onAfterClose: vi.fn()
  });
  it('controller', async () => {
    const hooks = mockHooks();
    const wrapper = mount(popper, {
      props: {
        show: false,
        ...hooks
      }
    });
    expect(hooks.onBeforeOpen).not.toBeCalled();
    expect(hooks.onAfterOpen).not.toBeCalled();
    expect(hooks.onBeforeClose).not.toBeCalled();
    expect(hooks.onAfterClose).not.toBeCalled();
    await wrapper.setProps({ show: true });
    await nextTick();
    expect(hooks.onBeforeOpen).toBeCalled();
    expect(hooks.onAfterOpen).toBeCalled();
    await wrapper.setProps({ show: false });
    await nextTick();
    expect(hooks.onBeforeClose).toBeCalled();
    expect(hooks.onAfterClose).toBeCalled();
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
        trigger: 'hover',
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
    await timeout(300);
    expect(hooks.onBeforeClose).toBeCalled();
    expect(hooks.onAfterClose).toBeCalled();
  });
  it('focus trigger', async () => {
    const hooks = mockHooks();
    const wrapper = mount(popper, {
      props: {
        trigger: 'focus',
        ...hooks,
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
  });
  
});