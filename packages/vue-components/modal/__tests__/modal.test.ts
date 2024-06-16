import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import modal from '../src/modal.vue';
import { h } from 'vue';
describe('modal', () => {
  it('should to be defined', () => {
    expect(mount(modal, { props: { modelValue: true } })).toBeDefined();
  });
  it('props.{content,title}', () => {
    const wrapper = mount(modal, {
      props: {
        title: 'title',
        content: 'content',
        modelValue: true
      },
      global:{
        stubs:{
          teleport: true
        }
      }
    });
    expect(
      wrapper.findAll('span').map((el) => el.text())
    ).toHaveLength(1);
    expect(
      wrapper.findAll('span').map((el) => el.text())[0]
    ).toBe('title');
    const contentArr = wrapper.findAll('div')
      .map((v) => v.text())
      .filter((t) => t === 'content');
    expect(contentArr).toHaveLength(1);
    expect(contentArr[0]).toBe('content');
  });
  it('slots.{title,content,footer}', () => {
    const wrapper = mount(modal, {
      props: {
        modelValue: true
      },
      slots: {
        default: () => h('div', { class: 'modalContent' }),
        header: () => h('div', { class: 'modalHeader' }),
        footer: () => h('div', { class: 'modalFooter' })
      }
    });
    expect(
      wrapper.find('.modalContent')
    ).toBeDefined();
    expect(
      wrapper.find('.modalHeader')
    ).toBeDefined();
    expect(
      wrapper.find('.modalFooter')
    ).toBeDefined();
  });
  it('events', () => {
    const ok = vi.fn();
    const cancel = vi.fn();
    const wrapper = mount(modal, {
      props: {
        onOk: ok,
        onCancel: cancel,
        modelValue: true
      },
      global:{
        stubs:{
          teleport: true
        }
      }
    });
    const btns = wrapper.findAll('button');
    btns[0].trigger('click');
    expect(cancel).toBeCalled();
    btns[1].trigger('click');
    expect(ok).toBeCalled();
    expect(cancel).toHaveBeenCalledTimes(1);
    expect(ok).toHaveBeenCalledTimes(1);
  });
});
    