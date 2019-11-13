import moment from "moment";

export const getFormattedDate = ({ date }) => {
  const formattedDate = moment(date).format("ll LT");

  return formattedDate;
};
