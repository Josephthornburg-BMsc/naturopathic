import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export function getAllIllnesses() {
  return prisma.illness.findMany({
    include: { remedies: true, symptoms: true }
  });
}

export function getIllnessById(id: number) {
  return prisma.illness.findUnique({
    where: { id },
    include: { remedies: true, symptoms: true }
  });
}

export function createIllness(data: any) {
  return prisma.illness.create({ data });
}

export function updateIllness(id: number, data: any) {
  return prisma.illness.update({
    where: { id },
    data
  });
}

export function deleteIllness(id: number) {
  return prisma.illness.delete({
    where: { id }
  });
}

export async function searchIllnessesBySymptoms(symptomIds: string[]) {
  return prisma.illness.findMany({
    where: {
      symptoms: {
        every: {
          symptomId: { in: symptomIds }
        }
      }
    },
    include: {
      symptoms: { include: { symptom: true } },
      remedies: { include: { remedy: true } }
    }
  });
}

export async function searchIllnessesBySymptomsAny(symptomIds: string[]) {
  return prisma.illness.findMany({
    where: {
      symptoms: {
        some: {
          symptomId: { in: symptomIds }
        }
      }
    },
    include: {
      symptoms: { include: { symptom: true } },
      remedies: { include: { remedy: true } }
    }
  });
}

type WeightedSymptom = { id: string; weight: number };

export async function searchIllnessesBySymptoms(symptoms: WeightedSymptom[]) {
  const symptomIds = symptoms.map(s => s.id);

  const illnesses = await prisma.illness.findMany({
    where: {
      symptoms: {
        some: {
          symptomId: { in: symptom

type WeightedSymptom = { id: string; weight?: number };

export async function searchIllnessesBySymptoms(symptoms: WeightedSymptom[]) {
  const symptomIds = symptoms.map(s => s.id);
  const weightMap = symptoms.reduce((acc, s) => {
    acc[s.id] = s.weight ?? 1;
    return acc;
  }, {} as Record<string, number>);

  const illnesses = await prisma.illness.findMany({
    where: {
      symptoms: {
        some: {
          symptomId: { in: symptomIds }
        }
      }
    },
    include: {
      symptoms: { include: { symptom: true } },
      remedies: { include: { remedy: true } }
    }
  });

  const scored = illnesses.map(illness => {
    let score = 0;

    for (const s of illness.symptoms) {
      if (weightMap[s.symptomId]) {
        score += weightMap[s.symptomId];
      }
    }

    return { illness, score };
  });

  scored.sort((a, b) => b.score - a.score);

  return scored.map(entry => ({
    score: entry.score,
    illness: entry.illness
  }));
}

