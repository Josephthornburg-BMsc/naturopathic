import { Request, Response } from "express";
import * as service from "../services/illnesses.service";

export async function getAllIllnesses(req: Request, res: Response) {
  const data = await service.getAllIllnesses();
  res.json(data);
}

export async function getIllnessById(req: Request, res: Response) {
  const data = await service.getIllnessById(Number(req.params.id));
  res.json(data);
}

export async function createIllness(req: Request, res: Response) {
  const data = await service.createIllness(req.body);
  res.status(201).json(data);
}

export async function updateIllness(req: Request, res: Response) {
  const data = await service.updateIllness(Number(req.params.id), req.body);
  res.json(data);
}

export async function deleteIllness(req: Request, res: Response) {
  await service.deleteIllness(Number(req.params.id));
  res.status(204).send();
}

export async function searchIllnessesBySymptoms(req: Request, res: Response) {
  const { symptomIds } = req.body;

  const data = await service.searchIllnessesBySymptoms(symptomIds);
  res.json(data);
}

export async function searchIllnessesBySymptoms(req: Request, res: Response) {
  const { symptoms } = req.body; // [{ id, weight }]
  const data = await service.searchIllnessesBySymptoms(symptoms);
  res.json(data);
}
export async function searchIllnessesBySymptoms(req: Request, res: Response) {
  const { symptoms } = req.body; // [{ id, weight }]
  const data = await service.searchIllnessesBySymptoms(symptoms);
  res.json(data);
}


