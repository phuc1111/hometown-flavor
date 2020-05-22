const Nexmo = require('nexmo')
const nexmo = new Nexmo({
    apiKey: '56b7f124',
    apiSecret: 'c7qAnaYma1oqZ60c'
})
// const from = 'Vonage APIs';
// const to = '84364097989';
// const text = 'Hello from Vonage SMS API';
module.exports.sendSms = function (req, res) {
    nexmo.message.sendSms(from, to, text);
    console.log("ss")
}
