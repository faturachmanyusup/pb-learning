import { PrismaClient } from '@prisma/client';

let pg;

if (process.env.NODE_ENV === 'production') {
  pg = new PrismaClient();
} else {
  if (!global.pg) {
    global.pg = new PrismaClient();
  }
  pg = global.pg;
}

export default pg;