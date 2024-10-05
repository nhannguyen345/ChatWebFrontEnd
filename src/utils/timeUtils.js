import { format } from "date-fns";

export const formattedTime = (date) => {
  return format(new Date(date), "hh:mm a");
};
