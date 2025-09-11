"use client";

import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { X as RemoveIcon } from "lucide-react";
import React from "react";

/**
 * used for identifying the split char and use will pasting
 */
const SPLITTER_REGEX = /[\n#?=&\t,./-]+/;

/**
 * used for formatting the pasted element for the correct value format to be added
 */

const FORMATTING_REGEX = /^[^a-zA-Z0-9]*|[^a-zA-Z0-9]*$/g;

interface TagsInputProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string[];
  onValueChange: (value: string[]) => void;
  placeholder?: string;
  maxItems?: number;
  minItems?: number;
  validateInput?: (value: string) => boolean | string;
}

interface TagsInputContextProps {
  value: string[];
  onValueChange: (value: string[]) => void;
  inputValue: string;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
  activeIndex: number;
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>;
}

const TagInputContext = React.createContext<TagsInputContextProps | null>(null);

export const TagsInput = React.forwardRef<HTMLDivElement, TagsInputProps>(
  (
    {
      value,
      onValueChange,
      placeholder,
      maxItems,
      minItems,
      validateInput,
      className,
      dir,
      ...props
    },
    ref
  ) => {
    const [activeIndex, setActiveIndex] = React.useState(-1);
    const [inputValue, setInputValue] = React.useState("");
    const [disableInput, setDisableInput] = React.useState(false);
    const [disableButton, setDisableButton] = React.useState(false);
    const [isValueSelected, setIsValueSelected] = React.useState(false);
    const [selectedValue, setSelectedValue] = React.useState("");
    const [validationError, setValidationError] = React.useState<string | null>(null);
    const inputRef = React.useRef<HTMLInputElement>(null);

    const parseMinItems = minItems ?? 0;
    const parseMaxItems = maxItems ?? Infinity;

    const onValueChangeHandler = React.useCallback(
      (val: string) => {
        if (!val.trim()) {
          setValidationError(null);
          return;
        }

        if (validateInput) {
          const validationResult = validateInput(val);
          if (typeof validationResult === 'string') {
            setValidationError(validationResult);
            return;
          } else if (validationResult === false) {
            setValidationError('Invalid input');
            return;
          }
        }

        if (!value.includes(val) && value.length < parseMaxItems) {
          onValueChange([...value, val]);
          setValidationError(null);
        }
      },
      [value, validateInput, parseMaxItems, onValueChange]
    );

    const RemoveValue = React.useCallback(
      (val: string) => {
        if (value.includes(val) && value.length > parseMinItems) {
          onValueChange(value.filter((item) => item !== val));
        }
      },
      [value]
    );

    const handlePaste = React.useCallback(
      (e: React.ClipboardEvent<HTMLInputElement>) => {
        e.preventDefault();
        const tags = e.clipboardData.getData("text").split(SPLITTER_REGEX);
        const newValue = [...value];
        let hasValidationError = false;

        tags.forEach((item) => {
          const parsedItem = item.replaceAll(FORMATTING_REGEX, "").trim();
          if (parsedItem.length > 0 && !newValue.includes(parsedItem) && newValue.length < parseMaxItems) {
            if (validateInput) {
              const validationResult = validateInput(parsedItem);
              if (typeof validationResult === 'string' || validationResult === false) {
                hasValidationError = true;
                return;
              }
            }
            newValue.push(parsedItem);
          }
        });

        if (hasValidationError) {
          setValidationError('One or more pasted items are invalid');
        } else {
          onValueChange(newValue);
          setInputValue("");
          setValidationError(null);
        }
      },
      [value, validateInput, parseMaxItems, onValueChange]
    );

    const handleSelect = React.useCallback(
      (e: React.SyntheticEvent<HTMLInputElement>) => {
        const target = e.currentTarget;
        const selection = target.value.substring(
          target.selectionStart ?? 0,
          target.selectionEnd ?? 0
        );

        setSelectedValue(selection);
        setIsValueSelected(selection === inputValue);
      },
      [inputValue]
    );

    // ? suggest : a refactor rather then using a useEffect

    React.useEffect(() => {
      const VerifyDisable = () => {
        if (value.length - 1 >= parseMinItems) {
          setDisableButton(false);
        } else {
          setDisableButton(true);
        }
        if (value.length + 1 <= parseMaxItems) {
          setDisableInput(false);
        } else {
          setDisableInput(true);
        }
      };
      VerifyDisable();
    }, [value]);

    // ? check: Under build , default option support
    // * support : for the uncontrolled && controlled ui

    /*  React.useEffect(() => {
      if (!defaultOptions) return;
      onValueChange([...value, ...defaultOptions]);
    }, []); */

    const handleKeyDown = React.useCallback(
      async (e: React.KeyboardEvent<HTMLInputElement>) => {
        e.stopPropagation();

        const moveNext = () => {
          const nextIndex =
            activeIndex + 1 > value.length - 1 ? -1 : activeIndex + 1;
          setActiveIndex(nextIndex);
        };

        const movePrev = () => {
          const prevIndex =
            activeIndex - 1 < 0 ? value.length - 1 : activeIndex - 1;
          setActiveIndex(prevIndex);
        };

        const moveCurrent = () => {
          const newIndex =
            activeIndex - 1 <= 0
              ? value.length - 1 === 0
                ? -1
                : 0
              : activeIndex - 1;
          setActiveIndex(newIndex);
        };
        const target = e.currentTarget;

        // ? Suggest : the multi select should support the same pattern

        switch (e.key) {
          case "ArrowLeft":
            if (dir === "rtl") {
              if (value.length > 0 && activeIndex !== -1) {
                moveNext();
              }
            } else {
              if (value.length > 0 && target.selectionStart === 0) {
                movePrev();
              }
            }
            break;

          case "ArrowRight":
            if (dir === "rtl") {
              if (value.length > 0 && target.selectionStart === 0) {
                movePrev();
              }
            } else {
              if (value.length > 0 && activeIndex !== -1) {
                moveNext();
              }
            }
            break;

          case "Backspace":
          case "Delete":
            if (value.length > 0) {
              if (activeIndex !== -1 && activeIndex < value.length) {
                RemoveValue(value[activeIndex]);
                moveCurrent();
              } else {
                if (target.selectionStart === 0) {
                  if (selectedValue === inputValue || isValueSelected) {
                    RemoveValue(value[value.length - 1]);
                  }
                }
              }
            }
            break;

          case "Escape":
            const newIndex = activeIndex === -1 ? value.length - 1 : -1;
            setActiveIndex(newIndex);
            break;

          case "Enter":
            e.preventDefault();
            if (inputValue) {
              onValueChangeHandler(inputValue);
              setInputValue("");
            }
            break;

          case ",":
            e.preventDefault();
            if (inputValue) {
              onValueChangeHandler(inputValue);
              setInputValue("");
            }
            break;
        }
      },
      [activeIndex, value, inputValue, RemoveValue]
    );

    const mousePreventDefault = React.useCallback((e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
    }, []);

    const handleChange = React.useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.currentTarget.value);
        setValidationError(null);
      },
      []
    );

    const handleContainerClick = React.useCallback((e: React.MouseEvent) => {
      // Only focus the input if the click was directly on the container
      // and not on a badge or button inside a badge
      if (e.target === e.currentTarget) {
        inputRef.current?.focus();
      }
    }, []);

    return (
      <TagInputContext.Provider
        value={{
          value,
          onValueChange,
          inputValue,
          setInputValue,
          activeIndex,
          setActiveIndex,
        }}
      >
        <div
          {...props}
          ref={ref}
          dir={dir}
          className={cn(
            "hover:border-border cursor-text  shadow-xs border-input border  py-2 px-2 rounded-md bg-input overflow-hidden  ring-1 ring-muted  ",
            {
              "focus-within:ring-ring": activeIndex === -1,
            },
            className
          )}
          onClick={handleContainerClick}
        >
          <div className="flex flex-wrap gap-1 items-center">
            {value.map((item, index) => (
              <Badge
                tabIndex={activeIndex !== -1 ? 0 : activeIndex}
                key={item}
                aria-disabled={disableButton}
                data-active={activeIndex === index}
                className={cn(
                  "relative px-1 rounded flex items-center gap-1 data-[active='true']:ring-2 data-[active='true']:ring-muted-foreground truncate aria-disabled:opacity-50 aria-disabled:cursor-not-allowed"
                )}
                variant={"secondary"}
              >
                <span className="text-sm">{item}</span>
                <button
                  type="button"
                  aria-label={`Remove ${item} option`}
                  aria-roledescription="button to remove option"
                  disabled={disableButton}
                  onMouseDown={mousePreventDefault}
                  onClick={() => RemoveValue(item)}
                  className="disabled:cursor-not-allowed hover:text-destructive cursor-pointer opacity-60 hover:opacity-100"
                >
                  <span className="sr-only">Remove {item} option</span>
                  <RemoveIcon className="size-3.5 " />
                </button>
              </Badge>
            ))}
            <Input
              ref={inputRef}
              tabIndex={0}
              aria-label="input tag"
              disabled={disableInput}
              onKeyDown={handleKeyDown}
              onPaste={handlePaste}
              value={inputValue}
              onSelect={handleSelect}
              onChange={handleChange}
              placeholder={placeholder}
              onClick={() => setActiveIndex(-1)}
              className={cn(
                "p-0 bg-transparent border-none rounded-none overflow-visible ring-0 shadow-none outline-0 h-fit min-w-fit flex-1 focus-visible:outline-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-0 placeholder:text-muted-foreground",
                activeIndex !== -1 && "caret-transparent",
                value.length > 0 && "ml-1"
              )}
            />
          </div>
          {validationError && (
            <p className="text-xs text-destructive mt-1">{validationError}</p>
          )}
        </div>
      </TagInputContext.Provider>
    );
  }
);

TagsInput.displayName = "TagsInput";
