/* eslint-disable react-native/no-inline-styles */

import React, {FC, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ToastAndroid,
} from 'react-native';
import {Height, Sizes, Width} from '../Constants/Size';
import ORGPopUpMenu from '../Menu/OrganizationHackathonCardPopUpMenu';
import STDPopUpMenu from '../Menu/StudentHackathonCardPopUpMenu';
import {GREY_IMAGE, PROFILE_IMAGE} from '../Constants/sample';
// @ts-ignore
import {BASE_URL} from 'react-native-dotenv';
import {commaSeperator} from '../Utils/Numbers';
import {useStateValue} from '../Store/StateProvider';
import Axios from '../Utils/Axios';
import Divider from '../Components/Divider';
import {Cash, Clock, ForwardArrow, People, Tag, Tick} from './Icons';
import CustomButton from '../Components/CustomButton';
import Ionicons from 'react-native-vector-icons/Ionicons';

type props = {
  navigation: any;
  hackathonDetail: any;
  source: 'student' | 'organization';
};

const HackathonCard: FC<props> = ({navigation, source, hackathonDetail}) => {
  const [HackathonImageLoading, setHackathonImageLoading] = useState(true); // logo image
  const [ProfileImageLoading, setProfileImageLoading] = useState(true); // org. image
  const [ImageAspectRatio, setImageAspectRatio] = useState(0);

  const [{theme}, dispatch] = useStateValue();

  const handleDelete = () => {
    console.log('Handling delete');
  };

  const handleEdit = () => {
    console.log('Handling hackathon edit option');
  };

  const handleShare = () => {};

  const handleFollow = () => {
    console.log('Handling hackathon follow ');
  };

  const handleDetails = () => {
    if (source === 'organization') {
      navigation.navigate('HackahtonScreens', {
        screen: 'HackathonTab',
        params: {
          screen: 'Overview',
          params: {
            ID: hackathonDetail.id,
          },
        },
      });
    } else if (source === 'student') {
      // if user has not participated
      if (hackathonDetail.is_applied) {
        navigation.navigate('HackahtonScreens', {
          screen: 'HackathonTab',
          params: {
            ID: hackathonDetail.id,
          },
        });
      } else {
        navigation.navigate('HackahtonScreens', {
          screen: 'View_Hackathon',
          params: {
            ID: hackathonDetail.id,
          },
        });
      }
    }
  };

  return (
    <View
      style={[
        styles.parent,
        {
          shadowColor: theme.SHADOW_COLOR,
          backgroundColor: theme.CARD_BACKGROUND_COLOR,
        },
      ]}>
      {/* header  */}
      {source === 'student' && (
        <>
          <View style={[styles.headerContainer]}>
            {/* user image  */}
            <View style={styles.headerImageContainer}>
              <Image
                source={{
                  uri: ProfileImageLoading
                    ? PROFILE_IMAGE
                    : BASE_URL +
                      hackathonDetail.organization.user.profile_image.path,
                }}
                onLoadEnd={() => setProfileImageLoading(false)}
                style={styles.userImage}
              />
            </View>
            <View style={styles.headerTextContainer}>
              <Text
                style={[
                  styles.username,
                  {
                    color: theme.TEXT_COLOR,
                  },
                ]}>
                {hackathonDetail.organization.name}
              </Text>
              <Text style={[styles.date, {color: theme.TEXT_COLOR}]}>
                {new Date(hackathonDetail.created_at).toDateString() ===
                new Date(hackathonDetail.updated_at).toDateString()
                  ? `${new Date(hackathonDetail.created_at).toDateString()}`
                  : `Updated at ${new Date(
                      hackathonDetail.updated_at,
                    ).toDateString()}`}
              </Text>
            </View>
            {/* right icon  */}
            <View style={styles.headerIconContainer}>
              <STDPopUpMenu
                navigation={navigation}
                handleFollow={handleFollow}
                handleShare={handleShare}
              />
            </View>
          </View>
          <Divider width={Width * 0.92} />
        </>
      )}

      <View style={[styles.topicContainer, styles.center]}>
        {/* name of the project  */}
        <View style={styles.topicTextContainer}>
          <Text style={[styles.topicText, {color: theme.TEXT_COLOR}]}>
            {hackathonDetail.title}
          </Text>
        </View>
        {/* menu icon  */}
        {source === 'organization' && (
          <View style={styles.popUpIconContainer}>
            <ORGPopUpMenu
              navigation={navigation}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
            />
          </View>
        )}
      </View>
      {/* hackathon imaeg  */}
      <View style={[styles.posterContainer, styles.center]}>
        <Image
          source={{
            uri: HackathonImageLoading
              ? GREY_IMAGE
              : BASE_URL + hackathonDetail.background_image,
          }}
          onLoadEnd={() => {
            Image.getSize(
              BASE_URL + hackathonDetail.background_image,
              (width, heigth) => {
                // calculate aspect ratio of image
                setImageAspectRatio(heigth / width);
                setHackathonImageLoading(false);
              },
            );
          }}
          style={{
            width: Width * 0.78,
            height: Width * ImageAspectRatio * 0.78,
            borderRadius: 5,
          }}
          resizeMode={'contain'} //contain
        />
      </View>

      {/* icons container  */}
      <View style={styles.iconsContainer}>
        <View style={styles.iconsRow}>
          <Tag size={1} color={theme.GREEN_COLOR} />

          <View style={styles.iconTextContainer}>
            {hackathonDetail.theme_tags.map((tag, index) => {
              if (index < 2) {
                return (
                  <Text
                    style={[
                      styles.iconText,
                      {
                        color: theme.TEXT_COLOR,
                      },
                    ]}>
                    {tag}
                    {hackathonDetail.theme_tags.length > 1 && index !== 1
                      ? ','
                      : hackathonDetail.theme_tags.length === 2 && index === 1
                      ? '.'
                      : hackathonDetail.theme_tags.length === 1 &&
                        index === 0 &&
                        '.'}
                  </Text>
                );
              }
            })}
            {hackathonDetail.theme_tags.length > 2 && (
              <Text style={[styles.iconText, {color: theme.TEXT_COLOR}]}>
                . . .
              </Text>
            )}
          </View>
        </View>

        <View style={styles.iconsRow}>
          <People size={1} color={theme.GREEN_COLOR} />
          <View style={styles.iconTextContainer}>
            <Text style={[styles.iconText, {color: theme.TEXT_COLOR}]}>
              {hackathonDetail.participants} Participants
            </Text>
          </View>
        </View>
        <View style={styles.iconsRow}>
          <Cash size={1} color={theme.GREEN_COLOR} />
          <View style={styles.iconTextContainer}>
            <Text style={[styles.iconText, {color: theme.TEXT_COLOR}]}>
              Rs {commaSeperator(hackathonDetail.total_prize)}
            </Text>
          </View>
        </View>

        <View style={styles.iconsRow}>
          <View style={{flex: 1, flexDirection: 'row'}}>
            {hackathonDetail.is_applied ? (
              <>
                <Tick size={0.9} color={theme.GREEN_COLOR} />
                <View style={styles.iconTextContainer}>
                  <Text
                    style={[
                      styles.iconText,
                      {
                        color: theme.TEXT_COLOR,
                      },
                    ]}>
                    Applied
                  </Text>
                </View>
              </>
            ) : (
              <View style={{flex: 1, flexDirection: 'row'}}>
                {hackathonDetail.days_left !== 0 &&
                hackathonDetail.status === 'Open' ? (
                  <>
                    <Ionicons
                      name={'time-outline'}
                      color={theme.GREEN_COLOR}
                      size={Width * 0.07}
                    />
                    <View style={styles.iconTextContainer}>
                      <Text
                        style={[
                          styles.iconText,
                          {
                            color: theme.TEXT_COLOR,
                          },
                        ]}>
                        {hackathonDetail.days_left}
                        {hackathonDetail.days_left > 1
                          ? ' days left'
                          : hackathonDetail.days_left === 1
                          ? hackathonDetail.days_left === 0
                          : ' Last Day to Apply'}
                      </Text>
                    </View>
                  </>
                ) : (
                  <>
                    <Ionicons
                      name={'information-circle-outline'}
                      color={theme.GREEN_COLOR}
                      size={Width * 0.07}
                    />
                    <View style={styles.iconTextContainer}>
                      <Text
                        style={[
                          styles.iconText,
                          {
                            color: theme.TEXT_COLOR,
                          },
                        ]}>
                        Closed
                      </Text>
                    </View>
                  </>
                )}
              </View>
            )}
          </View>
        </View>
      </View>

      <View style={[styles.detailsButtonContainer, styles.ButtonContainer]}>
        <CustomButton
          children={
            <View style={styles.buttonIconContainer}>
              <ForwardArrow size={0.75} />
            </View>
          }
          text={'Details'}
          textSize={Sizes.normal * 0.9}
          onPress={handleDetails}
          width={Width * 0.3}
          height={Height * 0.055}
        />
      </View>
    </View>
  );
};

export default HackathonCard;

const styles = StyleSheet.create({
  parent: {
    marginHorizontal: Width * 0.04,
    marginVertical: Width * 0.03,
    borderRadius: 10,
    shadowOpacity: 1,
    shadowRadius: 25,
    shadowOffset: {width: 10, height: 12},
    elevation: 5,
  },
  headerContainer: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 7,
  },
  headerImageContainer: {
    // width: Width * 0.3,
    flex: 0.2,
  },
  username: {
    fontSize: Sizes.large * 0.9,
    fontWeight: 'bold',
  },
  posterContainer: {
    marginHorizontal: 0,
    marginTop: 10,
  },
  topicContainer: {
    marginBottom: 10,
    marginTop: 10,
    flex: 1,
    flexDirection: 'row',
  },
  topicTextContainer: {
    flex: 0.92,
    alignItems: 'center',
    marginLeft: Width * 0.1,
  },
  popUpIconContainer: {
    flex: 0.08,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  topicText: {
    fontSize: Sizes.normal * 1.2,
  },
  userImage: {
    height: Height * 0.07,
    width: Width * 0.14,
    borderRadius: 40,
  },
  logoImage: {
    height: Height * 0.07,
    width: Width * 0.14,
    borderRadius: 40,
  },
  headerTextContainer: {
    flex: 0.7,
    flexDirection: 'column',
  },
  headerIconContainer: {
    flex: 0.1,
    paddingTop: 4,
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
  },
  date: {
    fontSize: Sizes.normal * 0.75,
    fontStyle: 'italic',
  },
  contentContainer: {
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  titleText: {
    fontSize: Sizes.normal * 1.2,
  },
  tagLineText: {
    fontSize: Sizes.normal * 0.8,
    fontStyle: 'italic',
    lineHeight: 20,
  },
  themeContainer: {
    flexDirection: 'row',
    marginLeft: 8,
  },
  iconsContainer: {
    paddingTop: 10,
    marginHorizontal: Width * 0.032,
  },
  iconsRow: {
    flexDirection: 'row',
    marginVertical: 5,
  },
  iconText: {
    fontSize: Sizes.normal * 0.9,
    paddingHorizontal: 2,
  },
  iconTextContainer: {
    flexDirection: 'row',
    marginLeft: 8,
  },
  bottomContainer: {
    flexDirection: 'row',
    paddingBottom: 10,
    marginHorizontal: Width * 0.032,
  },
  uploadDateContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
  },
  ButtonContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  viewButtonContainer: {
    padding: 9,
    flex: 1,
    width: Width * 0.35,
    flexDirection: 'row',
    marginHorizontal: Width * 0.008,
    borderRadius: 10,
  },
  detailsButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  buttonIconContainer: {
    justifyContent: 'center',
    marginHorizontal: 2,
    alignItems: 'center',
  },
});
