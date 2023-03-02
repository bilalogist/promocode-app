import appConfig from "./appConfig.js";

export default (p:string) => {
  // @ts-ignore
  return appConfig.STATUS_CODES[p];
};
