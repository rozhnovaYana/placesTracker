import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { useCallback } from 'react';

import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { NavigationContainer } from '@react-navigation/native';

import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import type { RoottStackParamList } from './types/navigation';

import AllPlaces from './screens/AllPlaces';
import AddPlace from './screens/AddPlace';
import Map from './screens/Map';

import PressableIcon from './components/ui/PressableIcon';
import Colors from './constans/Colors';

const { Navigator, Screen } = createNativeStackNavigator<RoottStackParamList>();

export default function App() {
  const [fontsLoaded] = useFonts({
    josefinSansLight: require('./assets/fonts/JosefinSans-Light.ttf'),
    josefinSansRegular: require('./assets/fonts/JosefinSans-Regular.ttf'),
    josefinSansMedium: require('./assets/fonts/JosefinSans-Medium.ttf'),
    josefinSansBold: require('./assets/fonts/JosefinSans-SemiBold.ttf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;
  return (
    <View style={styles.wrapper} onLayout={onLayoutRootView}>
      <StatusBar style="light" />
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
        </Navigator>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
});
