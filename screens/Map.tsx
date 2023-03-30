import { useCallback, useLayoutEffect, useState } from 'react';
import { Alert, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RoottStackParamList } from '../types/navigation';
import { Location } from '../types/places';

import ScreenTemplate from '../components/ui/ScreenTemplate';
import PressableIcon from '../components/ui/PressableIcon';

type MapScreenProps = NativeStackScreenProps<RoottStackParamList, 'Map'>;

const Map = ({ route, navigation }: MapScreenProps) => {
  const initialLcation = route.params;

  const [location, setLocation] = useState<Location | undefined>(
    initialLcation.location
  );

  const initialRegion = {
    latitude: location?.latitude || 37.4226,
    longitude: location?.longitude || -122.08,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  const changeLocation = (event: { nativeEvent: { coordinate: any } }) => {
    const coordinate = event.nativeEvent.coordinate;
    setLocation(coordinate);
  };

  const saveLocation = useCallback(() => {
    if (!location) {
      Alert.alert('Cannot save location', 'Location should be picked');
      return;
    }
    console.log(location);
    navigation.navigate('AddPlace', {
      location,
    });
  }, [navigation, location]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: ({ tintColor }) => (
        <PressableIcon
          name="checkmark-circle-outline"
          color={tintColor}
          size={24}
          onPress={saveLocation}
        />
      ),
    });
  });

  return (
    <ScreenTemplate>
      <MapView
        style={styles.map}
        initialRegion={initialRegion}
        onPress={changeLocation}
      >
        <Marker
          title="Pick location"
          coordinate={{
            latitude: location?.latitude || 37.4226,
            longitude: location?.longitude || -122.08,
          }}
        />
      </MapView>
    </ScreenTemplate>
  );
};

export default Map;

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});
