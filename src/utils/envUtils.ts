
/**
 * Check if the application is running in production mode
 * based on the VITE_PRODUCTION environment variable
 */
export const isProduction = (): boolean => {
  return import.meta.env.VITE_PRODUCTION === 'true';
};

/**
 * Get environment variable from import.meta.env
 * @param key The name of the environment variable
 * @returns The value of the environment variable or empty string if not found
 */
export const getEnvVariable = (key: string): string => {
  const fullKey = key.startsWith('VITE_') ? key : `VITE_${key}`;
  return (import.meta.env[fullKey] as string) || '';
};

/**
 * Force reload environment variables
 * This helps when environment changes are not reflecting
 */
export const reloadEnv = (): void => {
  console.log('Reloading environment variables...');
  console.log('BASE_URL:', getEnvVariable('BASE_URL'));
  console.log('X_APP_TOKEN:', getEnvVariable('X_APP_TOKEN'));
  console.log('PRODUCTION:', getEnvVariable('PRODUCTION'));
};
