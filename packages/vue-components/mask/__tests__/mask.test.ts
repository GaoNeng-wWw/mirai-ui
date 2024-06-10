import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import mask from '../src/mask.vue';
describe('mask', () => {
  it('should to be defined', () => {
    expect(mount(mask)).toBeDefined();
  });
});
    