const appConfig = require("./appConfig");

module.exports = (p) => {
    return appConfig.STATUS_CODES[p];
};
