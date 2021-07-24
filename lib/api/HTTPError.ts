import { getReasonPhrase } from "http-status-codes";

export class HTTPError extends Error {
  code: number;
  metadata?: { [key: string]: any };
  constructor(
    code: number = 500,
    message: string = getReasonPhrase(code),
    metadata?: { [key: string]: any }
  ) {
    super(message);
    this.name = `${getReasonPhrase(code).replace(/ /g, "")}Error`;
    this.code = code;
    this.metadata = metadata;
  }

  toString() {
    return this.message;
  }
}
