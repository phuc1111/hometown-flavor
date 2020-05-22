const Nexmo = require('nexmo')
const nexmo = new Nexmo({
    apiKey: '56b7f124',
    apiSecret: 'c7qAnaYma1oqZ60c'
});
module.exports.sendSMS(fromPhone, toPhone, content, callback) {
    nexmo.message.sendSms(84364097989, 84364097989, '123456', {
        type: "unicode"
    }, (err, responseData) => {
        if (err) {
            console.log(err);
        } else {
            if (responseData.messages[0]['status'] === "0") {
                callback("Message sent successfully.")
            } else {
                callback(`Message failed with error: ${responseData.messages[0]['error-text']}`);
            }
        }
    })
}
