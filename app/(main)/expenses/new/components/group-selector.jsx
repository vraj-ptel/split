"use client";

import { useState, useEffect } from "react";
// import { useConvexQuery } from "@/hooks/use-convex-query";
// import { api } from "@/convex/_generated/api";
import { BarLoader } from "react-spinners";
import { Users } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function GroupSelector({ onChange }) {
  const [selectedGroupId, setSelectedGroupId] = useState("");

  // 🚧 TEMPORARY DATA FOR DEVELOPMENT - Replace with real data from Convex/API
  const generateTempGroupData = () => {
    const groups = [
      {
        id: "group_1",
        name: "Weekend Trip to Goa",
        memberCount: 5,
        members: [
          {
            id: "user_current_123",
            name: "You (Current User)",
            email: "you@example.com",
            imageUrl: "/avatars/current-user.jpg"
          },
          {
            id: "user_2",
            name: "Sarah Chen",
            email: "sarah.chen@example.com",
            imageUrl: "/avatars/sarah.jpg"
          },
          {
            id: "user_3",
            name: "Marcus Johnson",
            email: "marcus.johnson@example.com",
            imageUrl: "/avatars/marcus.jpg"
          },
          {
            id: "user_4",
            name: "Emma Rodriguez",
            email: "emma.rodriguez@example.com",
            imageUrl: "/avatars/emma.jpg"
          },
          {
            id: "user_5",
            name: "Tom Wilson",
            email: "tom.wilson@example.com",
            imageUrl: "/avatars/tom.jpg"
          }
        ],
        description: "Beach vacation expenses",
        createdAt: "2024-01-15",
        lastActivity: "2024-01-20"
      },
      {
        id: "group_2",
        name: "Roommate Expenses",
        memberCount: 4,
        members: [
          {
            id: "user_current_123",
            name: "You (Current User)",
            email: "you@example.com",
            imageUrl: "/avatars/current-user.jpg"
          },
          {
            id: "user_6",
            name: "Alex Kim",
            email: "alex.kim@example.com",
            imageUrl: "/avatars/alex.jpg"
          },
          {
            id: "user_7",
            name: "Jennifer Walsh",
            email: "jennifer.walsh@example.com",
            imageUrl: "/avatars/jennifer.jpg"
          },
          {
            id: "user_8",
            name: "David Thompson",
            email: "david.thompson@example.com",
            imageUrl: "/avatars/david.jpg"
          }
        ],
        description: "Monthly shared expenses",
        createdAt: "2024-01-01",
        lastActivity: "2024-01-22"
      },
      {
        id: "group_3",
        name: "Office Lunch Group",
        memberCount: 6,
        members: [
          {
            id: "user_current_123",
            name: "You (Current User)",
            email: "you@example.com",
            imageUrl: "/avatars/current-user.jpg"
          },
          {
            id: "user_9",
            name: "Lisa Park",
            email: "lisa.park@example.com",
            imageUrl: "/avatars/lisa.jpg"
          },
          {
            id: "user_10",
            name: "Michael Brown",
            email: "michael.brown@example.com",
            imageUrl: "/avatars/michael.jpg"
          },
          {
            id: "user_11",
            name: "Rachel Green",
            email: "rachel.green@example.com",
            imageUrl: "/avatars/rachel.jpg"
          },
          {
            id: "user_12",
            name: "Chris Lee",
            email: "chris.lee@example.com",
            imageUrl: "/avatars/chris.jpg"
          },
          {
            id: "user_13",
            name: "Anna Davis",
            email: "anna.davis@example.com",
            imageUrl: "/avatars/anna.jpg"
          }
        ],
        description: "Daily lunch orders",
        createdAt: "2024-01-10",
        lastActivity: "2024-01-21"
      },
      {
        id: "group_4",
        name: "Birthday Party Planning",
        memberCount: 4,
        members: [
          {
            id: "user_current_123",
            name: "You (Current User)",
            email: "you@example.com",
            imageUrl: "/avatars/current-user.jpg"
          },
          {
            id: "user_14",
            name: "Priya Sharma",
            email: "priya.sharma@example.com",
            imageUrl: "/avatars/priya.jpg"
          },
          {
            id: "user_15",
            name: "Rahul Gupta",
            email: "rahul.gupta@example.com",
            imageUrl: "/avatars/rahul.jpg"
          },
          {
            id: "user_16",
            name: "Neha Patel",
            email: "neha.patel@example.com",
            imageUrl: "/avatars/neha.jpg"
          }
        ],
        description: "Sarah's surprise birthday party",
        createdAt: "2024-01-18",
        lastActivity: "2024-01-19"
      }
    ];

    const selectedGroup = selectedGroupId ? groups.find(g => g.id === selectedGroupId) : null;

    return {
      groups,
      selectedGroup
    };
  };

  // Single query to get all data we need
  // const { data, isLoading } = useConvexQuery(
  //   api.groups.getGroupOrMembers,
  //   selectedGroupId ? { groupId: selectedGroupId } : {}
  // );

  const data = generateTempGroupData();
  const isLoading = false; // Set to false to show the data

  // When group data changes, notify parent
  useEffect(() => {
    if (data?.selectedGroup && onChange) {
      onChange(data.selectedGroup);
    }
  }, [data?.selectedGroup, onChange]);

  const handleGroupChange = (groupId) => {
    setSelectedGroupId(groupId);
  };

  if (isLoading) {
    return <BarLoader width={"100%"} color="#36d7b7" />;
  }

  if (!data?.groups || data.groups.length === 0) {
    return (
      <div className="text-sm text-amber-600 p-2 bg-amber-50 rounded-md">
        You need to create a group first before adding a group expense.
      </div>
    );
  }

  return (
    <div>
      <Select value={selectedGroupId} onValueChange={handleGroupChange}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select a group" />
        </SelectTrigger>
        <SelectContent>
          {data.groups.map((group) => (
            <SelectItem key={group.id} value={group.id}>
              <div className="flex items-center gap-2">
                <div className="bg-primary/10 p-1 rounded-full">
                  <Users className="h-3 w-3 text-primary" />
                </div>
                <span>{group.name}</span>
                <span className="text-xs text-muted-foreground">
                  ({group.memberCount} members)
                </span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {isLoading && selectedGroupId && (
        <div className="mt-2">
          <BarLoader width={"100%"} color="#36d7b7" />
        </div>
      )}
    </div>
  );
}
