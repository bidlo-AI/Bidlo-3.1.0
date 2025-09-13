### Presence (Convex)

- **What it is**: Org-scoped, room-based online presence with minimal network chatter. Tracks sessions per tab, marks users online/offline, and enriches users with names/avatars.
- **Where**:
  - Server: `convex/presence.ts` (`heartbeat`, `list`, `disconnect`)
  - Schema: `convex/schema.ts` (tables: `presence`, `presence_sessions`, `presence_roomTokens`, `presence_sessionTokens`, `presence_sessionTimeouts`)
  - Client hook: `features/blocks/components/header/presence/hooks/usePresence/index.js`
  - UI example: `features/blocks/components/header/presence/index.tsx` (`<Presence block_id="..." />` renders a facepile)

### Server API

- **heartbeat({ roomId, sessionId, interval }) → { roomToken, sessionToken }**
  - Auth-required; derives `userId = identity.subject` and `organization` from WorkOS identity.
  - Uses `effectiveRoomId = `${organization}::${roomId}`` to scope presence per org.
  - Ensures a unique `presence_sessions` row and upserts `presence` to online.
  - Schedules `disconnect` with `runAfter(interval * 2.5)` and stores a timeout handle.

- **list({ roomToken, limit? = 104 }) → Array<{ userId, online, lastDisconnected, name?, image? }>**
  - Resolves `roomToken` to `roomId`, returns online first then most-recent offline.
  - Enriches with user `name`/`image` from `users` via `by_workos_id` (fallback: `by_email`).

- **disconnect({ sessionToken })**
  - Deletes the session and cancels any scheduled timeout.
  - If the user has no remaining sessions in the room, marks `presence.online = false` and sets `lastDisconnected = Date.now()`.

### Schema (indexes simplified)

- `presence(userId, online, roomId, lastDisconnected)` → indexes: `user_online_room`, `room_order`
- `presence_sessions(roomId, userId, sessionId)` → indexes: `room_user_session`, `sessionId`
- `presence_roomTokens(token, roomId)` → indexes: `token`, `room`
- `presence_sessionTokens(token, sessionId)` → indexes: `token`, `sessionId`
- `presence_sessionTimeouts(sessionId, scheduledFunctionId)` → index: `sessionId`

### Client usage

```tsx
import { api } from '@/convex/_generated/api';
import usePresence from '@/features/blocks/components/header/presence/hooks/usePresence';

const presenceState = usePresence(api.presence, 'my-room-id', 10000);
// presenceState: Array<{ userId; online; lastDisconnected; name?; image? }>
```

Or use the ready-made component:

```tsx
import { Presence } from '@/features/blocks/components/header/presence';

<Presence block_id="my-room-id" />;
```

### Notes

- **Org scoping**: Presence is isolated per org via `effectiveRoomId = `${organization}::${roomId}``.
- **Efficiency**: The hook only triggers updates to the UI when members join/leave, not on every heartbeat.
- **Lifecycle**: On visibility hidden, intervals are cleared and the session disconnects; on unload, `navigator.sendBeacon` calls `disconnect`.
- **Interval**: Default is 10s; adjust the third arg to `usePresence` as needed.
- **Prereq**: App must be wrapped with the Convex client provider so `useConvex()` is available.

### Quick test

Open two tabs pointing to the same `roomId` (e.g., a shared `block_id`). You should see the facepile update as tabs open/close or go hidden/visible.
