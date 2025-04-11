
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Clinic } from "@/models/clinic/Clinic";
import { Doctor } from "@/models/doctor/Doctor";
import { CalendarDays, CheckCircle2, Clock, MapPin } from "lucide-react";
import { BookAppointmentModal } from "../../appointments/BookAppointmentModal";
import { format } from "date-fns";
import { Branch } from "@/models/shared/Branch";
import { Slot } from "@/models/appointment/Slot";
import { Appointment } from "@/models/appointment/Appointment";
import { getDoctorClinicDRAndBranchId } from "@/services/DoctorClinicService";
import { slotByDrAndBranchId } from "@/services/appointmentService";
import { fetchMyProfilePatient, fetchFamilyMemeberList } from "@/services/PatientService";
import { LoginDialog } from "../../shared/navbar/LoginDialog";
import { verifyLoginApi } from "@/services/authService";

interface ClinicsTabProps {
  doctor: Doctor;
  branchList: Branch[]
}

export const ClinicsTab = ({ doctor, branchList }: ClinicsTabProps) => {
  const [selectedClinic, setSelectedClinic] = useState(0);
  const [date, setDate] = useState<Date>(new Date());
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLogin, setIsLogin] = useState<any>();

  const [slotList, setSlotList] = useState<Slot[]>([]);
  const [appointment, setAppointment] = useState<Appointment>({
    id: null,
    appointmentDate: null,
    status: null,
    branch: null,
    patient: null,
    doctor: null,
    slot: null,
    familyMember: null,
    doctorClinic: null
  });

  useEffect(() => {
    if (doctor?.branchList?.length > 0) {
      setAppointment((prev) => ({ ...prev, doctor: doctor }));
      setAppointment((prev) => ({ ...prev, branch: doctor.branchList[0] }));
      fetchDoctorClinicObj(doctor.branchList[0]);
    }
    // fetchPatientDetails();
    findSlotFirstTimeWithDefault(new Date(), doctor.branchList[0]);
  }, [])

    const verifyLoginAndBook = async () => {
      try {
        const isLoggedIn = await verifyLoginApi();
        if (isLoggedIn.data) {
          setIsModalOpen(true);
        }
        else {
          setIsModalOpen(false);
          setIsLogin(Math.random()); // Simulate login status
        }
      } catch (error) {
        setIsLogin(Math.random());
        setIsModalOpen(false);
      }
    }


  const findSlotFirstTimeWithDefault = async (date: Date, branch: Branch) => {
    await fetchSlotData(branch, date);
  }

  const onDateSelectHandler = async (date: Date) => {
    await fetchSlotData(appointment.branch, date);
  }

  const fetchSlotData = async (currectSelectBranch: Branch, date: Date) => {
    const filterData = {
      doctor: doctor,
      branch: currectSelectBranch,
      date: date
    }
    const response = await slotByDrAndBranchId(filterData);
    setSlotList(response.data);
  }

  const fetchDoctorClinicObj = async (branch: Branch) => {
    try {
      const response = await getDoctorClinicDRAndBranchId(doctor.id, branch?.id);
      setAppointment((prev) => ({ ...prev, doctorClinic: response.data }));
    } catch (error) {
      console.log("Something went wrong");
    }
  }

  // Helper function to convert 12-hour time to 24-hour format
  const convertTo24HourFormat = (time: string): number => {
    const [hours, minutes] = time.split(":").map(Number);
    return hours * 100 + minutes; // Return as HHMM for easier comparison
  };

  // Function to categorize slots
  const categorizeSlots = (slotList: Slot[]) => {
    const morningSlots = slotList.filter((slot) => {
      const time24 = convertTo24HourFormat(slot.startTime);
      return time24 >= 0 && time24 < 1200; // 00:00 to 11:59
    });

    const afternoonSlots = slotList.filter((slot) => {
      const time24 = convertTo24HourFormat(slot.startTime);
      return time24 >= 1200 && time24 < 1700; // 12:00 to 16:59
    });

    const eveningSlots = slotList.filter((slot) => {
      const time24 = convertTo24HourFormat(slot.startTime);
      return time24 >= 1700 && time24 <= 2359; // 17:00 to 23:59
    });

    return { morningSlots, afternoonSlots, eveningSlots };
  };

  const { morningSlots, afternoonSlots, eveningSlots } = categorizeSlots(slotList);


  const handleTimeSlotSelection = async(slot: Slot) => {
    setAppointment((prev) => ({ ...prev, slot: slot }));
  await  verifyLoginAndBook();
  };

  const onClinicSelectHandler = (index: number) => {
    setSelectedClinic(index);
    const selectedBranch = doctor.branchList[index];
    setAppointment((prev) => ({ ...prev, branch: selectedBranch }));
    findSlotFirstTimeWithDefault(date, selectedBranch);

  }

  const dateSelectHandler = async (currentDate: Date) => {
    if (currentDate && currentDate != undefined) {
      setDate(currentDate);
      await onDateSelectHandler(currentDate);
    }
  }

  return (
    <div className="p-6">
      <h3 className="text-lg font-medium mb-4">Available Clinics</h3>

      <div className="grid md:grid-cols-2 gap-4">
        {branchList?.length > 0 ? (
          branchList.map((branch, index) => (
            <Card
              key={index}
              className={`cursor-pointer border-2 ${selectedClinic === index ? "border-primary" : "border-gray-100"
                }`}
              onClick={() => onClinicSelectHandler(index)}
            >
              <CardContent className="p-4">
                <div className="flex justify-between">
                  <div>
                    <h4 className="font-medium text-base">{branch.name}</h4>
                    <p className="text-sm text-gray-500 flex items-start mt-1">
                      <MapPin className="h-4 w-4 mr-1 shrink-0 mt-0.5" />
                      {branch.location + ", " + branch.city + ", " + branch.state?.name + ", " + branch.country?.name}
                    </p>
                    <div className="flex items-center mt-2 text-sm text-gray-500">
                      <CalendarDays className="h-4 w-4 mr-1" />
                      <span>branch.days</span>
                    </div>
                    <div className="flex items-center mt-1 text-sm text-gray-500">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>branch.timings</span>
                    </div>
                  </div>
                  {selectedClinic === index && (
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                  )}
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <p className="text-gray-500">No clinics available.</p>
        )}
      </div>

      <div className="mt-8">
        <h3 className="text-lg font-medium mb-4">Select Appointment Date & Time</h3>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="md:w-1/3 items-center justify-center flex">
            <Calendar
              mode="single"
              selected={date}
              onSelect={dateSelectHandler}
              className="rounded-md border bg-white w-full max-w-full shadow-sm"
              disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
            />
          </div>

          <div className="w-full md:w-2/3">
            <div className="bg-white rounded-lg border h-full p-4">
              {slotList.length > 0 ? (
                <div className="space-y-3">
                  <h4 className="text-md font-medium mb-1">
                    Available Slots for {format(date, "EEEE, MMMM d")}
                  </h4>

                  {morningSlots.length > 0 && (
                    <div className="mb-2">
                      <h5 className="text-sm font-medium text-gray-500 mb-2">Morning</h5>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                        {morningSlots.map((slot) => (
                          <Button
                            key={slot.startTime}
                            variant="outline"
                            className={`text-sm h-10 ${appointment?.slot?.startTime == slot.startTime ? "bg-primary text-white border-primary hover:bg-primary/90 hover:text-white" : ""
                              }`}
                            onClick={() => handleTimeSlotSelection(slot)}
                          >
                            {slot?.startTime ? format(new Date(`1970-01-01T${slot.startTime}`), "hh:mm a") : "Time not available"}
                          </Button>
                        ))}
                      </div>
                    </div>
                  )}

                  {afternoonSlots.length > 0 && (
                    <div className="mb-2">
                      <h5 className="text-sm font-medium text-gray-500 mb-2">Afternoon</h5>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                        {afternoonSlots.map((slot) => (
                          <Button
                            key={slot.startTime}
                            variant="outline"
                            className={`text-sm h-10 ${appointment?.slot?.startTime == slot.startTime ? "bg-primary text-white border-primary hover:bg-primary/90 hover:text-white" : ""
                              }`}
                            onClick={() => handleTimeSlotSelection(slot)}
                          >  {slot?.startTime ? format(new Date(`1970-01-01T${slot.startTime}`), "hh:mm a") : "Time not available"}
                          </Button>
                        ))}
                      </div>
                    </div>
                  )}

                  {eveningSlots.length > 0 && (
                    <div>
                      <h5 className="text-sm font-medium text-gray-500 mb-2">Evening</h5>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                        {eveningSlots.map((slot) => (
                          <Button
                            key={slot.startTime}
                            variant="outline"
                            className={`text-sm h-10 ${appointment?.slot?.startTime == slot.startTime ? "bg-primary text-white border-primary hover:bg-primary/90 hover:text-white" : ""
                              }`}
                            onClick={() => handleTimeSlotSelection(slot)}
                          >
                            {slot?.startTime ? format(new Date(`1970-01-01T${slot.startTime}`), "hh:mm a") : "Time not available"}
                          </Button>
                        ))}
                      </div>
                    </div>
                  )}
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

      {/* BookAppointmentModal with controlled open state and initial step set to 3 */}
      {branchList?.length > 0 && (
        <BookAppointmentModal
          doctor={doctor}
          doctorName={doctor.firstname + " " + doctor.lastname}
          specialty={doctor.desgination}
          initialClinicId={branchList[selectedClinic]?.id.toString()}
          initialStep={3}
          open={isModalOpen}
          onOpenChange={setIsModalOpen}
          trigger={<div className="hidden" />}
          appointmentObj={appointment}
        />
      )}

      {(
        <span style={{ display: "none", position: "absolute" }}>
          <LoginDialog isLogin={isLogin} />
        </span>
      )}
    </div>
  );
};
