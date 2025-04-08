import { Doctor } from "../doctor/Doctor";
import { Branch } from "../shared/Branch";

export interface Slot {
    id: number;
    doctor?: Doctor;
    branch?: Branch;
    startTime?:string;
    endTime?: string; 
    availableSlots: number;
    date?: Date;
    duration?: number;
    slotType?: String;
    status?: string;
  }