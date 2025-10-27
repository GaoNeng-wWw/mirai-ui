import { Component, Plugin } from 'vue';

export type WithInstall = {
  name: string;
  components: Component[];
};
export type CustomPlugin = Plugin & {
  name: string;
};
export const withInstall = (
  props: WithInstall,
): CustomPlugin => {
  return {
    name: props.name,
    install(app) {
      props.components.forEach((comp, idx) => {
        app.component(comp.name ?? `Component-${idx}`, comp);
      });
    },
  };
};
