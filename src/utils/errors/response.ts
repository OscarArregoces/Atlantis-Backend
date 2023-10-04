import { Response } from "express";

enum HttpStatus {
  OK = 200,
  BAD_REQUEST = 400,
  NOT_FOUND = 404,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  INTERNAL_SERVER_ERROR = 500,
}

export class HttpResponse {
  Ok(res: Response, data?: any): Response {
    return res.status(HttpStatus.OK).json({
      error: false,
      message: "Success",
      data: data,
    });
  }
  BadRequest(res: Response, data?: any): Response {
    return res.status(HttpStatus.BAD_REQUEST).json({
      error: true,
      message: "Bad request",
      data: data,
    });
  }

  NotFound(res: Response, data?: any): Response {
    return res.status(HttpStatus.NOT_FOUND).json({
      error: true,
      message: "Not Found",
      data: data,
    });
  }

  Unauthorized(res: Response, data?: any): Response {
    return res.status(HttpStatus.UNAUTHORIZED).json({
      error: true,
      message: "Unauthorized",
      data: data,
    });
  }

  Forbidden(res: Response, data?: any): Response {
    return res.status(HttpStatus.FORBIDDEN).json({
      error: true,
      message: "Forbidden",
      data: data,
    });
  }

  Error(res: Response, data?: any): Response {
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      error: true,
      message: "Internal server error",
      data: data,
    });
  }
}


export class ClientError extends Error {
  statusCode: number;
  constructor(
    message: string,
    status: number = 400
  ) {
    super(message)
    this.statusCode = status;
  }
}