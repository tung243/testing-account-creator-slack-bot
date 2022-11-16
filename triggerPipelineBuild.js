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
        'ref': '9-test-pipleline-variables',
        'token': process.env.PIPELINE_TOKEN,
        'variables[CREATE_ACCOUNT]': gen.generateRandomACC(),
        'variables[MENU_SELECTED_ITEM]': menuSelectedItem,
        'variables[MENU_SELECTED_ITEM_DESC]': menuSelectedItemDesc,
        'variables[SLACK_USERID]': slackUserID,
        'variables[SLACK_CHANNELID]': slackChannelID
    })

    var params = []
    params.push('ref=9-test-pipleline-variables')
    params.push('token=' + process.env.PIPELINE_TOKEN)
    params.push('variables[CREATE_ACCOUNT]=' + gen.generateRandomACC())
    params.push('variables[MENU_SELECTED_ITEM]=' + menuSelectedItem)
    params.push('variables[MENU_SELECTED_ITEM_DESC]=' + menuSelectedItemDesc)
    params.push('variables[SLACK_USERID]=' + slackUserID)
    params.push('variables[SLACK_CHANNELID]=' + slackChannelID)

    var fullurl = 'https://project.scmp.tech/api/v4/projects/1270/trigger/pipeline' + '?' + params.join('&')

    // const options = {
    //     hostname: 'project.scmp.tech',
    //     path: '/api/v4/projects/1270/trigger/pipeline',
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json',
    //         'Content-Length': data.length
    //     }
    // }
    const options = {
        method: 'POST',
        url: fullurl,
        headers: {}
    }

    request(options, function (error, response) {
        if (error) throw new Error(error);
        console.log("Submitted pipeline build request");
        console.log(response.body);
    });

    // const req = https.request(options, res => {
    // console.log(`status code: ${res.statusCode}`)

    // res.on('data', d => {
    //     console.log("Submitted pipeline build request")
    //     // process.stdout.write(d)
    // })
    // })

    // req.on('error', error => {
    //     console.log("error=" + error)
    //     console.error(error)
    // })
    // console.log("Send request data=" + data)
    // req.write(data)
    // req.end()
}




