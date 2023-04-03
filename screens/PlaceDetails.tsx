import { useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useEffect, useState } from 'react';
import { View, Image, Text, StyleSheet, Alert } from 'react-native';
import { RoottStackParamList } from '../types/navigation';
import { fetchPlace } from '../utils/database';
import { PlaceResponse } from '../types/places';
import ScreenTemplate from '../components/ui/ScreenTemplate';
import Spinner from '../components/ui/Spinner';
import Colors from '../constans/Colors';
import IconButton from '../components/ui/IconButton';

type PlaceDetailsProps = NativeStackScreenProps<
  RoottStackParamList,
  'PlaceDetails'
>;
const PlaceDetails = () => {
  const [item, setItem] = useState<null | PlaceResponse>(null);
  const route = useRoute<PlaceDetailsProps['route']>();
  const navigation = useNavigation<PlaceDetailsProps['navigation']>();
  const id = route.params.placeId;
  useEffect(() => {
    if (!id) return;
    const fetchData = async () => {
      try {
        const result = await fetchPlace(id);
        setItem(result);
        navigation.setOptions({
          title: item?.title,
        });
      } catch (err) {
        console.log(err);
        Alert.alert('Something went wrong...', 'Cannot open Place Details');
      }
    };
    fetchData();
  }, [id]);

  const showMap = () => {
    if (!item?.latitude || !item.longitude) return;
    navigation.navigate('Map', {
      location: {
        latitude: item?.latitude,
        longitude: item?.longitude,
      },
      disabled: true
    });
  };

  if (!item) return <Spinner />;
  return (
    <ScreenTemplate>
      <View style={styles.wrapper}>
        <Image source={{ uri: item.image }} style={styles.image} />
        <View style={styles.address}>
          <Text style={styles.text}>{item.address}</Text>
        </View>
        {item.address && (
          <View style={styles.iconBtn}>
            <IconButton
              size={24}
              color={Colors.primary100}
              name="map"
              onPress={showMap}
            >
              Show on Map
            </IconButton>
          </View>
        )}
      </View>
    </ScreenTemplate>
  );
};

export default PlaceDetails;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  image: {
    maxHeight: '35%',
    height: 300,
    width: '100%',
  },
  address: {
    alignItems: 'center',
    padding: 10,
  },
  text: {
    color: Colors.primary100,
    fontFamily: 'josefinSansBold',
    fontSize: 20,
    textAlign: 'center',
  },
  iconBtn: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
