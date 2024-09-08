import { mount } from '@vue/test-utils';
import { describe, expect, it, vi } from 'vitest';
import popper from '../src/popper.vue';
import PopperTrigger from '../src/trigger.vue';
import { h, nextTick, ref } from 'vue';
import { KEY } from '../src/popper.props';
describe('popper', () => {
  it('should to be defined', () => {
    expect(
      mount(popper)
    ).toBeDefined();
  });
  it('virtual-trigger', async () => {
    const wrapper = mount(
      popper,
      {
        slots:{
          default: () => h(
            PopperTrigger,
            h(
              'span',
              'hello-world'
            )
          )
        },
        props: {
          virtualTrigger: true,
          triggerRef: {
            getBoundingClientRect:() => new DOMRect(0, 0, 0, 0)
          }
        }
      },
    );
    expect(
      wrapper.find('span').exists()
    ).toBeFalsy();
    await wrapper.setProps({ virtualTrigger: false });
    await nextTick();
    expect(
      wrapper.find('span').exists()
    ).toBeTruthy();
  });
  it.todo('event', async () => {
    const f = vi.fn();
    const trigger = mount(
      PopperTrigger,
      {
        onClick: f,
        // click: f,
        slots: {
          default: h(
            'span',
            'hello-world'
          ),
        },
        global: {
          provide: {
            [KEY]: {
              virtualTrigger: false,
              trigger: ref(undefined),
            }
          }
        }
      },
    );
    await trigger.trigger('click');
    expect(trigger.emitted().click).toHaveLength(1);
  });
});