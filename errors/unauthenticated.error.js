import { StatusCodes } from "http-status-codes";
import CustomAPIError from "./CustomAPIError.js";

class UnauthenticatedError extends CustomAPIError {
  constructor(message) {
    super(message);
    this.statusCodes = StatusCodes.UNAUTHORIZED;
  }
}

export default UnauthenticatedError;
