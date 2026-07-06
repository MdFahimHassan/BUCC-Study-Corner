import { useContext } from "react";
import { AuthContext } from "../auth/authContext";

export function useAuthFetch() {
  const { accessToken, setAccessToken, setUser } = useContext(AuthContext);

  async function authFetch(url, options = {}) {
    const res = await fetch(url, {
      ...options,
      headers: {
        ...(options.headers || {}),
        Authorization: accessToken ? `Bearer ${accessToken}` : "",
        "Content-Type": "application/json",
      },
    });

    if (res.status === 401) {
      setAccessToken(null);
      setUser(null);
      localStorage.removeItem("token");
      throw new Error("Session expired");
    }

    return res;
  }

  return authFetch;
}
