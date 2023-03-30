import { Alert } from 'react-native';
import {
    getCurrentPositionAsync,
    PermissionStatus,
    LocationCallback,
  } from 'expo-location';
const getPermissions = async (locationStatus: keyof PermissionStatus, requestPermission: PermissionResponse) => {
    if (locationStatus === PermissionStatus.UNDETERMINED) {
      const response = await requestPermission();
      return response.granted;
    }
    if (locationStatus === PermissionStatus.DENIED) {
      Alert.alert(
        'Insufficient Permission',
        'You need to grant location persmissions to use the app'
      );
      const response = await requestPermission();
      return response.granted;
    }
    return true;
  };
  export const getLocation = async (locationStatus: keyof PermissionStatus, requestPermission: LocationCallback) => {
    const permissions = await getPermissions(locationStatus, requestPermission);
    if (!permissions) return;
    try {
      const location = await getCurrentPositionAsync();
      const { latitude, longitude } = location.coords;
      return {
        latitude, longitude
      }
    } catch (err) {
      console.log(err);
    }
  };