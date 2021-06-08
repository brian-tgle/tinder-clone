export type FnType = (param?: object) => void;
export interface AnyObject {
  [key: string]: any;
}
export interface ActionProps {
  handleClick: Function;
}

export interface Pagination {
  currentPage: number;
  totalPages: number;
}
