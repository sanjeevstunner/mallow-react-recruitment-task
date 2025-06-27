import React, { useState } from 'react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';

interface UserFormProps {
  initialValues?: { last_name: string; first_name: string; email: string };
  loading?: boolean;
  onSubmit: (values: { last_name: string; first_name: string; email: string }) => void;
  onCancel: () => void;
}

const UserForm: React.FC<UserFormProps> = ({ initialValues = { last_name: '', first_name: '', email: '' }, loading, onSubmit, onCancel }) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<{ last_name?: string; first_name?: string; email?: string }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const errs: { last_name?: string; first_name?: string; email?: string } = {};
    if (!values.last_name.trim()) errs.last_name = 'Last name is required';
    if (!values.first_name.trim()) errs.first_name = 'First name is required';
    if (!values.email.trim()) errs.email = 'Email is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) onSubmit(values);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-1">
        <label htmlFor="last_name" className="block text-sm font-medium">Last Name</label>
        <Input
          id="last_name"
          name="last_name"
          value={values.last_name}
          onChange={handleChange}
          disabled={loading}
          placeholder="Enter last name"
        />
        {errors.last_name && <div className="text-destructive text-sm">{errors.last_name}</div>}
      </div>
      <div className="space-y-1">
        <label htmlFor="first_name" className="block text-sm font-medium">First Name</label>
        <Input
          id="first_name"
          name="first_name"
          value={values.first_name}
          onChange={handleChange}
          disabled={loading}
          placeholder="Enter first name"
        />
        {errors.first_name && <div className="text-destructive text-sm">{errors.first_name}</div>}
      </div>
      <div className="space-y-1">
        <label htmlFor="email" className="block text-sm font-medium">Email</label>
        <Input
          id="email"
          name="email"
          value={values.email}
          onChange={handleChange}
          disabled={loading}
          placeholder="Enter email"
          type="email"
        />
        {errors.email && <div className="text-destructive text-sm">{errors.email}</div>}
      </div>
      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onCancel} disabled={loading}>
          Cancel
        </Button>
        <Button type="submit" variant="default" disabled={loading}>
          {loading ? (
            <svg className="animate-spin h-5 w-5 mr-2 inline-block" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
            </svg>
          ) : null}
          {loading ? 'Saving...' : 'Save'}
        </Button>
      </div>
    </form>
  );
};

export default UserForm; 