const expect = require('expect');

const {isRealString} = require('./isRealString');

describe('is Real String', () => {
    
    it('should reject non string value', () => {
        let res = isRealString(65);
        expect(res).toBe(false);
    });

    it('should reject with only space', () => {
        let res = isRealString('                    ');
        expect(res).toBe(false);
    });

    it('should reject with non space chars', () => {
        let res = isRealString('          NICL       ');
        expect(res).toBe(true);
    });

});