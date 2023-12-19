import { InputItem } from "./types";
import objectJson from "./configurationToImplement.json";

export const setDeepArray = (
  data: InputItem[],
  index: number,
  path: string,
  value: string,
): InputItem[] => {
  const updatedData = data.map((item, i) => {
    if (i === index) {
      return {
        ...item,
        [item.path]: value,
      };
    }
    return item;
  });

  return updatedData;
};


export const getData = () => {
  return objectJson as InputItem[];
};
