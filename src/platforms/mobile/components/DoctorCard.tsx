
import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { DoctorBase } from '../../../core/models/doctor';

// Icons would be imported from a React Native icons library like react-native-vector-icons
// This is a simplified example

interface DoctorCardProps {
  doctor: DoctorBase;
  onBookNow: (doctorId: number) => void;
  onViewProfile: (doctorId: number) => void;
}

export function DoctorCard({ doctor, onBookNow, onViewProfile }: DoctorCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.container}>
        <Image
          source={{ uri: doctor.imageUrl || 'https://via.placeholder.com/150' }}
          style={styles.image}
        />
        <View style={styles.content}>
          <Text style={styles.name}>{doctor.firstname} {doctor.lastname}</Text>
          <Text style={styles.specialty}>{doctor.specialization}</Text>
          
          <View style={styles.ratingContainer}>
            {/* Star icon would go here */}
            <Text style={styles.rating}>{doctor.rating || 0}</Text>
            <Text style={styles.reviewCount}>({doctor.reviewCount || 0})</Text>
          </View>
          
          {doctor.expYear && (
            <View style={styles.badgeContainer}>
              <Text style={styles.badge}>{doctor.expYear} Years</Text>
            </View>
          )}
        </View>
      </View>
      
      <View style={styles.footer}>
        <Text style={styles.price}>₹{doctor.price || 500}</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={[styles.button, styles.outlineButton]} 
            onPress={() => onViewProfile(doctor.id)}
          >
            <Text style={styles.outlineButtonText}>Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.button, styles.primaryButton]}
            onPress={() => onBookNow(doctor.id)}
          >
            <Text style={styles.primaryButtonText}>Book</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
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
  container: {
    flexDirection: 'row',
    padding: 12,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  content: {
    marginLeft: 12,
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  specialty: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  rating: {
    marginLeft: 4,
    fontWeight: '500',
  },
  reviewCount: {
    marginLeft: 4,
    color: '#666',
    fontSize: 12,
  },
  badgeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  badge: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    fontSize: 12,
    marginRight: 4,
    marginBottom: 4,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingBottom: 12,
    marginTop: 8,
  },
  price: {
    fontWeight: '600',
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  button: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginLeft: 8,
  },
  outlineButton: {
    borderWidth: 1,
    borderColor: '#0284c7',
  },
  primaryButton: {
    backgroundColor: '#0284c7',
  },
  outlineButtonText: {
    color: '#0284c7',
    fontWeight: '500',
  },
  primaryButtonText: {
    color: 'white',
    fontWeight: '500',
  },
});
