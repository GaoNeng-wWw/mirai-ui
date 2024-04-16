import { describe, it, expect, vi } from 'vitest';
import Collapse from '../src/collapse.vue';
import { mount, shallowMount } from '@vue/test-utils';
import CollapseItem from '../src/collapse-item.vue';
import { RendererElement, RendererNode, VNode, h } from 'vue';

describe(Collapse.name!, () => {
  it('mount success', () => {
    const wrapper = mount(Collapse);
    expect(wrapper).toBeDefined();
    expect(wrapper).not.null;
  });
  it('props.color', () => {
    const wrapper = mount(Collapse, {
      props: {
        color: 'primary',
        modelValue: ['item'],
      },
      slots: {
        default: h(CollapseItem, {
          title: 'Item-1',
          key: 'item'
        })
      }
    });
    expect(wrapper.findComponent(CollapseItem).get('div').html()).toBeTruthy();
  });
  it('event', async () => {
    const f = vi.fn();
    const wrapper = mount(Collapse, {
      props: {
        color: 'primary',
        modelValue: ['item'],
      },
      slots: {
        default: h(CollapseItem, {
          title: 'Item-1',
          key: 'item',
          onClick: f,
        }, h('span', 'hello-world'))
      }
    });
    expect(wrapper.findAll('span')[1].html()).contain('hello-world');
    await wrapper.findAll('span')[1].trigger('click');
    expect(wrapper.findAll('span')[1].html()).contain('hello-world');
    await wrapper.findAll('span')[0].trigger('click');
    expect(wrapper.findAll('span')[1]).not.toBeDefined();
    await wrapper.findAll('span')[0].trigger('click');
    expect(wrapper.findAll('span')[1].html()).contain('hello-world');
  });
  it('onBeforeOpen', async () => {
    const f = vi.fn();
    const bf = vi.fn();
    const wrapper = mount(Collapse, {
      props: {
        color: 'primary',
        modelValue: [''],
        onBeforeOpen: bf
      },
      slots: {
        default: h(CollapseItem, {
          title: 'Item-1',
          key: 'item',
          onClick: f,
        }, h('span', 'hello-world'))
      },
    });
    await wrapper.findAll('span')[0].trigger('click');
    expect(bf).toBeCalled();
  });
  it('onBeforeClose', async () => {
    const f = vi.fn();
    const bc = vi.fn();
    const wrapper = mount(Collapse, {
      props: {
        color: 'primary',
        modelValue: ['item'],
        onBeforeClose: bc
      },
      slots: {
        default: h(CollapseItem, {
          title: 'Item-1',
          key: 'item',
          onClick: f,
        }, h('span', 'hello-world'))
      },
    });
    await wrapper.findAll('span')[0].trigger('click');
    expect(bc).toBeCalled();
  });
  describe('prevent', () => {
    it('prevent open', async () => {
      const f = vi.fn();
      let counter = 0;
      const bo = (_, f) => {
        if (counter) {
          return;
        }
        f();
        counter ++;
      };
      const wrapper = mount(Collapse, {
        props: {
          color: 'primary',
          modelValue: [''],
          onBeforeOpen: bo
        },
        slots: {
          default: h(CollapseItem, {
            title: 'Item-1',
            key: 'item',
            onClick: f,
          }, h('span', 'hello-world'))
        },
      });
      await wrapper.findAll('span')[0].trigger('click');
      expect(wrapper.findAll('span')[1]).not.toBeDefined();
      await wrapper.findAll('span')[0].trigger('click');
      expect(wrapper.findAll('span')[1]).toBeDefined();
    });
    it('prevent open async ', async () => {
      const f = vi.fn();
      const bo = (_, f) => {
        new Promise((resolve) => {
          f();
          resolve(true);
        });
      };
      const wrapper = mount(Collapse, {
        props: {
          color: 'primary',
          modelValue: [''],
          onBeforeOpen: bo
        },
        slots: {
          default: h(CollapseItem, {
            title: 'Item-1',
            key: 'item',
            onClick: f,
          }, h('span', 'hello-world'))
        },
      });
      await wrapper.findAll('span')[0].trigger('click');
      setTimeout(() => {
        expect(wrapper.findAll('span')[1]).not.toBeDefined();
      }, 0);
    });
    it('prevent close', async () => {
      const f = vi.fn();
      const bc = (_, f) => {
        f();
      };
      const wrapper = mount(Collapse, {
        props: {
          color: 'primary',
          modelValue: [],
          onBeforeClose: bc
        },
        slots: {
          default: h(CollapseItem, {
            title: 'Item-1',
            key: 'item',
            onClick: f,
          }, h('span', 'hello-world'))
        },
      });
      // 阻止关闭不影响展开
      await wrapper.findAll('span')[0].trigger('click');
      expect(wrapper.findAll('span')[1]).toBeDefined();
      await wrapper.findAll('span')[0].trigger('click');
      expect(wrapper.findAll('span')[1]).toBeDefined();
    });
    it('prevent close async', async () => {
      const f = vi.fn();
      const bc = (_, f) => {
        new Promise((resolve) => {
          f();
          resolve(true);
        });
      };
      const wrapper = mount(Collapse, {
        props: {
          color: 'primary',
          modelValue: [],
          onBeforeClose: bc
        },
        slots: {
          default: h(CollapseItem, {
            title: 'Item-1',
            key: 'item',
            onClick: f,
          }, h('span', 'hello-world'))
        },
      });
      // 阻止关闭不影响展开
      await wrapper.findAll('span')[0].trigger('click');
      expect(wrapper.findAll('span')[1]).toBeDefined();
      await wrapper.findAll('span')[0].trigger('click');
      expect(wrapper.findAll('span')[1]).toBeDefined();
    });
  });
  it('accordion', async () => {
    const defaultSlots:VNode<RendererNode, RendererElement, { [key: string]: any; }>[] = [];
    for (let i=0;i<10;i++) {
      defaultSlots.push(
        h(CollapseItem, {
          title: `item-${i}`,
          key: `item${i}`
        }, h('span', 'hello-world'))
      );
    }
    const wrapper = shallowMount(Collapse, {
      props: {
        color: 'primary',
        modelValue: [],
        accordion: true
      },
      slots: {
        default: () => defaultSlots
      },
    });
    expect(wrapper.findAllComponents(CollapseItem)).toHaveLength(10);
    await wrapper.findAll('span')[0].trigger('click');
    expect(wrapper.findAllComponents(CollapseItem)[0].get('div[class]').attributes()['data-open']).toBe('true');
    await wrapper.findAll('span')[1].trigger('click');
    expect(wrapper.findAllComponents(CollapseItem)[0].get('div[class]').attributes()['data-open']).toBe('false');
    expect(wrapper.findAllComponents(CollapseItem)[1].get('div[class]').attributes()['data-open']).toBe('true');
  });
});
