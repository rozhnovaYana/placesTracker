import { View, Image, Text, StyleSheet, Pressable } from 'react-native';
import Colors from '../../constans/Colors';
import { PlaceResponse } from '../../types/places';
import { useNavigation } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RoottStackParamList } from '../../types/navigation';

type PlaceItemScreenProps = NativeStackScreenProps<
  RoottStackParamList,
  'AllPlaces'
>;
const PlaceItem = ({ item }: { item: PlaceResponse }) => {
  const navigation = useNavigation<PlaceItemScreenProps['navigation']>();
  const onPress = () => {
    navigation.navigate('PlaceDetails', {
      placeId: item.id,
    });
  };

  return (
    <Pressable style={styles.wrapper} onPress={onPress}>
      <Image style={styles.image} source={{ uri: item.image }} />
      <View style={styles.textWrapper}>
        <Text style={styles.text}>{item.title}</Text>
        <Text style={styles.address}>{item?.address}</Text>
      </View>
    </Pressable>
  );
};
export default PlaceItem;

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: 10,
  },
  image: {
    height: 100,
    flex: 1,
  },
  text: {
    color: Colors.accent100,
    fontFamily: 'josefinSansRegular',
    fontSize: 24,
  },
  textWrapper: {
    flex: 2,
    justifyContent: 'flex-start',
    marginLeft: 10,
    height: '100%',
  },
  address: {
    color: Colors.primary100,
    fontFamily: 'josefinSansLight',
    fontSize: 20,
  },
});
