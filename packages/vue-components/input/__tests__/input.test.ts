import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import input from '../src/input.vue';

describe('input', () => {
  it('should to be defined', () => {
    expect(mount(input, {
      props: {
        id:'',
        modelValue: ''
      }
    })).toBeDefined();
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
  it('description', () => {
    const wrapper = mount(input, {
      props: {
        id:'',
        modelValue: '',
        label: 'label',
        labelPosition: 'top-inside',
        description: 'this is description'
      }
    });
    expect(wrapper.findAll('span')[0].classes().join(' ')).not.contain('danger');
  });
  it('error message', () => {
    const wrapper = mount(input, {
      props: {
        id:'',
        modelValue: '',
        label: 'label',
        labelPosition: 'top-inside',
        error: true,
        description: 'this is description',
        errorMessage: 'this is errorMessage'
      }
    });
    const [span] = wrapper.findAll('span');
    expect(span.text()).toBe('this is errorMessage');
  });
});
    