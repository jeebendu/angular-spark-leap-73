
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { AppointmentCard } from '../components/AppointmentCard';
import { AppointmentBase } from '../../../core/models/appointment';
import { useAppointment } from '../../../core/hooks/useAppointment';
import { createAppointmentService } from '../factory';

export function AppointmentsScreen({ navigation }) {
  const [appointments, setAppointments] = useState<AppointmentBase[]>([]);
  const [activeTab, setActiveTab] = useState('UPCOMING');
  const [refreshing, setRefreshing] = useState(false);
  
  // Initialize service and hook
  const appointmentService = createAppointmentService();
  const { loading, error, getMyAppointments, cancelAppointment } = useAppointment(appointmentService);
  
  // Load initial data
  useEffect(() => {
    fetchAppointments();
  }, [activeTab]);
  
  const fetchAppointments = async () => {
    const result = await getMyAppointments(activeTab);
    setAppointments(result);
    setRefreshing(false);
  };
  
  const handleRefresh = () => {
    setRefreshing(true);
    fetchAppointments();
  };
  
  const handleViewDetails = (appointmentId: number) => {
    navigation.navigate('AppointmentDetails', { appointmentId });
  };
  
  const handleCancelAppointment = async (appointmentId: number) => {
    try {
      await cancelAppointment(appointmentId);
      // Refresh appointments list
      fetchAppointments();
    } catch (error) {
      console.error('Failed to cancel appointment:', error);
    }
  };
  
  const renderAppointment = ({ item }: { item: AppointmentBase }) => {
    // In a real app, we would fetch related data from a context or store
    // For this example we're using placeholder data
    return (
      <AppointmentCard
        appointment={item}
        doctorName="Dr. Example Doctor" // This would come from a relationship lookup
        specialization="General Medicine" // This would come from a relationship lookup
        branchName="Main Branch" // This would come from a relationship lookup
        onViewDetails={handleViewDetails}
        onCancel={activeTab === 'UPCOMING' ? handleCancelAppointment : undefined}
      />
    );
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === 'UPCOMING' && styles.activeTab
          ]}
          onPress={() => setActiveTab('UPCOMING')}
        >
          <Text style={[
            styles.tabText,
            activeTab === 'UPCOMING' && styles.activeTabText
          ]}>Upcoming</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === 'COMPLETED' && styles.activeTab
          ]}
          onPress={() => setActiveTab('COMPLETED')}
        >
          <Text style={[
            styles.tabText,
            activeTab === 'COMPLETED' && styles.activeTabText
          ]}>Past</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === 'CANCELLED' && styles.activeTab
          ]}
          onPress={() => setActiveTab('CANCELLED')}
        >
          <Text style={[
            styles.tabText,
            activeTab === 'CANCELLED' && styles.activeTabText
          ]}>Cancelled</Text>
        </TouchableOpacity>
      </View>
      
      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Error loading appointments. Please try again.</Text>
        </View>
      )}
      
      <FlatList
        data={appointments}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderAppointment}
        refreshing={refreshing}
        onRefresh={handleRefresh}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={(
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No appointments found</Text>
          </View>
        )}
      />
      
      <TouchableOpacity 
        style={styles.bookButton}
        onPress={() => navigation.navigate('DoctorSearch')}
      >
        <Text style={styles.bookButtonText}>Book an Appointment</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 4,
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 8,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 4,
  },
  activeTab: {
    backgroundColor: '#0284c7',
  },
  tabText: {
    fontWeight: '500',
    color: '#666',
  },
  activeTabText: {
    color: 'white',
  },
  listContainer: {
    padding: 16,
    paddingBottom: 80,
  },
  emptyContainer: {
    padding: 32,
    alignItems: 'center',
  },
  emptyText: {
    color: '#666',
  },
  errorContainer: {
    padding: 16,
    backgroundColor: '#fee2e2',
    margin: 16,
    borderRadius: 8,
  },
  errorText: {
    color: '#ef4444',
    textAlign: 'center',
  },
  bookButton: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
    backgroundColor: '#0284c7',
    borderRadius: 30,
    padding: 16,
    alignItems: 'center',
  },
  bookButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  }
});
