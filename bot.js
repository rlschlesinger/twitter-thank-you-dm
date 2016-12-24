var Twit = require('twit');

var config = require('./config');

// Pass API credentials into new instance of Twit
var T = new Twit(config);

var stream = T.stream('user');

stream.on('follow', followed);

function followed(eventMsg) {
  var id = eventMsg.source.id;
  var screenName = eventMsg.source.screen_name;
  // Only run function if you gain a new follower, not if you follow someone new
  if (id !== 3015436408) {
    directMessage("Hi there, @" + screenName + "! Thanks for following me! Anytime you want to talk about writing, marketing, programming, or tech, I'm your guy!", screenName);
  }
}

function directMessage(txt, scrn) {
  console.log(txt);
  console.log(scrn);
  T.post('direct_messages/new', { screen_name: scrn, text: txt }, function(err, data, response) {
    console.log(data);
  });
}
