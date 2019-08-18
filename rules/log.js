const Rollbar = require('rollbar');

function rule(user, context, callback) {
  const rollbar = new Rollbar({
    accessToken: configuration.rollbarToken,
    captureUncaught: true,
    captureUnhandledRejections: true
  });
  rollbar.info('New User', user);
  callback(null, user, context);
}

module.exports = { rule };
