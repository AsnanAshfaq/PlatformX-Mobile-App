/* eslint-disable react-native/no-inline-styles */
//TODO:
// drawer icon
// back button
// title
// messaging screen icon
// notification icon

import React, {FunctionComponent, useEffect, useState} from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  Image,
} from 'react-native';
import {Height, Width, Sizes} from '../Constants/Size';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Badge} from 'react-native-elements';
import CustomBadge from './CustomBadge';
import {useStateValue} from '../Store/StateProvider';
import {PROFILE_IMAGE} from '../Constants/sample';
import Search from './Search';
//@ts-ignore
import {BASE_URL} from 'react-native-dotenv';

type props = {
  title?: string;
  navigation: any;
  image?: boolean;
  saerch?: boolean;
  bell?: boolean;
  chat?: boolean;
  back?: boolean;
  drawer?: boolean;
  onBackPress?: () => void;
  handleSearch?: (query: string) => void;
};

const ICON_SIZE = Width * 0.07;

const CustomHeader: FunctionComponent<props> = ({
  navigation,
  title,
  back,
  image,
  saerch,
  drawer,
  chat,
  bell,
  onBackPress,
  handleSearch,
}) => {
  const [state, dispatch] = useStateValue();
  const [LoadProfileImage, setLoadProfileImage] = useState(true);
  const {theme} = state;
  return (
    <View
      style={[
        styles.parent,
        {
          backgroundColor: theme.HEADER_NAV_BAR_BACKGROUND_COLOR,
        },
      ]}>
      {/* drawer navigation  or back button*/}
      {drawer && (
        <View style={styles.leftIconContainer}>
          <TouchableWithoutFeedback onPress={() => navigation.openDrawer()}>
            <View
              style={{
                flexDirection: 'column',
              }}>
              <View
                style={{
                  width: 29,
                  height: 4.2,
                  borderRadius: 4,
                  borderWidth: 1,
                  borderColor: 'transparent',
                  backgroundColor: theme.TEXT_COLOR,
                }}
              />
              <View
                style={{
                  width: 19,
                  height: 4.2,
                  marginVertical: 4,
                  borderRadius: 4,
                  borderWidth: 1,
                  borderColor: 'transparent',
                  backgroundColor: theme.TEXT_COLOR,
                }}
              />
            </View>
          </TouchableWithoutFeedback>
        </View>
      )}

      {image && (
        <TouchableWithoutFeedback onPress={() => navigation.openDrawer()}>
          <View style={styles.leftIconContainer}>
            <Image
              source={{
                uri: LoadProfileImage
                  ? PROFILE_IMAGE
                  : state.user.profilePic !== ''
                  ? BASE_URL + state.user.profilePic
                  : PROFILE_IMAGE,
              }}
              onLoadEnd={() => setLoadProfileImage(false)}
              onError={() => {
                setLoadProfileImage(false);
              }}
              style={styles.profileImage}
            />
          </View>
        </TouchableWithoutFeedback>
      )}

      {/* saerch bar  */}
      {saerch && (
        <View style={styles.searchContainer}>
          <Search
            handleSearch={query => console.log(query)}
            placeholder={'Search something...'}
            isShownInHeader={true}
            showFilterIcon={false}
          />
        </View>
      )}

      {back && (
        <View style={styles.leftIconContainer}>
          <TouchableWithoutFeedback onPress={onBackPress}>
            <Ionicons
              name={'chevron-back'}
              color={theme.ICON_COLOR}
              size={ICON_SIZE}
              style={styles.iconPadding}
            />
          </TouchableWithoutFeedback>
        </View>
      )}

      {/* title of the screen  */}
      {title !== undefined && (
        <View style={styles.headerContainer}>
          <Text style={[styles.headerTitle, {color: theme.TEXT_COLOR}]}>
            {title}
          </Text>
        </View>
      )}

      {/* right icons  */}
      <View
        style={[
          styles.RightIconContainer,
          {
            justifyContent: chat && bell ? 'flex-end' : 'flex-end',
            marginHorizontal: chat && bell ? 0 : 0,
          },
        ]}>
        {chat && (
          <TouchableWithoutFeedback onPress={() => navigation.navigate('Chat')}>
            <View style={styles.row}>
              <AntDesign
                name={'message1'}
                size={ICON_SIZE * 0.9}
                color={theme.ICON_COLOR}
                style={styles.iconPadding}
              />
              {/* badge  */}
              <CustomBadge position={{right: 0}} />
            </View>
          </TouchableWithoutFeedback>
        )}
        {bell && (
          <TouchableWithoutFeedback
            onPress={() => navigation.navigate('Notification')}>
            <View style={styles.row}>
              <Ionicons
                name={'notifications-outline'}
                size={ICON_SIZE}
                color={theme.ICON_COLOR}
                style={[styles.iconPadding, {transform: [{rotateZ: '-15deg'}]}]}
              />
              {/* badge  */}
              <CustomBadge />
            </View>
          </TouchableWithoutFeedback>
        )}
      </View>
    </View>
  );
};

export default CustomHeader;

const styles = StyleSheet.create({
  parent: {
    // flex: 1,
    height: Height * 0.07,
    alignItems: 'center',
    flexDirection: 'row',
  },
  headerContainer: {
    flex: 0.6,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    paddingLeft: 15,
  },
  headerTitle: {
    fontSize: Sizes.large,
  },
  profileImage: {
    height: Width * 0.09,
    width: Width * 0.09,
    borderRadius: 40,
    marginHorizontal: 10,
  },
  leftIconContainer: {
    flex: 0.1,
    paddingLeft: 10,
  },
  searchContainer: {
    flex: 0.6,
  },
  RightIconContainer: {
    flex: 0.25,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  iconPadding: {
    // padding: 8,
    paddingHorizontal: 4,
    paddingVertical: 8,
  },
  row: {
    flexDirection: 'row',
  },
});
