
import type {App} from 'vue';
import Tag from './src/tag.vue';

export {Tag};

export default {
    name: 'Tag',
    install: (app:App) => {
        app.component(Tag.name!, Tag);
    }
}