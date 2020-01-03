export const isUserMatch = ({ userEmail, user }) => {
  if (userEmail === user.fields.email) {
    return true;
  }
};
