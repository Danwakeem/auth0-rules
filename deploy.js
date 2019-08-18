const fs = require('fs');
const _ = require('lodash');
const ManagementClient = require('auth0').ManagementClient;

const management = new ManagementClient({
  domain: process.env.DOMAIN,
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  // scope: 'read:rules update:rules create:rules read:rules_configs update:rules_configs',
  audience: `https://${process.env.DOMAIN}/api/v2/`,
  tokenProvider: {
    enableCache: true,
    cacheTTLInSeconds: 10
  },
});

uploadExistingRules = async (existingRules, rules) => {
  for (let index in existingRules) {
    const eRule = existingRules[index];
    const foundRule = _.find(rules, { name: eRule.name });
    if (foundRule) {
      await management.updateRule({ id: foundRule.id }, eRule);
    }
  }
};

uploadNewRules = async (newRules) => {
  for (let index in newRules) {
    const rule = newRules[index];
    await management.createRule(rule);
  }
};

const getRuleFiles = (path) => {
  const files = fs.readdirSync('./dist', { encoding: 'utf8' });
  return files.map((fileName) => {
    const script = fs.readFileSync(`./dist/${fileName}`, { encoding: 'utf8' });
    return {
      enabled: true,
      script,
      name: _.snakeCase(fileName.replace('.js', '')),
    };
  });
};

const deployRules = async () => {
  const rules = await management.getRules();
  const ruleFiles = getRuleFiles('./dist');

  const newRules = _.differenceBy(ruleFiles, rules, 'name');
  const existingRules = _.differenceBy(ruleFiles, newRules, 'name');

  await uploadNewRules(newRules);
  await uploadExistingRules(existingRules);
};

deployRules();
