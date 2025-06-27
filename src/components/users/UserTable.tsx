import React from 'react';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../ui/table';
import type { User } from '@/features/users/usersTypes';
import { Button } from '../ui/button';
import { EyeIcon, PencilIcon, TrashIcon } from 'lucide-react';

interface UserTableProps {
  users: User[];
  loading: boolean;
  error: string | null;
  onRowClick?: (user: User) => void;
  onView?: (user: User) => void;
  onEdit?: (user: User) => void;
  onDelete?: (user: User) => void;
}

const UserTable: React.FC<UserTableProps> = ({ users, loading, error, onRowClick, onView, onEdit, onDelete }) => {
  if (loading) return <div className="p-4 text-center">Loading users...</div>;
  if (error) return <div className="p-4 text-center text-red-500">{error}</div>;
  if (!users.length) return <div className="p-4 text-center">No users found.</div>;

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <TableRow
            key={user.id}
            className="cursor-pointer hover:bg-muted"
            onClick={() => onRowClick?.(user)}
          >
            <TableCell>{user.id}</TableCell>
            <TableCell>{`${user.last_name}, ${user.first_name}`}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>
              <div className="flex gap-2">
                <Button variant="ghost" size="icon" aria-label="View user" onClick={e => { e.stopPropagation(); onView?.(user); }}>
                  <EyeIcon />
                </Button>
                <Button variant="ghost" size="icon" aria-label="Edit user" onClick={e => { e.stopPropagation(); onEdit?.(user); }}>
                  <PencilIcon />
                </Button>
                <Button variant="ghost" className='text-red-500 hover:text-red-700' size="icon" aria-label="Delete user" onClick={e => { e.stopPropagation(); onDelete?.(user); }}>
                  <TrashIcon />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default UserTable; 