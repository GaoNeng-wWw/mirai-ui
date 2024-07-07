import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import transitionSlideFade from '../src/transitionSlideFade.vue';
describe('transitionSlideFade', () => {
  it('should to be defined', () => {
    expect(mount(transitionSlideFade)).toBeDefined();
  });
});
    