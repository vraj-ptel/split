"use client";

import { api } from "@/convex/_generated/api";
import { useConvexQuery } from "@/hooks/use-convex-query";
import { BarLoader } from "react-spinners";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, Users, CreditCard, ChevronRight } from "lucide-react";
import Link from "next/link";

import { BalanceSummary } from "./components/balance-summary";
import { GroupList } from "./components/group-list";
import { useCurrency } from "@/components/currencyContext";
import { currency_map, currency_symbol_map } from "@/lib/currency-category";
import { useEffect } from "react";
import { convertCurrency } from "@/lib/convertCurrency";
import { ExpenseSummary } from "./components/expense-summary";





export default function Dashboard() {
  const {currency,baseCurrency}=useCurrency();
   const {data:currentUser}=useConvexQuery(api.users.getCurrentUser);
  
  const convert=(val)=>{
    
    return convertCurrency(val,'USD',currentUser?.currency);
  }

  const { data: balances, isLoading: balancesLoading } = useConvexQuery(
    api.dashboard.getUserBalances
  );

  const { data: groups, isLoading: groupsLoading } = useConvexQuery(
    api.dashboard.getUserGroups
  );

  const { data: totalSpent, isLoading: totalSpentLoading } = useConvexQuery(
    api.dashboard.getTotalSpent
  );

  // const { data: monthlySpending, isLoading: monthlySpendingLoading } =
  //   useConvexQuery(api.dashboard.getMonthlySpending);

    const { data: monthlySpending, isLoading: monthlySpendingLoading } =
    useConvexQuery(api.dashboard.getMonthlySpending);
    console.log('monthlySpending',monthlySpending);
 

  const isLoading =
    balancesLoading ||
    groupsLoading ||
    totalSpentLoading ||
    monthlySpendingLoading;

  useEffect(()=>{
    if(currentUser){
      localStorage.setItem("currency",currentUser.currency);
    }
  },[currentUser])

  return (
    <div className="container mx-auto py-6 space-y-8">
      {isLoading ? (
        <div className="w-full py-12 flex justify-center">
          <BarLoader width={"100%"} color="#36d7b7" />
        </div>
      ) : (
        <>
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold tracking-tight">Dashboard</h1>
              <p className="text-muted-foreground">
                Welcome back! Here's a summary of your account.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button asChild>
                <Link href="/expenses/new">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Add Expense
                </Link>
              </Button>
            </div>
          </div>

          {/* Balance overview cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-card/50 backdrop-blur-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Total Balance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">
                  {balances?.totalBalance > 0 ? (
                    <span className="text-green-500">
                      +{currency_symbol_map[currentUser?.currency]}{convert(balances?.totalBalance.toFixed(2))}
                    </span>
                  ) : balances?.totalBalance < 0 ? (
                    <span className="text-red-500">
                      -{currency_symbol_map[currentUser?.currency]}{convert(Math.abs(balances?.totalBalance.toFixed(2)))}
                    </span>
                  ) : (
                    <span>{currency_symbol_map[currentUser?.currency]}0.00</span>
                  )}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {balances?.totalBalance > 0
                    ? "You are owed money"
                    : balances?.totalBalance < 0
                    ? "You owe money"
                    : "All settled up!"}
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  You are owed
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-green-500">
                  {currency_symbol_map[currentUser?.currency]}{convert(balances?.youAreOwed.toFixed(2))}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  From {balances?.oweDetails?.youAreOwedBy?.length || 0} people
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  You owe
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-red-500">
                  {currency_symbol_map[currentUser?.currency]}{convert(balances?.youOwe.toFixed(2))}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  To {balances?.oweDetails?.youOwe?.length || 0} people
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Main dashboard content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left column */}
            <div className="lg:col-span-2 space-y-6">
               <ExpenseSummary
                monthlySpending={monthlySpending}
                totalSpent={totalSpent}
              /> 
            </div>

            {/* Right column */}
            <div className="space-y-6">
              
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle>Balance Details</CardTitle>
                    <Button variant="link" asChild className="p-0 h-auto">
                      <Link href="/contacts">
                        View all
                        <ChevronRight className="ml-1 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <BalanceSummary balances={balances} />
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle>Your Groups</CardTitle>
                    <Button variant="link" asChild className="p-0 h-auto">
                      <Link href="/contacts">
                        View all
                        <ChevronRight className="ml-1 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <GroupList groups={groups} />
                </CardContent>
              </Card>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
