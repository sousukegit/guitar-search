// lib/prisma.ts
import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as { prisma?: PrismaClient };

if (!globalForPrisma.prisma) {
    console.log("globalForPrisma.prisma",globalForPrisma.prisma)
    console.log("🔄 Initializing Prisma Client...");
    globalForPrisma.prisma = new PrismaClient();
  } else {
    console.log("✅ Prisma Client already initialized.");
  }

export const prisma =
  globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;