import React, { useState } from "react";
import { useAuth } from './AuthContext'; 
import './App.css'; 

function App() {
  const [form, setForm] = useState("signup"); 
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const { login, signup } = useAuth();

  const handleFormToggle = () => {
    setForm(prevForm => prevForm === "signup" ? "login" : "signup");
    setError(null);
    setDisplayName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  const handleSignUp = (event) => {
    event.preventDefault();
    setError(null);

    if (!displayName || !email || !password) {
      setError("Please fill in all required fields.");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    console.log("Signing up:", email, displayName);
    signup(email, displayName);
  };

  const handleLogIn = (event) => {
    event.preventDefault();
    setError(null);

    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    console.log("Logging in:", email);
    login(email);
  };

  const features = [
    { title: "File Complaints", description: "Submit and track your complaints securely." },
    { title: "Missing Persons", description: "Access missing person reports and updates." },
    { title: "Station Locator", description: "Find the nearest police station to your location." },
    { title: "Crime Alerts", description: "Stay informed about local safety concerns." }
  ];

  return (
    <div className="signup-login-form">
      <div className="auth-container">
        <div className="text-center">
          <img 
            src="/api/placeholder/120/120" 
            alt="Police Department Logo" 
            className="police-logo"
          />
          <h1 style={{ marginBottom: '30px', color: '#fff' }}>Police Portal</h1>
        </div>
        
        {form === "signup" ? (
          <div className="signup-form">
            <h2>Create an Account</h2>
            {error && <p className="error-message">{error}</p>}
            
            <form onSubmit={handleSignUp}>
              <div className="form-group">
                <label htmlFor="displayName">Full Name</label>
                <input 
                  type="text" 
                  id="displayName" 
                  value={displayName} 
                  onChange={(e) => setDisplayName(e.target.value)} 
                  placeholder="Enter your full name"
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="signup-email">Email Address</label>
                <input 
                  type="email" 
                  id="signup-email"
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  placeholder="Enter your email"
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="signup-password">Password</label>
                <input 
                  type="password" 
                  id="signup-password" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  placeholder="Create a password (min. 6 characters)"
                  minLength="6"
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="confirm-password">Confirm Password</label>
                <input 
                  type="password" 
                  id="confirm-password" 
                  value={confirmPassword} 
                  onChange={(e) => setConfirmPassword(e.target.value)} 
                  placeholder="Confirm your password"
                  minLength="6"
                  required
                />
              </div>
              
              <button type="submit" className="submit-button">Sign Up</button>
            </form>
            
            <div className="toggle-form">
              Already have an account?
              <button type="button" onClick={handleFormToggle} className="toggle-button">
                Log In
              </button>
            </div>
          </div>
        ) : (
          <div className="login-form">
            <h2>Welcome Back</h2>
            {error && <p className="error-message">{error}</p>}
            
            <form onSubmit={handleLogIn}>
              <div className="form-group">
                <label htmlFor="login-email">Email Address</label>
                <input 
                  type="email" 
                  id="login-email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  placeholder="Enter your email"
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="login-password">Password</label>
                <input 
                  type="password" 
                  id="login-password" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  placeholder="Enter your password"
                  required
                />
              </div>
              
              <button type="submit" className="submit-button">Log In</button>
            </form>
            
            <div className="toggle-form">
              Don't have an account?
              <button type="button" onClick={handleFormToggle} className="toggle-button">
                Sign Up
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="features-section">
        {features.map((feature, index) => (
          <div key={index} className="feature-item">
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;