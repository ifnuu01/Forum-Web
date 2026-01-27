import React from 'react';
import { useSelector } from 'react-redux';
import RegisterForm from './RegisterForm';
import LoginForm from './LoginForm';
import { selectModalAuth } from '../features/auth/modalAuthSlice';

export default function AuthModal() {
  const { isLoginModalOpen, isRegisterModalOpen } = useSelector(selectModalAuth);

  if (!isLoginModalOpen && !isRegisterModalOpen) return null;

  return (
    <div className="fixed inset-0 bg-[#121212]/90 backdrop-blur-md flex items-center justify-center z-60 p-4 animate-in fade-in duration-200">
      <div className="bg-primary rounded-4xl w-full max-w-md text-white border border-[#474B4F] shadow-2xl overflow-hidden relative">
        <div className="p-8">
          {isLoginModalOpen ? <LoginForm /> : <RegisterForm />}
        </div>
      </div>
    </div>
  );
}