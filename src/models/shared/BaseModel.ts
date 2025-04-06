export interface BaseModel {
    id: number;
    name: string;
}

export interface BaseModelKv {
  key: number;
  value: string;
}

export interface Pageable {
  pageNumber: number;
  pageSize: number;
  offset: number;
  paged: boolean;
  unpaged: boolean;
}

export interface Sort {
  empty: boolean;
  unsorted: boolean;
  sorted: boolean;
}