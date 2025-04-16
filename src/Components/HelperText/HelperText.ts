export const HelperText = (message: string) => {
  return {
    errorMap: () => ({
      message: message,
    }),
  };
};