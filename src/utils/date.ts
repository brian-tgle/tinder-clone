/**
 * Calculate age from date string
 * @param {string} dateString input date
 * @return {number} age after calculated
 */
export const calculateAge = (dateString: string) => {
  const birthDate = new Date(dateString);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const month = today.getMonth() - birthDate.getMonth();
  if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
};
