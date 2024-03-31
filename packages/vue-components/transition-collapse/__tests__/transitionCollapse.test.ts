import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import vifTest from './vif.vue';
import vShowTest from './vshow.vue';

describe('transitionCollapse', () => {
  it('should to be defined', () => {
    expect(mount(vifTest)).toBeDefined();
    expect(mount(vShowTest)).toBeDefined();
  });
  it('vif', async () => {
    const el = mount(vifTest);
    expect(el.find('hello-world').exists()).toBeFalsy();
    await el.find('button').trigger('click');
    expect(el.find('div').text()).toEqual('hello-world');
  });
  it('vshow', async () => {
    const el = mount(vShowTest);
    expect(el.find('hello-world').exists()).toBeFalsy();
    await el.find('button').trigger('click');
    expect(el.find('div').text()).toEqual('hello-world');
  });
});