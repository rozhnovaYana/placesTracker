import { Text, StyleSheet } from 'react-native';

import Colors from '../../constans/Colors';

const ContentPlaceholder = ({ children }: { children: string }) => {
  return <Text style={styles.locationPlaceholder}>{children}</Text>;
};

export default ContentPlaceholder;

const styles = StyleSheet.create({
  locationPlaceholder: {
    color: Colors.accent100,
    fontFamily: 'josefinSansBold',
    fontSize: 20,
    overflow: 'hidden',
  },
});
