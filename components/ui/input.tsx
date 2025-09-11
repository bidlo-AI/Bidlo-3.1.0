import * as React from 'react';

import { cn } from '@/lib/utils';
import { $React } from '@legendapp/state/react-web';
import { Observable } from '@legendapp/state';

function Input({ className, type, ...props }: React.ComponentProps<'input'>) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        'file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground bg-input flex h-9 w-full min-w-0 rounded-md border px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
        'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
        'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
        className,
      )}
      {...props}
    />
  );
}

interface InputProps extends Omit<React.ComponentProps<'input'>, 'value' | 'onChange'> {
  $value: Observable<string | number | undefined>;
  className?: string;
}

function Input$({ className, type, $value, ...props }: InputProps) {
  return (
    <$React.input
      type={type}
      data-slot="input"
      className={cn(
        'file:text-foreground placeholder:text-secondary selection:bg-primary selection:text-primary-foreground bg-input flex h-9 w-full min-w-0 rounded-md border px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
        'focus-visible:border-ring focus-visible:ring-primary focus-visible:ring-[2px]',
        'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
        className,
      )}
      $value={$value}
      {...props}
    />
  );
}

export { Input, Input$ };
