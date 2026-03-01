"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { ChevronDownIcon } from "lucide-react";

interface DatePickerTimeProps {
  date?: Date;
  time?: string;
  onDateChange?: (date: Date | undefined) => void;
  onTimeChange?: (time: string) => void;
}

export function DatePickerTime({
  date: externalDate,
  time: externalTime,
  onDateChange,
  onTimeChange,
}: DatePickerTimeProps) {
  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState<Date | undefined>(externalDate);
  const [time, setTime] = React.useState<string>(externalTime || "10:30:00");

  // Update internal state when external props change
  React.useEffect(() => {
    if (externalDate !== undefined) {
      setDate(externalDate);
    }
  }, [externalDate]);

  React.useEffect(() => {
    if (externalTime !== undefined) {
      setTime(externalTime);
    }
  }, [externalTime]);

  const handleDateSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
    setOpen(false);
    onDateChange?.(selectedDate);
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = e.target.value;
    setTime(newTime);
    onTimeChange?.(newTime);
  };

  return (
    <FieldGroup className="mx-auto max-w-xs flex-row">
      <Field>
        <FieldLabel htmlFor="date-picker-optional">Date</FieldLabel>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              id="date-picker-optional"
              className="w-32 justify-between font-normal"
            >
              {date ? format(date, "PPP") : "Select date"}
              <ChevronDownIcon />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto overflow-hidden p-0" align="start">
            <Calendar
              mode="single"
              selected={date}
              captionLayout="dropdown"
              defaultMonth={date}
              onSelect={handleDateSelect}
            />
          </PopoverContent>
        </Popover>
      </Field>
      <Field className="w-32">
        <FieldLabel htmlFor="time-picker-optional">Time</FieldLabel>
        <Input
          type="time"
          id="time-picker-optional"
          step="1"
          value={time}
          onChange={handleTimeChange}
          className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
        />
      </Field>
    </FieldGroup>
  );
}
