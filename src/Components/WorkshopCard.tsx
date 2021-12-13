import React, {createRef, FC, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ToastAndroid,
} from 'react-native';
import {Height, Sizes, Width} from '../Constants/Size';
import ORGPopUpMenu from '../Menu/OrganizationWorkshopCardPopUpMenu';
import {GREY_IMAGE, PROFILE_IMAGE} from '../Constants/sample';
// @ts-ignore
import {BASE_URL} from 'react-native-dotenv';
import {commaSeperator} from '../Utils/Numbers';
import {useStateValue} from '../Store/StateProvider';
import STDPopMenu from '../Menu/StudentWorkshopCardPopUpMenu';
import Axios from '../Utils/Axios';
import Divider from '../Components/Divider';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import LinkedInModal from 'react-native-linkedin';
import {Cash, Clock, ForwardArrow, People, Tag, Tick} from './Icons';
import CustomButton from './CustomButton';
//@ts-ignore
import {LINKEDIN_CLIENT_ID, LINKEDIN_CLIENT_SECRET} from 'react-native-dotenv';
import LinkedInSignInModal from '../Modals/LinkedInSignInModal';

const ICON_SIZE = Width * 0.07;

type cardProps = {
  name: string;
  label: string | number;
  cash?: boolean;
};
const WorkshopCardIcons: FC<cardProps> = ({name, label, cash}) => {
  const {theme} = useStateValue()[0];

  return (
    <View style={{flex: 1, flexDirection: 'row'}}>
      {cash ? (
        <Cash size={1} color={theme.GREEN_COLOR} />
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
  source: 'student' | 'organization';
  workshopDetail: any;
};
const WorkshopCard: FC<props> = ({navigation, source, workshopDetail}) => {
  const [WokrshopPosterLoading, setWokrshopPosterLoading] = useState(true);
  const [ImageAspectRatio, setImageAspectRatio] = useState(0);
  const [ProfileImageLoading, setProfileImageLoading] = useState(true); // org. image
  const [modal, setmodal] = useState({
    linkedIn: false,
  });
  const [{theme}, dispatch] = useStateValue();
  const ref = createRef<LinkedInModal>();

  const handleDelete = () => {
    console.log('Handling workshop delete');
  };

  const handleEdit = () => {
    navigation.navigate('WorkshopScreens', {
      screen: 'Create_Edit_Workshop',
      params: {
        ID: workshopDetail.id,
        method: 'edit',
      },
    });
  };

  const handleBookmark = () => {};
  const handleReport = () => {};
  const handleShare = () => {
    console.log('Share is', modal.linkedIn);
    setmodal({
      linkedIn: true,
    });
  };

  const handleDetails = () => {
    if (source === 'organization') {
      navigation.navigate('WorkshopScreens', {
        screen: 'WorkshopTab',
        params: {
          ID: workshopDetail.id,
        },
      });
    } else if (source === 'student') {
      navigation.navigate('WorkshopScreens', {
        screen: 'View_Workshop',
        params: {
          ID: workshopDetail.id,
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
      <LinkedInSignInModal
        isShow={modal.linkedIn}
        toggleModal={() =>
          setmodal({
            linkedIn: false,
          })
        }
      />

      {source === 'student' && (
        <>
          {/* header  */}
          <View style={[styles.headerContainer]}>
            {/* user image  */}
            <View style={styles.headerImageContainer}>
              <Image
                source={{
                  uri: ProfileImageLoading
                    ? PROFILE_IMAGE
                    : workshopDetail.organization.user.profile_image
                    ? workshopDetail.organization.user.profile_image.path
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
                {workshopDetail.organization.name}
              </Text>
              <Text style={[styles.date, {color: theme.TEXT_COLOR}]}>
                {new Date(workshopDetail.created_at).toDateString() ===
                new Date(workshopDetail.updated_at).toDateString()
                  ? `${new Date(workshopDetail.created_at).toDateString()}`
                  : `Updated at ${new Date(
                      workshopDetail.updated_at,
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
      {/* content  */}
      <View style={[styles.topicContainer, styles.center]}>
        {/* name of the project  */}
        <View style={styles.topicTextContainer}>
          <Text style={[styles.topicText, {color: theme.TEXT_COLOR}]}>
            {workshopDetail.topic}
          </Text>
        </View>
        {/* menu icon  */}
        {source === 'organization' && (
          <View style={styles.popUpIconContainer}>
            <ORGPopUpMenu
              navigation={navigation}
              editable={workshopDetail.status !== 'Ended'}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
            />
          </View>
        )}
      </View>
      {/* workshop poster  */}
      <View style={[styles.posterContainer, styles.center]}>
        <Image
          source={{
            uri: WokrshopPosterLoading ? GREY_IMAGE : workshopDetail.poster,
          }}
          onLoadEnd={() => {
            Image.getSize(workshopDetail.poster, (width, heigth) => {
              // calculate aspect ratio of image
              setImageAspectRatio(heigth / width);
              setWokrshopPosterLoading(false);
            });
          }}
          style={{
            width: Width * 0.78,
            height: Width * ImageAspectRatio * 0.78,
            borderRadius: 10,
          }}
          resizeMode={'contain'} //contain
        />
      </View>
      {/* if workshop is paid */}
      <View style={{marginTop: 10}}>
        {workshopDetail.is_paid ? (
          <View style={styles.iconContainer}>
            <WorkshopCardIcons
              cash
              name={'cash-outline'}
              label={`Rs ${commaSeperator(workshopDetail.charges)}`}
            />
          </View>
        ) : (
          <View style={styles.iconContainer}>
            <WorkshopCardIcons cash name={'cash-outline'} label={`Free`} />
          </View>
        )}
        {/* if the workshop is open to join  */}
        <View style={styles.iconContainer}>
          <View style={{flex: 1, flexDirection: 'row'}}>
            {workshopDetail.is_applied ? (
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
                {workshopDetail.days_left !== 0 &&
                workshopDetail.status === 'Open' ? (
                  <WorkshopCardIcons
                    name={'time-outline'}
                    label={`${workshopDetail.days_left}${' '}${
                      workshopDetail.days_left > 1
                        ? ' days left'
                        : workshopDetail.days_left === 1
                        ? workshopDetail.days_left === 0
                        : ' Last Day to Apply'
                    }`}
                  />
                ) : (
                  <WorkshopCardIcons
                    name={'information-circle-outline'}
                    label={`Closed `}
                  />
                )}
              </View>
            )}
          </View>
        </View>

        <View style={{marginTop: 5, marginHorizontal: Width * 0.04}}>
          <WorkshopCardIcons
            name={'people-sharp'}
            label={`${workshopDetail.participants}  ${
              workshopDetail.participants === 1 ? 'Participant' : 'Participants'
            }`}
          />
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

export default WorkshopCard;

const styles = StyleSheet.create({
  parent: {
    marginHorizontal: Width * 0.04,
    marginVertical: Width * 0.03,
    // marginVertical: Width * 0.01,
    // minHeight: Height * 0.35,
    // maxHeight: Height * 0.8,
    borderRadius: 10,
    shadowOpacity: 1,
    shadowRadius: 25,
    shadowOffset: {width: 10, height: 12},
    elevation: 5,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
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
  topicText: {
    fontSize: Sizes.normal * 1.2,
  },
  descriptionText: {
    fontSize: Sizes.normal,
    lineHeight: 24,
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
