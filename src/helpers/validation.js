export const validate = value => {
  return !value || !value.length > 1 ? "This field is required" : undefined;
};
