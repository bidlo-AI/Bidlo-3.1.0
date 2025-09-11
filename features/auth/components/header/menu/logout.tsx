'use client';

import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { LogOut } from 'lucide-react';
import { useAuth } from '@workos-inc/authkit-nextjs/components';

export function LogoutButton() {
  const { signOut } = useAuth();

  return (
    <button onClick={() => signOut()} className="w-full">
      <DropdownMenuItem asChild>
        <span className="flex items-center gap-2">
          <LogOut className="size-4" /> Logout
        </span>
      </DropdownMenuItem>
    </button>
  );
}
