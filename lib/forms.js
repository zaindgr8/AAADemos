export const FORMS = {
  pearlshire: {
    id: "pearlshire",
    title: "PEARLSHIRE DEVELOPERS - DEMO",
    username: "pearlshire",
    password: "Wegrowtogether@yo1",
    webhookUrl: "https://hook.us2.make.com/hovwbcemwqtyyjlcglcme5d4jl7uloop",
  },
  elysian: {
    id: "elysian",
    title: "ELYSIAN REAL ESTATE - INQUIRY",
    username: "elysian",
    password: "Wegrowtogether@yo1",
    webhookUrl: "https://hook.eu1.make.com/vq2zg5z4fhc8mm3kcwpnv82cbvtts6my",
  },
};

export function getFormById(id) {
  if (!id) return null;
  const normalizedId = id.toLowerCase().trim();
  return FORMS[normalizedId] || null;
}

export function authenticateForm(username, password) {
  if (!username || !password) return null;
  const normalizedUser = username.toLowerCase().trim();
  
  for (const form of Object.values(FORMS)) {
    if (form.username.toLowerCase() === normalizedUser && form.password === password) {
      return form;
    }
  }
  return null;
}
