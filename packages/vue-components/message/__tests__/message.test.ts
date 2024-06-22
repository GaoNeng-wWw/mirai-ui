import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import message from '../src/message.vue';
describe('message', () => {
  it('should to be defined', () => {
    expect(mount(message)).toBeDefined();
  });
});
    