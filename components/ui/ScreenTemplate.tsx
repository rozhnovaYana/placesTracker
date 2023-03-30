import { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useHeaderHeight } from '@react-navigation/elements';

import Colors from '../../constans/Colors';

const ScreenTemplate = ({ children }: { children: ReactNode }) => {
  const headerHeight = useHeaderHeight();
  return (
    <LinearGradient
      locations={[0.2, 1]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      colors={[Colors.primary500, Colors.accent300]}
      style={[styles.container, { paddingTop: headerHeight }]}
    >
      <View style={styles.contentWrapper}>{children}</View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentWrapper: {
    flex: 1,
    borderTopColor: Colors.accent200,
    borderTopWidth: 2,
  },
});
export default ScreenTemplate;
