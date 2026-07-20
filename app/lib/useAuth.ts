"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export function useAuth() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Function to check cookie
    const checkAuth = () => {
      const cookies = document.cookie.split("; ");
      const tokenCookie = cookies.find((row) => row.startsWith("token="));
      setIsLoggedIn(!!tokenCookie);
    };

    // Check on initial load
    checkAuth();

    // Since cookies can change, we might want to listen to changes, but React state covers standard navigation.
    // We could add an event listener if we dispatch custom events on login/logout
    
  }, []);

  const logout = async () => {
    try {
      // Import fetchAPI dynamically or use a regular fetch since we are in a hook
      await fetch("http://localhost:5000/api/auth/logout", { method: "POST", credentials: "include" });
    } catch (e) {
      console.error(e);
    }
    document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    setIsLoggedIn(false);
    router.push("/login");
    router.refresh();
  };

  return { isLoggedIn, logout };
}
