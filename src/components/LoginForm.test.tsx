import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import LoginForm from './LoginForm';
import { describe, expect, it } from 'vitest';
import { Provider } from 'react-redux';
import { store } from '../store/store';

// Skenario pengujian LoginForm:
// - Menampilkan input email dan password
// - Pengguna dapat mengetik di kedua input tersebut

function renderWithProvider(ui: React.ReactElement) {
  return render(<Provider store={store}>{ui}</Provider>);
}

describe('LoginForm', () => {
  it('renders email and password input', () => {
    renderWithProvider(<LoginForm />);
    expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
  });

  it('can type in email and password fields', () => {
    renderWithProvider(<LoginForm />);
    fireEvent.change(screen.getByPlaceholderText(/email/i), { target: { value: 'test@dicoding.com' } });
    fireEvent.change(screen.getByPlaceholderText(/password/i), { target: { value: '123456' } });
    expect(screen.getByPlaceholderText(/email/i)).toHaveValue('test@dicoding.com');
    expect(screen.getByPlaceholderText(/password/i)).toHaveValue('123456');
  });
});