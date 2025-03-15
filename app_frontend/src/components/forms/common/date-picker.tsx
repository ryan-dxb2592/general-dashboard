"use client";

import * as React from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import {
  useFormContext,
  Controller,
  type ControllerProps,
  type FieldPath,
  type FieldValues,
} from "react-hook-form";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export interface DatePickerProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> extends Omit<ControllerProps<TFieldValues, TName>, "render"> {
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

export function DatePicker<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  name,
  control,
  defaultValue,
  placeholder = "Pick a date",
  className,
  disabled = false,
  ...props
}: DatePickerProps<TFieldValues, TName>) {
  const form = useFormContext<TFieldValues>();
  const controlToUse = control || form.control;

  return (
    <Controller
      name={name}
      control={controlToUse}
      defaultValue={defaultValue}
      {...props}
      render={({ field }) => (
        <DatePickerInput
          name={name}
          value={field.value}
          onChange={field.onChange}
          placeholder={placeholder}
          className={className}
          disabled={disabled}
        />
      )}
    />
  );
}

interface DatePickerInputProps {
  name: string;
  value: Date | undefined;
  onChange: (date: Date | undefined) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

const DatePickerInput: React.FC<DatePickerInputProps> = ({
  name,
  value,
  onChange,
  placeholder = "Pick a date",
  className,
  disabled = false,
}: DatePickerInputProps) => {
  const [open, setOpen] = React.useState(false);
  const [monthOpen, setMonthOpen] = React.useState(false);
  const [yearOpen, setYearOpen] = React.useState(false);
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(
    value
  );
  const [calendarDate, setCalendarDate] = React.useState<Date>(
    value || new Date()
  );

  // Update the selected date when the value changes
  React.useEffect(() => {
    setSelectedDate(value);
  }, [value]);

  // Generate months
  const months = React.useMemo(
    () => [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    []
  );

  // Handle month change
  const handleMonthChange = (monthIndex: number) => {
    const newDate = new Date(calendarDate);
    newDate.setMonth(monthIndex);
    setCalendarDate(newDate);
    setMonthOpen(false);
  };

  // Handle year change
  const handleYearChange = (year: number) => {
    const newDate = new Date(calendarDate);
    newDate.setFullYear(year);
    setCalendarDate(newDate);
    setYearOpen(false);
  };

  // Handle date selection
  const handleSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    onChange(date);
    setOpen(false);
  };

  // Generate a limited range of years for better performance
  const currentYear = new Date().getFullYear();
  const startYear = currentYear - 100;
  const endYear = currentYear;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          id={name}
          variant="outline"
          className={cn(
            "w-full justify-start text-left font-normal",
            !selectedDate && "text-muted-foreground",
            className
          )}
          disabled={disabled}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {selectedDate ? format(selectedDate, "PPP") : placeholder}
        </Button>
      </PopoverTrigger>
      <PopoverContent id={name} className="w-auto p-0" align="start">
        <div className="flex items-center justify-between p-3 border-b">
          {/* Month Dropdown */}
          <div className="relative">
            <Popover open={monthOpen} onOpenChange={setMonthOpen}>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-[130px] justify-between">
                  {months[calendarDate.getMonth()]}
                  <span className="ml-2 opacity-50">▼</span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[130px] p-0 max-h-[200px] overflow-auto">
                <div className="grid">
                  {months.map((month, index) => (
                    <Button
                      key={month}
                      variant="ghost"
                      className={cn(
                        "justify-start font-normal",
                        calendarDate.getMonth() === index &&
                          "bg-accent text-accent-foreground"
                      )}
                      onClick={() => handleMonthChange(index)}
                    >
                      {month}
                    </Button>
                  ))}
                </div>
              </PopoverContent>
            </Popover>
          </div>

          {/* Year Dropdown */}
          <div className="relative ml-2">
            <Popover open={yearOpen} onOpenChange={setYearOpen}>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-[100px] justify-between">
                  {calendarDate.getFullYear()}
                  <span className="ml-2 opacity-50">▼</span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[100px] p-0 max-h-[200px] overflow-auto">
                <div className="grid">
                  {Array.from(
                    { length: endYear - startYear + 1 },
                    (_, i) => endYear - i
                  ).map((year) => (
                    <Button
                      key={year}
                      variant="ghost"
                      className={cn(
                        "justify-start font-normal",
                        calendarDate.getFullYear() === year &&
                          "bg-accent text-accent-foreground"
                      )}
                      onClick={() => handleYearChange(year)}
                    >
                      {year}
                    </Button>
                  ))}
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={handleSelect}
          month={calendarDate}
          onMonthChange={setCalendarDate}
          toDate={new Date()}
          className="flex items-center justify-center "
        />
      </PopoverContent>
    </Popover>
  );
};

export default DatePickerInput;
