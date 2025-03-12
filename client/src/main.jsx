import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, Route, Routes } from 'react-router';
import Profilepage from './routes/profilePage/Profilepage';
import SearchPage from './routes/searchPage/searchPage';
import HomePage from './routes/homepage/Homepage';
import AuthPage from './routes/authPage/authPage';
import CreatePage from './routes/createPage/Createpage';
import MainLayout from './routes/layouts/MainLayout';
import Postpage from './routes/postPage/Postpage';

createRoot(document.getElementById('root')).render(
  <StrictMode>
   <BrowserRouter>
  <Routes>
   <Route element={<MainLayout />}>
    <Route path="/" element={<HomePage />}/>
    <Route path="/create" element={<CreatePage />}/>
    <Route path="/pin/:id" element={<Postpage />}/>
    <Route path="/:username" element={<Profilepage />}/>
    <Route path="/search" element={<SearchPage />}/>
    </Route>
    <Route path="/auth" element={<AuthPage />}/>
  </Routes>
  <App />
  </BrowserRouter>
  </StrictMode>,
)
