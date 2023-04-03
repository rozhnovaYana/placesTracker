import { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import Input from '../ui/Input';

import { Location, Place } from '../../types/places';
import { RoottStackParamList } from '../../types/navigation';

import Colors from '../../constans/Colors';
import ImagePicker from './ImagePicker';
import LocationPicker from './LocationPicker';
import Button from '../ui/Button';
import { insertPlace } from '../../utils/database';

const PlaceForm = () => {
  const route =
    useRoute<
      NativeStackScreenProps<RoottStackParamList, 'AddPlace'>['route']
    >();
  const navigation =
    useNavigation<
      NativeStackScreenProps<RoottStackParamList, 'AddPlace'>['navigation']
    >();

  const location = route.params?.location;
  console.log(location)

  const [place, setPlace] = useState<Place>({
    title: '',
    image: '',
    location: location || undefined,
  });

  const updatePlace = (option: keyof Place, newValue?: string | Location) => {
    setPlace((place) => {
      return { ...place, [option]: newValue };
    });
  };

  const savePlace = async () => {
    await insertPlace(place);
    navigation.navigate('AllPlaces');
  };

  useEffect(() => {
    updatePlace('location', location);
  }, [location]);

  return (
    <View style={styles.wrapper}>
      <Input
        placeholder="Enter a Title"
        onChangeText={(title) => updatePlace('title', title)}
        value={place.title}
        style={styles.input}
        placeholderTextColor={Colors.primary100}
      />
      <ImagePicker
        setImage={(image) => updatePlace('image', image)}
        image={place.image}
      />
      <LocationPicker
        setLocation={(location) => updatePlace('location', location)}
        location={place.location}
      />
      <Button onPress={savePlace}> Save </Button>
    </View>
  );
};

export default PlaceForm;

const styles = StyleSheet.create({
  wrapper: {
    paddingTop: 20,
  },
  input: {
    color: Colors.accent100,
    paddingVertical: 10,
    paddingHorizontal: 15,
    fontSize: 20,
    borderRadius: 8,
    backgroundColor: Colors.transparent,
  },
});
