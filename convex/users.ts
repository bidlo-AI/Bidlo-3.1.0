import { internal } from './_generated/api';
import { internalQuery, mutation, query } from './_generated/server';
import { v } from 'convex/values';
import schema from './schema';
import { crud } from 'convex-helpers/server/crud';

const userFields = schema.tables.users.validator.fields;

export const { create, destroy, update } = crud(schema, 'users');

export const getUser: ReturnType<typeof query> = query({
  handler: async (ctx) => {
    const user = await ctx.auth.getUserIdentity();
    const workos_user_id = user?.subject;

    if (!workos_user_id) throw new Error('User not authenticated');
    return await ctx.runQuery(internal.users.getByWorkOSId, { workos_id: workos_user_id });
  },
});

// --------------------------------
// MUTATIONS
// --------------------------------
export const setLayoutWidth = mutation({
  // updates either agent_panel_width or sidebar_width for the user (providing this server side prevents layout shift on page load)
  args: { target: v.union(v.literal('agent_panel_width'), v.literal('sidebar_width')), width: v.number() },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity?.subject) throw new Error('User not authenticated');
    const workos_user_id = identity.subject;

    const userDoc = await ctx.db
      .query('users')
      .filter((q) => q.eq(q.field('workos_id'), workos_user_id))
      .first();
    if (!userDoc) throw new Error('User not found');

    await ctx.db.patch(userDoc._id, { [args.target]: args.width } as Partial<typeof userDoc>);
    return { success: true };
  },
});

export const setLayoutHidden = mutation({
  args: { target: v.union(v.literal('agent_panel_hidden'), v.literal('sidebar_hidden')), hidden: v.boolean() },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity?.subject) throw new Error('User not authenticated');
    const workos_user_id = identity.subject;

    const userDoc = await ctx.db
      .query('users')
      .filter((q) => q.eq(q.field('workos_id'), workos_user_id))
      .first();
    if (!userDoc) throw new Error('User not found');
    await ctx.db.patch(userDoc._id, { [args.target]: args.hidden } as Partial<typeof userDoc>);
    return { success: true };
  },
});

export const setAgentPanelPage = mutation({
  args: { page: v.string() },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity?.subject) throw new Error('User not authenticated');
    const workos_user_id = identity.subject;

    const userDoc = await ctx.db
      .query('users')
      .filter((q) => q.eq(q.field('workos_id'), workos_user_id))
      .first();
    if (!userDoc) throw new Error('User not found');
    await ctx.db.patch(userDoc._id, { agent_panel_page: args.page } as Partial<typeof userDoc>);
    return { success: true };
  },
});

// --------------------------------
// INTERNAL QUERIES
// --------------------------------
export const getByWorkOSId = internalQuery({
  args: { workos_id: userFields.workos_id },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query('users')
      .filter((q) => q.eq(q.field('workos_id'), args.workos_id))
      .first();
    return user;
  },
});
