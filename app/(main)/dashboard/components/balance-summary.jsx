import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowUpCircle, ArrowDownCircle } from "lucide-react";

// 🚧 TEMPORARY DATA FOR DEVELOPMENT - Replace with real data from Convex/API
const generateTempBalanceData = () => {
  // Simulate different scenarios for testing
  const scenarios = [
    // Scenario 1: Mixed balances with realistic amounts (default)
    {
      oweDetails: {
        youAreOwedBy: [
          {
            userId: "user_1",
            name: "Sarah Chen",
            amount: 1245.50,
            imageUrl: "/avatars/sarah.jpg",
            lastExpense: "Goa Trip - Hotel booking",
            daysAgo: 3
          },
          {
            userId: "user_2",
            name: "Marcus Johnson",
            amount: 523.75,
            imageUrl: "/avatars/marcus.jpg",
            lastExpense: "Dinner at Italian restaurant",
            daysAgo: 1
          },
          {
            userId: "user_3",
            name: "Emma Rodriguez",
            amount: 867.20,
            imageUrl: "/avatars/emma.jpg",
            lastExpense: "Grocery shopping",
            daysAgo: 5
          },
          {
            userId: "user_7",
            name: "Tom Wilson",
            amount: 234.80,
            imageUrl: "/avatars/tom.jpg",
            lastExpense: "Movie tickets",
            daysAgo: 2
          }
        ],
        youOwe: [
          {
            userId: "user_4",
            name: "Alex Kim",
            amount: 432.40,
            imageUrl: "/avatars/alex.jpg",
            lastExpense: "Rent payment",
            daysAgo: 7
          },
          {
            userId: "user_5",
            name: "Jennifer Walsh",
            amount: 189.90,
            imageUrl: "/avatars/jennifer.jpg",
            lastExpense: "Uber ride",
            daysAgo: 4
          },
          {
            userId: "user_8",
            name: "Lisa Park",
            amount: 756.30,
            imageUrl: "/avatars/lisa.jpg",
            lastExpense: "Birthday party expenses",
            daysAgo: 6
          }
        ]
      }
    },
    // Scenario 2: All settled up
    {
      oweDetails: {
        youAreOwedBy: [],
        youOwe: []
      }
    },
    // Scenario 3: Only owed money (positive balance)
    {
      oweDetails: {
        youAreOwedBy: [
          {
            userId: "user_6",
            name: "David Thompson",
            amount: 1250.00,
            imageUrl: "/avatars/david.jpg",
            lastExpense: "Weekend trip expenses",
            daysAgo: 2
          },
          {
            userId: "user_9",
            name: "Rachel Green",
            amount: 345.75,
            imageUrl: "/avatars/rachel.jpg",
            lastExpense: "Office lunch",
            daysAgo: 1
          }
        ],
        youOwe: []
      }
    }
  ];

  // Return first scenario by default (change index to test different scenarios)
  return scenarios[0];
};

export function BalanceSummary({ balances }) {
  // Use temporary data if no balances provided
  const tempBalances = balances || generateTempBalanceData();

  const { oweDetails } = tempBalances;
  const hasOwed = oweDetails.youAreOwedBy.length > 0;
  const hasOwing = oweDetails.youOwe.length > 0;

  return (
    <div className="space-y-4">
      {!hasOwed && !hasOwing && (
        <div className="text-center py-6">
          <p className="text-muted-foreground">You're all settled up!</p>
        </div>
      )}

      {hasOwed && (
        <div>
          <h3 className="text-sm font-medium flex items-center mb-3">
            <ArrowUpCircle className="h-4 w-4 text-green-500 mr-2" />
            Owed to you
          </h3>
          <div className="space-y-3">
            {oweDetails.youAreOwedBy.map((item) => (
              <Link
                href={`/person/${item.userId}`}
                key={item.userId}
                className="flex items-center justify-between hover:bg-muted p-2 rounded-md transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={item.imageUrl} />
                    <AvatarFallback>{item.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <span className="text-sm">{item.name}</span>
                </div>
                <span className="font-medium text-green-600">
                  ₹{item.amount.toFixed(2)}
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}

      {hasOwing && (
        <div>
          <h3 className="text-sm font-medium flex items-center mb-3">
            <ArrowDownCircle className="h-4 w-4 text-red-500 mr-2" />
            You owe
          </h3>
          <div className="space-y-3">
            {oweDetails.youOwe.map((item) => (
              <Link
                href={`/person/${item.userId}`}
                key={item.userId}
                className="flex items-center justify-between hover:bg-muted p-2 rounded-md transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={item.imageUrl} />
                    <AvatarFallback>{item.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <span className="text-sm">{item.name}</span>
                </div>
                <span className="font-medium text-red-600">
                  ₹{item.amount.toFixed(2)}
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
