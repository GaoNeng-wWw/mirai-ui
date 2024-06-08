import { describe, expect, it } from 'vitest';
import { clean, useClamp, useSafePolygon } from '../src/useSafepoly';
import { ref } from 'vue';
import { Dimensions, ElementRects, FloatingElement, Rect, ReferenceElement } from '@floating-ui/vue';

describe('useSafePoly', () => {
  it('clamp', () => {
    const clamp = useClamp(0, 1);
    expect(clamp(-1)).toBe(0);
    expect(clamp(0.5)).toBe(0.5);
    expect(clamp(1)).toBe(1);
    expect(clamp(2)).toBe(1);
  });
  it('clean', () => {
    const mockEl: HTMLElement = {
      style: {
        top: '1px',
        right: '',
        bottom: '',
        left: ''
      }
    } as HTMLElement;
    clean(mockEl);
    expect(mockEl.style.top).toBe('');
  });
  it('useSafePoly', () => {
    const safePoly = ref({
      style: {
        clipPath: ''
      }
    } as HTMLElement);
    const { fn } = useSafePolygon(safePoly);
    fn({
      x: 0,
      y: 0,
      strategy: 'absolute',
      rects: {
        floating: new DOMRect(0, 0, 0, 0),
        reference: new DOMRect(0, 0, 0, 0)
      },
      elements: {
        floating: {} as unknown as FloatingElement,
        reference: {} as unknown as ReferenceElement,
      },
      middlewareData: {},
      placement: 'top',
      initialPlacement: 'top',
      platform: {
        getElementRects: function (): ElementRects | Promise<ElementRects> {
          throw new Error('Function not implemented.');
        },
        getClippingRect: function (): Rect | Promise<Rect> {
          throw new Error('Function not implemented.');
        },
        getDimensions: function (): Dimensions | Promise<Dimensions> {
          throw new Error('Function not implemented.');
        }
      }
    });
    
  });
});