
import { useEffect, useState } from 'react';
import { DoctorBase, DoctorSearchParams } from '../models/doctor';
import { DoctorServiceInterface } from '../services/DoctorService';

// Platform-agnostic hook to fetch doctor data
export const useDoctor = (doctorService: DoctorServiceInterface) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const searchDoctors = async (params: DoctorSearchParams) => {
    setLoading(true);
    setError(null);
    try {
      const result = await doctorService.searchDoctors(params);
      setLoading(false);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error occurred'));
      setLoading(false);
      return { doctors: [], totalCount: 0 };
    }
  };

  const getDoctorById = async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      const doctor = await doctorService.getDoctorById(id);
      setLoading(false);
      return doctor;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error occurred'));
      setLoading(false);
      throw err;
    }
  };

  const getDoctorAvailability = async (doctorId: number, date: Date) => {
    setLoading(true);
    setError(null);
    try {
      const availability = await doctorService.getDoctorAvailability(doctorId, date);
      setLoading(false);
      return availability;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error occurred'));
      setLoading(false);
      throw err;
    }
  };

  return {
    loading,
    error,
    searchDoctors,
    getDoctorById,
    getDoctorAvailability
  };
};
