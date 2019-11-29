import moment from "moment";

export const getFormattedDate = ({ date }) => {
  const formattedDate = moment(date).format("ll LT");

  return formattedDate;
};

export const getFormattedDay = ({ date }) => {
  const formattedDate = moment(date).format("ll");

  return formattedDate;
};
