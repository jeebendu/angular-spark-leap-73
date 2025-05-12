
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { AppointmentBase } from '../../../core/models/appointment';

// This is a simplified example for the appointment card component in React Native

interface AppointmentCardProps {
  appointment: AppointmentBase;
  doctorName: string;
  specialization: string;
  branchName: string;
  onViewDetails: (appointmentId: number) => void;
  onCancel?: (appointmentId: number) => void;
}

export function AppointmentCard({
  appointment,
  doctorName,
  specialization,
  branchName,
  onViewDetails,
  onCancel
}: AppointmentCardProps) {
  // Format date - in real app would use a library like date-fns
  const formatDate = (date: Date | string) => {
    if (typeof date === 'string') {
      date = new Date(date);
    }
    return date.toLocaleDateString('en-US', { 
      weekday: 'long',
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };
  
  // Get status color based on appointment status
  const getStatusColor = (status: string) => {
    switch(status) {
      case 'UPCOMING':
        return '#10b981'; // green
      case 'COMPLETED':
        return '#6366f1'; // blue
      case 'CANCELLED':
        return '#ef4444'; // red
      case 'IN_PROGRESS':
        return '#f59e0b'; // amber
      default:
        return '#6b7280'; // gray
    }
  };
  
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(appointment.status) }]}>
          <Text style={styles.statusText}>{appointment.status}</Text>
        </View>
        <Text style={styles.dateText}>{formatDate(appointment.appointmentDate)}</Text>
      </View>
      
      <View style={styles.content}>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Doctor:</Text>
          <Text style={styles.value}>{doctorName}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Specialization:</Text>
          <Text style={styles.value}>{specialization}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Clinic:</Text>
          <Text style={styles.value}>{branchName}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Type:</Text>
          <Text style={styles.value}>{appointment.appointmentType || 'Direct Visit'}</Text>
        </View>
      </View>
      
      <View style={styles.buttonContainer}>
        {appointment.status === 'UPCOMING' && onCancel && (
          <TouchableOpacity 
            style={[styles.button, styles.cancelButton]} 
            onPress={() => onCancel(appointment.id)}
          >
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity 
          style={[styles.button, styles.detailsButton]} 
          onPress={() => onViewDetails(appointment.id)}
        >
          <Text style={styles.detailsButtonText}>View Details</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 16,
  },
  statusText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '500',
  },
  dateText: {
    fontSize: 14,
    color: '#666',
  },
  content: {
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  label: {
    fontWeight: '500',
    width: 100,
    color: '#666',
  },
  value: {
    flex: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  button: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginLeft: 8,
  },
  cancelButton: {
    backgroundColor: '#fee2e2',
  },
  cancelButtonText: {
    color: '#ef4444',
    fontWeight: '500',
  },
  detailsButton: {
    backgroundColor: '#0284c7',
  },
  detailsButtonText: {
    color: 'white',
    fontWeight: '500',
  }
});
