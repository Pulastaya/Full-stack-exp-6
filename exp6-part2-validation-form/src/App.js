import React, { useState } from "react";
import "./App.css";

function App() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  // Email Validation
  const validateEmail = (email) => {
    const pattern = /^[^\s@]+@[^\s@]+\.(com|in|[a-z]{2,})$/i;
    return pattern.test(email);
  };

  // Password Validation
  const validatePassword = (password) => {
    const pattern =
      /^(?=.*[0-9])(?=.*[!@#$%^&*])[A-Z][A-Za-z0-9!@#$%^&*]{4,}$/;
    return pattern.test(password);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let newErrors = {};

    // Email Error
    if (!validateEmail(email)) {
      newErrors.email =
        "Email must contain @ and end with .com, .in or country code";
    }

    // Password Error
    if (!validatePassword(password)) {
      newErrors.password =
        "Password must start with capital letter, contain number, special character & minimum 5 characters";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      alert("Login Successful!");
      setEmail("");
      setPassword("");
    }
  };

  return (
    <div className="container">

      <h2>Login Form</h2>

      <form onSubmit={handleSubmit}>

        <label>Email</label>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {errors.email && <p className="error">{errors.email}</p>}

        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {errors.password && <p className="error">{errors.password}</p>}

        <button type="submit">Login</button>

      </form>

    </div>
  );
}

export default App;