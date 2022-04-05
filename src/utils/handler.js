export const handleException = (error) => {
  // error status에 따라 로직 분리
  throw new Error(error);
};
