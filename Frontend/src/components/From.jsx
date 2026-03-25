import axios from 'axios';
import React from 'react';
import { useState } from 'react';


const From = ({transactions, setTransactions}) => {
  const incomeCategories = [
  "Salary",
  "Freelance",
  "Investments",
  "Gifts",
  "Other Income"
];

const expenseCategories = [
  "Food",
  "Transport",
  "Shopping",
  "Bills",
  "Entertainment",
  "Healthcare",
  "Education",
  "Travel",
  "Subscriptions",
  "Miscellaneous"
];
     const [type, setType] = useState("income"); 
    const [title, settitle] = useState("");
    const [amount, setamount] = useState(0);
    const [error, seterror] = useState("");
    const [date, setdate] = useState("");
    const [category, setcategory] = useState("");

    const categories = type === "income" ? incomeCategories : expenseCategories;
     const handlesubmitt =async (e)=>{
        e.preventDefault();
        try{
           const token = localStorage.getItem('token');
      if(!token) {
         seterror("No authentication token found. Please log in");
      };
       const payload ={title , amount , type , category , date};
      const config = { headers: { Authorization: `Bearer ${token}` } };
        const {data} = await axios.post("/api/", payload , config);
        setTransactions(prev => [...prev, data]);
        settitle("")
        setamount(0);
        setdate('');
        setcategory('')
        }catch(error){
           seterror(error.response?.data?.message || "server error");
      console.log(error);
        }
     }
  
  return (
    <div className='sm:mt-10 mt-7 p-2 lg:p-5 md:p-3 sm:p-5 sm:px-5 lg:px-9 md:px-7  bg-white'>
        <h1 className='sm:text-3xl text-2xl font-semibold'>Add Transaction</h1>
        {error && <p className='text-xl text-center text-red-600'>{error}</p>}
     <form onSubmit={handlesubmitt}>
     <div className=' mt-4 grid grid-cols-2 space-x-1.5 sm:space-x-3 md:space-x-1 lg:space-x-3.5 '>
        <div className='space-y-3.5'>
            <div>
                <label className='sm:text-[20px] text-[17px] max-[450px]:text-[14px]' >Title:</label>
            <input  className='border lg:pl-3 pl-2 max-[450px]:p-0.5 sm:pl-3 md:pl-3 rounded-xl p-1 sm:p-1.5 md:p-1.5 lg:p-2.5 placeholder:text-gray-800 outline-none w-full ' placeholder='Enter the Title' value={title}  onChange={(e)=> settitle(e.target.value)} type="text" />
            </div>
            <div>
                <label className='sm:text-[20px] text-[17px] max-[450px]:text-[14px]' >Amount:</label>
            <input  value={amount} onChange={(e)=> setamount(e.target.value)} className='border max-[450px]:p-0.5 rounded-xl p-1 sm:p-1.5 md:p-1.5 lg:p-2.5 placeholder:text-gray-800 outline-none w-full '  placeholder='Enter the Amount' type="number" />
            </div>
            <div>
                <label className='sm:text-[20px] text-[17px] max-[450px]:text-[14px]' >Category:</label>
            <select value={category} onChange={(e)=> setcategory(e.target.value)} className='border max-[450px]:p-0.5 rounded-xl p-1 sm:p-1.5 md:p-1.5 lg:p-2.5 outline-none w-full ' name="" id="">
        <option value="" hidden>Select Category</option>
       {categories.map((cat)=>(
          <option key={cat} value={cat}>{cat}</option>
        ))}
            </select>
            </div>
        </div>
        <div className='sm:mt-28 max-[450px]:mt-16 mt-25 ml-2 sm:ml-5 md:ml-5 lg:ml-10'>
            <div className='sm:space-y-4 space-y-5 max-[450px]:space-y-3'>
                <label className='sm:text-[20px]  text-[17px] max-[450px]:text-[14px] max-[450px]:flex mr-3.5'>Type:</label>
                 <button
          type="button"
          onClick={() => setType("income")}
          className={`flex-1 lg:px-4 md:px-3 max-[450px]:px-0.5 max-[450px]:py-0 px-1 sm:px-3 lg:py-2 md:py-1 py-0.5 sm:py-1 mr-1 rounded border transition-colors ${
            type === "income"
              ? "bg-green-500 text-white"
              : "bg-gray-100 text-black border-gray-300"
          }`}
        >
          Income
        </button>

        <button
          type="button"
          onClick={() => setType("expense")}
          className={`flex-1 lg:px-4 md:px-3 max-[450px]:px-0.5 max-[450px]:py-0 sm:px-3 px-1 lg:py-2 md:py-1 sm:py-1 py-0.5 ml-1 rounded border transition-colors ${
            type === "expense"
              ? "bg-red-500 text-white"
              : "bg-gray-100 text-black border-gray-300"
          }`}
        >
          Expense
        </button>
            </div>
            <div>
                <label className='sm:text-[20px] text-[17px] max-[450px]:text-[14px]' >Date:</label>
                <input value={date} onChange={(e)=> setdate(e.target.value)} className='border rounded-xl p-1 max-[450px]:p-0.5 sm:p-1.5 md:p-1.5 lg:p-2.5 outline-none w-full ' type="date" />
            </div>
        </div>
     </div>
     <div className='text-center mt-6'>
     <button className='sm:text-[21px] text-[17px]  text-white px-6 py-3 bg-blue-600 hover:bg-blue-800 transition-all duration-300 ' type='submitt'>Add Transaction</button>
     </div>
     </form>
    </div>
  );
}

export default From;
