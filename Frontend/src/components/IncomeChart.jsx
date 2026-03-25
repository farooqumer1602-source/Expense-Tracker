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

function IncomeChart({transactions, setTransactions , error}) {
  const safeTransactions = Array.isArray(transactions) ? transactions : [];
const incomeTotals = {};

safeTransactions.forEach((t) => {
  if (t.type === "income") {
    if (!incomeTotals[t.category]) {
      incomeTotals[t.category] = 0;
    }
    incomeTotals[t.category] += t.amount;
  }
});

  const labels = Object.keys(incomeTotals);
  const values = Object.values(incomeTotals);

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Income",
        data: values,
        backgroundColor: [
          "#22c55e", 
          "#16a34a",
          "#4ade80",
          "#86efac"
        ]
      }
    ]
  };

  return (
    <div className="h-100 sm:mt-9 mt-2  flex items-center justify-center">

      <div className=" bg-white p-6 rounded shadow lg:w-96 md:w-80 max-[800px]:w-75!">
        {error && <p className='text-xl text-center text-red-600'>{error}</p>}
        <h2 className="text-xl  font-semibold text-center mb-4">
          Income by Category
        </h2>

        <Pie data={data} className="" />
      </div>
    </div>
  );
}

export default IncomeChart;