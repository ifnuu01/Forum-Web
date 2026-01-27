import { Lock, Mail } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { closeLoginModal, closeRegisterModal, openRegisterModal } from '../features/auth/modalAuthSlice';
import { login, selectAuth } from '../features/auth/authSlice';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import type { AppDispatch } from '../store/store';
import Input from './Input';

export default function LoginForm() {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error } = useSelector(selectAuth);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await dispatch(login(formData)).unwrap();
      if (result.status === 'success') {
        toast.success('Login berhasil!');
        dispatch(closeRegisterModal());
        dispatch(closeLoginModal());
      }
    } catch {
      toast.error('Login gagal. Silakan coba lagi.');
    }
  };

  return (
    <div className="animate-in slide-in-from-bottom-4 duration-300">
      <h2 className="text-3xl font-bold mb-2 font-['Quicksand']">Halo Lagi!</h2>
      <p className="text-gray-400 mb-8 text-sm">Masuk untuk mulai berdiskusi.</p>

      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
        <div className="relative">
          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
          <Input
            type="email"
            placeholder="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="relative">
          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
          <Input
            type="password"
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            minLength={6}
          />
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-white text-primary font-bold py-4 rounded-2xl mt-4 hover:opacity-90 active:scale-95 transition-all">
          {loading ? 'Memproses...' : 'Masuk'}
        </button>
      </form>

      <p className="text-center mt-8 text-sm text-gray-400">
        Belum punya akun?{' '}
        <button
          onClick={() => dispatch(openRegisterModal())}
          className="text-white font-bold hover:underline underline-offset-4"
        >
          Daftar Sekarang
        </button>
      </p>
    </div>
  );
}