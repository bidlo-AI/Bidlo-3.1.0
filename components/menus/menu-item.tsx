import { cn } from "@/lib/utils";
import { ElementType } from "react";

export const MenuItem = <C extends ElementType = "button">({
  as,
  children,
  className,
  onClick,
  disabled,
  destructive,
  ...props
}: {
  as?: C;
  children: React.ReactNode;
  className?: string;
  onClick?: (e: React.MouseEvent) => void;
  disabled?: boolean;
  destructive?: boolean;
} & Omit<
  React.ComponentPropsWithoutRef<C>,
  "className" | "onClick" | "disabled"
>) => {
  const Component = as || "button";

  return (
    <Component
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "cursor-pointer w-full hover:bg-hover focus-visible:bg-hover text-foreground data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 dark:data-[variant=destructive]:focus:bg-destructive/20 data-[variant=destructive]:focus:text-destructive data-[variant=destructive]:*:[svg]:!text-destructive relative flex items-center gap-2 rounded-sm px-2 min-h-7 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        destructive
          ? "hover:text-destructive [&_svg:not([class*='text-'])]:text-muted-foreground-opaque hover:[&_svg:not([class*='text-'])]:!text-destructive"
          : "[&_svg:not([class*='text-'])]:text-muted-foreground-opaque",
        disabled
          ? "text-secondary [&_svg:not([class*='text-'])]:text-secondary cursor-not-allowed"
          : "",
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
};
