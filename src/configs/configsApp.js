export const configsApp = {
  baseURL: "https://netflix-vercel-api.vercel.app/api/v1",
  //baseURL: "http://localhost:5000/api/v1",
  twoFACodeLength: 6,
  remainingSecondsToSendEmail: 60,
  rulesPassword: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/,
  // imagesPoster: (path) => `http://localhost:5000/public/images/${path}`,
  imagesPoster: (path) =>
    `https://netflix-vercel-api.vercel.app/public/images/${path}`,
};
