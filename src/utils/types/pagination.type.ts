export type QueryPost = {
  sortBy: string;
  sortDirection: Direction;
  pageNumber: string;
  pageSize: string;
};

export class PaginatedType<T> {
  pagesCount: number;
  page: number;
  pageSize: number;
  totalCount: number;
  items: T[];
}

export enum Direction {
  ASC = 'ASC',
  DESC = 'DESC',
}
