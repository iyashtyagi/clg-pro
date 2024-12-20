import React from 'react'
import { BrowserRouter, Link, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { UserButton, SignedIn, SignedOut, SignInButton } from '@clerk/clerk-react';
import { Home, CreatePost } from './pages';

const NavigationButton = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const isCreatePostPage = location.pathname === '/create-post';

  const handleClick = () => {
    navigate(isCreatePostPage ? '/' : '/create-post');
  };

  return (
    <button 
      onClick={handleClick} 
      className='font-inter font-medium bg-blue-500 text-white px-4 py-2 rounded-md'
    >
      {isCreatePostPage ? 'Home' : 'Create'}
    </button>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <header className='w-full flex justify-between items-center bg-white sm:px-8 py-4 px-4 border-b border-b-[#e6ebf4]'>
        <Link to="/" className="font-inter font-semibold text-black text-3xl">
          VisualizeIt
        </Link> 

        <div className='flex items-center gap-x-4'>
          <NavigationButton />

          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
          
          <SignedOut>
            <SignInButton mode="modal">
              <button className='font-inter font-medium bg-blue-500 text-white px-4 py-2 rounded-md'>
                Sign In
              </button>
            </SignInButton>
          </SignedOut>
        </div>
      </header>

      <main className='sm:p-8 px-4 py-8 w-full bg-[#f9fafe] min-h-[calc(100vh-73px)]'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/create-post' element={<CreatePost />} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App