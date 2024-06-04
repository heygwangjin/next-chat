import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const getFromAndTo = (page: number, itemPerPage: number) => {
  let from = page * itemPerPage;
  let to = from + itemPerPage;

  if (page > 0) {
    from += 1;
  }

  return { from, to };
};

export const capitalizeFirstLetter = (word?: string) => {
  return word
    ? word.charAt(0).toUpperCase() + word.toLocaleLowerCase().slice(1)
    : "";
};

export const truncateText = (text: string, maxLength: number) => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};
