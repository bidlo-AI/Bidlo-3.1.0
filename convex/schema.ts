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
    agent_panel_width: v.optional(v.number()),
    sidebar_width: v.optional(v.number()),
    sidebar_hidden: v.optional(v.boolean()),
  })
    .index('by_email', ['email'])
    .index('by_workos_id', ['workos_id']),
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

  // ------------------------------------------------------------
  // PRESENCE
  // ------------------------------------------------------------
  // Presence component tables (localized copy from @convex-dev/presence)
  presence: defineTable({
    roomId: v.string(),
    userId: v.string(),
    online: v.boolean(),
    lastDisconnected: v.number(),
  })
    .index('user_online_room', ['userId', 'online', 'roomId'])
    .index('room_order', ['roomId', 'online', 'lastDisconnected']),

  presence_sessions: defineTable({
    roomId: v.string(),
    userId: v.string(),
    sessionId: v.string(),
  })
    .index('room_user_session', ['roomId', 'userId', 'sessionId'])
    .index('sessionId', ['sessionId']),

  presence_roomTokens: defineTable({
    token: v.string(),
    roomId: v.string(),
  })
    .index('token', ['token'])
    .index('room', ['roomId']),

  presence_sessionTokens: defineTable({
    token: v.string(),
    sessionId: v.string(),
  })
    .index('token', ['token'])
    .index('sessionId', ['sessionId']),

  presence_sessionTimeouts: defineTable({
    sessionId: v.string(),
    scheduledFunctionId: v.id('_scheduled_functions'),
  }).index('sessionId', ['sessionId']),
});
