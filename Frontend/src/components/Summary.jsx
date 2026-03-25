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
      <div className='flex sm:space-x-3 space-x-1.5  justify-evenly'>
        <div className='flex justify-between text-center  bg-blue-600  p-3.5 text-white border-none  w-90 h-25'>
        <div className='mt-2 sm:mt-0 max-[425px]:mt-0'>
            <h1 className=' md:text-[17px] sm:text-[17px] lg:text-xl  font-medium lg:mr-5'> Total Balance</h1>
          <p className=' font-serif font-bold text-xl sm:text-2xl md:text-2xl lg:text-4xl'>${totalBalance}</p>
        </div>
          <div className='w-8 h-8 mt-2  max-[520px]:hidden sm:mt-0 md:w-12 sm:w-12 sm:h-12 md:h-12 lg:w-16 lg:h-16'><FaWallet className='text-gray-300  w-full h-full'/></div>
        </div>
         <div className='flex justify-between text-center bg-green-500 p-3.5 text-white border-none w-90 h-25'>
        <div className='mt-2 sm:mt-0 max-[425px]:mt-0'>
            <h1 className=' lg:text-xl sm:text-[17px]  md:text-[17px]  font-medium lg:mr-12'> Total Income</h1>
          <p className=' font-serif font-bold text-xl  sm:text-2xl md:text-2xl lg:text-4xl '>${totalIncome}</p>
        </div>
          <div className='w-8 h-8 mt-2 max-[520px]:hidden sm:mt-0 md:w-12 sm:w-12 sm:h-12 md:h-12 lg:w-16 lg:h-16'><FaMoneyBillWave className='text-gray-300 w-full h-full' /></div>
        </div>
          <div className='flex justify-between text-center bg-red-600 p-3.5 text-white border-none w-90 h-25'>
        <div className='mt-2 sm:mt-0 max-[425px]:mt-0'>
            <h1 className=' lg:text-xl md:text-[17px] sm:text-[17px] font-medium  lg:mr-5'> Total Expense</h1>
          <p className=' font-serif font-bold text-xl md:text-2xl sm:text-2xl lg:text-4xl '>${totalExpense}</p>
        </div>
          <div className='w-8  h-8 mt-2 max-[520px]:hidden sm:mt-0 md:w-12 md:h-12  sm:w-12 sm:h-12 lg:w-16 lg:h-16'><MdTrendingDown className='text-gray-300 w-full h-full' /></div>
        </div>
      </div>
    </div>
  );
}

export default Summary;
