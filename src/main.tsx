import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router';
import router from './routes/router.tsx';
import { ThemeProvider } from './providers/ThemeProvider.tsx';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from './redux/store.ts';
import { Toaster } from 'sonner';
import AosProvider from './providers/AosProvider.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <ReduxProvider store={store}>
        <AosProvider>
          <RouterProvider router={router} />
          <Toaster position="top-right" richColors theme="system" />
        </AosProvider>
      </ReduxProvider>
    </ThemeProvider>
  </StrictMode>,
);
