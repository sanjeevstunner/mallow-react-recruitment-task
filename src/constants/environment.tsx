import { validateEnvVar } from "../utils/helpers/get-env-var";

const env = import.meta.env;

export const ENV = {
  API_BASE_URL: validateEnvVar(env.VITE_API_BASE_URL as string),
  API_KEY: validateEnvVar(env.VITE_API_KEY as string),
};
