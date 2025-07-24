
import React, { useState } from 'react';
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from '@heroui/table';
import { useDisclosure } from '@heroui/use-disclosure';
import { User } from '../store/API/getUsersSlice';
import UserModal from './UserModal';
import styles from './UserTable.module.scss';
import {Tooltip} from "@heroui/tooltip";

interface UserTableProps {
  users: User[];
}

type SortKey = 'name' | 'phone' | 'email' | 'address';
type SortOrder = 'asc' | 'desc';

const UserTable: React.FC<UserTableProps> = ({ users }) => {
  const [sortKey, setSortKey] = useState<SortKey>('name');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');

  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortOrder(prev => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(key);
      setSortOrder('asc');
    }
  };

  const handleRowClick = (user: User) => {
    setSelectedUser(user);
    onOpen();
  };

  const sortedUsers = [...users].sort((a, b) => {
    let aValue = '';
    let bValue = '';

    switch (sortKey) {
      case 'name':
      case 'email':
      case 'phone':
        aValue = a[sortKey];
        bValue = b[sortKey];
        break;
      case 'address':
        aValue = `${a.address.city}`;
        bValue = `${b.address.city}`;
        break;
    }

    return sortOrder === 'asc'
      ? aValue.localeCompare(bValue)
      : bValue.localeCompare(aValue);
  });

  const sortIndicator = (key: SortKey) => {
    return sortKey === key ? (sortOrder === 'asc' ? ' ▲' : ' ▼') : '';
  };

  return (
    <>
      <Table aria-label="User Table" isStriped className={styles.userTable}>
        <TableHeader>
          <TableColumn onClick={() => handleSort('name')} style={{ cursor: 'pointer' }} className={styles.sortable}>
            Navn{sortIndicator('name')}
          </TableColumn>
          <TableColumn onClick={() => handleSort('phone')} style={{ cursor: 'pointer' }} className={styles.sortable}>
            Telefon{sortIndicator('phone')}
          </TableColumn>
          <TableColumn onClick={() => handleSort('email')} style={{ cursor: 'pointer' }} className={styles.sortable}>
            Email{sortIndicator('email')}
          </TableColumn>
          <TableColumn onClick={() => handleSort('address')} style={{ cursor: 'pointer' }} className={styles.sortable}>
            Adresse{sortIndicator('address')}
          </TableColumn>
        </TableHeader>
        <TableBody>
          {sortedUsers.map((user) => (
            <TableRow
              key={user.id}
              onClick={() => handleRowClick(user)}
              tabIndex={0}
              role="button"
              className={styles.clickablerow}
              style={{ cursor: 'pointer' }} 
            >
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.phone}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                  <Tooltip
                        content={`${user.address.street}, ${user.address.suite}, ${user.address.city}, ${user.address.zipcode}`}
                        placement="top"
                        color="default"
                        showArrow
                        className={styles.tooltip}>
                        <span>{user.address.city}</span>
                  </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <UserModal isOpen={isOpen} onOpenChange={onOpenChange} user={selectedUser} />
    </>
  );
};

export default UserTable;
