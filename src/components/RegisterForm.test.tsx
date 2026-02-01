import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import RegisterForm from './RegisterForm';
import { describe, expect, it } from 'vitest';
import { Provider } from 'react-redux';
import { store } from '../store/store';

// Skenario pengujian RegisterForm:
// - Menampilkan input nama, email, dan password
// - Pengguna dapat mengetik di semua input tersebut


function renderWithProvider(ui: React.ReactElement) {
  return render(<Provider store={store}>{ui}</Provider>);
}

describe('RegisterForm', () => {
  it('renders name, email, and password input', () => {
    renderWithProvider(<RegisterForm />);
    expect(screen.getByPlaceholderText(/nama lengkap/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
  });

  it('can type in all fields', () => {
    renderWithProvider(<RegisterForm />);
    fireEvent.change(screen.getByPlaceholderText(/nama lengkap/i), { target: { value: 'Dicoding' } });
    fireEvent.change(screen.getByPlaceholderText(/email/i), { target: { value: 'test@dicoding.com' } });
    fireEvent.change(screen.getByPlaceholderText(/password/i), { target: { value: '123456' } });
    expect(screen.getByPlaceholderText(/nama lengkap/i)).toHaveValue('Dicoding');
    expect(screen.getByPlaceholderText(/email/i)).toHaveValue('test@dicoding.com');
    expect(screen.getByPlaceholderText(/password/i)).toHaveValue('123456');
  });
});