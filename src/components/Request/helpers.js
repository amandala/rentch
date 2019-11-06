import moment from "moment";

export const getFormattedDate = ({ date }) => {
  const formattedDate = moment(date).format("ll LT");

  return formattedDate;
};

export const getNotificationTitle = ({ type, status, propertyName }) => {
  if (status === "new") {
    return `New ${type} request at ${propertyName}`;
  }

  return "";
};

export const isTenant = ({ userEmail, tenant }) => {
  if (userEmail === tenant.fields.email) {
    return true;
  }
};
