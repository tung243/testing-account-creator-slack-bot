const https = require('https')
const gen = require('./generate_random_acc')
const _ = require("lodash");


module.exports.triggerPipelineBuild = function triggerPipelineBuild(menuSelectedItem, menuSelectedItemDesc, slackUserID, slackChannelID) {
    if (!_.isNil(menuSelectedItem) && !_.isNil(menuSelectedItemDesc) && !_.isNil(slackUserID)
        && !_.isNil(slackChannelID)) {
        sendRequest(menuSelectedItem, menuSelectedItemDesc, slackUserID, slackChannelID)
    }
}

function sendRequest(menuSelectedItem, menuSelectedItemDesc, slackUserID, slackChannelID) {
    const data = JSON.stringify({
        'ref': 'master',
        'token': process.env.PIPELINE_TOKEN,
        'CREATE_ACCOUNT': gen.generateRandomACC(),
        'MENU_SELECTED_ITEM': menuSelectedItem,
        'MENU_SELECTED_ITEM_DESC': menuSelectedItemDesc,
        'SLACK_USERID': slackUserID,
        'SLACK_CHANNELID': slackChannelID
    })

    const options = {
        hostname: 'project.scmp.tech',
        path: '/api/v4/projects/1270/trigger/pipeline',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': data.length
        }
    }

    const req = https.request(options, res => {
        // console.log(`status code: ${res.statusCode}`)

        res.on('data', d => {
            console.log("Submitted pipeline build request")
            // process.stdout.write(d)
        })
    })

    req.on('error', error => {
        console.log("error=" + error)
        console.error(error)
    })
    console.log("Send request data=" + data)
    req.write(data)
    req.end()
}




