import { type ClassValue, clsx } from "clsx";
import { format, isThisWeek, isToday } from "date-fns";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatDateLabel = (date: Date) => {
  if (isToday(date)) {
    return format(date, "h:mm a");
  }
  if (isThisWeek(date)) {
    return format(date, "EEE h:mm a");
  }
  return format(date, "MMM d, yyyy, h:mm a");
};
