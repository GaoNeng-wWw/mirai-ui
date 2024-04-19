
import { describe, it, expect} from 'vitest';
import { mount } from '@vue/test-utils';
import tag from '../src/tag.vue';
describe('camelCase(name)', ()=>{
    it('should to be defined', ()=>{
        expect(mount(tag)).toBeDefined()
    })
})
    