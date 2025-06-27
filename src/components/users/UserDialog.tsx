import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '../ui/dialog';
import UserForm from './UserForm';
import UserDeleteConfirm from './UserDeleteConfirm';
import type { User } from '@/features/users/usersTypes';
import { XIcon, PencilIcon, TrashIcon } from 'lucide-react';
import { Button } from '../ui/button';

interface UserDialogProps {
  mode: 'view' | 'edit' | 'create' | 'delete' | null;
  user: User | null;
  open: boolean;
  loading?: boolean;
  onClose: () => void;
  onCreate: (data: { last_name: string; first_name: string; email: string }) => void;
  onEdit: (data: { last_name: string; first_name: string; email: string }) => void;
  onDelete: () => void;
}

const UserDialog: React.FC<UserDialogProps> = ({ mode, user, open, loading, onClose, onCreate, onEdit, onDelete }) => {
  if (!mode) return null;

  return (
    <Dialog open={open} onOpenChange={open => !open && onClose()}>
      <DialogContent showCloseButton onInteractOutside={onClose}>
        {mode === 'view' && user && (
          <>
            <DialogHeader>
              <DialogTitle>User Details</DialogTitle>
              <DialogDescription>ID: {user.id}</DialogDescription>
            </DialogHeader>
            <div className="py-2">
              <div><b>Name:</b> {user.last_name}, {user.first_name}</div>
              <div><b>Email:</b> {user.email}</div>
            </div>
            <DialogFooter>
              <Button variant="outline" className="flex items-center gap-1" onClick={onClose}>
                <XIcon className="size-4" /> Close
              </Button>
              <Button variant="default" className="flex items-center gap-1" onClick={() => onEdit({ last_name: user.last_name, first_name: user.first_name, email: user.email })}>
                <PencilIcon className="size-4" /> Edit
              </Button>
              <Button variant="destructive" className="flex items-center gap-1" onClick={onDelete}>
                <TrashIcon className="size-4" /> Delete
              </Button>
            </DialogFooter>
          </>
        )}
        {mode === 'create' && (
          <>
            <DialogHeader>
              <DialogTitle>Create User</DialogTitle>
            </DialogHeader>
            <UserForm loading={loading} onSubmit={onCreate} onCancel={onClose} />
          </>
        )}
        {mode === 'edit' && user && (
          <>
            <DialogHeader>
              <DialogTitle>Edit User</DialogTitle>
            </DialogHeader>
            <UserForm
              initialValues={{ last_name: user.last_name, first_name: user.first_name, email: user.email }}
              loading={loading}
              onSubmit={onEdit}
              onCancel={onClose}
            />
          </>
        )}
        {mode === 'delete' && user && (
          <UserDeleteConfirm
            user={user}
            loading={loading}
            onConfirm={onDelete}
            onCancel={onClose}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default UserDialog; 