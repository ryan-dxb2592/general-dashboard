"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker } from "react-day-picker";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: React.ComponentProps<typeof DayPicker>) {
  return (
    <DayPicker
      captionLayout="dropdown-buttons"
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      classNames={{
        caption_dropdowns:
          "flex flex-row justify-center pt-1 relative items-center w-full text-sm",
        months: "flex flex-col sm:flex-row gap-2",
        month: "flex flex-col gap-4",
        caption:
          "flex flex-row justify-center pt-1 relative items-center w-full",
        caption_label: "text-sm font-medium hidden",
        nav: "flex items-center gap-1",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "size-7 bg-transparent p-0 opacity-50 hover:opacity-100"
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-x-1",
        head_row: "flex",
        head_cell:
          "text-muted-foreground rounded-md w-8 font-normal text-[0.8rem]",
        row: "flex w-full mt-2",
        cell: cn(
          "relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent [&:has([aria-selected].day-range-end)]:rounded-r-md",
          props.mode === "range"
            ? "[&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md"
            : "[&:has([aria-selected])]:rounded-md"
        ),
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "size-8 p-0 font-normal aria-selected:opacity-100"
        ),
        day_range_start:
          "day-range-start aria-selected:bg-primary aria-selected:text-primary-foreground",
        day_range_end:
          "day-range-end aria-selected:bg-primary aria-selected:text-primary-foreground",
        day_selected:
          "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
        day_today: "bg-accent text-accent-foreground",
        day_outside:
          "day-outside text-muted-foreground aria-selected:text-muted-foreground",
        day_disabled: "text-muted-foreground opacity-50",
        day_range_middle:
          "aria-selected:bg-accent aria-selected:text-accent-foreground",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        Dropdown: ({ value, onChange, children, ...props }) => {
          interface DropdownItemProps {
            value: string;
            children: React.ReactNode;
            className?: string;
            "data-value"?: string;
          }

          // Convert 0-based month to 1-based for display
          const displayValue =
            props.name === "months"
              ? Number(props.name === "months" && value) + 1
              : value;

          const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
            const target = event.target as HTMLDivElement;
            if (target.hasAttribute("data-value")) {
              const clickedValue = target.getAttribute("data-value");
              if (onChange && clickedValue) {
                // Convert 1-based month back to 0-based when handling change
                const adjustedValue =
                  props.name === "months"
                    ? String(Number(clickedValue) - 1)
                    : clickedValue;

                const syntheticEvent = {
                  target: {
                    value: adjustedValue,
                  },
                } as React.ChangeEvent<HTMLSelectElement>;
                onChange(syntheticEvent);
              }
            }
          };

          return (
            // <select
            //   id="countries"
            //   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            // >
            //   <option selected>Choose a country</option>
            //   <option value="US">United States</option>
            //   <option value="CA">Canada</option>
            //   <option value="FR">France</option>
            //   <option value="DE">Germany</option>
            // </select>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-[var(--radix-popper-anchor-width)] max-w-[75px] justify-center text-center font-normal text-sm",
                    !displayValue && "text-muted-foreground"
                  )}
                >
                  <span>
                    {props.name === "months"
                      ? props.caption?.toString().slice(0, 3) + "..."
                      : props.caption}
                  </span>
                </Button>
              </PopoverTrigger>
              <PopoverContent
                className="w-fit p-0 max-h-72 overflow-y-auto"
                align="end"
              >
                <div className="p-1" onClick={handleClick}>
                  {React.Children.map(children, (child) => {
                    if (React.isValidElement<DropdownItemProps>(child)) {
                      // For months, convert the 0-based value to 1-based for display
                      const itemValue =
                        props.name === "months"
                          ? String(Number(child.props.value) + 1)
                          : child.props.value;

                      return React.cloneElement(child, {
                        className: cn(
                          "cursor-pointer px-2 py-1 rounded hover:bg-accent text-sm",
                          child.props.className,
                          itemValue === displayValue && "bg-accent"
                        ),
                        "data-value": itemValue,
                      });
                    }
                    return child;
                  })}
                </div>
              </PopoverContent>
            </Popover>
          );
        },
        IconLeft: ({ className, ...props }) => (
          <ChevronLeft className={cn("size-3", className)} {...props} />
        ),
        IconRight: ({ className, ...props }) => (
          <ChevronRight className={cn("size-3", className)} {...props} />
        ),
      }}
      {...props}
    />
  );
}

export { Calendar };
