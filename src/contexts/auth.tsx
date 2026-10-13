'use client';

import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import React, { createContext, useEffect, useState } from 'react';
import { IAccessToken } from '../interfaces/IAcessToken';
import { AuthenticatedUser } from '../interfaces/IAuthenticatedUser';
import { useRouter } from 'next/navigation';

type AuthContextProps = {
  user: AuthenticatedUser | null;
  token: string | null;
  isLogged: boolean;
  signIn: (accessToken: string) => void;
  signOut: () => void;
};

export const AuthContext = createContext({} as AuthContextProps);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthenticatedUser | null>(
    {} as AuthenticatedUser,
  );
  const [token, setToken] = useState<string | null>(null);
  const [isLogged, setIsLogged] = useState<boolean>(false);
  const router = useRouter();

  function loadCookies() {
    const user = Cookies.get('user');
    const token = Cookies.get('token');
    const isLogged = Cookies.get('isLogged');

    if (!user || !token || !isLogged) {
      signOut();
      return;
    }

    setUser(JSON.parse(user));
    setToken(token);
    setIsLogged(Boolean(isLogged));
  }

  function setCookies(user: IAccessToken, accessToken: string) {
    Cookies.set('user', JSON.stringify(user));
    Cookies.set('token', accessToken);
    Cookies.set('isLogged', 'true');
  }

  function removeCookies() {
    Cookies.remove('user');
    Cookies.remove('token');
    Cookies.remove('isLogged');
  }

  function signIn(accessToken: string) {
    const user: IAccessToken = jwtDecode(accessToken);

    setCookies(user, accessToken);

    setUser({ id: user.sub, email: user.email });
    setToken(accessToken);
    setIsLogged(true);
  }

  function signOut() {
    removeCookies();
    setUser(null);
    setToken(null);
    setIsLogged(false);
    router.push('/login');
  }

  useEffect(() => {
    loadCookies();
  }, []);

  return (
    <AuthContext.Provider value={{ user, token, isLogged, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}
