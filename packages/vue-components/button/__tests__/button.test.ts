
import { describe, it, expect} from 'vitest';
import { mount } from '@vue/test-utils';
import button from '../src/button.vue';
describe('Button', ()=>{
    it('should to be defined', ()=>{
        expect(mount(button)).toBeDefined()
    })
})
    