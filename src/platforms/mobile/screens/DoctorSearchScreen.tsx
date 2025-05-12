
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TextInput, StyleSheet, ActivityIndicator } from 'react-native';
import { DoctorCard } from '../components/DoctorCard';
import { DoctorBase } from '../../../core/models/doctor';
import { useDoctor } from '../../../core/hooks/useDoctor';
import { createDoctorService } from '../factory';

export function DoctorSearchScreen({ navigation }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [doctors, setDoctors] = useState<DoctorBase[]>([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  
  // Initialize service and hook
  const doctorService = createDoctorService();
  const { loading, error, searchDoctors } = useDoctor(doctorService);
  
  // Load initial data
  useEffect(() => {
    fetchDoctors();
  }, []);
  
  const fetchDoctors = async (reset = false) => {
    if (reset) {
      setPage(0);
      setDoctors([]);
    }
    
    const currentPage = reset ? 0 : page;
    const result = await searchDoctors({
      searchTerm,
      page: currentPage,
      limit: 10
    });
    
    if (reset) {
      setDoctors(result.doctors);
    } else {
      setDoctors([...doctors, ...result.doctors]);
    }
    
    setHasMore(result.doctors.length === 10);
    setPage(currentPage + 1);
    setRefreshing(false);
  };
  
  const handleLoadMore = () => {
    if (!loading && hasMore) {
      fetchDoctors();
    }
  };
  
  const handleRefresh = () => {
    setRefreshing(true);
    fetchDoctors(true);
  };
  
  const handleSearch = () => {
    fetchDoctors(true);
  };
  
  const handleBookAppointment = (doctorId: number) => {
    navigation.navigate('BookAppointment', { doctorId });
  };
  
  const handleViewProfile = (doctorId: number) => {
    navigation.navigate('DoctorProfile', { doctorId });
  };
  
  const renderFooter = () => {
    if (!loading) return null;
    return (
      <View style={styles.footerLoader}>
        <ActivityIndicator size="small" color="#0284c7" />
        <Text style={styles.footerText}>Loading more doctors...</Text>
      </View>
    );
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search doctors by name or specialty"
          value={searchTerm}
          onChangeText={setSearchTerm}
          onSubmitEditing={handleSearch}
        />
      </View>
      
      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Error loading doctors. Please try again.</Text>
        </View>
      )}
      
      <FlatList
        data={doctors}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <DoctorCard 
            doctor={item} 
            onBookNow={handleBookAppointment}
            onViewProfile={handleViewProfile}
          />
        )}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.1}
        ListFooterComponent={renderFooter}
        refreshing={refreshing}
        onRefresh={handleRefresh}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  searchContainer: {
    padding: 16,
    backgroundColor: 'white',
  },
  searchInput: {
    backgroundColor: '#f1f5f9',
    borderRadius: 30,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  listContainer: {
    padding: 16,
  },
  footerLoader: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  footerText: {
    marginLeft: 8,
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
  }
});
