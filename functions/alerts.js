require("../config/config");
const { WebClient } = require('@slack/web-api');
const web = new WebClient(process.env.SLACK_TOKEN);

const notification = async function (id,level,chanel,section,title_message ,message){
    let icon_notification = JSON.parse(process.env.ICON_LEVEL_NOTIFICACTIONS)[level.toUpperCase()]
    try{
        const slack_message = await web.chat.postMessage({ channel:chanel, as_user:true,
            "attachments": [
                {
                    "fallback":icon_notification + icon_notification + section +icon_notification + icon_notification,
                    "color": JSON.parse(process.env.COLOR_LEVEL_NOTIFICACTIONS)[level.toUpperCase()],
                    "author_name":icon_notification + icon_notification + section + icon_notification + icon_notification,
                    "fields": [
                        {
                            "title": title_message,
                            "value": JSON.stringify(message)
                        }
                    ],
                    "footer": "Ecommerce Mobo",
                    "footer_icon": "https://mobomx.myvtex.com/arquivos/m_square.png"
                }
            ]});
    }catch (e) {
        console.log("Error en mensaje de slack: ",e);
    }
}


exports.notification = notification;
