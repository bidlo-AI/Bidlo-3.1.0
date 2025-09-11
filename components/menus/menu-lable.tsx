import { cn } from "@/lib/utils";

export const MenuLabel = ({
  label,
  children,
  className,
}: {
  label: string;
  children?: React.ReactNode;
  className?: string;
}) => {
  return (
    <span
      className={cn(
        "py-1.5 px-2 flex items-center justify-between w-full gap-2",
        className
      )}
    >
      <span className="text-xs font-medium text-muted-foreground">{label}</span>
      {children}
    </span>
  );
};
