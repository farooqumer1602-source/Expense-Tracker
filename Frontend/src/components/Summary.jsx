import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaWallet, FaMoneyBillWave, FaChartPie, FaArrowDown } from "react-icons/fa";
import { FaArrowUp } from "react-icons/fa";         // money going out
import { MdTrendingDown } from "react-icons/md";    // loss
import { FaCreditCard } from "react-icons/fa";      // spending
import { BsCartDash } from "react-icons/bs";        // shopping expense
const Summary = ({ transactions = [], setTransactions }) => {

   const safeTransactions = Array.isArray(transactions) ? transactions : [];

  const totalIncome = safeTransactions
    .filter(t => t.type === "income")
    .reduce((acc, t) => acc + t.amount, 0);

  const totalExpense = safeTransactions
    .filter(t => t.type === "expense")
    .reduce((acc, t) => acc + t.amount, 0);

  const totalBalance = totalIncome - totalExpense;

  return (
    <div className='mt-6'>
      <div className='flex space-x-3 justify-evenly'>
        <div className='flex justify-between text-center bg-blue-600 p-3.5 text-white border-none w-90 h-25'>
        <div>
            <h1 className='text-xl font-medium mr-5'> Total Balance</h1>
          <p className=' font-serif font-bold text-4xl'>${totalBalance}</p>
        </div>
          <div><FaWallet className='text-gray-300 ' size={60}/></div>
        </div>
         <div className='flex justify-between text-center bg-green-500 p-3.5 text-white border-none w-90 h-25'>
        <div>
            <h1 className='text-xl font-medium mr-12'> Total Income</h1>
          <p className=' font-serif font-bold text-4xl'>${totalIncome}</p>
        </div>
          <div><FaMoneyBillWave className='text-gray-300 ' size={60}/></div>
        </div>
          <div className='flex justify-between text-center bg-red-600 p-3.5 text-white border-none w-90 h-25'>
        <div>
            <h1 className='text-xl font-medium mr-5'> Total Expense</h1>
          <p className=' font-serif font-bold text-4xl'>${totalExpense}</p>
        </div>
          <div><MdTrendingDown className='text-gray-300 ' size={60}/></div>
        </div>
      </div>
    </div>
  );
}

export default Summary;
