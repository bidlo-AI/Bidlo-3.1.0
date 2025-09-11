'use server';

import { withAuth } from '@workos-inc/authkit-nextjs';
import { WorkOS } from '@workos-inc/node';
import { ConvexHttpClient } from 'convex/browser';
import { api } from '@/convex/_generated/api';
// import { switchToOrganizationAction } from "./switchOrganization";

const workos = new WorkOS(process.env.WORKOS_API_KEY);
const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export async function handleAcceptInvite({
  workosInviteId,
  // goToOrg,
}: {
  workosInviteId: string;
  // goToOrg: boolean;
}) {
  const { user } = await withAuth({ ensureSignedIn: true });

  if (!user?.id) {
    throw new Error('User not authenticated');
  }

  // Process the invitation first
  const result = await processInvitation(workosInviteId, user);

  // // If we have an organization to switch to, do it now (outside of try/catch)
  // if (result.organizationIdToSwitchTo) {
  //   await switchToOrganizationAction(result.organizationIdToSwitchTo);
  //   // This will redirect and not return
  // }

  // Return the result if no redirect happened
  return {
    success: result.success,
    message: result.message,
    error: result.error,
  };
}

async function processInvitation(workosInviteId: string, user: { email: string }) {
  let invitation = null;

  try {
    // First, check if the invitation exists and is valid
    try {
      const invitations = await workos.userManagement.listInvitations({
        email: user.email,
      });

      invitation = invitations.data.find((inv) => inv.id === workosInviteId);

      if (!invitation) {
        return {
          success: false,
          error: 'Invitation not found or not intended for your email address.',
          organizationIdToSwitchTo: null,
        };
      }

      // Check invitation state
      if (invitation.state === 'accepted') {
        return {
          success: false,
          error: 'This invitation has already been accepted.',
          organizationIdToSwitchTo: invitation.organizationId,
        };
      }

      if (invitation.state === 'expired') {
        return {
          success: false,
          error: 'This invitation has expired. Please request a new invitation.',
          organizationIdToSwitchTo: null,
        };
      }

      if (invitation.state === 'revoked') {
        return {
          success: false,
          error: 'This invitation has been revoked.',
          organizationIdToSwitchTo: null,
        };
      }
    } catch (listError) {
      console.warn('Could not list invitations:', listError);
      // Continue with acceptance attempt even if listing fails
    }

    // Accept the invitation through WorkOS using the proper API
    try {
      const res = await workos.userManagement.acceptInvitation(workosInviteId);
      console.log('handleAcceptInvite res', {
        handleAcceptInvite: workosInviteId,
        user,
        response: res,
      });
    } catch (workosError: unknown) {
      console.error('Could not accept invitation through WorkOS:', {
        handleAcceptInvite: workosInviteId,
        user,
        workosError,
      });

      // Provide specific error messages based on the error code
      // @ts-expect-error - workosError is unknown
      if (workosError?.rawData?.code === 'invalid_invite') {
        if (invitation?.state === 'accepted') {
          return {
            success: false,
            error: 'This invitation has already been accepted.',
            organizationIdToSwitchTo: invitation.organizationId,
          };
        }
        return {
          success: false,
          error: 'This invitation is no longer valid. It may have already been accepted, expired, or been revoked.',
          organizationIdToSwitchTo: null,
        };
      }

      throw new Error('Failed to accept invitation. Please try again.');
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
      message: 'Successfully joined the organization!',
      organizationIdToSwitchTo: invitation?.organizationId || null,
    };
  } catch (error: unknown) {
    console.error('Error accepting invitation:', error);

    // Return a user-friendly error message
    const errorMessage = error instanceof Error ? error.message : 'Failed to accept invitation';
    return {
      success: false,
      error: errorMessage,
      organizationIdToSwitchTo: null,
    };
  }
}
