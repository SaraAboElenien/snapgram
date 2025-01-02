import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import UserContextProvider from '@/Context/UserContext.jsx'
import  { Toaster } from 'react-hot-toast';

import {
  Home,
  Profile,
  Explore,
  CreatePost,
  EditPost,
  PostDetails,
  UpdateProfile,
  AllUsers,
  Saved,
  UserNotification
} from './_root/pages'

import AuthLayout from './_auth/AuthLayout.jsx'
import RootLayout from './_root/RootLayout.jsx'
import SignupForm from './_auth/forms/SignupForm.jsx'
import SigninForm from './_auth/forms/SingninForm.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'explore', element: <Explore /> },
      { path: 'saved', element: <Saved /> },
      { path: 'all-users', element: <AllUsers /> },
      { path: 'create-post', element: <CreatePost /> },
      { path: 'update-post/:id', element: <EditPost /> },
      { path: 'posts/:id', element: <PostDetails /> },
      { path: 'profile/:id/*', element: <Profile /> },
      { path: 'update-profile/:id', element: <UpdateProfile /> },
      { path: "/notification", element: <UserNotification /> }

    ]
  },
  {
    element: <AuthLayout />,
    children: [
      { path: 'sign-in', element: <SigninForm /> },
      { path: 'sign-up', element: <SignupForm /> }
    ]
  }
])

const App = () => {
  return (
    <main className='flex w-screen'>
      <UserContextProvider>
        <RouterProvider router={router} />
        <Toaster />
      </UserContextProvider>
    </main>
  )
}

export default App
