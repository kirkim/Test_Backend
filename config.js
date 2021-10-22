import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

function required(key, defaultValue = undefined) {
  const value = process.env[key] || defaultValue;
  if (value == null) {
    throw new Error(`${key} is undefined`);
  }
  return value;
}

const config = {
  host: {
    port: parseInt(required('HOST_PORT', 8080)),
  },
  static: {
    url: required('BASE_URL', path.resolve() + '/static'),
  },
  cookie: {
    secret: required('COOKIE_SECRET'),
  },
  bcrypt: {
    saltRounds: parseInt(required('BCRYPT_SALT_ROUNDS', 10)),
  },
};

export default config;
