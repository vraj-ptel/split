import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
export default defineSchema({
  // user schema
  users: defineTable({
    name: v.string(),
    email: v.string(),
    tokenIdentifier: v.string(),
    imageUrl: v.optional(v.string()),
  }),
  // expences schema
  expences: defineTable({
    description: v.string(),
    amount: v.number(),
    category: v.optional(v.string()),
    date: v.number(), // timestamp
    paidByUserId: v.id("users"), // Reference to users table
    splitType: v.string(), // "equal", "percentage", "exact"
    splits: v.array(
      v.object({
        userId: v.id("users"), // Reference to users table
        amount: v.number(), // amount owed by this user
        paid: v.boolean(),
      })
    ),
    groupId: v.optional(v.id("groups")), // null for one-on-one expenses
    createdBy: v.id("users"),
  })
    .index("by_group", ["groupId"])
    .index("by_user_and_group", ["paidByUserId", "groupId"])
    .index("by_date", ["date"]),
  //   sattlement
  settlement: defineTable({
    amount: v.number(),
    note: v.optional(v.string()),
    date: v.number(),
    paidByUserId: v.id("users"), // Reference to users table
    receivedByUserId: v.id("users"), // Reference to users table
    groupId: v.optional(v.id("groups")), // null for one-on-one settlements
    relatedExpenseIds: v.optional(v.array(v.id("expenses"))), // Which expenses this settlement covers
    createdBy: v.id("users"), // Reference to users table
  })
    .index("by_group", ["groupId"])
    .index("by_user_and_group", ["paidByUserId", "groupId"])
    .index("by_receiver_and_group", ["receivedByUserId", "groupId"])
    .index("by_date", ["date"]),
  //groups
  groups: defineTable({
    name: v.string(),
    description: v.optional(v.string()),
    createdBy: v.id("users"), // Reference to users table group creator group admin
    members: v.array(
      v.object({
        userId: v.id("users"), // Reference to users table
        role: v.string(), // "admin" or "member"
        joinedAt: v.number(),
      })
    ),
  }),
});

// https://useful-lemming-75.clerk.accounts.dev
