import { query } from './_generated/server';

// Returns the current authenticated user document from the `users` table
// by matching the WorkOS user id (from auth identity `subject`).
export const getUser = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    console.log('identity', identity);
    const workosUserId = identity?.subject;

    if (!workosUserId) return null;

    const userDoc = await ctx.db
      .query('users')
      .filter((q) => q.eq(q.field('workosId'), workosUserId))
      .first();

    return userDoc ?? null;
  },
});
