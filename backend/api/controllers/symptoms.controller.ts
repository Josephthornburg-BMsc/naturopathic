import { Request, Response } from "express";
import * as service from "../services/symptoms.service";

export async function getAllSymptoms(req: Request, res: Response) {
  const data = await service.getAllSymptoms();
  res.json(data);
}

export async function getSymptomById(req: Request, res: Response) {
  const id = req.params.id;
  const data = await service.getSymptomById(id);
  res.json(data);
}

export async function createSymptom(req: Request, res: Response) {
  const data = await service.createSymptom(req.body);
  res.status(201).json(data);
}

export async function updateSymptom(req: Request, res: Response) {
  const id = req.params.id;
  const data = await service.updateSymptom(id, req.body);
  res.json(data);
}

export async function deleteSymptom(req: Request, res: Response) {
  const id = req.params.id;
  await service.deleteSymptom(id);
  res.status(204).send();
}

// Reverse lookup: symptoms → remedies

export async function getRemediesForSymptom(req: Request, res: Response) {
  const symptomId = req.params.symptomId;
  const data = await service.getRemediesForSymptom(symptomId);
  res.json(data);
}
