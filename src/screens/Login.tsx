import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Typography } from '@/components/ui/typography';
import { Input } from '@/components/ui/input';
import { login } from '@/features/auth/authThunks';
import { selectLoading, selectError, selectToken } from '@/features/auth/authSelectors';
import { useAppDispatch } from '@/features/store';

interface LoginFormInputs {
  email: string;
  password: string;
}

function Login() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const token = useSelector(selectToken);
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<LoginFormInputs>({
    defaultValues: { email: '', password: '' },
    mode: 'onBlur',
  });

  useEffect(() => {
    if (token) {
      navigate('/users', { replace: true });
    }
  }, [token, navigate]);

  const onSubmit = (data: LoginFormInputs) => {
    dispatch(login(data));
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 text-foreground transition-colors">
      <div className="w-full max-w-md rounded-lg bg-card p-8 shadow-md text-card-foreground transition-colors">
        <Typography variant="h3" className="mb-6 text-center">Login</Typography>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              rules={{
                required: 'Email is required',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: 'Invalid email address',
                },
              }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      autoComplete="email"
                      placeholder="Enter your email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              rules={{ required: 'Password is required' }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showPassword ? 'text' : 'password'}
                        autoComplete="current-password"
                        placeholder="Enter your password"
                        className="pr-10"
                        {...field}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        tabIndex={-1}
                        className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                        onClick={() => setShowPassword((v) => !v)}
                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                      >
                        {showPassword ? (
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12.001C3.226 16.273 7.322 19.5 12 19.5c1.772 0 3.45-.37 4.96-1.03M21.065 12.001c-.272-.74-.635-1.447-1.08-2.104M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 3l18 18" />
                          </svg>
                        ) : (
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12c0-4.556 4.694-8.25 9.75-8.25s9.75 3.694 9.75 8.25-4.694 8.25-9.75 8.25S2.25 16.556 2.25 12z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                        )}
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {error && (
              <Typography variant="muted" className="text-destructive text-center">
                {error}
              </Typography>
            )}
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (
                <svg className="animate-spin h-5 w-5 mr-2 inline-block" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                </svg>
              ) : null}
              Login
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}

export default Login;
