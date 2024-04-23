
import { describe, it, expect} from 'vitest';
import { mount } from '@vue/test-utils';
import input from '../src/input.vue';
describe('camelCase(name)', ()=>{
    it('should to be defined', ()=>{
        expect(mount(input)).toBeDefined()
    })
})
    