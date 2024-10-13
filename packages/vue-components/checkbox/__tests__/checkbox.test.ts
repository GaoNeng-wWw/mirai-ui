import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import checkbox from '../src/checkbox.vue';
describe('checkbox', () => {
  it('should to be defined', () => {
    expect(mount(checkbox)).toBeDefined();
  });
});
    