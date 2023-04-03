import { View, StyleSheet, Alert, Text } from 'react-native';
import {
  getCurrentPositionAsync,
  useForegroundPermissions,
  PermissionStatus,
} from 'expo-location';

import Colors from '../../constans/Colors';

import IconButton from '../ui/IconButton';
import { useNavigation } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack/lib/typescript/src/types';
import { RoottStackParamList } from '../../types/navigation';

import { Location } from '../../types/places';
import { getGeocode } from '../../utils/location';

const LocationPicker = ({
  location,
  setLocation,
}: {
  location?: Location;
  setLocation: (l: Location) => void;
}) => {
  const [locationStatus, requestPermission] = useForegroundPermissions();
  const navigation =
    useNavigation<
      NativeStackScreenProps<RoottStackParamList, 'AddPlace'>['navigation']
    >();

  const getPermissions = async () => {
    if (locationStatus?.status === PermissionStatus.UNDETERMINED) {
      const response = await requestPermission();
      return response.granted;
    }
    if (locationStatus?.status === PermissionStatus.DENIED) {
      Alert.alert(
        'Insufficient Permission',
        'You need to grant location persmissions to use the app'
      );
      const response = await requestPermission();
      return response.granted;
    }
    return true;
  };
  const getLocation = async () => {
    const permissions = await getPermissions();
    if (!permissions) return;
    try {
      const location = await getCurrentPositionAsync();
      const { latitude, longitude } = location.coords;
      const address = await getGeocode(location.coords);
      setLocation({
        latitude,
        longitude,
        address
      });
    } catch (err) {
      console.log(err);
    }
  };
  
  const pickLocation = () => {
    navigation.navigate('Map', {
      location,
    });
  };
  let content = 'Location:';
  if (!!location?.address) {
    content = `${location?.address}`;
  }
  return (
    <View style={styles.wrapper}>
      <Text style={[styles.text, location?.address ? styles.geocode : null]}>
        {content}
      </Text>
      <View style={styles.buttonsContainer}>
        <IconButton
          name="location"
          size={24}
          color={Colors.primary100}
          onPress={getLocation}
        >
          Locate User
        </IconButton>
        <IconButton
          name="map"
          size={24}
          color={Colors.primary100}
          onPress={pickLocation}
        >
          Select on Map
        </IconButton>
      </View>
    </View>
  );
};

export default LocationPicker;

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  locationWrapper: {
    height: 100,
    width: '90%',
    backgroundColor: Colors.transparent,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
  },
  text: {
    fontFamily: 'josefinSansRegular',
    fontSize: 22,
    color: Colors.primary100,
    marginBottom: 10,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    width: '90%',
  },
  geocode: {
    color: Colors.accent100,
  },
});
