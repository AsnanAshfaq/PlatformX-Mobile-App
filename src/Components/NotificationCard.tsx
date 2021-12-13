import React, {FC, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Image,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Sizes, Width} from '../Constants/Size';
import {PROFILE_IMAGE} from '../Constants/sample';
import {useStateValue} from '../Store/StateProvider';

type props = {
  navigation: any;
  notification: any;
};

const ICON_SIZE = Width * 0.07;

const NotificationCard: FC<props> = ({navigation, notification}) => {
  const [ImageLoading, setImageLoading] = useState(true);
  const [{theme}, dispatch] = useStateValue();

  return (
    <TouchableOpacity>
      <View
        style={[
          styles.parent,
          {
            shadowColor: theme.SHADOW_COLOR,
            backgroundColor: theme.CARD_BACKGROUND_COLOR,
          },
        ]}>
        {/* image container */}
        <View style={styles.imageContainer}>
          <Image
            source={{
              uri: ImageLoading ? PROFILE_IMAGE : notification.user_image,
            }}
            style={styles.image}
            onLoadEnd={() => setImageLoading(false)}
          />
        </View>
        {/* title container  */}
        <View style={styles.titleContainer}>
          <Text
            style={[
              styles.title,
              {
                color: theme.TEXT_COLOR,
              },
            ]}>
            {notification.notification}
          </Text>
          <Text style={[styles.date, {color: theme.TEXT_COLOR}]}>
            {notification.timestamp.toUTCString().substring(0, 17)}
          </Text>
        </View>
        <View style={styles.optionContainer}>
          <TouchableOpacity>
            <Ionicons
              name={'ellipsis-vertical'}
              size={ICON_SIZE}
              color={theme.ICON_COLOR}
            />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default NotificationCard;

const styles = StyleSheet.create({
  parent: {
    flexDirection: 'row',
    marginHorizontal: Width * 0.04,
    marginVertical: Width * 0.01,
    // minHeight: Height * 0.35,
    // maxHeight: Height * 0.4,
    borderRadius: 20,
    padding: 10,
    shadowOpacity: 1,
    shadowRadius: 25,
    shadowOffset: {width: 10, height: 12},
    elevation: 30,
  },
  imageContainer: {
    margin: 2,
    flex: 0.2,
  },
  image: {
    width: Width * 0.14,
    height: Width * 0.14,
    borderWidth: 1,
    borderRadius: 40,
    borderColor: 'transparent',
  },
  titleContainer: {
    margin: 5,
    flex: 0.7,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: Sizes.normal,
  },
  date: {
    fontSize: Sizes.normal * 0.75,
  },
  optionContainer: {
    flex: 0.1,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
});
