
/**
 * Check if the application is running in production mode
 * based on the VITE_PRODUCTION environment variable
 */
export const isProduction = (): boolean => {
  return import.meta.env.VITE_PRODUCTION === 'true';
};
