import appConfig from "./appConfig.js";

export default (p) => {
  return appConfig.STATUS_CODES[p];
};
