const expect = require('expect');
const {isRealString} = require('./validation');

describe('isRealString',()=>{
  it('should reject non-string values',()=>{
    var str = 5;
    expect(isRealString(str)).toBe(false);
  });

  it('should reject string with only spaces',()=>{
    var str = '   ';
    expect(isRealString(str)).toBe(false);
  });

  it('should allow string with non-sapace charachters',()=>{
    var str = 'Top to the morning';
    expect(isRealString(str)).toBe(true);

  });

});
