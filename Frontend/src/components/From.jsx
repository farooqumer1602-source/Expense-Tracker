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
    <div className='mt-10 p-5 px-9 bg-white'>
        <h1 className='text-3xl font-semibold'>Add Transaction</h1>
        {error && <p className='text-xl text-center text-red-600'>{error}</p>}
     <form onSubmit={handlesubmitt}>
     <div className=' mt-4 grid  grid-cols-2 space-x-3.5 '>
        <div className='space-y-3.5'>
            <div>
                <label className='text-[20px] ' >Title:</label>
            <input  className='border pl-3 rounded-xl p-2.5 placeholder:text-gray-800 outline-none w-full ' placeholder='Enter the Title' value={title}  onChange={(e)=> settitle(e.target.value)} type="text" />
            </div>
            <div>
                <label className='text-[21px]' >Amount:</label>
            <input  value={amount} onChange={(e)=> setamount(e.target.value)} className='border rounded-xl p-2.5 placeholder:text-gray-800 outline-none w-full '  placeholder='Enter the Amount' type="number" />
            </div>
            <div>
                <label className='text-[21px]' >Category:</label>
            <select value={category} onChange={(e)=> setcategory(e.target.value)} className='border rounded-xl p-2.5  outline-none w-full ' name="" id="">
        <option value="" hidden>Select Category</option>
       {categories.map((cat)=>(
          <option key={cat} value={cat}>{cat}</option>
        ))}
            </select>
            </div>
        </div>
        <div className='mt-28 ml-10'>
            <div className='space-y-4'>
                <label className='text-[21px] mr-3.5'>Type:</label>
                 <button
          type="button"
          onClick={() => setType("income")}
          className={`flex-1 px-4 py-2 mr-2 rounded border transition-colors ${
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
          className={`flex-1 px-4 py-2 ml-2 rounded border transition-colors ${
            type === "expense"
              ? "bg-red-500 text-white"
              : "bg-gray-100 text-black border-gray-300"
          }`}
        >
          Expense
        </button>
            </div>
            <div>
                <label className='text-[21px]' >Date:</label>
                <input value={date} onChange={(e)=> setdate(e.target.value)} className='border rounded-xl p-2.5 outline-none w-full ' type="date" />
            </div>
        </div>
     </div>
     <div className='text-center mt-6'>
     <button className='text-[21px] text-white px-6 py-3 bg-blue-600 hover:bg-blue-800 transition-all duration-300 ' type='submitt'>Add Transaction</button>
     </div>
     </form>
    </div>
  );
}

export default From;
