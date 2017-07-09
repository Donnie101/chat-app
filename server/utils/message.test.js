const expect = require('expect');
const {generateMessage,generateLocationMessage} = require('./message');

 describe('generateMessage',()=>{
   it('should generate correct message object ',()=>{
     var res = generateMessage('Jack','How are you');
     expect(res.from).toBe('Jack');
     expect(res.text).toBe('How are you');
     expect(res.createdAt).toBeA('number');
   });
 });


describe('generateLocationMessage',()=>{
  it('should generate correct location object',()=>{
    var message = generateLocationMessage('Jack',55,55);
    expect(message.from).toBe('Jack');
    expect(message.url).toBe('https://www.google.com/maps?q=55,55');
    expect(message.createdAt).toBeA('number');
  });
});
