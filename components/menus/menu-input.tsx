"use client";

import { Observable, observable } from "@legendapp/state";
import { use$ } from "@legendapp/state/react";
import { cn } from "@/lib/utils";
import { useEffect, useRef } from "react";

export const MenuInput = ({
  icon,
  label,
  value$,
  placeholder,
  type = "text",
  disabled,
  className,
  callback,
  defaultValue,
}: {
  icon?: React.ReactNode;
  label: string;
  value$: Observable<string | number | undefined>;
  placeholder?: string;
  type?: "text" | "email" | "password" | "number" | "url" | "tel";
  disabled?: boolean;
  className?: string;
  callback?: (value: string | number) => void;
  defaultValue?: string | number;
}) => {
  // Use useRef to persist observables across renders
  const localValue$ = useRef(
    observable<string | number>(value$.peek() ?? defaultValue ?? "")
  ).current;
  const isEditing$ = useRef(observable<boolean>(false)).current;
  const lastSyncedValue = useRef(value$.peek() ?? defaultValue);

  const value = use$(localValue$);

  // Sync from external observable when not editing
  useEffect(() => {
    const unsubscribe = value$.onChange((params) => {
      const newValue = params.value ?? defaultValue ?? "";
      // Only update our local value from the external state if user is not editing
      if (!isEditing$.get()) {
        localValue$.set(newValue);
        lastSyncedValue.current = newValue;
      }
    });

    return () => {
      unsubscribe();
    };
  }, [value$, localValue$, isEditing$, defaultValue]);

  // Update external observable when local state changes
  useEffect(() => {
    const unsubscribe = localValue$.onChange((params) => {
      const newValue = params.value;
      // Update the external observable
      value$.set(newValue);

      // Call onChange immediately - let consuming components handle their own debouncing
      callback?.(newValue);
    });

    return () => {
      unsubscribe();
    };
  }, [localValue$, value$, callback]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue =
      type === "number" ? parseFloat(e.target.value) || 0 : e.target.value;
    localValue$.set(newValue);
  };

  const handleFocus = () => {
    isEditing$.set(true);
  };

  const handleBlur = () => {
    isEditing$.set(false);
    // Ensure any pending changes are synced
    if (localValue$.get() !== lastSyncedValue.current) {
      lastSyncedValue.current = localValue$.get();
    }
  };

  return (
    <div
      className={cn(
        "w-full text-foreground relative flex items-center gap-2 rounded-sm px-2 min-h-7 text-sm",
        disabled ? "opacity-50 cursor-not-allowed" : "",
        className
      )}
    >
      {icon}
      <span className="w-full text-left truncate">{label}</span>
      <input
        type={type}
        value={value}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder={placeholder}
        disabled={disabled}
        className={cn(
          "text-right bg-input border flex items-center w-2/3 text-sm leading-[20px] relative rounded-[6px] px-[10px] h-[28px]",
          "[&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none",
          "[-moz-appearance:textfield]",
          disabled && "cursor-not-allowed"
        )}
      />
    </div>
  );
};
