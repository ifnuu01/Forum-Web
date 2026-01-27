import { Toaster } from 'react-hot-toast';
import AppRouter from './navigation/Router';
import React, { StrictMode } from 'react';

function App() {
  return (
    <StrictMode>
      <Toaster position="top-right" />
      <AppRouter />
    </StrictMode>
  );
}

export default App;
