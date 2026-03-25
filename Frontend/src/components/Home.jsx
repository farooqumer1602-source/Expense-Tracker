import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import Summary from './Summary';
import From from './From';
import List from './list';
import ExpenseChart from './ExpenseChart';
import IncomeChart from './IncomeChart';
import axios from 'axios';

const Home = ({user , setuser}) => {
  const [transactions, setTransactions] = useState([]);
  const [error, seterror] = useState();
  useEffect(() => {
      const fetchData = async () => {
try{
    const token = localStorage.getItem("token");
      if (!token) {
        seterror("No authentication token found. Please log in");
        return;
      }
          const { data } = await axios.get('/api/',{
             headers: { Authorization: `Bearer ${token}` },
          });
          
          if (Array.isArray(data)) {
              setTransactions(data);
            } else if (Array.isArray(data.transactions)) {
                setTransactions(data.transactions);
            } else {
                setTransactions([]);
            }
}      
            catch{
               seterror(error.response?.data?.message || "server error");
      console.log(error);
            }
};

fetchData();
}, []);

  return (
    <div className= 'min-h-screen 2xl:container mx-auto overflow-hidden bg-gray-300'>
        <Navbar user={user} setuser={setuser}/>
       <div className='lg:mx-30 md:mx-18 mx-4'>
         <Summary transactions={transactions} error={error} setTransactions={setTransactions}/>
        <From  transactions={transactions} error={error} setTransactions={setTransactions}/>
        <List  transactions={transactions} error={error} setTransactions={setTransactions}/>
        <div className='sm:flex overflow-hidden justify-around'>
          <ExpenseChart  transactions={transactions} error={error} setTransactions={setTransactions}/>
          <IncomeChart  transactions={transactions} error={error} setTransactions={setTransactions}/>
        </div>
       </div>
    </div>
  );
}

export default Home;
