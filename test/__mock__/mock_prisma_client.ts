import { PrismaClient } from "@prisma/client";

type MockPrismaClient = {
  [table: string]: {
    create: jest.Mock,
    findUnique: jest.Mock,
    update: jest.Mock,
    delete: jest.Mock,
    findMany: jest.Mock,
  };
};

const generateMockPrisma = (tables: string[]) => {
  const mockPrisma: MockPrismaClient = {};
  tables.forEach(table => {
    mockPrisma[table] = {
      create: jest.fn().mockResolvedValue(null),
      findUnique: jest.fn().mockResolvedValue(null),
      update: jest.fn().mockResolvedValue(null),
      delete: jest.fn().mockResolvedValue(null),
      findMany: jest.fn().mockResolvedValue([]),
    };
  });
  return mockPrisma as unknown as PrismaClient;
};

const tables = ["task"];

export const mockPrisma = generateMockPrisma(tables);