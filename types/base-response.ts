export type ApiResponse<T> = {
  status: string;
  code: number;
  message: string;
  data: T;
};

interface PaginationMeta {
  current_page: number;
  page_count: number;
  total_pages_count: number;
  total_count: number;
}

export type Pagination = [PaginationMeta | null];
