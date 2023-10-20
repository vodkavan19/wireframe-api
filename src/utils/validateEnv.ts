import { cleanEnv, port, str } from 'envalid';

function validateEnv(): void {
  cleanEnv(process.env, {
    NODE_ENV: str({
      choices: ['development', 'production'],
    }),
    PORT: port({ default: 3000 }),
    MONGO_PASSWORD: str(),
    MONGO_PATH: str(),
    MONGO_USER: str(),
    JWT_ACCESS_SECRET: str(),
    JWT_REFRESH_SECRET: str(),
    JWT_ACCESS_EXPIRES_IN: str(),
    JWT_REFRESH_EXPIRES_IN: str(),
  });
}

export default validateEnv;
