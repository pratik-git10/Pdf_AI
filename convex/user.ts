import { mutation } from "./_generated/server";
import { v } from "convex/values";

const createUser = mutation({
  args: {
    email: v.string(),
    userName: v.string(),
    imageUrl: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db.query("users");
  },
});

export default createUser;
