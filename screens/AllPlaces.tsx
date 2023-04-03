import { useEffect, useState } from 'react';
import { Text, Alert, FlatList } from 'react-native';
import ScreenTemplate from '../components/ui/ScreenTemplate';

import { fetchData } from '../utils/database';
import { Place, PlaceResponse } from '../types/places';
import PlaceItem from '../components/PlaceItem/PlaceItem';
import { useIsFocused } from '@react-navigation/native';


const AllPlaces = () => {
  const isFocuse = useIsFocused();
  const [places, setPlaces] = useState<PlaceResponse[]>();
  useEffect(() => {
    (async () => {
      try {
        const response = await fetchData();
        setPlaces(response);
      } catch (err) {
        Alert.alert('Cannot fetch Data', 'Please try again later');
      }
    })();
  }, [isFocuse]);
  return (
    <ScreenTemplate>
      <FlatList
        data={places}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }: { item: PlaceResponse }) => <PlaceItem item={item} />}
      />
    </ScreenTemplate>
  );
};

export default AllPlaces;
