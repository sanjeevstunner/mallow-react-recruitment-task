import React from 'react';
import type { User } from '@/features/users/usersTypes';
import { Button } from '../ui/button';

interface UserDeleteConfirmProps {
  user: User;
  loading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const UserDeleteConfirm: React.FC<UserDeleteConfirmProps> = ({ user, loading, onConfirm, onCancel }) => (
  <div className="space-y-4">
    <div className="text-center">
      Are you sure you want to delete <span className="font-bold">{user.last_name}, {user.first_name}</span> (<span className="font-mono">{user.email}</span>)?
    </div>
    <div className="flex justify-end gap-2">
      <Button variant="outline" onClick={onCancel} disabled={loading}>
        Cancel
      </Button>
      <Button variant="destructive" onClick={onConfirm} disabled={loading}>
        {loading ? (
          <svg className="animate-spin h-5 w-5 mr-2 inline-block" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
          </svg>
        ) : null}
        {loading ? 'Deleting...' : 'Delete'}
      </Button>
    </div>
  </div>
);

export default UserDeleteConfirm; 