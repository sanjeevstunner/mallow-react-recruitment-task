import { Outlet } from 'react-router-dom';
import { Header } from './components/Header';

function App() {
  // TODO: Replace with real user/auth logic
  const user = { name: 'Jane Doe', email: 'jane@example.com' };
  const handleLogout = () => {
    localStorage.clear()
    window.location.href = '/login';
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header user={user} onLogout={handleLogout} />
      <main className="flex-1 w-full max-w-5xl mx-auto px-2 sm:px-4 py-4">
        <Outlet />
      </main>
    </div>
  );
}

export default App;
