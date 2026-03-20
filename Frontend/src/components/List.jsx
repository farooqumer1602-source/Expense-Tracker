import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';

const List = ({ transactions = [], setTransactions , error}) => {
  const handledelete = async (id) => {
    try {
       const token = localStorage.getItem('token');
      if(!token){
        console.log('No Authorized. Token not found');
      }
      await axios.delete(`/api/${id}`,{
         headers: { Authorization: `Bearer ${token}` },
      });
      setTransactions(prev => prev.filter(tr => tr._id !== id));
    } catch (error) {
      seterror('Failed to delete');
    }
  };

  const safeTransactions = Array.isArray(transactions) ? transactions : [];
  return (
    <div className='mt-6 px-10 bg-white p-7'>
        {error && <p className='text-xl text-center text-red-600'>{error}</p>}
        <h1 className='text-2xl mb-3 font-semibold'>Transaction History:</h1>
         <table className='mt-4 w-full'>
          <thead>
          <tr className=''>
            <th className='px-4 py-2 border'>Titla</th>
            <th className='px-4 py-2 border'>Amount</th>
            <th className='px-4 py-2 border'>Category</th>
            <th className='px-4 py-2 border'>Type</th>
            <th className='px-4 py-2 border'>Date</th>
            <th className='px-4 py-2 border'>Delete</th>
          </tr>
          </thead>
          <tbody>
            {safeTransactions.map((tr)=>(
              <tr key={tr._id}>
                <td className='px-4 py-2 border'>{tr.title}</td>
                <td className={`px-4 py-2 border border-black ${tr.type === "income" ? "text-green-600 " : "text-red-600" }`}>${tr.amount}</td>
                <td className='px-4 py-2 border'>{tr.category}</td>
                <td className='px-4 py-2 border'>{tr.type}</td>
                <td className='px-4 py-2 border'> {new Date(tr.date).toLocaleDateString("en-GB")}</td>
                <td onClick={()=> handledelete(tr._id)} className='px-4 py-2 border'><button className='text-white bg-red-500 px-2 '>Delete</button></td>
              </tr>
            ))}
            <tr>
              <td></td>
            </tr>
          </tbody>
         </table>
    </div>
  );
}

export default List;
