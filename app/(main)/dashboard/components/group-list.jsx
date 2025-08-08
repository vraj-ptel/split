'use client'
import Link from "next/link";
import { Users, ChevronRight } from "lucide-react";
import { useCurrency } from "@/components/currencyContext";
import { useConvexQuery } from "@/hooks/use-convex-query";
import { api } from "@/convex/_generated/api";
import { convertCurrency } from "@/lib/convertCurrency";
import { currency_symbol_map } from "@/lib/currency-category";

export function GroupList({ groups }) {
  const {currency}=useCurrency();
    const {data:currentUser}=useConvexQuery(api.users.getCurrentUser);
    
    const convert=(val)=>{
      
      return convertCurrency(val,'USD',currentUser?.currency);
    }
  if (!groups || groups.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">No groups yet.</p>
        <p className="text-sm text-muted-foreground mt-1">
          Create a group to start tracking shared expenses.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {groups.map((group) => {
        
        // Calculate total balance in the group
        const balance = group.balance || 0;
        const hasBalance = balance !== 0;

        return (
          <Link
            href={`/groups/${group.id}`}
            key={group.id}
            className="flex items-center justify-between hover:bg-muted/50 p-3 rounded-lg transition-colors"
          >
            <div className="flex items-center gap-4">
              <div className="bg-primary/10 p-3 rounded-full">
                <Users className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-semibold">{group.name}</p>
                <p className="text-sm text-muted-foreground">
                  {group.members.length} members
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {hasBalance && (
                <span
                  className={`text-sm font-bold ${
                    balance > 0 ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {balance > 0 ? "+" : "-"}{currency_symbol_map[currentUser?.currency]}{convert(Math.abs(balance))}
                </span>
              )}
              <ChevronRight className="h-5 w-5 text-muted-foreground" />
            </div>
          </Link>
        );
      })}
    </div>
  );
}
