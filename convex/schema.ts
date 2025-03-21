import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    users: defineTable({
        name: v.string(),
        email: v.string(),
        image: v.string(),
        clerkId: v.string(),
        token:v.optional(v.number())
        
    }).index("by_clerk_id",["clerkId"]),
    workspace: defineTable({
        messages: v.any(),
        fileData: v.optional(v.any()),
        user:v.id('users')
    })
})