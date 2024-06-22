import { describe, expect, test, vi } from 'vitest';
import { useMessage } from '../src/message';
import { nextTick } from 'vue';
describe('message', () => {
  describe('useMessage', () => {
    const delay = (delay: number) => new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, delay);
    });
    test('duration', async () => {
      useMessage({
        content: 'hello-world',
        duration: 100
      });
      const div = document.body.querySelector('div');
      expect(div).toBeDefined();
      expect(div?.textContent).toBe('hello-world');
      await delay(100);
      await nextTick();
      expect(document.body.querySelector('div')).toBeNull();
    });
    test('onClose', async () => {
      const f = vi.fn();
      const { close } = useMessage({
        content: 'hello-world',
        duration: 100,
        onClose: f
      });
      close();
      await nextTick();
      expect(f).toBeCalled();

      const f2 = vi.fn();

      useMessage({
        content: 'hello-world',
        duration: 100,
        onClose: f2
      });
      await delay(100);
      expect(f2).toBeCalled();
    });
  });
});
    