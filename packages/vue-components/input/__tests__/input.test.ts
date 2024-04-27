import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import input from '../src/input.vue';
import { ref } from 'vue';
describe('input', () => {
  it('should to be defined', () => {
    expect(mount(input)).toBeDefined();
  });
  it('focus', async () => {
    const f = vi.fn();
    const wrapper = mount(input, {
      props: {
        id:'',
        onFocus: f,
        modelValue: ''
      }
    });
    const [inputEl] = wrapper.findAll('input');
    expect(inputEl).toBeDefined();
    await inputEl.trigger('focus');
    expect(f).toHaveBeenCalled();
  });
  it('blur', async () => {
    const f = vi.fn();
    const wrapper = mount(input, {
      props: {
        id:'',
        onBlur: f,
        modelValue: ''
      }
    });
    const [inputEl] = wrapper.findAll('input');
    expect(inputEl).toBeDefined();
    await inputEl.trigger('blur');
    expect(f).toHaveBeenCalled();
  });
  it('value change', async () => {
    const f = vi.fn();
    const wrapper = mount(input, {
      props: {
        id:'',
        onValueChange: f,
        modelValue: ''
      }
    });
    const [inputEl] = wrapper.findAll('input');
    expect(inputEl).toBeDefined();
    await wrapper.setProps({ modelValue: '123' });
    expect(f).toBeCalled();
  });
  it('inner label', async () => {
    const wrapper = mount(input, {
      props: {
        id:'',
        modelValue: '',
        label: 'label',
        labelPosition: 'top-inside'
      }
    });
    expect(wrapper.findAll('label')).toHaveLength(1);
  });
  it('outside label', async () => {
    const wrapper = mount(input, {
      props: {
        id:'',
        modelValue: '',
        label: 'label',
        labelPosition: 'top-inside'
      }
    });
    expect(wrapper.findAll('label')).toHaveLength(1);
  });
});
    