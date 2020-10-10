var env = {};

env.stage = {
  port: 3000,
  envName: "stage",
};

env.prod = {
  port: 5000,
  envName: "prod",
};

var currEnv =
  typeof process.env.NODE_ENV == "string"
    ? env[process.env.NODE_ENV.toLowerCase()]
    : env["stage"];

module.exports = currEnv;
