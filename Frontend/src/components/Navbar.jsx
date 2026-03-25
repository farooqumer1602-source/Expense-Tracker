import React from 'react';
import { useNavigate , Link } from 'react-router-dom';
import { useState } from 'react';

const Navbar = ({user , setuser}) => {
  const navigate = useNavigate
    const handlelogout = ()=>{
        localStorage.removeItem('token')
        setuser(null)
        navigate('/login')
    }
  return (
    <nav className='sm:p-4 p-2 w-full bg-purple-700'>
      <div className='flex justify-between items-center sm:px-8'>
        <div>
            <h1 className='text-white'>Expense Tracker</h1>
        </div>
        <div>
  
        {user && (
          <>
            <div className="flex items-center  space-x-2">
              <span className="text-gray-300 font-medium">{user.username}</span>
              <button
               onClick={handlelogout} 
                className="bg-red-600 text-white sm:px-3 px-2 py-0.5 sm:py-1 rounded-md hover:bg-red-700"
              >
                Logout
              </button>
            </div>
          </>
        )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
