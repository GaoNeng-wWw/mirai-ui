import { describe, it, expect, vi } from 'vitest';
import Collapse, { Key } from '../src/collapse.vue';
import { mount } from '@vue/test-utils';
import CollapseItem from '../src/collapse-item.vue';
import { h, nextTick, ref } from 'vue';

describe(CollapseItem.name!, () => {
  it('event', async () => {
    const f = vi.fn();
    const wrapper = mount(
      Collapse,
      {
        props:{
          color: 'primary',
          modelValue: ['item']
        },
        slots: {
          default: h(CollapseItem, {
            title: 'Item-1',
            key:'item',
            onClick: f
          }, () => h('span', 'hello-world'))
        }
      }
    );
    expect(wrapper.findAll('span')[1].html()).contain('hello-world');
    await wrapper.findAll('span')[1].trigger('click');
    expect(wrapper.findAll('span')[1].html()).contain('hello-world');
    await wrapper.findAll('span')[0].trigger('click');
    expect(wrapper.findAll('span')[1]).not.toBeDefined();
    await wrapper.findAll('span')[0].trigger('click');
    expect(wrapper.findAll('span')[1].html()).contain('hello-world');
  });
});

describe(Collapse.name!, () => {
  it('mount success', () => {
    const wrapper = mount(Collapse, {
      props: {
        modelValue: [],
      },
      slots: {
        default: h(CollapseItem, {
          title: 'Item-1',
          key: 'item',
        })
      }
    });
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
  describe('onBeforeOpen', () => {
    it('never done', async () => {
      const f = vi.fn();
      const bf = (key: string | number | symbol, done: ()=>void) => { 
        expect(key).toBeDefined();
      };
      const onOpen = vi.fn();
      const wrapper = mount(Collapse, {
        props: {
          color: 'primary',
          modelValue: [''],
          onBeforeOpen: bf,
          onOpen: onOpen
        },
        slots: {
          default: h(CollapseItem, {
            title: 'Item-1',
            key: 'item',
            onClick: f,
          }, () => h('span', 'hello-world'))
        },
        global:{
          stubs:{
            transition: true,
          }
        }
      });
      await wrapper.findAll('span')[0].trigger('click');
      expect(
        wrapper.findAll('span')
      ).toHaveLength(1);
      expect(onOpen).not.toBeCalled();
    });
    it('done (sync)', async () => {
      const f = vi.fn();
      const bf = (key: string | number | symbol, done: ()=>void) => { 
        expect(key).toBeDefined();
        done();
      };
      const onOpen = vi.fn();
      const wrapper = mount(Collapse, {
        props: {
          color: 'primary',
          modelValue: [''],
          onBeforeOpen: bf,
          onOpen,
        },
        slots: {
          default: h(CollapseItem, {
            title: 'Item-1',
            key: 'item',
            onClick: f,
          }, () => h('span', 'hello-world'))
        },
        global:{
          stubs:{
            transition: true,
          }
        }
      });
      await wrapper.findAll('span')[0].trigger('click');
      expect(
        wrapper.findAll('span')
      ).toHaveLength(2);
      expect(onOpen).toBeCalled();
    });
    it('done (async)', async () => {
      const f = vi.fn();
      const bf = (key: string | number | symbol, done: ()=>void) => { 
        expect(key).toBeDefined();
        setTimeout(() => {
          done();
        }, 200);
      };
      const onOpen = vi.fn();
      const wrapper = mount(Collapse, {
        props: {
          color: 'primary',
          modelValue: [''],
          onBeforeOpen: bf,
          onOpen
        },
        slots: {
          default: h(CollapseItem, {
            title: 'Item-1',
            key: 'item',
            onClick: f,
          }, () => h('span', 'hello-world'))
        },
        global:{
          stubs:{
            transition: true,
          }
        }
      });
      await wrapper.findAll('span')[0].trigger('click');
      setTimeout(() => {
        expect(
          wrapper.findAll('span')
        ).toHaveLength(2);
        expect(onOpen).toBeCalled();
      }, 300);
    });
  });
  it('onOpen', async () => {
    const f = vi.fn();
    const f2 = vi.fn();
    const wrapper = mount(Collapse, {
      props: {
        color: 'primary',
        modelValue: [''],
        onOpen:f2
      },
      slots: {
        default: h(CollapseItem, {
          title: 'Item-1',
          key: 'item',
          onClick: f,
        }, () => h('span', 'hello-world'))
      },
      global:{
        stubs:{
          transition: true,
        }
      }
    });
    await wrapper.findAll('span')[0].trigger('click');
    expect(f2).toBeCalled();
    expect(f2).toHaveBeenCalledTimes(1);
  });
  describe('onBeforeClose', () => {
    it('never done', async () => {
      const onBeforeClose = (key: string | number | symbol) => {
        expect(key).toBeDefined();
      };
      const onClose = vi.fn();
      const wrapper = mount(Collapse, {
        props: {
          color: 'primary',
          modelValue: [''],
          onClose,
          onBeforeClose
        },
        slots: {
          default: h(CollapseItem, {
            title: 'Item-1',
            key: 'item',
          }, () => h('span', 'hello-world'))
        },
        global:{
          stubs:{
            transition: true,
          }
        }
      });
      await wrapper.findAll('span')[0].trigger('click');
      expect(onClose).not.toBeCalled();
    });
    it('done (sync)', async () => {
      const onBeforeClose = (key: string | number | symbol, done: ()=>void) => {
        expect(key).toBeDefined();
        done();
      };
      const onClose = vi.fn();
      const wrapper = mount(Collapse, {
        props: {
          color: 'primary',
          modelValue: ['item'],
          onClose,
          onBeforeClose
        },
        slots: {
          default: h(CollapseItem, {
            title: 'Item-1',
            key: 'item',
          }, () => h('span', 'hello-world'))
        },
        global:{
          stubs:{
            transition: true,
          }
        }
      });
      await wrapper.findAll('span')[0].trigger('click');
      expect(onClose).toBeCalled();
    });
    it('done (async)', async () => {
      const onBeforeClose = (key: string | number | symbol, done: ()=>void) => {
        expect(key).toBeDefined();
        setTimeout(() => {
          done();
        }, 200);
      };
      const onClose = vi.fn();
      const wrapper = mount(Collapse, {
        props: {
          color: 'primary',
          modelValue: ['item'],
          onClose,
          onBeforeClose
        },
        slots: {
          default: h(CollapseItem, {
            title: 'Item-1',
            key: 'item',
          }, () => h('span', 'hello-world'))
        },
        global:{
          stubs:{
            transition: true,
          }
        }
      });
      await wrapper.findAll('span')[0].trigger('click');
      setTimeout(() => {
        expect(onClose).toBeCalled();
      }, 300);
    });
  });
  it('accordion', async () => {
    const collapseItems = [
      h(CollapseItem, { title:'Item-1', key: 'Item-1' }, () => h('p', 'item-1')),
      h(CollapseItem, { title:'Item-2', key: 'Item-2' }, () => h('p', 'item-2')),
      h(CollapseItem, { title:'Item-3', key: 'Item-3' }, () => h('p', 'item-3')),
      h(CollapseItem, { title:'Item-4', key: 'Item-4' }, () => h('p', 'item-4')),
      h(CollapseItem, { title:'Item-5', key: 'Item-5' }, () => h('p', 'item-5'))
    ];
    const modelValue:Key[] = [];
    const wrapper = mount(Collapse, {
      props: {
        color: 'primary',
        modelValue,
        accordion:true
      },
      slots: {
        default: collapseItems
      }
    });
    expect(wrapper.text()).not.contain('item-1');
    await wrapper.findAll('span')[1].trigger('click');
    expect(wrapper.text()).contain('item-2').and.not.contain('item-1');
    await wrapper.findAll('span')[0].trigger('click');
    expect(wrapper.text()).contain('item-1').and.not.contain('item-2');
    await wrapper.findAll('span')[0].trigger('click');
    expect(wrapper.text()).not.contain('item-1').and.not.contain('item-2');
  });
});
