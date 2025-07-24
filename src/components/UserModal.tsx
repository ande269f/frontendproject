import React, { useEffect } from 'react';
import {
  Modal,
  ModalContent,
  ModalBody,
  ModalFooter,
} from '@heroui/modal';
import { Button } from '@heroui/button';
import { useAppDispatch, useAppSelector } from '../hooks';
import { fetchTodosByUserId } from '../store/API/getTodosSlice';
import { User } from '../store/API/getUsersSlice';
import styles from './UserModal.module.scss';

interface UserModalProps {
  isOpen: boolean;
  onOpenChange: () => void;
  user: User | null;
}

const UserModal: React.FC<UserModalProps> = ({ isOpen, onOpenChange, user }) => {
  const dispatch = useAppDispatch();

  // Todo state i redux
  const {data: todos, loading, error } = useAppSelector(state => state.todos);

  // Når user ændres, hent todos for den bruger
  useEffect(() => {
    if (user) {
      dispatch(fetchTodosByUserId(user.id));
    }
  }, [user, dispatch]);

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable className={styles.modal}>
      <ModalContent className="modalWidthOverride">
          <ModalBody className="modalBodyScrollable">
            {user ? (
              <div className={styles.contentGrid}>
                <div className={styles.userInfo}>
                  <p><strong>Navn:</strong> {user.name}</p>
                  <p><strong>Brugernavn:</strong> {user.username}</p>
                  <p><strong>Email:</strong> {user.email}</p>
                  <p><strong>Telefon:</strong> {user.phone}</p>
                  <p><strong>Website:</strong> {user.website}</p>
                  <p><strong>Adresse:</strong> {user.address.street}, {user.address.suite}, {user.address.city}, {user.address.zipcode}</p>
                  <p><strong>Geo:</strong> Lat: {user.address.geo.lat}, Lng: {user.address.geo.lng}</p>
                  <p><strong>Firma:</strong> {user.company.name}</p>
                  <p><strong>Catchphrase:</strong> {user.company.catchPhrase}</p>
                  <p><strong>BS:</strong> {user.company.bs}</p>
                </div>

                <div className={styles.todos}>
                  <p className={styles.todoHeader}><strong>Todos:</strong></p>

                  {loading && <p>Loader todos...</p>}
                  {error && <p>Fejl i loading af todos: {error}</p>}
                  {!loading && !error && todos.length === 0 && <p>Ingen todos fundet.</p>}
                  {!loading && !error && todos.length > 0 && (
                    <ul>
                      {todos.map(todo => (
                        <li key={todo.id}>
                          <input type="checkbox" checked={todo.completed} readOnly /> {todo.title}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            ) : (
              <p>Ingen bruger valgt</p>
            )}
          </ModalBody>
        <ModalFooter>
          <Button color="primary" onPress={onOpenChange}>
            Luk
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default UserModal;
