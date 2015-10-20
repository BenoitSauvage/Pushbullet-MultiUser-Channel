var express = require('express');
var router  = express();
var bcrypt  = require('bcrypt-nodejs');
var https   = require('https');
var server  = require('http').createServer();
var CONFIG  = require('../bin/config');
var io      = require('socket.io')(server);

server.listen(3001);

bcrypt.hash(CONFIG.PASSWORD, null, null, function(err, hash) {
  passHash = hash;
});

router.get('/', function(req, res) {
  res.render('index', {title: CONFIG.APP_NAME, error: 0});
});

io.sockets.on('connection', function(socket) {

  socket.on('sendpush', function (obj) {
    sendPush(obj.title, obj.body);
  });

});


function sendPush(title, body) {
  var options = {
    hostname: 'api.pushbullet.com',
    port: 443,
    path: '/v2/pushes',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Access-Token': CONFIG.ACCOUNT_TOKEN
    }
  };

  // Request to the channel
  var channelRequest = https.request(options, function (res) {
    body = '';
    res.on('data', function(chunk) {
      body += chunk;
    });
    res.on('end', function() {
      console.log('Message : ' + body);
    });
  });

  channelRequest.on('error', function (e) { console.error(e); });

  var channelParams = {
    channel_tag: CONFIG.CHANNEL_TAG,
    type       : 'note',
    title      : title,
    body       : body
  };
  channelRequest.write(JSON.stringify(channelParams));
  channelRequest.end();
}

router.post('/', function(req, res) {
  var passOk = bcrypt.compareSync(req.body.password, passHash);
  if(passOk) {
    var title = req.body.title;
    var body  = req.body.text;

    sendPush(title, body);

    res.render('index', {title: CONFIG.APP_NAME, error: 0, message_sent: true});
  } else {
    res.render('index', {title: CONFIG.APP_NAME, error: 1});
  }
});

module.exports = router;
