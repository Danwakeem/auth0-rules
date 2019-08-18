const sandbox = require('sinon').createSandbox();
const proxyquire = require('proxyquire');

describe('log', () => {
  let rollbarSpy;
  let log;
  let cb;
  beforeEach(() => {
    global.configuration = {
      rollbarToken: 'xxx'
    };
    rollbarSpy = sandbox.stub();
    rollbarSpy.prototype.info = sandbox.spy();
    const ruleFile = proxyquire('./../../rules/log', {
      rollbar: rollbarSpy
    });
    log = ruleFile.rule;
    cb = sandbox.spy();
  });

  afterEach(() => sandbox.restore());

  it('should call the callback once', () => {
    const user = { user: 'xxx' };
    const context = { hello: 'world' };
    log(user, context, cb);

    // Callback was called once
    sandbox.assert.calledOnce(cb);
    sandbox.assert.calledWith(cb, null, user, context);
  });

  it('should call rollbar with user', () => {
    const user = { user: 'xxx' };
    const context = { hello: 'world' };
    log(user, context, cb);

    // Callback was called once
    sandbox.assert.calledOnce(rollbarSpy.prototype.info);
    sandbox.assert.calledWith(rollbarSpy.prototype.info, 'New User', user);
  });
});
