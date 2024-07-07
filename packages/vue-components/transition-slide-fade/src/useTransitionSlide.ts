import { ToRefs } from 'vue';
import { Direction, TransitionSlideFadeProps } from './transition-slide-fade.props';

type TransitionStrategy = {
  [x in `from-${Direction}`| `to-${Direction}`]: (
    el: HTMLElement
  )=>void
}

export const useTransitionSlide = (
  props: ToRefs<
    Readonly<TransitionSlideFadeProps>
  >
) => {
  const { from, to, offset } = props;
  const strategy: TransitionStrategy = {
    'from-top': function (el: HTMLElement): void {
      // TODO
    },
    'from-left': function (el: HTMLElement): void {
      // TODO
    },
    'from-right': function (el: HTMLElement): void {
      // TODO
    },
    'from-bottom': function (el: HTMLElement): void {
      // TODO
    },
    'to-top': function (el: HTMLElement): void {
      // TODO
    },
    'to-left': function (el: HTMLElement): void {
      // TODO
    },
    'to-right': function (el: HTMLElement): void {
      // TODO
    },
    'to-bottom': function (el: HTMLElement): void {
      // TODO
    }
  };
  
};