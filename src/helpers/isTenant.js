export const isTenant = ({ userEmail, tenant }) => {
  if (userEmail === tenant.fields.email) {
    return true;
  }
};
