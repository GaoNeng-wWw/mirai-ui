
import { describe, it, expect} from 'vitest';
import { mount } from '@vue/test-utils';
import helper from '../src/helper.vue';
describe('camelCase(name)', ()=>{
    it('should to be defined', ()=>{
        expect(mount(helper)).toBeDefined()
    })
})
    