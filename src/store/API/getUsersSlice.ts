// getUsersSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { AsyncState, createInitialAsyncState} from '../utils/asyncState';
import { handleAsyncThunk } from '../utils/handleAsyncThunks';

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async () => {
    const response = await axios.get<User[]>('https://jsonplaceholder.typicode.com/users');
    return response.data;
  }
);

const initialState: AsyncState<User[]> = createInitialAsyncState([]);

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    handleAsyncThunk(builder, fetchUsers);
  },
});

export default userSlice.reducer;
