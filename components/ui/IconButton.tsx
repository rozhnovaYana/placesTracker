import { Pressable, Text, StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import Colors from '../../constans/Colors';

const IconButton = ({
  onPress,
  children,
  ...iconProps
}: {
  onPress: () => void;
  size: number;
  color?: string;
  name: keyof typeof Ionicons.glyphMap;
  children: string;
}) => {
  return (
    <Pressable style={({ pressed }) => [styles.wrapper, pressed && styles.pressed]} onPress={onPress}>
      <Ionicons style={styles.icon} {...iconProps} />
      <Text style={styles.text}>{children}</Text>
    </Pressable>
  );
};

export default IconButton;

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: Colors.primary400,
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderWidth: 2,
    borderColor: Colors.primary100
  },
  pressed: {
    opacity: 0.7
  },
  icon: {
    marginRight: 10,
  },
  text: {
    color: Colors.primary100,
    fontSize: 18,
    fontFamily: 'josefinSansBold'
  }
});
