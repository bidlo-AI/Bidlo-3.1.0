'use client';

import React from 'react';
import { toast as sonnerToast } from 'sonner';
import { Check } from 'lucide-react';
import Link from 'next/link';

interface ToastProps {
  name: string;
}

export function AcceptedToast({ name }: ToastProps) {
  return sonnerToast.custom(() => (
    <div className="flex w-screen md:max-w-[364px] justify-center">
      <div className="flex rounded-lg shadow-lg max-w-[364px] bg-popover border items-center p-4">
        <div className="flex flex-1 items-center mr-4">
          <Check className="size-5 text-green mr-3" />
          <p className="text-sm font-medium text-popover-foreground">{name}</p>
        </div>
        <Link
          href={`/`}
          className="inline-flex items-center cursor-pointer justify-center text-sm gap-2 whitespace-nowrap rounded-md font-medium  disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none  aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive h-8  px-3 has-[>svg]:px-2.5"
        >
          Open organization
        </Link>
      </div>
    </div>
  ));
}
