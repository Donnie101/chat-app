const expect = require('expect');
const {generateMessage} = require('./message');

 describe('generateMessage',()=>{
   it('should generate correct message object ',()=>{
     var res = generateMessage('Jack','How are you');
     expect(res.from).toBe('Jack');
     expect(res.text).toBe('How are you');
     expect(res.createdAt).toBeA('number');
   });
 });
