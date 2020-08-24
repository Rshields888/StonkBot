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
      var info = ""
      finnhubClient.quote(t, (error, data, response) => {
        console.log(data)
          console.log(typeof(data))
         console.log(data.keys)
      });
      
        
      message.reply(t);
    }
 
    

});

 

// THIS  MUST  BE  THIS  WAY

client.login(process.env.BOT_TOKEN);//BOT_TOKEN is the Client Secret
