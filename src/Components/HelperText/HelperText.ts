export const helperText = (message: string) => {
  return {
    errorMap: () => ({
      message: message,
    }),
  };
};
