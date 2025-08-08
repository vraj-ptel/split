import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowUpCircle, ArrowDownCircle } from "lucide-react";
import { useCurrency } from "@/components/currencyContext";
import { currency_symbol_map } from "@/lib/currency-category";
import { useConvexQuery } from "@/hooks/use-convex-query";
import { api } from "@/convex/_generated/api";
import { convertCurrency } from "@/lib/convertCurrency";

export function BalanceSummary({ balances }) {
  const { currency } = useCurrency();
  const { data: currentUser } = useConvexQuery(api.users.getCurrentUser);
  const convert = (val) => {
    return convertCurrency(val, "USD", currentUser?.currency);
  };
  if (!balances) return null;

  const { oweDetails } = balances;
  const hasOwed = oweDetails.youAreOwedBy.length > 0;
  const hasOwing = oweDetails.youOwe.length > 0;

  return (
    <div className="space-y-6">
      {!hasOwed && !hasOwing && (
        <div className="text-center py-8">
          <p className="text-muted-foreground">You're all settled up!</p>
        </div>
      )}

      {hasOwed && (
        <div>
          <h3 className="text-sm font-medium flex items-center mb-3 text-muted-foreground">
            <ArrowUpCircle className="h-4 w-4 text-green-500 mr-2" />
            Owed to you
          </h3>
          <div className="space-y-2">
            {oweDetails.youAreOwedBy.map((item) => (
              <Link
                href={`/person/${item.userId}`}
                key={item.userId}
                className="flex items-center justify-between hover:bg-muted/50 p-2 rounded-lg transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src={item.imageUrl} />
                    <AvatarFallback>{item.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <span className="font-medium">{item.name}</span>
                </div>
                <span className="font-semibold text-green-500">
                  +{currency_symbol_map[currentUser?.currency]}
                  {convert(item.amount)}
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}

      {hasOwing && (
        <div>
          <h3 className="text-sm font-medium flex items-center mb-3 text-muted-foreground">
            <ArrowDownCircle className="h-4 w-4 text-red-500 mr-2" />
            You owe
          </h3>
          <div className="space-y-2">
            {oweDetails.youOwe.map((item) => (
              <Link
                href={`/person/${item.userId}`}
                key={item.userId}
                className="flex items-center justify-between hover:bg-muted/50 p-2 rounded-lg transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src={item.imageUrl} />
                    <AvatarFallback>{item.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <span className="font-medium">{item.name}</span>
                </div>
                <span className="font-semibold text-red-500">
                  -{currency_symbol_map[currentUser?.currency]}
                  {convert(item.amount)}
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
