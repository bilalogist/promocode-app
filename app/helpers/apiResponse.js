import statusCodes from "./statusCodes.js";

const apiResponse = (
  res,
  error,
  message,
  data,
  status,
  isErrorArray,
  apiVersion
) => {
  error = error || false;
  isErrorArray = isErrorArray || false;
  message = message || null;
  data = data || null;
  status = status || "OK";
  apiVersion = apiVersion || "v2";

  let statusCodeString = statusCodes(status);
  let response = {
    error: error,
    message: message,
    data: data,
    isErrorArray: isErrorArray,
    apiVersion: apiVersion,
    statusCode: statusCodeString,
  };
  return res.status(statusCodeString).json(response);
};

export default apiResponse;
