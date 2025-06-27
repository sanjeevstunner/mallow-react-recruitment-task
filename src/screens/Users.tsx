import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch } from '@/features/store';
import UserTable from '@/components/users/UserTable';
import UserPagination from '@/components/users/UserPagination';
import UserDialog from '@/components/users/UserDialog';
import { fetchUsers, createUser, updateUser, deleteUser } from '@/features/users/usersThunks';
import {
  selectUsers,
  selectUsersLoading,
  selectUsersError,
  selectUsersPage,
  selectUsersTotalPages,
  selectSelectedUser,
  selectDialogMode,
} from '@/features/users/usersSelectors';
import { setPage, setSelectedUser, setDialogMode } from '@/features/users/usersSlice';
import type { User } from '@/features/users/usersTypes';
import { Button } from '@/components/ui/button';
import { PlusIcon } from 'lucide-react';
import { toast } from 'sonner';

const Users: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const users = useSelector(selectUsers);
  const loading = useSelector(selectUsersLoading);
  const error = useSelector(selectUsersError);
  const page = useSelector(selectUsersPage);
  const totalPages = useSelector(selectUsersTotalPages);
  const selectedUser = useSelector(selectSelectedUser);
  const dialogMode = useSelector(selectDialogMode);
  const [dialogLoading, setDialogLoading] = useState(false);

  console.log("select users", users)

  useEffect(() => {
    dispatch(fetchUsers(page));
  }, [dispatch, page]);

  const handlePageChange = (newPage: number) => {
    dispatch(setPage(newPage));
  };

  const handleView = (user: User) => {
    dispatch(setSelectedUser(user));
    dispatch(setDialogMode('view'));
  };

  const handleEdit = (user: User) => {
    dispatch(setSelectedUser(user));
    dispatch(setDialogMode('edit'));
  };

  const handleDeleteAction = (user: User) => {
    dispatch(setSelectedUser(user));
    dispatch(setDialogMode('delete'));
  };

  const handleDialogClose = () => {
    dispatch(setDialogMode(null));
    dispatch(setSelectedUser(null));
    setDialogLoading(false);
  };

  const handleCreate = async (data: { last_name: string; first_name: string; email: string }) => {
    setDialogLoading(true);
    await dispatch(createUser(data));
    setDialogLoading(false);
    toast.success('User created successfully');
    handleDialogClose();
    dispatch(fetchUsers(page));
  };

  const handleEditAction = async (data: { last_name: string; first_name: string; email: string }) => {
    if (!selectedUser) return;
    setDialogLoading(true);
    await dispatch(updateUser({ id: selectedUser.id, data }));
    setDialogLoading(false);
    toast.success('User updated successfully');
    handleDialogClose();
    dispatch(fetchUsers(page));
  };

  const handleDelete = async () => {
    if (!selectedUser) return;
    setDialogLoading(true);
    await dispatch(deleteUser(selectedUser.id));
    setDialogLoading(false);
    toast.success('User deleted successfully');
    handleDialogClose();
    dispatch(fetchUsers(page));
  };

  return (
    <div className="max-w-3xl mx-auto py-8">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">User Management</h1>
        <Button
          variant="default"
          size="default"
          onClick={() => dispatch(setDialogMode('create'))}
          disabled={loading}
          className="flex items-center gap-2"
        >
          {loading ? (
            <svg className="animate-spin h-5 w-5 mr-2 inline-block" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
            </svg>
          ) : (
            <PlusIcon className="w-5 h-5" />
          )}
          Create User
        </Button>
      </div>
      {loading ? (
        <div className="flex justify-center items-center py-12">
          <svg className="animate-spin h-8 w-8 mr-2 text-primary" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
          </svg>
        </div>
      ) : (
        <UserTable
          users={users}
          loading={loading}
          error={error}
          onView={handleView}
          onEdit={handleEdit}
          onDelete={handleDeleteAction}
        />
      )}
      <UserPagination page={page} totalPages={totalPages} onPageChange={handlePageChange} />
      <UserDialog
        mode={dialogMode}
        user={selectedUser}
        open={!!dialogMode}
        loading={dialogLoading}
        onClose={handleDialogClose}
        onCreate={handleCreate}
        onEdit={dialogMode === 'view' ? () => dispatch(setDialogMode('edit')) : handleEditAction}
        onDelete={dialogMode === 'view' ? () => dispatch(setDialogMode('delete')) : handleDelete}
      />
    </div>
  );
};

export default Users; 