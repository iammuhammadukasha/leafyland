/** Quick runtime env check — run on Hostinger if the app fails to start. */
const required = [
  'NODE_ENV',
  'DATABASE_URL',
  'SUPABASE_URL',
  'SUPABASE_SERVICE_ROLE_KEY',
];

const recommended = ['API_PREFIX', 'APP_VERSION'];

let failed = false;

for (const key of required) {
  if (!process.env[key]) {
    console.error(`check-runtime-env: missing required ${key}`);
    failed = true;
  }
}

for (const key of recommended) {
  if (!process.env[key]) {
    console.warn(`check-runtime-env: missing recommended ${key} (defaults will be used)`);
  }
}

if (process.env.PORT) {
  console.log(`check-runtime-env: PORT=${process.env.PORT}`);
} else {
  console.warn('check-runtime-env: PORT not set — default 4000');
}

if (failed) {
  console.error('check-runtime-env: fix missing vars in hPanel → Environment variables');
  process.exit(1);
}

console.log('check-runtime-env: required variables present');
