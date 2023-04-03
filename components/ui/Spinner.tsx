import { ActivityIndicator, StyleSheet, View } from 'react-native';
import Colors from '../../constans/Colors';

export default () => {
  return (
    <View style={styles.wrapper}>
      <ActivityIndicator size="large" color={Colors.accent100} />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
