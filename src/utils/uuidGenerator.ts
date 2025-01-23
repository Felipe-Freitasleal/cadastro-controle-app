import uuid from "react-native-uuid";

export function uuidGenerator(): string {
  const uuid32 = uuid.v4().replace(/-/g, "");

  return uuid32;
}
