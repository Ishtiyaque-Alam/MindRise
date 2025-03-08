
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css"; // Ensure this file has the styles we discussed
import { useAuth } from "../context/AuthContext";
import Signup from "./Signup";

const Login = () => {
    const {signIn}=useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate(); // Used for navigation after login

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          await signIn(email,password);
          alert("✅ Signed in successfully!");
        } catch (error) {
          console.error("❌ Sign-in error:", error.message);
        }
      };

    return (
        <div className="login-container">
            <div className="login-box">
                <h2>Login</h2>
                {error && <p className="error-message">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label>Email</label>
                        <input 
                            type="email" 
                            placeholder="Enter your email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)}
                            required 
                        />
                    </div>

                    <div className="input-group password-group">
                        <label>Password</label>
                        <input 
                            type={showPassword ? "text" : "password"} 
                            placeholder="Enter your password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)}
                            required 
                        />
                        <span 
                            className="toggle-password" 
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? "👁️" : "🔒"}
                        </span>
                    </div>

                    <button type="submit" className="login-button">Login</button>
                </form>
                <p className="signup-text">Don't have an account? <a href="/register">Sign up</a></p>
            </div>
        </div>
    );
};

export default Login;
