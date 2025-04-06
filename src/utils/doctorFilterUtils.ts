
import { fetchAllSpecializations, fetchLanguageList } from "@/services/SpecializationService";

// Common function to fetch specializations
export const fetchSpecializations = async () => {
  try {
    const response = await fetchAllSpecializations();
    return response.data;
  } catch (error) {
    console.error("Failed to fetch specializations:", error);
    return [];
  }
};

// Common function to fetch languages
export const fetchLanguages = async () => {
  try {
    const response = await fetchLanguageList();
    return response.data;
  } catch (error) {
    console.error("Failed to fetch languages:", error);
    return [];
  }
};

// Helper function to parse query text and extract relevant filters
export const parseQueryAndApplyFilters = (
  query: string, 
  specializations: { id: number; name: string }[], 
  languages: { id: number; name: string }[], 
  genders: { key: string; value: string }[],
  experienceRanges: { key: string; value: string }[],
  toggleSpecialty: (specialty: string) => void,
  toggleGender: (gender: string) => void,
  toggleLanguage: (language: string) => void,
  toggleExperience: (experience: string) => void,
) => {
  const lowerCaseQuery = query.toLowerCase();

  // Extract gender dynamically
  genders.forEach((gender) => {
    if (lowerCaseQuery.includes(gender.value.toLowerCase())) {
      toggleGender(gender.key);
    }
  });

  // Extract experience dynamically
  experienceRanges.forEach((range) => {
    if (lowerCaseQuery.includes(range.value.toLowerCase())) {
      toggleExperience(range.key);
    }
  });

  // Extract specialty dynamically
  specializations.forEach((specialty) => {
    if (lowerCaseQuery.includes(specialty.name.toLowerCase())) {
      toggleSpecialty(specialty.name);
    }
  });

  // Extract language dynamically
  languages.forEach((language) => {
    if (lowerCaseQuery.includes(language.name.toLowerCase())) {
      toggleLanguage(language.name);
    }
  });
};
