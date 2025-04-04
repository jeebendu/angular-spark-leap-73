
import React, { useState } from "react";
import { Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Appointments, Slot } from "@/components/BookAppointmentModal";

interface DateTimeSelectionStepProps {
  slotList: Slot[];
  appointmentObj: Appointments;
  handleSlotClick: (slot: Slot) => void;
  onDateSelectHandler: (date: Date) => void;
}



export function DateTimeSelectionStep({
  slotList,
  appointmentObj,
  handleSlotClick,
  onDateSelectHandler
}: DateTimeSelectionStepProps) {

  const [date, setDate] = useState<Date | undefined>(
    appointmentObj?.slot?.date ? new Date(appointmentObj.slot.date) : new Date()
  );
  const handleDateSelect = async (date: Date) => {
    setDate(date);
    onDateSelectHandler(date);
  }

  const handleSlotSelect = (slot: Slot) => {
    // setDate(selectedDate);
    // if (selectedDate) {
    //   setSelectedDate(format(selectedDate, "yyyy-MM-dd"));
    // }
    handleSlotClick(slot);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-4 flex items-center">
          <CalendarIcon className="mr-2 h-5 w-5" />
          Select Date and Time
        </h3>

        <div className="grid grid-cols-1 gap-6">
          <div>
            <Label>Date</Label>
            <div className="mt-1">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 z-50 pointer-events-auto" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={handleDateSelect}
                    initialFocus
                    className="p-3 pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div>
            <Label>Available Time Slots</Label>
            <div className="grid grid-cols-3 gap-2 mt-1">
              {slotList.map((slot) => (
                <Button
                  key={slot?.id}
                  variant={appointmentObj?.slot?.startTime === slot?.startTime ? "default" : "outline"}
                  className={`text-xs h-8 ${
                    slot.availableSlots <= 0
                      ? "bg-red-500 text-white cursor-not-allowed"
                      : appointmentObj?.slot?.startTime === slot?.startTime
                      ? "sky-button"
                      : ""
                  }`}
                  disabled={slot.availableSlots <= 0}
                  onClick={() => handleSlotSelect(slot)}
                >
                  {slot.startTime}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
