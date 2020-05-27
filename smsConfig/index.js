var twilio = require('twilio');
var accountSid = 'ACe22d535911002bdeda7e25db8a79c2da'; // Your Account SID from www.twilio.com/console
var authToken = 'b95d78cc754edb3f81949fae15ad465b';   // Your Auth Token from www.twilio.com/console

var twilio = require('twilio');
var client = new twilio(accountSid, authToken);

client.messages.create({
    body: '132564',
    to: '+84364097989',  // Text this number
    from: '+12565888023' // From a valid Twilio number
})
    .then((message) => console.log(message.sid));