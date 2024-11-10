import { useRouter } from 'next/router';
import { clearCookies } from '@/utils/auth';

interface LogoutHandlerProps {
  setIsLoggedIn?: (value: string | null) => void;
  onLogoutSuccess?: () => void;
}

export const handleLogout = async ({ 
  setIsLoggedIn, 
  onLogoutSuccess 
}: LogoutHandlerProps = {}) => {
  try {
    clearCookies();

    localStorage.clear();
    
    sessionStorage.clear();

    if (setIsLoggedIn) {
      setIsLoggedIn(null);
    }

    // // Call API to invalidate the session (if you have a logout endpoint)
    // try {
    //   await fetch('/api/auth/logout', {
    //     method: 'POST',
    //     credentials: 'include'
    //   });
    // } catch (error) {
    //   console.error('Error calling logout API:', error);
    // }

    // // Call success callback if provided
    if (onLogoutSuccess) {
      onLogoutSuccess();
    }

    // // Redirect to login page
    window.location.href = '/login';
  } catch (error) {
    console.error('Logout error:', error);
  }
};