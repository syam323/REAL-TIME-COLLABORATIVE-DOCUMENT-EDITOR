import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import './index.css';
import App from './App';
// import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <BrowserRouter>
      <Routes>
        {/* Define routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/app" element={<App />} />
      </Routes>
    </BrowserRouter>
);


