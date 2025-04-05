
import React, { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { Slot } from "@/components/BookAppointmentModal";
import { useTranslation } from "react-i18next";

interface DateTimeSelectionStepProps {
  slotList?: Slot[];
  appointmentObj: any;
  handleSlotClick: (slot: Slot) => void;
  onDateSelectHandler: (date: Date) => void;
}

export function DateTimeSelectionStep({
  slotList,
  appointmentObj,
  handleSlotClick,
  onDateSelectHandler,
}: DateTimeSelectionStepProps) {
  const { t } = useTranslation();
  const [date, setDate] = useState<Date | undefined>(new Date());

  // Function to handle date selection
  const handleDateSelect = (selectedDate: Date | undefined) => {
    if (selectedDate) {
      setDate(selectedDate);
      onDateSelectHandler(selectedDate);
    }
  };

  // Group slots by hour
  const groupSlotsByHour = (slots: Slot[]) => {
    const groupedSlots: { [key: string]: Slot[] } = {};

    slots?.forEach((slot) => {
      if (slot.startTime) {
        const startTime = new Date(slot.startTime).getHours();
        const hourKey = `${startTime}`;

        if (!groupedSlots[hourKey]) {
          groupedSlots[hourKey] = [];
        }

        groupedSlots[hourKey].push(slot);
      }
    });

    return groupedSlots;
  };

  // Get morning, afternoon, and evening slots
  const getTimeSlots = (slots: Slot[]) => {
    if (!slots?.length) return { morningSlots: [], afternoonSlots: [], eveningSlots: [] };

    const groupedSlots = groupSlotsByHour(slots);
    const morningSlots: { [key: string]: Slot[] } = {};
    const afternoonSlots: { [key: string]: Slot[] } = {};
    const eveningSlots: { [key: string]: Slot[] } = {};

    Object.keys(groupedSlots).forEach((hour) => {
      const hourNum = parseInt(hour);
      if (hourNum >= 0 && hourNum < 12) {
        morningSlots[hour] = groupedSlots[hour];
      } else if (hourNum >= 12 && hourNum < 17) {
        afternoonSlots[hour] = groupedSlots[hour];
      } else {
        eveningSlots[hour] = groupedSlots[hour];
      }
    });

    return { morningSlots, afternoonSlots, eveningSlots };
  };

  const formatSlotTime = (slot: Slot) => {
    if (!slot.startTime) return "";
    const startTime = new Date(slot.startTime);
    return format(startTime, "h:mm a");
  };

  const { morningSlots, afternoonSlots, eveningSlots } = getTimeSlots(slotList);

  const renderSlotButtons = (slotsGroup: { [key: string]: Slot[] }) => {
    return Object.values(slotsGroup).map((slots, idx) => (
      <div key={idx} className="grid grid-cols-4 gap-2 mb-2">
        {slots.map((slot) => {
          const isSelected = appointmentObj?.slot?.id === slot.id;
          return (
            <Button
              key={slot.id}
              variant={isSelected ? "default" : "outline"}
              className={isSelected ? "bg-primary text-white" : ""}
              onClick={() => handleSlotClick(slot)}
              disabled={slot.availableSlots <= 0}
            >
              {formatSlotTime(slot)}
            </Button>
          );
        })}
      </div>
    ));
  };

  const hasSlots = (slotsGroup: { [key: string]: Slot[] }) => {
    return Object.keys(slotsGroup).length > 0;
  };

  return (
    <div className="space-y-6 py-2">
      <h3 className="text-lg font-semibold">{t('Select Date & Time')}</h3>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <p className="mb-2 text-sm text-gray-500">{t('Choose a date')}</p>
          <div className="border rounded-md p-2">
            <Calendar
              mode="single"
              selected={date}
              onSelect={handleDateSelect}
              className="pointer-events-auto"
              disabled={(date) => {
                // Disable past dates
                return date < new Date(new Date().setHours(0, 0, 0, 0));
              }}
            />
          </div>
          <p className="mt-2 text-xs text-gray-500">
            {date ? `${t('Selected Date')}: ${format(date, 'PPP')}` : t('Please select a date')}
          </p>
        </div>
        
        <div>
          <p className="mb-2 text-sm text-gray-500">{t('Choose a time slot')}</p>
          <div className="space-y-4">
            {hasSlots(morningSlots) && (
              <div>
                <p className="text-sm font-medium mb-1">{t('Morning')}</p>
                {renderSlotButtons(morningSlots)}
              </div>
            )}
            
            {hasSlots(afternoonSlots) && (
              <div>
                <p className="text-sm font-medium mb-1">{t('Afternoon')}</p>
                {renderSlotButtons(afternoonSlots)}
              </div>
            )}
            
            {hasSlots(eveningSlots) && (
              <div>
                <p className="text-sm font-medium mb-1">{t('Evening')}</p>
                {renderSlotButtons(eveningSlots)}
              </div>
            )}
            
            {!hasSlots(morningSlots) && !hasSlots(afternoonSlots) && !hasSlots(eveningSlots) && (
              <div className="text-center p-4 border rounded-md">
                <p className="text-gray-500">{t('No slots available for the selected date')}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
