
import React, { useState } from "react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";

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
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white rounded-lg border">
          <Calendar
            mode="single"
            selected={date}
            onSelect={handleDateSelect}
            className={cn("p-3 pointer-events-auto mx-auto")}
            disabled={(date) => date < new Date(new Date().setHours(0,0,0,0))}
          />
        </div>
        
        <div>
          <div className="bg-white rounded-lg border h-full p-4">
            {date ? (
              <div className="space-y-6">
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-500 mb-3">Morning</h4>
                  <div className="grid grid-cols-3 gap-2">
                    {morningSlots.map((time) => (
                      <Button
                        key={time}
                        variant="outline"
                        className={`text-sm h-10 ${
                          selectedTime === time ? "bg-primary text-white border-primary hover:bg-primary/90 hover:text-white" : ""
                        }`}
                        onClick={() => setSelectedTime(time)}
                      >
                        {time}
                      </Button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-3">Afternoon</h4>
                  <div className="grid grid-cols-3 gap-2">
                    {afternoonSlots.map((time) => (
                      <Button
                        key={time}
                        variant="outline"
                        className={`text-sm h-10 ${
                          selectedTime === time ? "bg-primary text-white border-primary hover:bg-primary/90 hover:text-white" : ""
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
                <p>Please select a date to view available slots</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
