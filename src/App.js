import React, { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import {database } from './Firebase';
import { getDatabase, ref, set, push } from "firebase/database";



import './App.css';

function App() {

  const [form, setForm] = useState("signup"); // default form is sign up
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [currentUser,  setCurrentUser] = useState("");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);


  const auth = getAuth(); // get the auth instance

  
  useEffect(() => {
  const unsubscribe = auth.onAuthStateChanged((user) => {
    if (user) {
      setIsAuthenticated(true);
      setUserId(user.uid);
      setUserEmail(user.email);
      setDisplayName(user.displayName);
      setCurrentUser(user);
      localStorage.setItem("firebase_user", JSON.stringify(user));
    } else {
      setIsAuthenticated(false);
      localStorage.removeItem("firebase_user");
    }
  });
  return () => unsubscribe();
}, [auth, isAuthenticated]);


useEffect(() => {
  const storedUser = localStorage.getItem("firebase_user");
  if (storedUser) {
    setUser(JSON.parse(storedUser));
  }
}, []);




    
  const handleFormToggle = () => {
    if (form === "signup") {
      setForm("login");
    } else {
      setForm("signup");
    }
  };


  const handleSignUp = async (event) => {
    event.preventDefault();
    try {
      
      const userCredential = await createUserWithEmailAndPassword(auth, email, password, displayName);
      const userId = userCredential.user.uid;
      const userRef = await ref(database, 'users/' + userId);
      const newUserRef = push(userRef);
      
      await set( newUserRef,{
        
         
        username: `${userCredential.user.displayName}`
       
      });
      setDisplayName("");
      setEmail("");
      setPassword("");
      setError(null);
      setCurrentUser("");
      window.location.href = '/home';
    } catch (error) {
      setError(error.message);
    }
  };
  

const handleLogIn = (event) => {
  event.preventDefault();
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      setEmail("");
      setPassword("");
      setError(null);
      // Redirect to home page
      window.location.href = '/home';
    })
    .catch((error) => {
      const errorCode = error.code;
      let errorMessage = error.message;
      if (errorCode === 'auth/invalid-email') {
        errorMessage = 'Please enter a valid email';
      } else if (errorCode === 'auth/wrong-password') {
        errorMessage = 'Incorrect password';
      }
      setError(errorMessage);
    });
};



return (
  <div className="signup-login-form">
    {form === "signup" ? (
     <div className="signup-form">
        <h2>Sign Up</h2>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSignUp}>
           <label htmlFor="name">Name:</label>
           <input type="text" id="displayName"
           value={displayName}
           onChange={(event) => setDisplayName(event.target.value)}/>
           <label htmlFor="email">Email:</label>
           <input type="email" id="email" 
           value={email}
           onChange={(event) => setEmail(event.target.value)}/>
           <label htmlFor="password">Password:</label>
           <input type="password" id="password" 
           value={password}
           onChange={(event) => setPassword(event.target.value)}/>
           
            <button type="submit">Sign Up</button>
           
        </form>
        <p>
         Already have an account? <button onClick={handleFormToggle}>Log In</button>
        </p>
      </div>
    ) : (
     <div className="login-form">
       <h2>Log In</h2>
         <form onSubmit={handleLogIn}>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" 
            value={email}
            onChange={(event) => setEmail(event.target.value)} />
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" 
            value={password}
            onChange={(event) => setPassword(event.target.value)} />
          <button type="submit">Log In</button>
        </form>
         <p>
          Don't have an account? <button onClick={handleFormToggle}>Sign Up</button>
        </p>
     </div>
    )}
  </div>
 );
}

export default App;