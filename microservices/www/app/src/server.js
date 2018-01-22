
var Alexa = require('alexa-sdk');
var http = require('http');

exports.handler = function(event, context, callback){
  var alexa = Alexa.handler(event, context);
  alexa.registerHandlers(handlers);
  alexa.execute();
};

var handlers = {
  'LaunchRequest': function () {
    this.emit('TrumpSays');
  },
  'TrumpSays': function() {

    trumpSaysHttp((data) => {
      var outputSpeech= 'Welcome to Trump One o one! In this skill, I say a random quote said by none other than the POTUS Himself ! Haha ,you guessed it rite,its about Donald Trump! GOD BLESS AMERICA, Indeed!! Do you want to get started? Just say Yes or No!';


      this.emit(':ask', outputSpeech,' Do you want the first quote?');
  }
);
  },
  'YesIntent': function () {
    this.emit('TellMore');
  },
  'TellMore': function() {

    trumpSaysHttp((data) => {
      var outputSpeech= data.value + ' Do you want the next quote?';


      this.emit(':ask', outputSpeech,' Do you want the next quote?');
  }
);
  },
  'AMAZON.NoIntent': function () {
      this.emit(':tell',"OK! I know you couldnt take it more! Lol ... Bye! ");
  },
  'AMAZON.HelpIntent': function () {
      this.emit(':ask',"I say a random quote said by none other than the POTUS Himself ! Haha ,you guessed it rite,its about Donald Trump! GOD BLESS AMERICA, Indeed!! Do you want to get started? Just say Yes or No!",' Do you want the next quote?');
  },
  'AMAZON.CancelIntent': function () {
      this.emit(':tell', "Okay!");
  },
  'AMAZON.StopIntent': function () {
      this.emit(':tell', "Goodbye!");
  }
};


function trumpSaysHttp(callback) {
  //http://api.open-notify.org/astros.json
  //https://api.tronalddump.io/random/quote
  var options = {
    host: 'api.tronalddump.io',
    port: 80,
    path: '/random/quote',
    method: 'GET'
  };

  var req = http.request(options, res => {
      res.setEncoding('utf8');
      var returnData = "";

      res.on('data', chunk => {
          returnData = returnData + chunk;
      });

      res.on('end', () => {
        var result = JSON.parse(returnData);

        callback(result);

      });

  });
  req.end();
}
