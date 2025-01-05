import { Platform, Permission, PermissionsAndroid } from 'react-native';

export const permissions = {
  async request(permission: Permission): Promise<boolean> {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(permission);
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (error) {
        console.error('Permission request error:', error);
        return false;
      }
    }
    return true;
  },

  async check(permission: Permission): Promise<boolean> {
    if (Platform.OS === 'android') {
      try {
        const result = await PermissionsAndroid.check(permission);
        return result;
      } catch (error) {
        console.error('Permission check error:', error);
        return false;
      }
    }
    return true;
  },
}; 