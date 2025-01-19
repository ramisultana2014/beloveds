import { StatusCodes } from "http-status-codes";
// instead of return res.status(400).json, will create error with statuscode 400 and message what we provide catch by express-async-errors in server.js and send it down to app.use((err, req, res, next)

// BadRequestError =400  is good for signup and login  for missing or wrong credintal like email , password ....
export class BadRequestError extends Error {
  // 400 BAD_REQUEST Bad Request
  constructor(message) {
    super(message);
    this.statusCodes = StatusCodes.BAD_REQUEST;
  }
}
export class UnauthenticatedError extends Error {
  // 401 UNAUTHORIZED Unauthorized
  constructor(message) {
    super(message);
    this.statusCodes = StatusCodes.UNAUTHORIZED;
  }
}
export class InternalServerError extends Error {
  // 500 internal server error
  constructor(message) {
    super(message);
    this.statusCodes = StatusCodes.INTERNAL_SERVER_ERROR;
  }
}
export class NotFoundError extends Error {
  //404 not found
  constructor(message) {
    super(message);
    this.statusCodes = StatusCodes.NOT_FOUND;
  }
}
