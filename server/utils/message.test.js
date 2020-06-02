var expect=require('expect');
var {genmessage}=require('./message');

describe('genmessage',()=>{
    it("SHOULD generate correct mess obj",()=>{
        var from="jen";
        var text="hello";
        var message=genmessage(from,text);
        expect(typeof message.createdAt).toBe('number');
        expect(message).toMatchObject({
            from,
            text
        });
    });

});