// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.jsx'
// import { BrowserRouter, Route, Routes } from 'react-router';
// import {QueryClient, QueryClientProvider} from '@tanstack/react-query'

// // import Profilepage from './routes/profilePage/Profilepage';
// // import SearchPage from './routes/searchPage/searchPage';
// // import HomePage from './routes/homepage/Homepage';
// // import AuthPage from './routes/authPage/authPage';
// // import CreatePage from './routes/createPage/Createpage';
// // import MainLayout from './routes/layouts/MainLayout';
// // import Postpage from './routes/postPage/Postpage';

// const HomePage = React.lazy(() => import("./routes/homepage/Homepage"));
// const CreatePage = React.lazy(() => import("./routes/createPage/Createpage"));
// const Postpage = React.lazy(() => import("./routes/postPage/Postpage"));
// const Profilepage = React.lazy(() => import("./routes/profilePage/Profilepage"));
// const SearchPage = React.lazy(() => import("./routes/searchPage/searchPage"));
// const AuthPage = React.lazy(() => import("./routes/authPage/authPage"));


// const queryClient = new QueryClient()



// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//   <QueryClientProvider client={queryClient}>
//    <BrowserRouter>
//   <Routes>
//    <Route element={<MainLayout />}>
//     <Route path="/" element={<HomePage />}/>
//     <Route path="/create" element={<CreatePage />}/>
//     <Route path="/pin/:id" element={<Postpage />}/>
//     <Route path="/:username" element={<Profilepage />}/>
//     <Route path="/search" element={<SearchPage />}/>
//     </Route>
//     <Route path="/auth" element={<AuthPage />}/>
//   </Routes>
//   <App />
//   </BrowserRouter>
//   </QueryClientProvider>
//   </StrictMode>
// )


import React, { StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Import MainLayout
import MainLayout from './routes/layouts/MainLayout';

// Lazy-loaded pages
const HomePage = React.lazy(() => import('./routes/homepage/Homepage'));
const CreatePage = React.lazy(() => import('./routes/createPage/Createpage'));
const Postpage = React.lazy(() => import('./routes/postPage/Postpage'));
const Profilepage = React.lazy(() => import('./routes/profilePage/Profilepage'));
const SearchPage = React.lazy(() => import('./routes/searchPage/searchPage'));
const AuthPage = React.lazy(() => import('./routes/authPage/authPage'));

const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <App />
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route element={<MainLayout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/create" element={<CreatePage />} />
              <Route path="/pin/:id" element={<Postpage />} />
              <Route path="/:username" element={<Profilepage />} />
              <Route path="/search" element={<SearchPage />} />
            </Route>
            <Route path="/auth" element={<AuthPage />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>
);
