import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export function getAllRemedies() {
  return prisma.remedy.findMany({
    include: {
      illnesses: true
    }
  });
}

export function getRemedyById(id: number) {
  return prisma.remedy.findUnique({
    where: { id },
    include: {
      illnesses: true
    }
  });
}

export function createRemedy(data: any) {
  return prisma.remedy.create({
    data
  });
}

export function updateRemedy(id: number, data: any) {
  return prisma.remedy.update({
    where: { id },
    data
  });
}

export function deleteRemedy(id: number) {
  return prisma.remedy.delete({
    where: { id }
  });
}

export async function suggestRemediesBySymptoms(symptomIds: string[], filters: any = {}) {
  const {
    pregnancySafe = true,
    breastfeedingSafe = true,
    avoidConditions = [],
    avoidMedications = [],
    avoidAllergens = []
  } = filters;

  // 1. Find illnesses matching symptoms
  const illnesses = await prisma.illness.findMany({
    where: {
      symptoms: {
        some: {
          symptomId: { in: symptomIds }
        }
      }
    },
    include: {
      symptoms: true,
      remedies: {
        include: { remedy: true }
      }
    }
  });

  // 2. Score illnesses by symptom match
  const scored = illnesses.map(illness => {
    const matchCount = illness.symptoms.filter(s =>
      symptomIds.includes(s.symptomId)
    ).length;

    return { illness, score: matchCount };
  });

  scored.sort((a, b) => b.score - a.score);

  // 3. Extract remedies
  let remedies = [];

  for (const entry of scored) {
    for (const r of entry.illness.remedies) {
      remedies.push({
        remedy: r.remedy,
        illness: entry.illness.name,
        score: entry.score
      });
    }
  }

  // 4. Apply safety filters
  remedies = remedies.filter(item => {
    const r = item.remedy;

    if (pregnancySafe && !r.safePregnancy) return false;
    if (breastfeedingSafe && !r.safeBreastfeeding) return false;

    if (avoidConditions.some(cond => r.contraindications.includes(cond))) return false;
    if (avoidMedications.some(med => r.interactions.includes(med))) return false;
    if (avoidAllergens.some(all => r.allergens.includes(all))) return false;

    return true;
  });

  // 5. Remove duplicates
  const unique = Object.values(
    remedies.reduce((acc, item) => {
      acc[item.remedy.id] = item;
      return acc;
    }, {})
  );

  return {
    symptomsMatched: symptomIds.length,
    illnessesChecked: illnesses.length,
    remedies: unique
  };
}
    include: {
      symptoms: true,
      remedies: {
        include: { remedy: true }
      }
    }
  });

  // 2. Score illnesses by number of matching symptoms
  const scored = illnesses.map(illness => {
    const matchCount = illness.symptoms.filter(s =>
      symptomIds.includes(s.symptomId)
    ).length;

    return {
      illness,
      score: matchCount
    };
  });

  // 3. Sort illnesses by score (highest first)
  scored.sort((a, b) => b.score - a.score);

  // 4. Extract remedies from top illnesses
  const remedies = [];

  for (const entry of scored) {
    for (const r of entry.illness.remedies) {
      remedies.push({
        remedy: r.remedy,
        illness: entry.illness.name,
        score: entry.score
      });
    }
  }

  // 5. Remove duplicates by remedy ID
  const unique = Object.values(
    remedies.reduce((acc, item) => {
      acc[item.remedy.id] = item;
      return acc;
    }, {})
  );

  return {
    symptomsMatched: symptomIds.length,
    illnessesChecked: illnesses.length,
    remedies: unique
  };
}

type WeightedSymptom = { id: string; weight?: number };

export async function suggestRemediesBySymptoms(symptoms: WeightedSymptom[], filters: any = {}) {
  const {
    pregnancySafe = true,
    breastfeedingSafe = true,
    avoidConditions = [],
    avoidMedications = [],
    avoidAllergens = []
  } = filters;

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
      symptoms: true,
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

  let remedies: any[] = [];

  for (const entry of scored) {
    for (const r of entry.illness.remedies) {
      remedies.push({
        remedy: r.remedy,
        illness: entry.illness.name,
        score: entry.score
      });
    }
  }

  remedies = remedies.filter(item => {
    const r = item.remedy;

    if (pregnancySafe && !r.safePregnancy) return false;
    if (breastfeedingSafe && !r.safeBreastfeeding) return false;
    if (avoidConditions.some(cond => r.contraindications.includes(cond))) return false;
    if (avoidMedications.some(med => r.interactions.includes(med))) return false;
    if (avoidAllergens.some(all => r.allergens.includes(all))) return false;

    return true;
  });

  const unique = Object.values(
    remedies.reduce((acc, item) => {
      acc[item.remedy.id] = item;
      return acc;
    }, {} as Record<string, any>)
  );

  return {
    symptomsProvided: symptoms.length,
    illnessesChecked: illnesses.length,
    remedies: unique
  };
}
