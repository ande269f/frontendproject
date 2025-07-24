export interface AsyncState<T> {
  data: T;
  loading: boolean;
  error: string | null;
}

export const createInitialAsyncState = <T>(data: T): AsyncState<T> => ({
  data,
  loading: false,
  error: null,
});