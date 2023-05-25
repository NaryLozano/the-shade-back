class CustomError extends Error {
  constructor(
    message: string,
    public statusCode: number,
    public publicMessage?: string
  ) {
    super(message);
    this.statusCode = statusCode;
    this.publicMessage = publicMessage ?? message;
  }
}

export default CustomError;
