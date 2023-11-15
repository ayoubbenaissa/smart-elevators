export const extractError = (error: any) => {
  return error?.response?.data?.message || error?.message || (error || "").toString();
};
