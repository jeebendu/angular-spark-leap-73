
import React, { useState } from "react";
import { Calendar as CalendarIcon, Clock } from "lucide-react";
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

interface DateTimeSelectionStepProps {
  selectedDate: string;
  setSelectedDate: (date: string) => void;
  selectedTime: string;
  setSelectedTime: (time: string) => void;
  availableTimes: string[];
}

export function DateTimeSelectionStep({ 
  selectedDate, 
  setSelectedDate, 
  selectedTime, 
  setSelectedTime, 
  availableTimes 
}: DateTimeSelectionStepProps) {
  const [date, setDate] = useState<Date | undefined>(
    selectedDate ? new Date(selectedDate) : undefined
  );

  const handleDateSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
    if (selectedDate) {
      setSelectedDate(format(selectedDate, "yyyy-MM-dd"));
    }
  };

  // Group time slots for better display
  const morningSlots = availableTimes.filter(time => time.includes('AM'));
  const afternoonSlots = availableTimes.filter(time => time.includes('PM'));

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-4 flex items-center">
          <CalendarIcon className="mr-2 h-5 w-5" />
          Select Date and Time
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-2 rounded-lg border">
            <Label className="ml-2">Select Date</Label>
            <Calendar
              mode="single"
              selected={date}
              onSelect={handleDateSelect}
              className="mx-auto"
            />
          </div>
          
          <div>
            <div className="bg-white p-4 rounded-lg border h-full">
              <Label className="flex items-center mb-4">
                <Clock className="mr-2 h-4 w-4" />
                Available Time Slots
              </Label>
              
              {date ? (
                <div className="space-y-6">
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-2">Morning</h4>
                    <div className="grid grid-cols-3 gap-2">
                      {morningSlots.map((time) => (
                        <Button
                          key={time}
                          variant={selectedTime === time ? "default" : "outline"}
                          className={`text-xs h-9 ${
                            selectedTime === time ? "sky-button" : ""
                          }`}
                          onClick={() => setSelectedTime(time)}
                        >
                          {time}
                        </Button>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-2">Afternoon</h4>
                    <div className="grid grid-cols-3 gap-2">
                      {afternoonSlots.map((time) => (
                        <Button
                          key={time}
                          variant={selectedTime === time ? "default" : "outline"}
                          className={`text-xs h-9 ${
                            selectedTime === time ? "sky-button" : ""
                          }`}
                          onClick={() => setSelectedTime(time)}
                        >
                          {time}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="h-full flex items-center justify-center text-gray-400">
                  <p>Please select a date first</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
