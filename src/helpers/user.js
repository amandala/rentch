export const getPropertyGreeting = property => {
  const profileData = localStorage.getItem("profile");
  if (!profileData) return null;

  if (
    property.fields.tenant.find(
      tenant => tenant.fields.email === profileData.email
    )
  ) {
    return "You're living at";
  } else if (property.fields.manager.fields.email === profileData.email) {
    return "You're managing";
  } else return "You're renting out";
};
