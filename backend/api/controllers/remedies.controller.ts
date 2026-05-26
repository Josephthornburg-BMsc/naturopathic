import { Request, Response } from "express";
import * as service from "../services/remedies.service";

export async function getAllRemedies(req: Request, res: Response) {
  const data = await service.getAllRemedies();
  res.json(data);
}

export async function getRemedyById(req: Request, res: Response) {
  const id = req.params.id;
  const data = await service.getRemedyById(id);
  res.json(data);
}

export async function createRemedy(req: Request, res: Response) {
  const data = await service.createRemedy(req.body);
  res.status(201).json(data);
}

export async function updateRemedy(req: Request, res: Response) {
  const id = req.params.id;
  const data = await service.updateRemedy(id, req.body);
  res.json(data);
}

export async function deleteRemedy(req: Request, res: Response) {
  const id = req.params.id;
  await service.deleteRemedy(id);
  res.status(204).send();
}

// Remedy ↔ Symptom relationship controllers

export async function addSymptomToRemedy(req: Request, res: Response) {
  const remedyId = req.params.remedyId;
  const symptomId = req.params.symptomId;

  const data = await service.addSymptomToRemedy(remedyId, symptomId);
  res.json(data);
}

export async function removeSymptomFromRemedy(req: Request, res: Response) {
  const remedyId = req.params.remedyId;
  const symptomId = req.params.symptomId;

  const data = await service.removeSymptomFromRemedy(remedyId, symptomId);
  res.json(data);
}

export async function getSymptomsForRemedy(req: Request, res: Response) {
  const remedyId = req.params.remedyId;
  const data = await service.getSymptomsForRemedy(remedyId);
  res.json(data);
}

export async function suggestRemediesBySymptoms(req: Request, res: Response) {
  const { symptomIds } = req.body;

  const data = await service.suggestRemediesBySymptoms(symptomIds);
  res.json(data);
}
export async function suggestRemediesBySymptoms(req: Request, res: Response) {
  const { symptomIds, filters } = req.body;

  const data = await service.suggestRemediesBySymptoms(symptomIds, filters);
  res.json(data);
}

export async function suggestRemediesBySymptoms(req: Request, res: Response) {
  const { symptoms, filters } = req.body; // [{ id, weight }]
  const data = await service.suggestRemediesBySymptoms(symptoms, filters);
  res.json(data);
}

