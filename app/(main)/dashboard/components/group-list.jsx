import Link from "next/link";
import { Users } from "lucide-react";

// 🚧 TEMPORARY DATA FOR DEVELOPMENT - Replace with real data from Convex/API
const generateTempGroupData = () => {
  return [
    {
      id: "group_1",
      name: "Weekend Trip to Goa",
      balance: 1245.75,
      members: [
        { id: "user_1", name: "You" },
        { id: "user_2", name: "Sarah Chen" },
        { id: "user_3", name: "Marcus Johnson" },
        { id: "user_4", name: "Emma Rodriguez" },
        { id: "user_5", name: "Tom Wilson" }
      ],
      description: "Beach vacation expenses",
      createdAt: "2024-01-15",
      lastActivity: "2024-01-20",
      totalExpenses: 15670.50,
      expenseCount: 23
    },
    {
      id: "group_2",
      name: "Roommate Expenses",
      balance: -567.50,
      members: [
        { id: "user_1", name: "You" },
        { id: "user_6", name: "Alex Kim" },
        { id: "user_7", name: "Jennifer Walsh" },
        { id: "user_8", name: "David Thompson" }
      ],
      description: "Monthly shared expenses",
      createdAt: "2024-01-01",
      lastActivity: "2024-01-22",
      totalExpenses: 8950.00,
      expenseCount: 45
    },
    {
      id: "group_3",
      name: "Office Lunch Group",
      balance: 0,
      members: [
        { id: "user_1", name: "You" },
        { id: "user_9", name: "Lisa Park" },
        { id: "user_10", name: "Michael Brown" },
        { id: "user_11", name: "Rachel Green" },
        { id: "user_12", name: "Chris Lee" },
        { id: "user_13", name: "Anna Davis" }
      ],
      description: "Daily lunch orders",
      createdAt: "2024-01-10",
      lastActivity: "2024-01-21",
      totalExpenses: 3450.00,
      expenseCount: 67
    },
    {
      id: "group_4",
      name: "Birthday Party Planning",
      balance: 825.30,
      members: [
        { id: "user_1", name: "You" },
        { id: "user_14", name: "Priya Sharma" },
        { id: "user_15", name: "Rahul Gupta" },
        { id: "user_16", name: "Neha Patel" }
      ],
      description: "Sarah's surprise birthday party",
      createdAt: "2024-01-18",
      lastActivity: "2024-01-19",
      totalExpenses: 4200.00,
      expenseCount: 12
    },
    {
      id: "group_5",
      name: "Gym Membership",
      balance: -245.00,
      members: [
        { id: "user_1", name: "You" },
        { id: "user_17", name: "Vikram Singh" }
      ],
      description: "Shared fitness center costs",
      createdAt: "2024-01-05",
      lastActivity: "2024-01-20",
      totalExpenses: 1200.00,
      expenseCount: 4
    },
    {
      id: "group_6",
      name: "College Reunion",
      balance: 1567.80,
      members: [
        { id: "user_1", name: "You" },
        { id: "user_18", name: "Amit Kumar" },
        { id: "user_19", name: "Sneha Reddy" },
        { id: "user_20", name: "Karan Mehta" },
        { id: "user_21", name: "Pooja Jain" },
        { id: "user_22", name: "Ravi Agarwal" },
        { id: "user_23", name: "Meera Shah" }
      ],
      description: "Annual college friends meetup",
      createdAt: "2024-01-12",
      lastActivity: "2024-01-18",
      totalExpenses: 12500.00,
      expenseCount: 18
    },
    {
      id: "group_7",
      name: "Movie Night Club",
      balance: 89.25,
      members: [
        { id: "user_1", name: "You" },
        { id: "user_24", name: "Arjun Kapoor" },
        { id: "user_25", name: "Kavya Nair" }
      ],
      description: "Weekly movie and snacks",
      createdAt: "2024-01-08",
      lastActivity: "2024-01-21",
      totalExpenses: 890.50,
      expenseCount: 8
    },
    {
      id: "group_8",
      name: "House Renovation",
      balance: -1234.60,
      members: [
        { id: "user_1", name: "You" },
        { id: "user_26", name: "Suresh Iyer" },
        { id: "user_27", name: "Deepika Rao" }
      ],
      description: "Home improvement expenses",
      createdAt: "2024-01-03",
      lastActivity: "2024-01-19",
      totalExpenses: 25600.00,
      expenseCount: 15
    }
  ];
};

export function GroupList({ groups }) {
  // Use temporary data if no groups provided
  const tempGroups = groups || generateTempGroupData();

  if (!tempGroups || tempGroups.length === 0) {
    return (
      <div className="text-center py-6">
        <p className="text-muted-foreground">No groups yet</p>
        <p className="text-sm text-muted-foreground mt-1">
          Create a group to start tracking shared expenses
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {tempGroups.map((group) => {
        // Calculate total balance in the group
        const balance = group.balance || 0;
        const hasBalance = balance !== 0;

        return (
          <Link
            href={`/groups/${group.id}`}
            key={group.id}
            className="flex items-center justify-between hover:bg-muted p-2 rounded-md transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="bg-primary/10 p-2 rounded-md">
                <Users className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-medium">{group.name}</p>
                <p className="text-xs text-muted-foreground">
                  {group.members.length} members
                </p>
              </div>
            </div>

            {hasBalance && (
              <span
                className={`text-sm font-medium ${
                  balance > 0 ? "text-green-600" : "text-red-600"
                }`}
              >
                {balance > 0 ? "+" : ""}₹{balance.toFixed(2)}
              </span>
            )}
          </Link>
        );
      })}
    </div>
  );
}
