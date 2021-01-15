const {
    lightshot,
    imgur
} = require('./config.json')

if(lightshot.enable) require('./sites/lightshot')(lightshot)
if(imgur.enable) require('./sites/imgur')(imgur)