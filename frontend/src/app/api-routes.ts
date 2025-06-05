export const ApiRoutes = {
  // Authentification
  login: () => `${ApiRoutesEnum.Lootopia}/auth/login`,
  verifyMfa: (username: string, mfaCode: string) =>
    `${ApiRoutesEnum.Lootopia}/auth/verify-mfa?username=${username}&mfaCode=${mfaCode}`,
  refresh: () => `${ApiRoutesEnum.Lootopia}/token/refresh`,

  // Paiements
  createPaymentIntent: (amount: number) =>
    `${ApiRoutesEnum.Payment}/create-payment-intent?amount=${amount}`,

  // Clues
  createCluesBatch: () => `${ApiRoutesEnum.Location}/clue/batch`,
  getCluesByTreasureId: (treasureId: string) =>
    `${ApiRoutesEnum.Location}/clue/treasure/${treasureId}`,

  // Treasure Hunt
  treasureHunt: () => `${ApiRoutesEnum.Lootopia}/treasure-hunt`,
  treasureHuntById: (id: number) => `${ApiRoutesEnum.Lootopia}/treasure-hunt/${id}`,
  treasureHuntAll: () => `${ApiRoutesEnum.Lootopia}/treasure-hunt/all`,
  digAHole: (treasureId: string, latitude: number, longitude: number) => `${ApiRoutesEnum.Lootopia}/treasure-hunt/digAHole?treasureId=${treasureId}&latitude=${latitude}&longitude=${longitude}`,

  // Participation
  participation: () => `${ApiRoutesEnum.Lootopia}/participations`,
  participationById: (id: string) => `${ApiRoutesEnum.Lootopia}/participations/${id}`,

  // Treasure
  treasure: () => `${ApiRoutesEnum.Location}/treasure`,
  treasureById: (id: string) => `${ApiRoutesEnum.Location}/treasure/${id}`,
  treasureAll: () => `${ApiRoutesEnum.Location}/treasure/all`,
};

export enum ApiRoutesEnum {
  Lootopia = 'http://localhost:8080/lootopia/api',
  Payment = 'http://localhost:8080/paymentserv/api/payment',
  Location = 'http://localhost:8080/locationserv/api',
}
