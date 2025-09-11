import { ChevronRightIcon } from 'lucide-react';
import { Observable } from '@legendapp/state';
import { use$ } from '@legendapp/state/react';
import { useState } from 'react';
import * as SelectPrimitive from '@radix-ui/react-select';
import { Select, SelectContent, SelectGroup, SelectItem } from '@/components/ui/select';
import { cn } from '@/lib/utils';

export const MenuSelect = ({
  icon,
  label,
  value$,
  defaultValue,
  options = {},
  callback,
}: {
  icon?: React.ReactNode;
  label: string;
  value$: Observable<string | undefined>;
  defaultValue?: string;
  options: Record<string, string>;
  callback?: (value: string) => void;
}) => {
  const [open, setOpen] = useState(false);
  const value = use$(value$);

  //handlers
  const handleChange = (v: string) => {
    value$.set(v);
    callback?.(v);
  };

  return (
    <Select value={value} onValueChange={handleChange} open={open} onOpenChange={setOpen} defaultValue={defaultValue}>
      <div className="flex items-end flex-col">
        <button
          onClick={() => setOpen(!open)}
          className="cursor-pointer w-full hover:bg-hover focus:bg-hover text-foreground data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 dark:data-[variant=destructive]:focus:bg-destructive/20 data-[variant=destructive]:focus:text-destructive data-[variant=destructive]:*:[svg]:!text-destructive [&_svg:not([class*='text-'])]:text-muted-foreground-opaque relative flex items-center gap-2 rounded-sm px-2 min-h-7 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4"
        >
          {icon}
          <span className="w-full text-left truncate mr-1">{label}</span>
          <span className="text-secondary whitespace-nowrap">
            {value ? options[value] : defaultValue ? options[defaultValue] : ''}
          </span>
          <ChevronRightIcon className={cn('size-4 text-secondary transition-transform', open && 'rotate-90')} />
        </button>
        <SelectPrimitive.Trigger className="h-0 w-[150px]" />
      </div>
      <SelectContent className="px-1" align="end">
        <SelectGroup>
          {Object.entries(options).map(([value, label]) => (
            <SelectItem key={value} value={value}>
              {label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
