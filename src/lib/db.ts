import { PrismaClient } from '@prisma/client';

let prisma: PrismaClient;

declare const globalThis: {
    prismaClientInstance: PrismaClient;
};

if (process.env.NODE_ENV === 'production') {
    prisma = new PrismaClient();
} else {
    if (!globalThis.prismaClientInstance) {
        globalThis.prismaClientInstance = new PrismaClient();
    }
    prisma = globalThis.prismaClientInstance;
}

export default prisma;
