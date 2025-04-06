import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Clock, Plus, Trash2 } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { cn } from "@/lib/utils";
import { DayAvailability, TimeSlot } from "@/models/appointment/Availability";
import { useToast } from "@/hooks/use-toast";
import { DoctorLayout } from "@/components/doctor/DoctorLayout";

const DAYS_OF_WEEK = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

export function DoctorSchedulePage() {
  const { toast } = useToast();
  const [selectedTab, setSelectedTab] = useState("general");
  const [selectedDay, setSelectedDay] = useState("Monday");
  const [availabilityData, setAvailabilityData] = useState<Record<string, DayAvailability[]>>({
    general: DAYS_OF_WEEK.map(day => ({
      day,
      isAvailable: day === "Monday",
      slots: day === "Monday" ? [
        { id: "1", day: "Monday", startTime: "09:00 AM", capacity: 2 },
        { id: "2", day: "Monday", startTime: "09:30 AM", capacity: 2 },
        { id: "3", day: "Monday", startTime: "10:30 AM", capacity: 2 },
        { id: "4", day: "Monday", startTime: "11:00 AM", capacity: 2 },
      ] : []
    })),
    clinic: []
  });
  const [appointmentFees, setAppointmentFees] = useState("254");

  const findDayAvailability = (day: string) => {
    return availabilityData[selectedTab]?.find(d => d.day === day) || {
      day,
      isAvailable: false,
      slots: []
    };
  };

  const currentDayData = findDayAvailability(selectedDay);
  
  const handleDayToggle = (day: string) => {
    setSelectedDay(day);
    
    // If this day wasn't available before, make it available
    const dayData = findDayAvailability(day);
    if (!dayData.isAvailable) {
      updateAvailability(day, { isAvailable: true });
    }
  };

  const updateAvailability = (day: string, update: Partial<DayAvailability>) => {
    setAvailabilityData(prev => {
      const newData = { ...prev };
      const currentTabData = [...(prev[selectedTab] || [])];
      
      const dayIndex = currentTabData.findIndex(d => d.day === day);
      if (dayIndex >= 0) {
        currentTabData[dayIndex] = { ...currentTabData[dayIndex], ...update };
      } else {
        currentTabData.push({
          day,
          isAvailable: false,
          slots: [],
          ...update
        });
      }
      
      newData[selectedTab] = currentTabData;
      return newData;
    });
  };

  const addTimeSlot = () => {
    const newSlot: TimeSlot = {
      id: Date.now().toString(),
      day: selectedDay,
      startTime: "09:00 AM",
      capacity: 2
    };
    
    updateAvailability(selectedDay, {
      slots: [...currentDayData.slots, newSlot]
    });
  };

  const updateSlot = (slotId: string, updates: Partial<TimeSlot>) => {
    updateAvailability(selectedDay, {
      slots: currentDayData.slots.map(slot => 
        slot.id === slotId ? { ...slot, ...updates } : slot
      )
    });
  };

  const deleteSlot = (slotId: string) => {
    updateAvailability(selectedDay, {
      slots: currentDayData.slots.filter(slot => slot.id !== slotId)
    });
  };

  const deleteAllSlots = () => {
    updateAvailability(selectedDay, { slots: [] });
  };

  const handleSave = () => {
    // In a real app, this would save to the backend
    toast({
      title: "Schedule updated",
      description: "Your availability has been successfully updated.",
    });
  };

  return (
    <DoctorLayout>
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-1">Available Timings</h1>
          <p className="text-gray-600">Manage your availability and schedule</p>
        </div>

        <Tabs defaultValue="general" onValueChange={setSelectedTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="general" className="px-6">General Availability</TabsTrigger>
            <TabsTrigger value="clinic" className="px-6">Clinic Availability</TabsTrigger>
          </TabsList>

          <TabsContent value="general">
            <Card className="border rounded-lg">
              <CardContent className="pt-6">
                <div>
                  <h2 className="text-xl font-semibold mb-6">Select Available Slots</h2>
                  
                  <div className="mb-8">
                    <h3 className="text-base font-medium mb-3">Select Available days</h3>
                    <ToggleGroup type="single" value={selectedDay} onValueChange={handleDayToggle} className="flex flex-wrap gap-2">
                      {DAYS_OF_WEEK.map(day => {
                        const dayData = findDayAvailability(day);
                        return (
                          <ToggleGroupItem 
                            key={day} 
                            value={day}
                            className={cn(
                              "rounded-lg px-6 py-3", 
                              dayData.isAvailable && dayData !== currentDayData && "border-primary text-primary"
                            )}
                          >
                            {day}
                          </ToggleGroupItem>
                        );
                      })}
                    </ToggleGroup>
                  </div>

                  {currentDayData?.isAvailable && (
                    <div className="border rounded-lg p-4 mb-6">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-semibold">{selectedDay}</h3>
                        <div className="flex gap-2">
                          <Button 
                            variant="outline" 
                            className="text-primary" 
                            onClick={addTimeSlot}
                          >
                            <Plus className="mr-1 h-4 w-4" />
                            Add Slots
                          </Button>
                          {currentDayData.slots.length > 0 && (
                            <Button 
                              variant="outline" 
                              className="text-red-500" 
                              onClick={deleteAllSlots}
                            >
                              <Trash2 className="mr-1 h-4 w-4" />
                              Delete All
                            </Button>
                          )}
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-3">
                        {currentDayData.slots.map((slot) => (
                          <div key={slot.id} className="flex items-center gap-2 bg-gray-100 rounded-lg p-2">
                            <Clock className="h-4 w-4 text-gray-500" />
                            <span>{slot.startTime}</span>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="h-6 w-6 p-0 text-gray-500 hover:text-red-500"
                              onClick={() => deleteSlot(slot.id)}
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </Button>
                          </div>
                        ))}

                        {currentDayData.slots.length === 0 && (
                          <p className="text-gray-500">No time slots added for {selectedDay}</p>
                        )}
                      </div>
                    </div>
                  )}

                  <div className="mb-6">
                    <Label htmlFor="appointmentFees" className="text-base font-medium mb-2 block">
                      Appointment Fees ($)
                    </Label>
                    <Input 
                      id="appointmentFees" 
                      type="number" 
                      className="max-w-xs" 
                      value={appointmentFees}
                      onChange={e => setAppointmentFees(e.target.value)}
                    />
                  </div>

                  <div className="flex justify-end gap-3 mt-8">
                    <Button variant="outline">Cancel</Button>
                    <Button onClick={handleSave}>Save Changes</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="clinic">
            <Card className="border rounded-lg p-6 text-center">
              <h3 className="text-lg font-medium mb-3">Clinic-specific Availability</h3>
              <p className="text-gray-600 mb-3">
                Set different availability schedules for each of your clinics or hospitals
              </p>
              <Button className="mx-auto" onClick={() => setSelectedTab("general")}>
                First set up your general availability
              </Button>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DoctorLayout>
  );
}
