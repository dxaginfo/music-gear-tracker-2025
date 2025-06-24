import '@/styles/globals.css';
import { useState, useEffect } from 'react';
import type { AppProps } from 'next/app';
import { CacheProvider, EmotionCache } from '@emotion/react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { Provider as ReduxProvider } from 'react-redux';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { SnackbarProvider } from 'notistack';
import { SessionProvider } from 'next-auth/react';

import { store } from '@/store';
import { createEmotionCache } from '@/utils/createEmotionCache';
import { lightTheme, darkTheme } from '@/styles/theme';
import Layout from '@/components/layout/Layout';
import AuthGuard from '@/components/auth/AuthGuard';
import SocketProvider from '@/contexts/SocketContext';

// Client-side cache for Emotion CSS
const clientSideEmotionCache = createEmotionCache();

// Create a react-query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 60 * 1000, // 1 minute
      retry: 1,
    },
  },
});

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

export default function App({ 
  Component, 
  pageProps: { session, ...pageProps }, 
  emotionCache = clientSideEmotionCache 
}: MyAppProps) {
  const [darkMode, setDarkMode] = useState(false);
  
  // Effect to detect and set initial dark mode preference
  useEffect(() => {
    // Check local storage or system preference
    const savedMode = localStorage.getItem('darkMode');
    const prefersDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    setDarkMode(savedMode === 'true' || (savedMode === null && prefersDarkMode));
  }, []);
  
  // Toggle dark mode function
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    localStorage.setItem('darkMode', (!darkMode).toString());
  };

  // Check if the component requires authentication
  const requiresAuth = (Component as any).requiresAuth ?? true;

  return (
    <CacheProvider value={emotionCache}>
      <SessionProvider session={session}>
        <ReduxProvider store={store}>
          <QueryClientProvider client={queryClient}>
            <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <SocketProvider>
                  <SnackbarProvider 
                    maxSnack={3} 
                    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                  >
                    <CssBaseline />
                    <Layout darkMode={darkMode} toggleDarkMode={toggleDarkMode}>
                      {requiresAuth ? (
                        <AuthGuard>
                          <Component {...pageProps} />
                        </AuthGuard>
                      ) : (
                        <Component {...pageProps} />
                      )}
                    </Layout>
                    <ReactQueryDevtools initialIsOpen={false} />
                  </SnackbarProvider>
                </SocketProvider>
              </LocalizationProvider>
            </ThemeProvider>
          </QueryClientProvider>
        </ReduxProvider>
      </SessionProvider>
    </CacheProvider>
  );
}