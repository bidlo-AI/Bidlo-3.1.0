import { observer, Show } from "@legendapp/state/react";
import { Observable } from "@legendapp/state";
import { X } from "lucide-react";
import { CommandInput } from "@/components/ui/command";
import { Input$ } from "@/components/ui/input";
import { cn } from "@/lib/utils";

// Shared prop types
interface SearchProps {
  query$: Observable<string>;
  className?: string;
  placeholder?: string;
}

// Shared styling constants
const SHARED_INPUT_CLASSES =
  "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground bg-input flex h-9 w-full min-w-0 rounded-md border-none px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm focus-visible:border-ring focus-visible:ring-primary focus-visible:ring-[2px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive px-2 py-1  h-8 text-sm";

// Base search component
const BaseSearch = observer(
  ({
    query$,
    className,
    children,
  }: {
    query$: Observable<string>;
    className?: string;
    children: React.ReactNode;
  }) => {
    return (
      <div className={cn("px-3 pt-2 pb-1", className)}>
        <div className="relative">
          {children}
          <Show if={() => query$.get() !== ""}>
            <button
              onClick={() => query$.set("")}
              className="cursor-pointer px-1 absolute right-1 top-1/2 -translate-y-1/2 group"
            >
              <div className="bg-muted-foreground/50 text-popover rounded-full p-px group-hover:bg-muted-foreground">
                <X className="size-3.5" />
              </div>
            </button>
          </Show>
        </div>
      </div>
    );
  }
);

export const CommandSearch = observer(
  ({ query$, className, placeholder }: SearchProps) => {
    return (
      <BaseSearch query$={query$} className={className}>
        <CommandInput
          placeholder={placeholder || "Search values..."}
          value={query$.get()}
          onValueChange={(value) => query$.set(value)}
          className={SHARED_INPUT_CLASSES}
          containerClassName="border-none p-0 w-full"
          showIcon={false}
          autoFocus
        />
      </BaseSearch>
    );
  }
);

export const MenuSearch = observer(
  ({ query$, className, placeholder }: SearchProps) => {
    return (
      <BaseSearch query$={query$} className={className}>
        <Input$
          placeholder={placeholder || "Search values..."}
          $value={query$}
          className={SHARED_INPUT_CLASSES}
          autoFocus
        />
      </BaseSearch>
    );
  }
);
