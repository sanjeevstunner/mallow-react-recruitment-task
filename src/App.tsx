import { Outlet, useNavigate } from 'react-router-dom';
import { Header } from './components/Header';
import { useSelector, useDispatch } from 'react-redux';
import { selectToken } from './features/auth/authSelectors';
import { logout } from './features/auth/authSlice';
import { useEffect } from 'react';

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector(selectToken);
  const email = localStorage.getItem('email');

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem('email');
    navigate('/login', { replace: true });
  };

  useEffect(() => {
    if (!token) {
      navigate('/login', { replace: true });
    }
  }, [token, navigate]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header user={email ? { email } : undefined} onLogout={handleLogout} />
      <main className="flex-1 w-full max-w-5xl mx-auto px-2 sm:px-4 py-4">
        <Outlet />
      </main>
    </div>
  );
}

export default App;
