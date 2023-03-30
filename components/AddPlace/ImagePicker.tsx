import {
  View,
  Alert,
  Image,
  StyleSheet,
  Text,
  Pressable,
  useWindowDimensions,
} from 'react-native';
import {
  launchCameraAsync,
  useCameraPermissions,
  PermissionStatus,
} from 'expo-image-picker';

import Colors from '../../constans/Colors';
import IconButton from '../ui/IconButton';
import ContentPlaceholder from './ContentPlaceholder';

const ImagePicker = ({
  setImage,
  image,
}: {
  setImage: (s: string) => void;
  image: string;
}) => {
  const { width } = useWindowDimensions();
  const [cameraPermissionInformation, requestPermission] =
    useCameraPermissions();

  const requestPermissionHandler = async () => {
    if (cameraPermissionInformation?.status === PermissionStatus.UNDETERMINED) {
      const response = await requestPermission();
      return response.granted;
    }
    if (cameraPermissionInformation?.status === PermissionStatus.DENIED) {
      Alert.alert(
        'Insufficient Permission',
        'You need to grant camera persmissions to use the app'
      );
      const response = await requestPermission();
      return response.granted;
    }
    return true;
  };

  const pickImage = async () => {
    const havePermissions = await requestPermissionHandler();
    if (!havePermissions) return;
    try {
      const image = await launchCameraAsync({
        allowsEditing: true,
        quality: 0.5,
        aspect: [6, 6],
      });
      if (!image.canceled) {
        setImage(image?.assets[0].uri);
      }
    } catch (err) {
      console.log(err);
    }
  };
  let imageContent = (
    <ContentPlaceholder>Image not found</ContentPlaceholder>
  );

  if (!!image) {
    imageContent = <Image style={styles.image} source={{ uri: image }} />;
  }

  return (
    <View style={styles.wrapper}>
      <Pressable
        onPress={pickImage}
        style={[styles.imageWrapper, { height: width * 0.7 }]}
      >
        {imageContent}
      </Pressable>
      <IconButton
        onPress={pickImage}
        name="camera"
        color={Colors.primary100}
        size={24}
      >
        Take a photo
      </IconButton>
    </View>
  );
};

export default ImagePicker;

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  imageWrapper: {
    height: 200,
    width: '70%',
    backgroundColor: Colors.transparent,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
});
