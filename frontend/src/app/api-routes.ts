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

  // Treasure Hunt
  treasureHunt: () => `${ApiRoutesEnum.Lootopia}/treasure-hunt`,
  treasureHuntAll: () => `${ApiRoutesEnum.Lootopia}/treasure-hunt/all`,	
};

export enum ApiRoutesEnum {
  Lootopia = 'http://localhost:8080/lootopia/api',
  Payment = 'http://localhost:8080/paymentserv/api/payment',
  Location = 'http://localhost:8080/locationserv/api',
}
