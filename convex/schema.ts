import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

//! needs indexing

export default defineSchema({
  users: defineTable({
    email: v.string(),
    workos_id: v.string(),
    first_name: v.optional(v.string()),
    last_name: v.optional(v.string()),
    profile_picture: v.optional(v.string()),
    theme: v.union(v.literal('light'), v.literal('dark')),
    color: v.union(
      v.literal('gray'),
      v.literal('blue'),
      v.literal('green'),
      v.literal('yellow'),
      v.literal('orange'),
      v.literal('red'),
      v.literal('purple'),
      v.literal('pink'),
      v.literal('brown'),
      v.literal('default'),
    ),
  }),
  organizations: defineTable({
    workos_id: v.string(),
    name: v.string(),
    avatar: v.optional(v.string()),
    default_state: v.optional(v.string()),
    default_contractor: v.optional(v.string()),
  }).index('by_workos_id', ['workos_id']),
  organization_members: defineTable({
    role: v.union(v.literal('admin'), v.literal('member'), v.literal('viewer')),
    status: v.union(v.literal('active'), v.literal('pending')),
    workos_org_id: v.string(),
    workos_user_id: v.string(),
    workos_membership_id: v.string(),
  }),
  organization_invites: defineTable({
    email: v.string(),
    workos_org_id: v.string(), // WorkOS organization ID
    workos_invite_id: v.string(), // WorkOS invitation ID
    expires_at: v.number(),
    // workos_user_id: v.string(), //<-- you can't know this when the invite is created
  })
    .index('by_email', ['email'])
    .index('by_workos_invite_id', ['workos_invite_id']),

  messages: defineTable({
    content: v.string(),
    author: v.string(), // user email or name
    authorId: v.string(), // workos user id
    organizationId: v.string(), // workos organization id
    timestamp: v.number(),
  }).index('by_organization', ['organizationId']),
});
