import { query,mutation } from "./_generated/server";
import { getCurrentUser } from "./users";
import { internal } from "./_generated/api";
import { v } from "convex/values";

export const getAllContacts = query({
  handler: async (ctx) => {
    const currentUser = await ctx.runQuery(internal.users.getCurrentUser);
    const expensesYouPaid = await ctx.db
      .query("expenses")
      .withIndex("by_user_and_group", (q) => {
        q.eq("paidByUserId", currentUser._id).eq("groupId", undefined);
      })
      .collect();
    const expensesYouNotPaid = (
      await ctx.db
        .query("expenses")
        .withIndex("by_group", (q) => {
          q.eq("groupId", undefined);
        })
        .collect()
    ).filter(
      (e) =>
        e.paidByUserId !== currentUser._id &&
        e.splits.some((s) => s.userId == currentUser._id)
    );

    const personalExpenses = [...expensesYouNotPaid, ...expensesYouPaid];
    const contactId = new set();
    personalExpenses.forEach((e) => {
      if (e.paidByUserId !== currentUser._id) {
        contactId.add(e.paidByUserId);
      }
      //add each user in the split that is not the current user
      e.splits.forEach((s) => {
        if (s.userId !== currentUser._id) {
          contactId.add(s.userId);
        }
      });
    });
    const contactUsers = await Promise.all(
      [...contactId].map(async (id) => {
        const u = await ctx.db.get(id);
        return u
          ? {
              id: u._id,
              name: u.name,
              email: u.email,
              imageUrl: u.imageUrl,
              type: "user", //add type to make distinguish from groups
            }
          : null;
      })
    );

    const userGroups = (await ctx.db.query("groups").collect()).filter((q) =>
      q.members
        .some((m) => m.userId == currentUser._id)
        .map((m) => ({
          id: m._id,
          name: m.name,
          description: m.description,
          memberCount: m.members.length,
          type: "group",
        }))
    );
    contactUsers.sort((a,b)=>a?.name.localeCompare(b?.name))
    userGroups.sort((a,b)=>a?.name.localeCompare(b?.name))
    return {
        users:contactUsers.filter((u)=>u!==null),
        groups:userGroups
    }
  },
});

export const createGroup=mutation(
    {
        args:{
            name:v.string(),
            description:v.string(),
            members:v.array(v.id('users'))
        },
        handler:async(ctx,args)=>{
            const currentUser=await ctx.runQuery(internal.users.getCurrentUser);
            if(!args.name.trim()){
                throw new Error('Group name is required');
            };
            const uniqueMembers=new Set(args.members);
            uniqueMembers.add(currentUser._id);
            for (const id of uniqueMembers){
                if(!(await ctx.db.get(id))){
                    throw new Error(`User with ${id} does not exist`);
                }
            }
            return await ctx.db.insert("groups",{
                name:args.name,
                description:args.description?.trim()??"",
                createdBy:currentUser._id,
                members:[...uniqueMembers].map((id)=>({
                    userId:id,
                    role:id==currentUser._id?"admin":"member",
                    joinedAt:Date.now()
                }))
            })
        }
    }
)
