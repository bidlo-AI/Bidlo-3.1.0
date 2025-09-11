import { Id } from '@/convex/_generated/dataModel';

export type Organization = {
  role: Role;
  name: string;
  avatar?: string;
  id: string;
  default_state?: string;
  default_contractor?: Contractor;
};

export type Role = 'owner' | 'admin' | 'user';

export interface NewOrganization extends Organization {
  members: string[];
}

export interface Contractor {
  id: string;
  name: string;
  icon: string;
}

// export interface TeamsWithInvites {
//   teams: Record<string, Team>;
//   invites: Record<string, TeamInvitation>;
// }

// export type TeamsWithInvitesRes = {
//   data: TeamsWithInvites | null;
//   error: Error | null;
// };
export interface TeamInvitation {
  _id: Id<'organization_invites'>;
  email: string;
  expires_at: number;
  workos_invite_id: string;
  organization: {
    id: string;
    name: string;
  } | null;
}
