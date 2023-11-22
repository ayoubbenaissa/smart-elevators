import { UserInfo, UserLoginResponseData } from "./auth.types";

// extracts UserInfo object from payload w.r.t user data
export const extractUserInfo = (payload: UserLoginResponseData["result"]): UserInfo | null => {
  if (payload.firstName && payload.lastName) return { firstName: payload.firstName, lastName: payload.lastName, id: payload._id };
  return null;
};

export type LocalStorageItem<T> = {
  value: T;
  expiry: number;
}

const TWO_HOURS = 2 * 60 * 60 * 1000;
export const setItemWithExpiry = <T>({key, value, expiry=TWO_HOURS}: {key: string; value: T; expiry?: number}) => {
  const currentDate = new Date();
  const itemToStore: LocalStorageItem<typeof value> = {
    value: value,
    expiry: currentDate.getTime() + expiry 
  };
  localStorage.setItem(key, JSON.stringify(itemToStore));
};

export const getItemWithExpiry = <T>({key}: {key: string}): null | T => {
  const storedItem = localStorage.getItem(key);
  if (!storedItem) return null;
  try {
    const storedItemPayload = JSON.parse(storedItem) as LocalStorageItem<T>;
    const now = new Date();
    // check expiry
    if (now.getTime() > storedItemPayload.expiry) {
      // if item expired => remove stored item from LS
      localStorage.removeItem(key);
      return null
    }
    return storedItemPayload.value;
  } catch (error) {
    return null;
  }
};