import { Lock, Mail, UserIcon } from 'lucide-react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { register, selectAuth } from '../features/auth/authSlice'
import { openLoginModal, closeRegisterModal } from '../features/auth/modalAuthSlice'
import type { AppDispatch } from '../store/store'
import toast from 'react-hot-toast'
import Input from './Input'

export default function RegisterForm() {
  const dispatch = useDispatch<AppDispatch>()
  const { loading, error } = useSelector(selectAuth)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const result = await dispatch(register(formData)).unwrap()
      if (result.status === 'success') {
        toast.success('Register berhasil! Silakan login.')
        dispatch(closeRegisterModal())
        dispatch(openLoginModal())
      }
    } catch {
      toast.error('Register gagal. Silakan coba lagi.')
    }
  }

  return (
    <div className="animate-in slide-in-from-bottom-4 duration-300">
      <h2 className="text-3xl font-bold mb-2 font-['Quicksand']">Gabung Yuk!</h2>
      <p className="text-gray-400 mb-8 text-sm">Buat akun untuk berbagi cerita.</p>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="relative">
          <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
          <Input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Nama Lengkap"
            required
          />
        </div>
        <div className="relative">
          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
          <Input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            required
          />
        </div>
        <div className="relative">
          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
          <Input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password (min. 6 karakter)"
            required
            minLength={6}
          />
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-white text-primary font-bold py-4 rounded-2xl mt-4 hover:opacity-90 active:scale-95 transition-all disabled:opacity-50"
        >
          {loading ? 'Mendaftar...' : 'Daftar'}
        </button>
      </form>

      <p className="text-center mt-8 text-sm text-gray-400">
        Sudah punya akun?{' '}
        <button
          onClick={() => dispatch(openLoginModal())}
          className="text-white font-bold hover:underline underline-offset-4"
        >
          Masuk di sini
        </button>
      </p>
    </div>
  )
}