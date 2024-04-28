
import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import popper from '../src/popper.vue';
describe('Popper', () => {
  it('should to be defined', () => {
    expect(mount(popper)).toBeDefined();
  });
});
    