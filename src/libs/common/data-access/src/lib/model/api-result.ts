export interface IApiResult<T> {
    success: boolean;
    message: string;
    token?: string;
    nextLink?: string;
    prevLink?: string;
    data?: T | null;
  }