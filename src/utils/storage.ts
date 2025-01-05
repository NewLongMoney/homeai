import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS } from '@/constants';

export const storage = {
  async get<T>(key: keyof typeof STORAGE_KEYS): Promise<T | null> {
    try {
      const value = await AsyncStorage.getItem(STORAGE_KEYS[key]);
      return value ? JSON.parse(value) : null;
    } catch (error) {
      console.error('Storage get error:', error);
      return null;
    }
  },

  async set(key: keyof typeof STORAGE_KEYS, value: any): Promise<void> {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS[key], JSON.stringify(value));
    } catch (error) {
      console.error('Storage set error:', error);
    }
  },

  async remove(key: keyof typeof STORAGE_KEYS): Promise<void> {
    try {
      await AsyncStorage.removeItem(STORAGE_KEYS[key]);
    } catch (error) {
      console.error('Storage remove error:', error);
    }
  },
}; 