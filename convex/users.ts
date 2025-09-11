import { internal } from './_generated/api';
import { internalQuery, query } from './_generated/server';
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
