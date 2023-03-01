import statusCodes from "./statusCodes.js";
import { Response } from "express";

const apiResponse = (
  res: Response,
  error: boolean,
  message: string | null,
  data: object | null,
  status: string,
  isErrorArray?: boolean,
  apiVersion?: string
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
