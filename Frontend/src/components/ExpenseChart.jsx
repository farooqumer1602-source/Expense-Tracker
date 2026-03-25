import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";
import { Pie } from "react-chartjs-2";
import axios from "axios";

ChartJS.register(ArcElement, Tooltip, Legend);

function ExpenseChart({transactions, setTransactions , error}) {
  
  const safeTransactions = Array.isArray(transactions) ? transactions : [];

const categoryTotals = {};

safeTransactions.forEach((t) => {
  if (t.type === "expense") {
    if (!categoryTotals[t.category]) {
      categoryTotals[t.category] = 0;
    }
    categoryTotals[t.category] += t.amount;
  }
});

  const labels = Object.keys(categoryTotals);
  const values = Object.values(categoryTotals);

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Expenses",
        data: values,
        backgroundColor: [
          "#f87171",
          "#60a5fa",
          "#34d399",
          "#fbbf24"
        ]
      }
    ]
  };

  return (
    <div className="h-100 sm:mt-9 mt-3 flex items-center justify-center ">
      <div className="bg-white p-6 rounded shadow lg:w-96 md:w-80 max-[800px]:w-75! ">
        {error && <p className='text-xl text-center text-red-600'>{error}</p>}
        <h2 className="text-xl font-semibold text-center mb-4">
          Expense by Category
        </h2>

        <Pie data={data} />
      </div>

    </div>
  );
}

export default ExpenseChart;