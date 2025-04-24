import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom"; // Keep BrowserRouter here

import './index.css'; // Global styles
import App from './App'; // Login/Signup page component
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
import Navbar from './pages/navbar';
import FooTer from './pages/footer';
import { AuthProvider } from './AuthContext'; // Import the AuthProvider
import ProtectedRoute from './ProtectedRoute'; // Import the ProtectedRoute component

// Main App Structure Component
function AppPages() {
    return (
        // 1. BrowserRouter MUST be the outermost component providing routing context
        <BrowserRouter>
            {/* 2. AuthProvider can now safely use hooks that depend on the router */}
            <AuthProvider>
                <Navbar /> {/* Navbar now has access to AuthContext and Router Context */}
                <div className="page-container"> {/* Added wrapper for content */}
                    <Routes> {/* Routes now has access to AuthContext */}
                        {/* Public Route */}
                        <Route path="/" element={<App />} />

                        {/* Routes accessible to all */}
                        <Route path="/news" element={<News />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/missingperson" element={<Missingperson />} />
                        <Route path="/mostwanted" element={<Mostwanted />} />
                        <Route path="/policestation" element={<Policestation />} />

                        {/* Protected Routes - Wrap with ProtectedRoute */}
                        <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
                        <Route path="/complaint" element={<ProtectedRoute><Complaint /></ProtectedRoute>} />
                        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                        <Route path="/feedback" element={<ProtectedRoute><Feedback /></ProtectedRoute>} />

                        {/* Optional: Add a 404 Not Found Route */}
                        {/* <Route path="*" element={<NotFoundPage />} /> */}
                    </Routes>
                </div>
                <FooTer /> {/* Footer now has access to AuthContext and Router Context */}
            </AuthProvider>
        </BrowserRouter>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <AppPages />
    </React.StrictMode>
);

reportWebVitals();