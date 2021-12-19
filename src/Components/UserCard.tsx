import React, {FC, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Image,
} from 'react-native';
import {Height, Sizes, Width} from '../Constants/Size';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useStateValue} from '../Store/StateProvider';
import {PROFILE_IMAGE} from '../Constants/sample';
//@ts-ignore
import {BASE_URL} from 'react-native-dotenv';
type props = {
  navigation: any;
  id: any;
  image: any;
  name: '';
  username: '';
  onPress: () => void;
};

const ICON_SIZE = Width * 0.07;

const UserCard: FC<props> = ({
  navigation,
  id,
  image,
  name,
  username,
  onPress,
}) => {
  const [{theme}, dispatch] = useStateValue();
  const [ImageLoading, setImageLoading] = useState(true);

  return (
    <TouchableOpacity activeOpacity={0.5} onPress={onPress}>
      <View
        style={[
          styles.parent,
          {
            backgroundColor: theme.CARD_BACKGROUND_COLOR,
          },
        ]}>
        {/* image container */}
        <View style={styles.imageContainer}>
          <Image
            source={{
              uri: ImageLoading
                ? PROFILE_IMAGE
                : image
                ? BASE_URL + image.path
                : PROFILE_IMAGE,
            }}
            onLoadEnd={() => setImageLoading(false)}
            onError={() => setImageLoading(false)}
            style={styles.image}
          />
        </View>
        {/* name and user name container  */}
        <View style={styles.nameContainer}>
          <Text
            style={[
              styles.fullname,
              {
                color: theme.TEXT_COLOR,
              },
            ]}>
            {name}
          </Text>
          <Text
            style={[
              styles.username,
              {
                color: theme.DIM_TEXT_COLOR,
              },
            ]}>
            @{username}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default UserCard;

const styles = StyleSheet.create({
  parent: {
    flexDirection: 'row',
    marginHorizontal: Width * 0.04,
    marginVertical: Width * 0.01,
    borderRadius: 10,
    padding: 10,
  },
  imageContainer: {
    margin: 2,
    flex: 0.2,
  },
  image: {
    width: Width * 0.16,
    height: Width * 0.16,
    borderWidth: 1,
    borderRadius: 40,
    borderColor: 'transparent',
  },
  nameContainer: {
    margin: 5,
    marginLeft: 10,
    marginVertical: 10,
    flex: 0.8,
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  username: {
    fontSize: Sizes.normal * 0.75,
  },
  fullname: {
    fontSize: Sizes.normal,
  },
});
