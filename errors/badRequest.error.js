import { StatusCodes } from "http-status-codes";
import CustomAPIError from "./CustomAPIError.js";

class BadRequestError extends CustomAPIError {
  constructor(message) {
    super(message);
    this.statusCodes = StatusCodes.BAD_REQUEST;
  }
}

export default BadRequestError;
