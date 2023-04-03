import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text } from 'react-native';
import { useCallback, useState, useEffect } from 'react';

import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

import { init } from './utils/database';
import Root from './navigator/Root';

export default function App() {
  const [initiazedDB, setInitiazedDB] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [fontsLoaded] = useFonts({
    josefinSansLight: require('./assets/fonts/JosefinSans-Light.ttf'),
    josefinSansRegular: require('./assets/fonts/JosefinSans-Regular.ttf'),
    josefinSansMedium: require('./assets/fonts/JosefinSans-Medium.ttf'),
    josefinSansBold: require('./assets/fonts/JosefinSans-SemiBold.ttf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded && initiazedDB) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, initiazedDB]);

  useEffect(() => {
    const initDB = async () => {
      try {
        await init();
      } catch (err) {
        setError('Cannot init DB');
      } finally {
        setInitiazedDB(true);
      }
    };

    initDB();
  }, []);
  let content = <Root />;
  if(error) {
    content = <Text> {error}</Text>
  }

  if (!fontsLoaded || !initiazedDB) return null;
  return (
    <View style={styles.wrapper} onLayout={onLayoutRootView}>
      <StatusBar style="light" />
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
});
