const API = "https://naturopathic.onrender.com";

export async function getIllnesses() {
  const res = await fetch(`${API}/api/illnesses`);
  return res.json();
}

export async function getRemedies() {
  const res = await fetch(`${API}/api/remedies`);
  return res.json();
}

export async function getSymptoms() {
  const res = await fetch(`${API}/api/symptoms`);
  return res.json();
}
