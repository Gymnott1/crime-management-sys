import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css';
import App from './App';
import News from './pages/news';
import Home from './pages/home';

import Contact from './pages/contact';
import Complaint from './pages/complaint';
import Feedback from './pages/feedback';
import Missingperson from './pages/missingperson';
import Mostwanted from './pages/mostwanted';
import Dashboard from './pages/dashboard';
import Policestation from './pages/policestation';
import reportWebVitals from './reportWebVitals';

import Navbar from './pages/navbar'
import FooTer from './pages/footer';
import {AuthProvider} from './AuthContext';
import {getAuth} from 'firebase/auth'
import {onAuthStateChanged} from 'firebase/auth'




export default function AppPages() {
  const [currentUser, setCurrentUser] = useState(null);

  const auth = getAuth();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setCurrentUser(user)
     })
  }, [])

  return (
    <BrowserRouter>
      
        <Navbar/>
        <Routes>
        <Route exact path="/" element={<App />} />
         <Route exact path="/news" element={<News />} />
         <Route exact path="/home" element={<Home />} />
         
         <Route exact path="/contact" element={<Contact />} />
         <Route exact path="/complaint" element={<Complaint />} />
         <Route exact path="/dashboard" element={<Dashboard />} />
         <Route exact path="/feedback" element={<Feedback />} />
         <Route exact path="/mostwanted" element={<Mostwanted />} />
         <Route exact path="/Missingperson" element={<Missingperson />} />
         <Route exact path="/policestation" element={<Policestation />} />
        </Routes>
        <FooTer/>
      
    
    </BrowserRouter>
  );
}



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AppPages/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
