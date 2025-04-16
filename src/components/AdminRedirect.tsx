import { useEffect } from 'react';

export const AdminRedirect = () => {
  useEffect(() => {
    window.location.href = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
  }, []);
  
  return null;
};
