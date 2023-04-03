import { NavigationContainer } from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import type { RoottStackParamList } from '../types/navigation';

import AllPlaces from '../screens/AllPlaces';
import AddPlace from '../screens/AddPlace';
import Map from '../screens/Map';

import PressableIcon from '../components/ui/PressableIcon';
import Colors from '../constans/Colors';
import PlaceDetails from '../screens/PlaceDetails';

const { Navigator, Screen } = createNativeStackNavigator<RoottStackParamList>();

export default function Root() {
  return (
    <NavigationContainer>
      <Navigator
        screenOptions={{
          headerTitleAlign: 'center',
          headerTintColor: Colors.accent100,
          headerTransparent: true,
          headerTitleStyle: {
            fontFamily: 'josefinSansBold',
          },
        }}
      >
        <Screen
          name="AllPlaces"
          component={AllPlaces}
          options={({
            navigation,
          }: NativeStackScreenProps<RoottStackParamList, 'AllPlaces'>) => ({
            headerRight: ({ tintColor }) => (
              <PressableIcon
                onPress={() => navigation.navigate('AddPlace')}
                name="add-circle-outline"
                size={24}
                color={tintColor}
              />
            ),
            title: 'Your favourite Places',
          })}
        />
        <Screen
          name="AddPlace"
          component={AddPlace}
          options={{
            title: 'Add a new Place',
          }}
        />
        <Screen name="Map" component={Map} />
        <Screen
          name="PlaceDetails"
          component={PlaceDetails}
          options={{ title: `Loading a place` }}
        />
      </Navigator>
    </NavigationContainer>
  );
}
