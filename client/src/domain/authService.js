import { API_BASE_URL } from "../config/apiConfig";

export async function login(email, password) {
  const res = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Invalid credentials");
  }

  const responseData = await res.json();
  return {
    accessToken: responseData.data.token,
    user: {
      _id: responseData.data._id,
      username: responseData.data.username,
      email: responseData.data.email,
      role: responseData.data.role,
    }
  };
}

export async function fetchMe(accessToken) {
  const res = await fetch(`${API_BASE_URL}/auth/me`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!res.ok) throw new Error("Unauthorized");
  const data = await res.json();
  return data.data;
}

export async function registerUser(payload) {
  const res = await fetch(`${API_BASE_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Registration failed");
  }
  return res.json();
}

export async function logout() {
  localStorage.removeItem("token");
}

export async function persistReload(setAccessToken, setUser) {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No token stored");

  try {
    const user = await fetchMe(token);
    setAccessToken(token);
    setUser(user);
  } catch (err) {
    localStorage.removeItem("token");
    throw err;
  }
}
