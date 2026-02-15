// src/auth/AuthContext.jsx
import { createContext, useContext, useEffect, useMemo, useState, useCallback } from "react";
import { Client } from "../Util/client"; 

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); 
  const [loading, setLoading] = useState(true);

  // Rehidratar desde sessionStorage al cargar la app
  useEffect(() => {
    try {
      const saved = sessionStorage.getItem("afigo_user");
      if (saved) {
        const parsed = JSON.parse(saved);
        setUser(parsed);
      }
    } catch {}
    setLoading(false);
  }, []);

  // Llamada de login: usa tu Client.login y guarda el user resultante
  const login = useCallback(async (correoOUsuario, password) => {
    const userDto = await Client.login(correoOUsuario, password);
    setUser(userDto);
    sessionStorage.setItem("afigo_user", JSON.stringify(userDto));
    return userDto;
  }, []);

  // Si en algún momento quieres actualizar el user guardado (sin relogin)
  const setUserInfo = useCallback((userDto) => {
    setUser(userDto);
    sessionStorage.setItem("afigo_user", JSON.stringify(userDto));
  }, []);

  const logout = useCallback(async () => {
    try { await Client.logout(); } catch {}
    setUser(null);
    sessionStorage.removeItem("afigo_user");
  }, []);

  const isAuthenticated = !!user;
  const isAdmin = user?.usuarioAdmin === 1;

  const value = useMemo(() => ({
    user,          // { userId, nombre, usuarioAdmin }
    isAuthenticated,
    isAdmin,
    loading,
    login,
    logout,
    setUserInfo
  }), [user, isAuthenticated, isAdmin, loading, login, logout, setUserInfo]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth debe usarse dentro de <AuthProvider>");
  return ctx;
}