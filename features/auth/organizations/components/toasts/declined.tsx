'use client';

import React from 'react';
import { toast as sonnerToast } from 'sonner';
import { Check } from 'lucide-react';

export function DeclinedToast() {
  return sonnerToast.custom(() => (
    <div className="flex w-screen md:max-w-[364px] justify-center">
      <div className="flex rounded-lg shadow-lg max-w-[364px] bg-popover border items-center p-4">
        <div className="flex flex-1 items-center">
          <Check className="size-5 text-green mr-3" />
          <p className="text-sm font-medium text-popover-foreground">Invitation Declined!</p>
        </div>
      </div>
    </div>
  ));
}
