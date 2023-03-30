import { Pressable } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

const PressableIcon = ({
  onPress,
  ...iconProps
}: {
  onPress: () => void;
  size: number;
  color?: string;
  name: keyof typeof Ionicons.glyphMap;
}) => {
  return (
    <Pressable onPress={onPress}>
      <Ionicons {...iconProps} />
    </Pressable>
  );
};

export default PressableIcon;
