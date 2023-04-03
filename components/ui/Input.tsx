import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TextInputProps,
} from 'react-native';
import Colors from '../../constans/Colors';

interface InputInterface extends TextInputProps {
  label?: string;
}

const Input = ({ label, ...inputStyles }: InputInterface) => {
  return (
    <View style={styles.wrapper}>
      {label && <Text style={styles.textLabel}>{label}</Text>}
      <TextInput {...inputStyles} />
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 20,
  },
  textLabel: {
    fontFamily: 'josefinSansRegular',
    fontSize: 18,
    color: Colors.accent100,
    marginBottom: 10,
  },
});
