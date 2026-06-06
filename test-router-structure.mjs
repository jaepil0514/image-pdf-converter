import { appRouter } from './server/routers.ts';

console.log('appRouter structure:');
console.log('_def:', appRouter._def);
console.log('procedures:', Object.keys(appRouter._def.procedures));

const fileConverter = appRouter._def.procedures.fileConverter;
console.log('\nfileConverter:', fileConverter);
console.log('fileConverter._def:', fileConverter._def);
