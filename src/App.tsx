import './App.scss';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './hooks';
import { fetchUsers } from './store/API/getUsersSlice';
import UserTable from './components/UserTable';

function App() {
  const dispatch = useAppDispatch();
  const {data: users, loading, error } = useAppSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <div style={{ padding: '2rem' }}>

      {loading && <p>Loader...</p>}
      {error && <p>Fejl: {error}</p>}

      {!loading && !error && <UserTable users={users} />}
    </div>
  );
}

export default App;
