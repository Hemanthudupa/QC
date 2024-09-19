export default class APIError extends Error {
  public code: string;

  public statusCode: number;

  constructor(
    message: string,
    code: string = "ERROR_CODE",
    statusCode: number = 400
  ) {
    super(message);
    this.code = code;
    this.statusCode = statusCode;
  }
}
