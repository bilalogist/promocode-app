import appConfig from "./appConfig";

export default (p) => {
  return appConfig.STATUS_CODES[p];
};
