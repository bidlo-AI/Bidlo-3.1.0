'use server';

import { withAuth } from '@workos-inc/authkit-nextjs';
import { WorkOS } from '@workos-inc/node';
import { ConvexHttpClient } from 'convex/browser';
import { api } from '@/convex/_generated/api';

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);
const workos = new WorkOS(process.env.WORKOS_API_KEY);

export async function handleDeclineInvite(workosInviteId: string) {
  const { user } = await withAuth({ ensureSignedIn: true });

  if (!user?.id) {
    throw new Error('User not authenticated');
  }

  try {
    let organizationId = null;

    // Get the invitation details to find the organization
    try {
      const invitations = await workos.userManagement.listInvitations({
        email: user.email,
      });

      const invitation = invitations.data.find((inv) => inv.id === workosInviteId);

      if (invitation) {
        organizationId = invitation.organizationId;
      }
    } catch (error) {
      console.warn('Could not find invitation details:', error);
    }

    // Delete organization membership
    if (organizationId) {
      try {
        // Get user's memberships from Convex to find the workos_membership_id
        const userMemberships = await convex.query(api.organization_members.getByUserId, {
          workos_user_id: user.id,
        });

        // Find the membership for this organization
        const targetMembership = userMemberships.find((membership) => membership.workos_org_id === organizationId);

        if (targetMembership?.workos_membership_id) {
          // Delete the membership from WorkOS using the stored membership ID
          await workos.userManagement.deleteOrganizationMembership(targetMembership.workos_membership_id);
          console.log('Deleted membership from WorkOS:', targetMembership.workos_membership_id);
        } else {
          console.warn('No membership found for user in organization');
        }
      } catch (membershipError) {
        console.error('Could not delete organization membership:', membershipError);
      }
    }

    // Revoke the invitation through WorkOS using the invitation ID
    try {
      const res = await workos.userManagement.revokeInvitation(workosInviteId);
      console.log('Revoked invitation through WorkOS:', res);
    } catch (workosError) {
      console.error('Could not revoke invitation through WorkOS:', workosError);
      // Don't fail the whole operation if invitation is not pending
      if (workosError instanceof Error && workosError.message.includes('not pending')) {
        console.log('Invitation is not pending, continuing with cleanup');
      } else {
        throw new Error('Failed to decline invitation. Please try again.');
      }
    }

    // Remove the invitation from Convex using the WorkOS invitation ID
    try {
      await convex.action(api.organization_invites.removeInviteByWorkOSId, {
        workos_invite_id: workosInviteId,
      });
    } catch (convexError) {
      console.warn('Could not remove invite from Convex:', convexError);
      // Don't fail the whole operation if Convex cleanup fails
    }

    return {
      success: true,
      message: 'Invitation declined successfully',
    };
  } catch (error) {
    console.error('Error declining invitation:', error);

    const errorMessage = error instanceof Error ? error.message : 'Failed to decline invitation';
    return {
      success: false,
      error: errorMessage,
    };
  }
}

//! - not deleting the user from the organization
//! - on delete
//*   - remove the invite in workos
//!   - remove the user from the organization in workos (this should trigger a webhook to remove the user in convex)
//! - may need to get the "memeberhsip id" from the workos create organization membership webhook and use that

//TODO
//! - create an icon/emogie/image library and an index/router for it
//!   - when you creat a tab it should use the widget icon, but the user can chnage it to anything in the icon library
//! - new tab options (table, Map, gallery, board, Timeline, calendar, Empty | View all Widgets)

// Universal Map Component
// - Inputs
//   - points - {type: market | route, fields: {}}
//   - style
//   - street_view
//   - new_point: {handle_add, handle_delete, handle_edit}
//   - selected
//   - hovered

// 90min/PDF -

// page removeal (identify tables) - LAST UNKNOWN
// - Free (30min per pdf)

// identify item-id format - Gemeni
// - $0

// parising - Azure document intelligence
// - 500 pages free =
// - $10/1000 pages

// quantity extraction - Gemini
// - $3.50/doc

//
