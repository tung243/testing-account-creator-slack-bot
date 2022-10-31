const date = require('date-and-time')
const randomstring = require("randomstring")

function generateRandomACC() {
    var rs = randomstring.generate(4)
    // Getting the locale value
    const value = date.locale()
    // process.env.TZ = 'Asia/Hong_Kong'
    process.env.TZ = 'America/New_York'     //The server is in US
    const dateTimeHK = new Date().toLocaleString('en-us', {
        timeZone: 'Asia/Hong_Kong'
    })
    const date_now = date.format(new Date(dateTimeHK.toString()), 'YYYYMMDD')

    // Format of the testing acc: test.[date][random_string with 4 digits]@test.com
    var testing_acc = 'test.' + date_now + '_' + rs + '@test.com'

    return testing_acc
}

module.exports.generateRandomACC = generateRandomACC