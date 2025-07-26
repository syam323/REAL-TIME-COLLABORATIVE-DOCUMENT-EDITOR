import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import "../styles/Homepage.css";

const HomePage = () => {
    const navigate = useNavigate();

  const goToApp = (data) => {
    navigate("/app",{state:data}); // Navigate to the App component
  };
  const [isSignIn, setIsSignIn] = useState(false); // Toggle between login and sign-in
  const [loginData, setLoginData] = useState({ username: "", password: "" });
  const [signInData, setSignInData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  // Simulated validation
  // const validCredentials = { username: "testuser", password: "12345" };


  const createuser = async (data) => {
    try {
      console.log("user creating running")
      const response = await fetch("http://localhost:5000/createuser", {
        method: "POST", 
        headers: {
          "Content-Type": "application/json", 
        },
        body: JSON.stringify({username:data.username,email:data.email,password:data.password}), 
      });
  console.log("point 1");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const userdata = await response.json();
      console.log("userdata",userdata);
      return userdata;
    } catch (error) {
      console.error("Error creating document:", error.message);
    }
  };

  const loaduser = async (data) => {
    try {
      console.log("user loading running")
      const response = await fetch("http://localhost:5000/loaduser", {
        method: "POST", 
        headers: {
          "Content-Type": "application/json", 
        },
        body: JSON.stringify({username:data.username,password:data.password}), 
      });
  console.log("point 1");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const userdata = await response.json();
      console.log("userdata",userdata);
      return userdata;
    } catch (error) {
      console.error("Error creating document:", error.message);
    }
  };




  const handleLogin = async (e) => {
    e.preventDefault();
    setError("")
   
        const result = await loaduser({username:loginData.username,password:loginData.password});
        if(result.success)
        {
            alert("Login successful!");
            setError("");
            goToApp(result.user);
        }

        else{
            setError(result.message);
        }

      
    
  };

  const handleSignIn =async (e) => {
    e.preventDefault();
    setError("")
    if (!signInData.username || !signInData.email || !signInData.password) {
      setError("All fields are required for sign-in");
    } else {
      const result = await createuser({username:signInData.username,email:signInData.email,password:signInData.password});
      console.log("result",result);
      if(result.success)
      {
          setIsSignIn(false);
          alert("Sign-in successful!");
          setError("");

      }
      else{
        setError(result.message);


      }

    }
  };

  return (
    <div className="homepage-container">
      <div className="form-container">
        <h1>{isSignIn ? "Sign In" : "Login"}</h1>
        {isSignIn ? (
          <form onSubmit={handleSignIn}>
            <input
              type="text"
              placeholder="Username"
              value={signInData.username}
              onChange={(e) =>
                setSignInData({ ...signInData, username: e.target.value })
              }
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={signInData.email}
              onChange={(e) =>
                setSignInData({ ...signInData, email: e.target.value })
              }
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={signInData.password}
              onChange={(e) =>
                setSignInData({ ...signInData, password: e.target.value })
              }
              required
            />
            <button type="submit">Sign In</button>
          </form>
        ) : (
          <form onSubmit={handleLogin}>
            <input
              type="text"
              placeholder="Username"
              value={loginData.username}
              onChange={(e) =>
                setLoginData({ ...loginData, username: e.target.value })
              }
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={loginData.password}
              onChange={(e) =>
                setLoginData({ ...loginData, password: e.target.value })
              }
              required
            />
            <button type="submit">Login</button>
          </form>
        )}
        {error && <p className="error-message">{error}</p>}
        <p>
          {isSignIn ? "Already have an account?" : "Don't have an account?"}{" "}
          <span onClick={() => {setIsSignIn(!isSignIn);setError("")}}>
            {isSignIn ? "Login here" : "Sign up here"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default HomePage;
