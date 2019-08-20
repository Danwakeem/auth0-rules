function rule(user, context, callback) {
  const request = require('request');
  const postToRollbar = person => {
    const now = new Date();
    const options = {
      method: 'POST',
      url: 'https://api.rollbar.com/api/1/item/',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        access_token: configuration.rollbarToken,
        data: {
          level: 'info',
          environment: 'test',
          timestamp: now.getTime(),
          platform: 'linux',
          language: 'node.js',
          person: {
            id: '1234',
            username: person.name,
            email: person.email
          },
          title: 'Test Rollbar From Auth0',
          body: {
            message: {
              body: 'Test Rollbar From Auth0',
              route: 'rule/log-test'
            }
          }
        }
      })
    };

    request(options);
  };

  postToRollbar(user);
  callback(null, user, context);
}

module.exports = { rule };
