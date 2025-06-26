export function validateEnvVar(key:  string): string {
  if (!key) throw new Error(`Missing environment variable: ${key}`);
  return key as string;
}
