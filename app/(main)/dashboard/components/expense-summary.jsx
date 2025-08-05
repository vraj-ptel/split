"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// 🚧 TEMPORARY DATA FOR DEVELOPMENT - Replace with real data from Convex/API
const generateTempExpenseData = () => {
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth();

  // Generate realistic monthly spending data for the current year
  const monthlySpendingData = [];
  const monthlyAmounts = [
    2450.75, // Jan
    3200.50, // Feb
    2890.25, // Mar
    4150.00, // Apr
    3750.80, // May
    5200.30, // Jun
    4800.60, // Jul
    3950.45, // Aug
    4200.90, // Sep
    3600.75, // Oct
    4500.20, // Nov
    5800.85  // Dec
  ];

  for (let i = 0; i <= currentMonth; i++) {
    monthlySpendingData.push({
      month: `${currentYear}-${String(i + 1).padStart(2, '0')}-01`,
      total: monthlyAmounts[i],
      expenses: Math.floor(Math.random() * 15) + 5, // 5-20 expenses per month
    });
  }

  // Calculate total spent (sum of all months so far)
  const totalSpentAmount = monthlySpendingData.reduce((sum, month) => sum + month.total, 0);

  return {
    monthlySpending: monthlySpendingData,
    totalSpent: totalSpentAmount
  };
};

export function ExpenseSummary({ monthlySpending, totalSpent }) {
  // Use temporary data if no props provided
  const tempData = generateTempExpenseData();
  const tempMonthlySpending = monthlySpending || tempData.monthlySpending;
  const tempTotalSpent = totalSpent || tempData.totalSpent;
  // Format monthly data for chart
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const chartData =
    tempMonthlySpending?.map((item) => {
      const date = new Date(item.month);
      return {
        name: monthNames[date.getMonth()],
        amount: item.total,
      };
    }) || [];

  // Get current year
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Expense Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-muted rounded-lg p-4">
            <p className="text-sm text-muted-foreground">Total this month</p>
            <h3 className="text-2xl font-bold mt-1">
              ₹{tempMonthlySpending?.[currentMonth]?.total.toFixed(2) || "0.00"}
            </h3>
          </div>
          <div className="bg-muted rounded-lg p-4">
            <p className="text-sm text-muted-foreground">Total this year</p>
            <h3 className="text-2xl font-bold mt-1">
              ₹{tempTotalSpent?.toFixed(2) || "0.00"}
            </h3>
          </div>
        </div>

        <div className="h-64 mt-6">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip
                formatter={(value) => [`₹${value.toFixed(2)}`, "Amount"]}
                labelFormatter={() => "Spending"}
              />
              <Bar dataKey="amount" fill="#36d7b7" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <p className="text-xs text-muted-foreground text-center mt-2">
          Monthly spending for {currentYear}
        </p>
      </CardContent>
    </Card>
  );
}
