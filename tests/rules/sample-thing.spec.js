const sandbox = require('sinon').createSandbox();
const proxyquire = require('proxyquire');

describe('sample-thing', () => {
  let cb;
  let rule;
  beforeEach(() => {
    // Add your configuration object here
    global.configuration = {};
    cb = sandbox.spy();
    rule = proxyquire('./../../rules/sample-thing', {}).rule;
  });

  afterEach(() => sandbox.restore());

  it('should call the callback once', () => {
    const user = {};
    const context = {};
    rule(user, context, cb);

    // Verify callback was called one time
    sandbox.assert.calledOnce(cb);
    sandbox.assert.calledWith(cb, null, user, context);
  });
});
