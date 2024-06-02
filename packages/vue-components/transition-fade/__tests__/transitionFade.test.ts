
import { describe, it, expect} from 'vitest';
import { mount } from '@vue/test-utils';
import transitionFade from '../src/transitionFade.vue';
describe('camelCase(name)', ()=>{
    it('should to be defined', ()=>{
        expect(mount(transitionFade)).toBeDefined()
    })
})
    