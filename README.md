# Pushbullet MultiUser Channel

This app allows you to have multiple people can post to send push on the same channel.
You just need to clone this repo.

Don't forget to run the following command :
```
npm install
```

Then set up your app using the config.js file in /bin
```
var config = {
  ACCOUNT_TOKEN: // Pushbullet token of the channel owner,
  CHANNEL_TAG  : // Channel tag (set when adding the channel),
  APP_NAME     : // Name of your app (while be display in the app's main page and in the tab browser title),
  PASSWORD     : // This is the password that users must enter to send their pushs
};
```

Then run :
```
node bin/www
```
or
```
node start
```
