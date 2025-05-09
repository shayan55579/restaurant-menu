import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    const res = await fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include', // 🔑 include cookie
      body: JSON.stringify({ username, password }),
    });

    if (res.ok) {
      toast.success('ورود موفقیت‌آمیز بود');
      setTimeout(() => navigate('/admin'), 1000);
    } else {
      toast.error('نام کاربری یا رمز عبور اشتباه است');
    }
  };

  return (
    <div className="p-8 max-w-sm mx-auto">
      <ToastContainer rtl autoClose={3000} />
      <h2 className="text-2xl mb-4 font-bold text-center">ورود ادمین</h2>
      <input
        className="border p-2 w-full mb-3"
        placeholder="نام کاربری"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        className="border p-2 w-full mb-3"
        type="password"
        placeholder="رمز عبور"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        className="bg-blue-600 text-white w-full p-2 rounded"
        onClick={handleLogin}
      >
        ورود
      </button>
    </div>
  );
};

export default Login;
