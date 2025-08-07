import { query } from "./_generated/server";
export const getUserWithOutStandingDebts = query({
  handler: async (ctx) => {
    const users = await ctx.db.query("users").collect();
    const results = [];
    const expenses = await ctx.db
      .query("expenses")
      .filter((q)=>q.field('groupId',undefined))
      .collect();
    const settleMents=await ctx.db.query('settlements').filter((q)=>q.field('groupId',undefined)).collect();
    
    const useCache=new Map();
    const getUser=async(id)=>{
        if(!useCache.has(id)){
            useCache.set(id,await ctx.db.get(id));
        }
        return useCache.get(id);
    }
    for(const user of users){
        
    }
  },
});
