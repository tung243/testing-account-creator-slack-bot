const gen = require('./generate_random_acc')
const _ = require("lodash");
var axios = require('axios');


module.exports.triggerPipelineBuild = function triggerPipelineBuild(menuSelectedItem, menuSelectedItemDesc, slackUserID, slackChannelID) {
    if (!_.isNil(menuSelectedItem) && !_.isNil(menuSelectedItemDesc) && !_.isNil(slackUserID)
        && !_.isNil(slackChannelID)) {
        sendRequest(menuSelectedItem, menuSelectedItemDesc, slackUserID, slackChannelID)
    }
}

function sendRequest(menuSelectedItem, menuSelectedItemDesc, slackUserID, slackChannelID) {
    console.log("Ready to send request")

    var params = []
    params.push('ref=9-test-pipleline-variables')
    params.push('token=' + process.env.PIPELINE_TOKEN)
    params.push('variables[CREATE_ACCOUNT]=' + gen.generateRandomACC())
    params.push('variables[MENU_SELECTED_ITEM]=' + menuSelectedItem)
    params.push('variables[MENU_SELECTED_ITEM_DESC]=' + menuSelectedItemDesc)
    params.push('variables[SLACK_USERID]=' + slackUserID)
    params.push('variables[SLACK_CHANNELID]=' + slackChannelID)

    var fullurl = 'https://project.scmp.tech/api/v4/projects/1270/trigger/pipeline' + '?' + params.join('&')

    var config = {
        method: 'post',
        url: fullurl,
        headers: {},
        data: data
    };

    axios(config)
        .then(function (response) {
            console.log(JSON.stringify(response.data));
        })
        .catch(function (error) {
            console.log(error);
        });

}




