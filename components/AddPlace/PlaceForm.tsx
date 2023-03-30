import { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import Input from '../ui/Input';

import { Location, Place } from '../../types/places';
import { RoottStackParamList } from '../../types/navigation';

import Colors from '../../constans/Colors';
import ImagePicker from './ImagePicker';
import LocationPicker from './LocationPicker';

const PlaceForm = () => {
  const route =
    useRoute<
      NativeStackScreenProps<RoottStackParamList, 'AddPlace'>['route']
    >();

  const location = route.params?.location;

  const [place, setPlace] = useState<Place>({
    title: '',
    image: '',
    location: location || '',
  });

  const updatePlace = (option: keyof Place, newValue: string | Location) => {
    setPlace((place) => {
      return { ...place, [option]: newValue };
    });
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
    </View>
  );
};

export default PlaceForm;

const styles = StyleSheet.create({
  wrapper: {
    paddingTop: 20,
  },
  input: {
    color: Colors.accent300,
    paddingVertical: 10,
    paddingHorizontal: 15,
    fontSize: 20,
    borderRadius: 8,
    backgroundColor: Colors.transparent,
  },
});
