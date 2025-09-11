import { Observable } from "@legendapp/state";
import { Switch } from "@/components/ui/switch";
import { use$ } from "@legendapp/state/react";
import { cn } from "@/lib/utils";

export const MenuToggle = ({
  icon,
  label,
  value$,
  className,
  callback,
  defaultValue,
  disabled,
}: {
  icon?: React.ReactNode;
  label: string;
  value$: Observable<boolean>;
  className?: string;
  callback?: (value: boolean) => void;
  defaultValue?: boolean;
  disabled?: boolean;
}) => {
  // Use a div with similar styling instead of MenuItem to avoid button nesting
  return (
    <div
      onClick={() => {
        if (disabled) return;
        const newValue = !value$.get();
        value$.set(newValue);
        callback?.(newValue);
      }}
      className={cn(
        "cursor-pointer w-full hover:bg-hover focus:bg-hover text-foreground relative flex items-center gap-2 rounded-sm px-2 min-h-7 text-sm outline-hidden select-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        disabled && "pointer-events-none text-secondary",
        className
      )}
    >
      {icon}
      <span className="w-full text-left">{label}</span>
      <Toggle value$={value$} defaultValue={defaultValue} disabled={disabled} />
    </div>
  );
};

const Toggle = ({
  value$,
  defaultValue,
  disabled,
}: {
  value$: Observable<boolean>;
  defaultValue?: boolean;
  disabled?: boolean;
}) => {
  const value = use$(value$) ?? defaultValue;
  return <Switch checked={value} disabled={disabled} />;
};
