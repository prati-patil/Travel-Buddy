import React from "react";
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Engage from "./pages/Engage";
import BlogHome from "./pages/BlogHome";
import MapPage from "./pages/MapPage/MapPage";
import Blog from "./pages/Blog";
import Profile from "./pages/Profile";
import Redirect from "./Redirect";
import Sendmssg from "./pages/Sendmssg"
import { useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./App.css";


function App() {
  const token = localStorage.getItem('token');

  const isNavBarOpen = useSelector(state => state.ui.isNavBarOpen)

  const router = createBrowserRouter([
    {
      path: '/',
      element: (
        <>
          <ToastContainer
                position="top-center"
                autoClose={1500}
                limit={2}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss={false}
                draggable
                pauseOnHover={false}
                theme="light"
            />
          {token && (<NavBar />)}
          {!isNavBarOpen && (<>
            <Outlet />
            {token && (<Footer />)}
          </>)}
        </>
      ),
      children: [
        {
          path: '/',
          element: <Redirect />
        },
        {
          path: '/login',
          element: <Login />
        },
        {
          path: '/home',
          element: <Home />
        },
        {
          path: '/engage',
          element: <Engage />
        },
        {
          path: '/map',
          element: <MapPage />
        },
        {
          path: '/blog',
          element: <BlogHome />
        },
        {
          path: '/blog/:id',
          element: <Blog />
        },
        {
          path: '/profile',
          element: <Profile />
        },
        {
          path: '/sendmssg',
          element: <Sendmssg />
        }
      ]
    }
  ]);

  return (
    <AnimatePresence >
      <div className="h-full w-full bg-[#E6E6FA]">
        <RouterProvider router={router} />
      </div>
    </AnimatePresence>
  )
}

export default App
