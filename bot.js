//hosted on Heroku :)

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
    } //end if
    
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
                if (1 === 1) {
                    //get agrregate indicator
                    finnhubClient.aggregateIndicator(t, "D", (a, b, c) => {
                        //console.log(d)
                        info.push(b)
                    
                        if(1 === 1) {
                            //get companies basic financials
                            finnhubClient.companyBasicFinancials(t, "margin", (x, y, z) => {
                                //console.log(d)
                                info.push(y)
                                //pretty print everything
                                console.log(info)
                                output = t + " Quote: \n" + 'Open: ' + String(info[0]['o']) + '\nHigh: ' + String(info[0]['h']) + '\nLow: ' + String(info[0]['l']) + '\nClose: ' + String(info[0]['c']) + '\nPrevious Close: ' + String(info[0]['pc'])
                                output = output + '\n'
                                output = output + '\nRecommendations as of ' + info[1][0]['period'] + '\nBuy: ' + String(info[1][0]['buy']) + '\nSell: ' + String(info[1][0]['sell']) + '\nHold: ' + String(info[1][0]['hold']) + '\n'
                                output = output + 'Aggregate Indicators: ' + info[2]['technicalAnalysis']['signal'] + '\n'
                                output = output + 'Trends: ' + String(info[2]['trend']['adx']) + ',  Trending = ' + String(info[2]['trend']['trending'])
                                message.reply(output);
                            });
                        
                    }});
                }
           });
               
        }
        
       });
       

    } //end else if 
 
    

});

 

// THIS  MUST  BE  THIS  WAY

client.login(process.env.BOT_TOKEN);//BOT_TOKEN is the Client Secret
