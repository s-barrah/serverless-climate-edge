const envVars = {};
const optionalRequire = require('optional-require')(require);
const envJson = optionalRequire('./env.json') || {};

// Add env vars from environment
Object.keys(process.env).forEach((key) => {
  envVars[key] = process.env[key];
});

// Add env vars from env json
Object.keys(envJson).forEach((key) => {
  envVars[key] = envJson[key];
});

module.exports.getEnvVars = () => {
  return envVars;
};
