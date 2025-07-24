import { AsyncThunk, PayloadAction, Draft, ActionReducerMapBuilder } from '@reduxjs/toolkit';

export interface AsyncState<T> {
  data: T;
  loading: boolean;
  error: string | null;
}

export function handleAsyncThunk<TData, TState extends AsyncState<TData>>(
  builder: ActionReducerMapBuilder<TState>,
  thunk: AsyncThunk<TData, any, {}>
) {
  builder
    .addCase(thunk.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(thunk.fulfilled, (state, action: PayloadAction<TData>) => {
      state.loading = false;
      (state as Draft<TState>).data = action.payload as Draft<TData>;
    })
    .addCase(thunk.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Noget gik galt';
    });
}
