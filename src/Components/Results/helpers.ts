export const formatPhoneNumber = (phoneNumber: string): string => {
  if (phoneNumber.length !== 12) {
    return phoneNumber;
  }

  return `+${phoneNumber[1]}-${phoneNumber.slice(2, 5)}-${phoneNumber.slice(5, 8)}-${phoneNumber.slice(8)}`;
};
