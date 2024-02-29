import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export const getUser = () => {
  const c = cookies();
  const user = c.get('user');
  if (!user) {
    redirect('/login');
  }
  return user.value as unknown as 'Admin' | 'Guest' | 'Guest2';
};

export const setUser = (user: 'Admin' | 'Guest' | 'Guest2') => {
  const c = cookies();
  c.set('user', user);
};
