export interface DefaultErrorField {
  code?: string;
  message?: string;
  timestamp?: string;
  data?: string;
}

export interface DefaultResponseField<T> {
  code?: string;
  message?: string;
  data?: T;
}
