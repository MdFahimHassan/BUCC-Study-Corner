import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { AuthContext } from "./auth/authContext";
import Videos from "./pages/Videos/Videos";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import { persistReload } from "./domain/authService";

function App() {
  const [accessToken, setAccessToken] = useState(null);
  const [user, setUser] = useState(null);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    const restoreSession = async () => {
      try {
        await persistReload(setAccessToken, setUser);
      } catch (err) {
        console.log("No active session found.");
      } finally {
        setInitializing(false);
      }
    };

    restoreSession();
  }, []);

  if (initializing) {
    return (
      <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: "#080c14",
        color: "#f8fafc",
        fontFamily: "sans-serif"
      }}>
        <div style={{
          border: "4px solid #1e293b",
          borderTop: "4px solid #06b6d4",
          borderRadius: "50%",
          width: "40px",
          height: "40px",
          animation: "spin 1s linear infinite",
          marginBottom: "16px"
        }}></div>
        <p>Loading Study Corner...</p>
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ accessToken, setAccessToken, user, setUser }}>
      <Routes>
        <Route path="/" element={<Videos />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </AuthContext.Provider>
  );
}

export default App;
