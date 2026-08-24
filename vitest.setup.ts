import '@testing-library/jest-dom/vitest';

// env.client.ts validates at import time; tests do not run through Next's env
// loading, so provide the values here.
process.env.NEXT_PUBLIC_API_URL ??= 'http://localhost:4000/api';
process.env.NEXT_PUBLIC_APP_URL ??= 'http://localhost:3000';
