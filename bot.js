const Discord = require('discord.js');

const client = new Discord.Client();

const finnhub = require('finnhub');
const api_key = finnhub.ApiClient.instance.authentications['api_key'];
api_key.apiKey = process.env.FINN_KEY
const finnhubClient = new finnhub.DefaultApi()

client.on('ready', () => {

    console.log('I am ready!');

});

 

client.on('message', message => {
    
    if (message.content === '$news') {
      finnhubClient.generalNews("general", {}, (error, data, response) => {
        console.log(data)
        console.log(error)
      })
    }
    
    else if (message.content.includes('$')) {
      var t = message.content.substring(1, message.content.length)
      t = t.toUpperCase()
      var info = []
      finnhubClient.quote(t, (error, data, response) => {
        //console.log(data)
        //console.log(Object.keys(data))
        console.log(Object.keys(data).length > 0)
        if (Object.keys(data).length > 0) {
            info.push(data)
            console.log(data)
            finnhubClient.recommendationTrends(t, (e, d, r) => {
                console.log(d)
           });
           finnhubClient.aggregateIndicator(t, "D", (e, d, r) => {
                console.log(d)
           });
           finnhubClient.companyBasicFinancials(t, "margin", (e, d, r) => {
                console.log(d)
           });
           message.reply(t);
           console.log(info)
        }
       });
    }
 
    

});

 

// THIS  MUST  BE  THIS  WAY

client.login(process.env.BOT_TOKEN);//BOT_TOKEN is the Client Secret
