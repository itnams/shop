export interface IApiResult<T> {
    map(arg0: (d: any) => string): unknown[] | undefined;
    success: boolean;
    message: string;
    token?: string;
    nextLink?: string;
    prevLink?: string;
    data?: T | null;
  }