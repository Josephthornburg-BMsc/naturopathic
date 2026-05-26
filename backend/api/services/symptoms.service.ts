import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export function getAllSymptoms() {
  return prisma.symptom.findMany({
    include: {
      illnesses: true,
      remedies: {
        include: { remedy: true }
      }
    }
  });
}

export function getSymptomById(id: string) {
  return prisma.symptom.findUnique({
    where: { id },
    include: {
      illnesses: true,
      remedies: {
        include: { remedy: true }
      }
    }
  });
}

export function createSymptom(data: any) {
  return prisma.symptom.create({ data });
}

export function updateSymptom(id: string, data: any) {
  return prisma.symptom.update({
    where: { id },
    data
  });
}

export function deleteSymptom(id: string) {
  return prisma.symptom.delete({
    where: { id }
  });
}

// Reverse lookup: symptoms → remedies

export function getRemediesForSymptom(symptomId: string) {
  return prisma.symptom.findUnique({
    where: { id: symptomId },
    include: {
      remedies: {
        include: { remedy: true }
      }
    }
  });
}
