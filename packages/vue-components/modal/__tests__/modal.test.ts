import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import modal from '../src/modal.vue';
describe('modal', () => {
  it('should to be defined', () => {
    expect(mount(modal)).toBeDefined();
  });
});
    