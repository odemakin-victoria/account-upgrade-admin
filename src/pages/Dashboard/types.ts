export interface Paginate<T> {
    data: T[];
    totalCount: number;
    message: string;
    statusCode: number;
  }