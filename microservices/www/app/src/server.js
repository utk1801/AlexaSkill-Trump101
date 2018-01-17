// var express = require('express');
// var app = express();

// //your routes here
// app.get('/', function (req, res) {
//     res.send("Hello World!");
// });

// app.listen(8080, function () {
//   console.log('Example app listening on port 8080!');
// });

var Alexa = require('alexa-sdk');
var http = require('http');

exports.handler = function(event, context, callback){
  var alexa = Alexa.handler(event, context);
  alexa.registerHandlers(handlers);
  alexa.execute();
};

var handlers = {
  'LaunchRequest': function () {
    this.emit('GetAstros');
  },
  'GetAstros': function() {

    getAstrosHttp((data) => {

      // var outputSpeech = `There are currently ${data.people.length} astronauts in space. `;
      // for (var i=0;i<data.people.length;i++){
      //   if (i === 0) {
      //     //first record
      //     outputSpeech = outputSpeech + 'Their names are: ' + data.people[i].name + ', '
      //   } else if (i === data.people.length-1) {
      //     //last record
      //     outputSpeech = outputSpeech + 'and ' + data.people[i].name + '.'
      //   } else {
      //     //middle record(s)
      //     outputSpeech = outputSpeech + data.people[i].name + ', '
      //   }
      // }
      var outputSpeech= 'Here goes a Random yet Funny quote ,by the POTUS, Donald Trump! ' + data.value;


      this.emit(':tell', outputSpeech);
  }
);
  },
  'AMAZON.HelpIntent': function () {
      this.emit(':ask', "What can I help you with?", "How can I help?");
  },
  'AMAZON.CancelIntent': function () {
      this.emit(':tell', "Okay!");
  },
  'AMAZON.StopIntent': function () {
      this.emit(':tell', "Goodbye!");
  }
};


function getAstrosHttp(callback) {
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
