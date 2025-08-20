const getEnv = (key: string): string => {
  const envValue = import.meta.env[key] as string;
  if (!envValue) throw new Error(`❌ Missing ENV --> ${key}`);
  return envValue;
};

export const envVars = {
  baseApi: getEnv('VITE_BASE_API'),
};
