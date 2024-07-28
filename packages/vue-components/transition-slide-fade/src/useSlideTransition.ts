import { ToRefs } from 'vue';
import { Direction, TransitionSlideFadeProps } from './transition-slide-fade.props';
const isVertical = (val:Direction):boolean => val === 'top' || val === 'bottom';

export const useSlideTransition = (
  props: ToRefs<TransitionSlideFadeProps>
) => {
  const { from, to, offset } = props;
  const onBeforeEnter = (_el:Element) => {
    props.onBeforeEnter.value(_el);
    const el = _el as HTMLElement;
    el.style.opacity = '0';
    const transform = el.computedStyleMap().get('transform');
    const key = isVertical(from.value) ? 'Y' : 'X';
    const d = (from.value === 'left' || from.value === 'top') ? -1 : 1;
    const cssTransform = new CSSTransformValue([
      ...Array.from((transform as CSSTransformValue)?.values() ?? []).filter((val) => val instanceof CSSTranslate),
      new CSSTranslate(
        new CSSUnitValue(
          key === 'X' ? offset.value * d : 0,
          'px'
        ),
        new CSSUnitValue(
          key === 'Y' ? offset.value * d : 0,
          'px'
        )
      )
    ]);
    el.dataset.oldTransform = el.style.transform;
    el.style.transform = cssTransform.toString();
  };
  const onEnter = (_el:Element) => {
    props.onEnter.value();
    const el = _el as HTMLElement;
    requestAnimationFrame(() => {
      el.style.transform = el.dataset.oldTransform ?? '';
      el.style.opacity = '1';
    });
  };
  const onLeave = (_el: Element) => {
    props.onLeave.value();
    const el = _el as HTMLElement;
    const transform = el.computedStyleMap().get('transform');
    const key = isVertical(to.value) ? 'Y' : 'X';
    const d = (to.value === 'left' || to.value === 'top') ? -1 : 1;
    el.style.setProperty(
      'transform',
      new CSSTransformValue([
        ...Array.from((transform as CSSTransformValue).values?.() ?? []).filter((val) => val instanceof CSSTranslate),
        new CSSTranslate(
          new CSSUnitValue(
            key === 'X' ? offset.value * d : 0,
            'px'
          ),
          new CSSUnitValue(
            key === 'Y' ? offset.value * d : 0,
            'px'
          )
        )
      ]).toString()
    );
    el.style.opacity = '0';
  };
  return { onBeforeEnter, onEnter, onLeave };
};