import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const CreateUser = mutation({
    args: {
        name: v.string(),
        email: v.string(),
        image: v.string(),
        clerkId:v.string()
    },
    handler: async (ctx, args) => {
        
        const user = await ctx.db.query('users').filter((q) => q.eq(q.field('email'), args.email)).collect()
        console.log(user)
        if (user.length == 0) {
            const result = await ctx.db.insert('users', {
                name: args.name,
                email: args.email,
                image: args.image,
                token:50000,
                clerkId: args.clerkId,
            })
            return result

        }

        
    }
})

export const GetUser = query({
    args: {
        email : v.string()
    },
    handler: async (ctx, args) => {
        const user = await ctx.db.query('users').filter((q) => q.eq(q.field('email'), args.email)).collect()

        return user[0]
    }
    
})


export const UpdateToken = mutation({
    args: {
        token: v.number(),
        userId : v.id('users')
    },
    handler: async (ctx,args) => {
        const result = await ctx.db.patch(args.userId,{
            token:args.token
        })

        return result;
    }
})