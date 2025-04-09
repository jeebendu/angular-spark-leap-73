
/**
 * Generates a unique patient ID with the format PT-YYYYMMDD-XXXX
 * where XXXX is a random 4-digit number
 */
export function generatePatientId(): string {
  const today = new Date();
  const year = today.getFullYear();
  
  // Format month and day with leading zeros if needed
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  
  // Generate a random 4-digit number
  const randomDigits = Math.floor(1000 + Math.random() * 9000);
  
  return `PT-${year}${month}${day}-${randomDigits}`;
}

/**
 * Calculate age from date of birth
 */
export function calculateAge(dateOfBirth: string): number {
  const birthDate = new Date(dateOfBirth);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  
  return age;
}
