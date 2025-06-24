import { useState, useEffect, ReactNode } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { CircularProgress, Box } from '@mui/material';

interface AuthGuardProps {
  children: ReactNode;
}

const AuthGuard = ({ children }: AuthGuardProps) => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  // Public routes that don't require authentication
  const publicRoutes = ['/login', '/register', '/forgot-password', '/reset-password'];

  useEffect(() => {
    // Check if we're still loading the session
    if (status === 'loading') {
      setIsLoading(true);
      return;
    }

    // If on a public route, no need to redirect
    if (publicRoutes.includes(router.pathname)) {
      setIsLoading(false);
      return;
    }

    // If not authenticated and not on a public route, redirect to login
    if (!session && !publicRoutes.includes(router.pathname)) {
      router.push({
        pathname: '/login',
        query: { returnUrl: router.asPath }
      });
    } else {
      // User is authenticated
      setIsLoading(false);
    }
  }, [session, status, router]);

  // Show loading indicator while checking authentication
  if (isLoading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          width: '100%',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  // If on public route or authenticated, render children
  return <>{children}</>;
};

export default AuthGuard;