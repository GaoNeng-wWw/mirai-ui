import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import PopperContent from '../src/content.vue';
import { KEY } from '../src/popper.props';
import { nextTick, ref } from 'vue';

describe('Popper Content', () => {
  it('should to be defined', () => {
    expect(
      mount(
        PopperContent,
        {
          global: {
            provide: {
              [KEY]: {
                trigger: ref(undefined),
                content: ref(undefined),
                safePoly: ref(undefined),
                virtualTrigger: ref(false),
                placement: ref('top'),
                offset: ref(8),
                flip: ref(false),
                middlewares: ref([]),
                safepoly: ref(false),
                safepolyDebug: ref(false),
                autoPlacement: ref(false)
              }
            }
          }
        }
      )
    ).toBeDefined();
  });
  it('virtual trigger', async () => {
    const pos = ref({
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
    });
    const virtual = ref({
      getBoundingClientRect() {
        return pos.value;
      }
    });
    const wrapper = mount(
      PopperContent,
      {
        global: {
          provide: {
            [KEY]: {
              trigger: virtual,
              content: ref(undefined),
              safePoly: ref(undefined),
              virtualTrigger: ref(false),
              placement: ref('top'),
              offset: ref(8),
              flip: ref(false),
              middlewares: ref([]),
              safepoly: ref(false),
              safepolyDebug: ref(false),
              autoPlacement: ref(false)
            }
          }
        }
      }
    );
    expect(wrapper).toBeDefined();
    pos.value = new DOMRect(1, 0, 1, 1);
    await nextTick();
  });
});