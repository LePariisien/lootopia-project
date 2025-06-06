export const ApiRoutes = {
  // Authentification
  login: () => `${ApiRoutesEnum.Lootopia}/auth/login`,
  verifyMfa: (username: string, mfaCode: string) =>
    `${ApiRoutesEnum.Lootopia}/auth/verify-mfa?username=${username}&mfaCode=${mfaCode}`,
  refresh: () => `${ApiRoutesEnum.Lootopia}/token/refresh`,
  signUp: () => `${ApiRoutesEnum.Lootopia}/auth/sign-up`,

  verify: () => `${ApiRoutesEnum.Lootopia}/auth/verify`,

  profile: (userId: string) =>
    `${ApiRoutesEnum.Lootopia}/users/${userId}/profile`,


  // Paiements
  createPaymentIntent: (amount: number) =>
    `${ApiRoutesEnum.Payment}/create-payment-intent?amount=${amount}`,

  // Clues
  createCluesBatch: () => `${ApiRoutesEnum.Location}/clue/batch`,
  getCluesByTreasureId: (treasureId: string) =>
    `${ApiRoutesEnum.Location}/clue/treasure/${treasureId}`,

  // Treasure Hunt
  treasureHunt: () => `${ApiRoutesEnum.Lootopia}/treasure-hunt`,
  treasureHuntAll: () => `${ApiRoutesEnum.Lootopia}/treasure-hunt/all`,
  treasureHuntCount: () => `${ApiRoutesEnum.Lootopia}/treasure-hunt/count`,

  // Treasure
  treasureDetails: (id: string) => `${ApiRoutesEnum.Location}/treasure/${id}/details`,
  treasureHuntById: (id: number) => `${ApiRoutesEnum.Lootopia}/treasure-hunt/${id}`,
  digAHole: (treasureId: string, latitude: number, longitude: number) => `${ApiRoutesEnum.Lootopia}/treasure-hunt/digAHole?treasureId=${treasureId}&latitude=${latitude}&longitude=${longitude}`,

  // Participation
  participation: () => `${ApiRoutesEnum.Lootopia}/participations`,
  participationById: (id: string) => `${ApiRoutesEnum.Lootopia}/participations/${id}`,

  // Treasure
  treasure: () => `${ApiRoutesEnum.Location}/treasure`,
  treasureById: (id: string) => `${ApiRoutesEnum.Location}/treasure/${id}`,
  treasureAll: () => `${ApiRoutesEnum.Location}/treasure/all`,

  // Player
  playerAll: () => `${ApiRoutesEnum.Lootopia}/player/all`,
  playerCount: () => `${ApiRoutesEnum.Lootopia}/player/count`,
};

export enum ApiRoutesEnum {
  Lootopia = 'http://localhost:8080/lootopia/api',
  Payment = 'http://localhost:8080/paymentserv/api/payment',
  Location = 'http://localhost:8080/locationserv/api',
}

