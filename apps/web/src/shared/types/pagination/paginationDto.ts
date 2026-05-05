export interface PaginationDto<T> {
  content: T;
  currentPage: number;
  size: number;
  totalPages: number;
  totalElements: number;
  hasNext: boolean;
  hasPrev: boolean;
}
