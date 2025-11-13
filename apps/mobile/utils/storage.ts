import AsyncStorage from "@react-native-async-storage/async-storage";

const saveItem = async (key: string, value: string) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (error) {
    console.log("[storage:saveItem]/", error);
  }
};

const getItem = async (key: string): Promise<string | null> => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (!value) return null;
    return value;
  } catch (error: any) {
    throw new Error("[storage: getItem]/", error);
  }
};
const removeItem = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.log("[storeage: removeItem]/:", error);
  }
};

export { getItem, removeItem, saveItem };
