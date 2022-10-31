// const bodyParser = require('body-parser')
const { WebClient } = require('@slack/web-api')
const token = process.env.SLACK_BOT_TOKEN
const web = new WebClient(token)
const keys = require('./keys')
const _ = require("lodash");
var globals = require('./globals')

module.exports.listenForBuilds = function listenForBuilds(app) {
    app.post('/pipeline/builds', (req, res) => {
        var status = req.body.object_attributes.status
        var detailed_status = req.body.object_attributes.detailed_status
        console.log('result=' + JSON.stringify(req.body.object_attributes))
        // console.log('status=' + status)
        // var jsonString = payload.replaceAll('\\', '');
        var response_text = ""
        if (status == 'success' && !_.isNil(req.body.object_attributes.variables[0])) {
            var payload = JSON.parse(req.body.object_attributes.variables[0].value)
            var create_acc = payload.CREATE_ACCOUNT
            var menuSelectedItem = payload.MENU_SELECTED_ITEM
            var menuSelectedItem_desc = payload.MENU_SELECTED_ITEM_DESC
            var slack_userid = payload.SLACK_USERID
            var slack_channelid = payload.SLACK_CHANNELID
            var return_color = "#2EB67D"
            if (detailed_status == 'passed') {
                response_text = "The testing account is created successfully.\n" +
                    "Account type: " + menuSelectedItem_desc + "\n" +
                    "Testing account: " + create_acc
                return_color = "#2EB67D"
            } else {
                response_text = "There is somethings wrong when doing the create account process. You may try again or contact this software owner."
                return_color = "#E01E5A"
            }
            if (!_.isNil(slack_userid) && !_.isNil(slack_channelid)) {
                globals.lock_status = keys.UNLOCKED
                try {
                    web.chat.postEphemeral({
                        channel: slack_channelid,
                        user: slack_userid,
                        // text: response_text
                        attachments: [{ "color": return_color, "attachment_type": "default", "text": response_text }],
                        //   attachments: [response_text]
                    })
                    console.log('Message posted!')
                } catch (error) {
                    console.log('have error')
                    console.log(error)
                }
            }
        }

        res.json({
            ip: req.ip,
            method: req.method,
            body: req.body
        })
    })
}