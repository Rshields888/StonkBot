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
    //news
    if (message.content === '$news') {
      finnhubClient.generalNews("general", {}, (error, data, response) => {
        console.log(data)
        console.log(error)
      })
    }
    
    //grab info from ticker
    else if (message.content.includes('$')) {
      var t = message.content.substring(1, message.content.length)
      t = t.toUpperCase()
      var info = []
      var output = ""
      
      //get quote
      finnhubClient.quote(t, (error, data, response) => {
        
        //check to make sure we have a valid response
        console.log(Object.keys(data).length > 0)
        if (Object.keys(data).length > 0) {
           info.push(data)
            
           //get recommendations
           finnhubClient.recommendationTrends(t, (e, d, r) => {
                //console.log(d)
                info.push(d)
           });
            
           //get agrregate indicator
           finnhubClient.aggregateIndicator(t, "D", (e, d, r) => {
                //console.log(d)
                info.push(d)
           });
           
           //get companies basic financials
           finnhubClient.companyBasicFinancials(t, "margin", (e, d, r) => {
                //console.log(d)
                info.push(d)
           });
            
           //pretty print everything
           console.log(info)
           message.reply(t);
        }
       });
    }
 
    

});

 

// THIS  MUST  BE  THIS  WAY

client.login(process.env.BOT_TOKEN);//BOT_TOKEN is the Client Secret
