// getTodosSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { AsyncState, createInitialAsyncState} from '../utils/asyncState';
import { handleAsyncThunk } from '../utils/handleAsyncThunks';

export interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export const fetchTodosByUserId = createAsyncThunk(
  'todos/fetchByUserId',
  async (userId: number) => {
    const response = await axios.get<Todo[]>(
      `https://jsonplaceholder.typicode.com/users/${userId}/todos`
    );
    return response.data;
  }
);

const initialState: AsyncState<Todo[]> = createInitialAsyncState([]);

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    handleAsyncThunk(builder, fetchTodosByUserId);
  },
});

export default todosSlice.reducer;

