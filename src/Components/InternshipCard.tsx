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
import ORGPopUpMenu from '../Menu/OrganizationInternshipCardPopUpMenu';
import STDPopMenu from '../Menu/StudentInternshipCardPopUpMenu';
import {GREY_IMAGE, PROFILE_IMAGE} from '../Constants/sample';
// @ts-ignore
import {BASE_URL} from 'react-native-dotenv';
import {commaSeperator} from '../Utils/Numbers';
import {useStateValue} from '../Store/StateProvider';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Cash, Clock, ForwardArrow, People, Tag, Tick} from './Icons';
import CustomButton from './CustomButton';
import Divider from '../Components/Divider';
const ICON_SIZE = Width * 0.07;

type cardProps = {
  name: string;
  label: string | number;
  cash?: boolean;
  duration?: boolean;
};
const InternshipCardIcons: FC<cardProps> = ({name, label, cash, duration}) => {
  const {theme} = useStateValue()[0];

  return (
    <View style={{flex: 1, flexDirection: 'row'}}>
      {cash ? (
        <Cash size={1} color={theme.GREEN_COLOR} />
      ) : duration ? (
        <MaterialCommunityIcons
          name={name}
          size={ICON_SIZE}
          color={theme.GREEN_COLOR}
        />
      ) : (
        <Ionicons name={name} size={ICON_SIZE} color={theme.GREEN_COLOR} />
      )}
      <View style={styles.iconTextContainer}>
        <Text
          style={[
            styles.iconText,
            {
              color: theme.TEXT_COLOR,
            },
          ]}>
          {label}
        </Text>
      </View>
    </View>
  );
};

type props = {
  navigation: any;
  internshipDetail: any;
  source: 'student' | 'organization';
};
const InternshipCard: FC<props> = ({navigation, internshipDetail, source}) => {
  const [{theme}, dispatch] = useStateValue();
  const [ProfileImageLoading, setProfileImageLoading] = useState(true); // org. image

  const handleDelete = () => {
    console.log('Handling workshop delete');
  };

  const handleEdit = () => {
    navigation.navigate('InternshipScreens', {
      screen: 'Create_Edit_Internship',
      params: {
        ID: internshipDetail.id,
        method: 'edit',
      },
    });
  };

  const handleBookmark = () => {
    console.log('Handling workshop delete');
  };

  const handleReport = () => {};

  const handleShare = () => {};

  const handleDetails = () => {
    if (source === 'organization') {
      navigation.navigate('InternshipScreens', {
        screen: 'InternshipTab',
        params: {
          ID: internshipDetail.id,
        },
      });
    } else {
      navigation.navigate('InternshipScreens', {
        screen: 'View_Internship',
        params: {
          ID: internshipDetail.id,
        },
      });
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
      {source === 'student' && (
        <>
          <View style={[styles.headerContainer]}>
            {/* user image  */}
            <View style={styles.headerImageContainer}>
              <Image
                source={{
                  uri: ProfileImageLoading
                    ? PROFILE_IMAGE
                    : internshipDetail.organization.user.profile_image
                    ? internshipDetail.organization.user.profile_image.path
                    : PROFILE_IMAGE,
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
                {internshipDetail.organization.name}
              </Text>
              <Text style={[styles.date, {color: theme.TEXT_COLOR}]}>
                {new Date(internshipDetail.created_at).toDateString() ===
                new Date(internshipDetail.updated_at).toDateString()
                  ? `${new Date(internshipDetail.created_at).toDateString()}`
                  : `Updated at ${new Date(
                      internshipDetail.updated_at,
                    ).toDateString()}`}
              </Text>
            </View>
            {/* right icon  */}
            <View style={styles.headerIconContainer}>
              <STDPopMenu
                navigation={navigation}
                handleShare={handleShare}
                handleBookmark={handleBookmark}
                handleReport={handleReport}
              />
            </View>
          </View>
          <Divider width={Width * 0.92} />
        </>
      )}

      <View style={styles.container}>
        {/* content  */}
        <View style={[styles.nameContainer, styles.center]}>
          {/* name of the project  */}
          <View style={styles.nameTextContainer}>
            <Text style={[styles.nameText, {color: theme.TEXT_COLOR}]}>
              Looking for {internshipDetail.name}
            </Text>
          </View>

          {/* menu icon  */}
          <View style={styles.popUpIconContainer}>
            {source === 'organization' && (
              <ORGPopUpMenu
                navigation={navigation}
                handleDelete={handleDelete}
                handleEdit={handleEdit}
                editable={internshipDetail.status !== 'Ended'}
              />
            )}
          </View>
        </View>

        <View style={[styles.descriptionContainer, styles.center]}>
          {/* description of the project  */}
          <Text style={[styles.descriptionText, {color: theme.TEXT_COLOR}]}>
            {internshipDetail.description}
          </Text>
        </View>
      </View>
      {/* workshop poster  */}

      {/* if workshop is paid */}
      <View style={{marginTop: 10}}>
        {internshipDetail.is_paid ? (
          <View style={styles.iconContainer}>
            <InternshipCardIcons
              cash
              name={'cash-outline'}
              label={`Stipend Rs ${commaSeperator(internshipDetail.stipend)}`}
            />
          </View>
        ) : (
          <View style={styles.iconContainer}>
            <InternshipCardIcons cash name={'cash-outline'} label={`Free`} />
          </View>
        )}

        <View style={{marginTop: 5, marginHorizontal: Width * 0.04}}>
          <InternshipCardIcons
            name={'briefcase-clock-outline'}
            duration
            label={`Duration ${internshipDetail.duration} Months`}
          />
        </View>
      </View>

      <View style={styles.iconContainer}>
        <View style={{flex: 1, flexDirection: 'row'}}>
          {internshipDetail.is_applied ? (
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
            <View style={{flex: 1, flexDirection: 'row', marginTop: 5}}>
              {internshipDetail.days_left !== 0 &&
              internshipDetail.status === 'Open' ? (
                <InternshipCardIcons
                  name={'time-outline'}
                  label={`${internshipDetail.days_left}${' '}${
                    internshipDetail.days_left > 1
                      ? ' days left'
                      : internshipDetail.days_left === 1
                      ? internshipDetail.days_left === 0
                      : ' Last Day to Apply'
                  }`}
                />
              ) : (
                <InternshipCardIcons
                  name={'information-circle-outline'}
                  label={`Closed `}
                />
              )}
            </View>
          )}
        </View>
      </View>

      {/* apply now button  */}
      <View style={styles.detailsButtonContainer}>
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

export default InternshipCard;

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
    minHeight: Height * 0.08,
    maxHeight: Height * 0.15,
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 7,
  },
  headerImageContainer: {
    // width: Width * 0.3,
    flex: 0.2,
  },
  headerTextContainer: {
    // width: Width * 0.6,
    flex: 0.7,
    flexDirection: 'column',
  },
  headerIconContainer: {
    flex: 0.1,
    justifyContent: 'center',
  },
  userImage: {
    height: Height * 0.07,
    width: Width * 0.14,
    borderRadius: 40,
  },
  username: {
    fontSize: Sizes.large * 0.9,
    fontWeight: 'bold',
  },
  date: {
    fontSize: Sizes.normal * 0.75,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    marginVertical: 10,
  },
  popUpIconContainer: {
    flex: 0.08,
  },
  nameContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  nameTextContainer: {
    flex: 0.92,
    alignItems: 'center',
    marginLeft: Width * 0.1,
  },
  nameText: {
    fontSize: Sizes.normal * 1.2,
    flexShrink: 1,
    textAlign: 'center',
  },
  descriptionContainer: {
    marginTop: 10,
    marginHorizontal: Width * 0.04,
  },
  descriptionText: {
    fontSize: Sizes.normal * 0.8,
    lineHeight: 20,
    textAlign: 'center',
  },
  posterContainer: {
    marginHorizontal: 0,
    marginTop: 10,
  },
  iconContainer: {
    marginVertical: 5,
    marginHorizontal: Width * 0.04,
  },
  iconTextContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 5,
  },
  iconText: {
    fontSize: Sizes.normal * 0.9,
    paddingHorizontal: 5,
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
