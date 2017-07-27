var expect = require("expect");

var {generateMessage,generateLocationMessage}=require("./message");

describe("generateMessage",() => {
    it("should generate correct message object",() => {
        //store res in variable
        //assert from match
        //assert text match
        //assert createdAt is number
        var from = "Hakan";
        var text="Some message";
        var message=generateMessage(from,text)

        expect(message.createdAt).toBeA("number");
        expect(message).toInclude({from,text})

    });

});

describe("generateLocationMessage",() => {
    it("should generate correct location object",() => {
      var from = "Mehmet";
      var latitude=1;
      var longitude=1;
      var url="https://www.google.com/maps/?q=1,1";
      var message=generateLocationMessage(from,latitude,longitude);
      
      expect(message.createdAt).toBeA("number");
      expect(message).toInclude({from,url})

    //  expect(message.url).toBe("https://www.google.com/maps/?q=1,1");
    });
});