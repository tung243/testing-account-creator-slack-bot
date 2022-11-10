const menu_items_context = require('./menu_items_context')
const triggerPipelineBuild = require('./triggerPipelineBuild')
const globals = require('./globals')
const keys = require('./keys')

function respond(payload, respond) {
    var selectedOptionValue = payload.actions[0].selected_option.value
    var selectedOptionText = payload.actions[0].selected_option.text.text
    var slack_userid = payload.user.id
    var slack_channelid = payload.channel.id
    console.log('userid=' + JSON.stringify(payload.user.id))
    console.log('channelid=' + JSON.stringify(payload.channel.id))
    globals.last_access_user = slack_userid
    switch (selectedOptionValue) {
        case menu_items_context.MENU1_ITEM1:
        case menu_items_context.MENU2_ITEM1:
        case menu_items_context.MENU2_ITEM2:
        case menu_items_context.MENU2_ITEM3:
        case menu_items_context.MENU2_ITEM4:
        case menu_items_context.MENU2_ITEM5:
        case menu_items_context.MENU3_ITEM1:
        case menu_items_context.MENU3_ITEM2:
        case menu_items_context.MENU3_ITEM3:
        case menu_items_context.MENU3_ITEM4:
        case menu_items_context.MENU3_ITEM5:
        case menu_items_context.MENU4_ITEM1:
        case menu_items_context.MENU4_ITEM2:
            respondToMenuFinalItem(selectedOptionValue, selectedOptionText, slack_userid, slack_channelid, respond)
            break
        case menu_items_context.MENU1_ITEM2:
            respondToMenu2(selectedOptionValue, selectedOptionText, respond)
            break
        case menu_items_context.MENU1_ITEM3:
            respondToMenu3(selectedOptionValue, selectedOptionText, respond)
            break
        case menu_items_context.MENU1_ITEM4:
            respondToMenu4(selectedOptionValue, selectedOptionText, respond)
            break
    }

    return { text: 'Processing...' }
}

function respondToMenuFinalItem(selectedOption, selectedOptionText, slackUserID, slackChannelID, respond) {
    console.log("arrived")
    var respond_text = ""
    var remark = ""
    if (globals.lock_status !== keys.LOCKED) {
        respond_text = 'Please wait around 2 to 4 minutes to create the testing account.\nAccount Type: ' + selectedOptionText
        remark = '\nRemark: You may try again or contact this software owner if there is no response more than 8 minutes.'
        globals.lock_status = keys.LOCKED
        triggerPipelineBuild.triggerPipelineBuild(selectedOption, selectedOptionText, slackUserID, slackChannelID)
    } else if (globals.lock_status == keys.LOCKED && globals.last_access_user == slackUserID) {
        respond_text = 'You have submitted the request. Someone is in use. Please wait a few minutes to try again'
    } else {
        respond_text = 'Someone is in use. Please wait a few minutes to try again'
    }

    respond({
        text: respond_text,
        attachments: [{ "color": "#808080", "attachment_type": "default", "text": remark }],
        replace_original: true
    })
}

function respondToMenu2(selectedOption, selectedOptionText, respond) {
    const menu2 = require('./elements/menu2.json')
    console.log("arrived2")
    respond(menu2)
}

function respondToMenu3(selectedOption, selectedOptionText, respond) {
    const menu3 = require('./elements/menu3.json')
    console.log("arrive3")
    respond(menu3)
}

function respondToMenu4(selectedOption, selectedOptionText, respond) {
    const menu4 = require('./elements/menu4.json')
    console.log("arrive4")
    respond(menu4)
}

module.exports.respond = respond