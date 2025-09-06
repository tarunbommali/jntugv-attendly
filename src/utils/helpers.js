// utils/helpers.js
export const calculateExperience = (joiningDate) => {
  if (!joiningDate) return 0;
  const joinYear = new Date(joiningDate).getFullYear();
  const currentYear = new Date().getFullYear();
  return currentYear - joinYear;
};
