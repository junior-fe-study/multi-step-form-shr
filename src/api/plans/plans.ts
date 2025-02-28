const BASE_URL = 'http://localhost:8080';

export const getPlans = async () => {
  const response = await fetch(`${BASE_URL}/plans`);
  return response.json();
};
