import { Pressable, Text, StyleSheet, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import Colors from '../../constans/Colors';

const Button = ({
  onPress,
  children,
}: {
  onPress: () => void;
  children: string;
}) => {
  return (
    <View style={styles.wrapper}>
      <Pressable
        style={({ pressed }) => [styles.button, pressed && styles.pressed]}
        onPress={onPress}
      >
        <Text style={styles.text}>{children}</Text>
      </Pressable>
    </View>
  );
};

export default Button;

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  button: {
    backgroundColor: Colors.primary100,
    borderRadius: 5,
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderWidth: 2,
    borderColor: Colors.primary500,
  },
  pressed: {
    opacity: 0.7,
  },
  text: {
    color: Colors.primary500,
    fontSize: 20,
    fontFamily: 'josefinSansBold',
    textTransform: 'uppercase',
  },
});
