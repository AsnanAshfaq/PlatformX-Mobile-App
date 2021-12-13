import React, {FC, useState} from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {PROFILE_IMAGE} from '../Constants/sample';
import {Height, Sizes, Width} from '../Constants/Size';
import {useStateValue} from '../Store/StateProvider';
import CustomButton from './CustomButton';
import {Cash, ForwardArrow, Tick} from './Icons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ORGPopUpMenu from '../Menu/OrganizationFYPCardPopUpMenu';
import STDPopMenu from '../Menu/StudentFYPCardPopUpMenu';
import DeleteFYPModal from '../Modals/FYPDeleteModal';
// @ts-ignore
import {BASE_URL} from 'react-native-dotenv';
import Divider from './Divider';
type props = {
  navigation: any;
  source: 'student' | 'organization';
  fypDetail: any;
};

const ICON_SIZE = Width * 0.07;

const FYPCard: FC<props> = ({navigation, source, fypDetail}) => {
  const [ProfileImageLoading, setProfileImageLoading] = useState(true); // org. image
  const [ImageAspectRatio, setImageAspectRatio] = useState(0);
  const [{theme}, dispatch] = useStateValue();
  const [modal, setmodal] = useState({
    delete: false,
  });

  const handleDelete = () => {
    // console.log('Clicked on report');
    // open delete modal
    setmodal({delete: true});
  };

  const handleEdit = () => {
    console.log('Clicked on share');
  };

  const handleBookmark = () => {};
  const handleReport = () => {};
  const handleShare = () => {};

  const handleDetails = () => {
    if (source === 'organization') {
      navigation.navigate('FYPScreens', {
        screen: 'FYPTab',
        params: {
          ID: fypDetail.id,
        },
      });
    } else if (source === 'student') {
      // if user has participated, then go to fyp tab screens
      // else go to view fyp screen
      if (fypDetail.is_applied) {
        navigation.navigate('FYPScreens', {
          screen: 'FYPTab',
          params: {
            ID: fypDetail.id,
            screen: 'student',
            is_applied: fypDetail.is_applied,
          },
        });
      } else {
        navigation.navigate('FYPScreens', {
          screen: 'View_FYP',
          params: {
            ID: fypDetail.id,
            screen: 'student',
            is_applied: fypDetail.is_applied,
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
      {/* delete modal  */}
      <DeleteFYPModal
        id={fypDetail.id}
        title={fypDetail.name}
        isShow={modal.delete}
        toggleModal={() => setmodal({delete: false})}
      />
      {source === 'student' && (
        <>
          <View style={[styles.headerContainer]}>
            {/* user image  */}
            <View style={styles.headerImageContainer}>
              <Image
                source={{
                  uri: ProfileImageLoading
                    ? PROFILE_IMAGE
                    : fypDetail.organization.user.profile_image
                    ? fypDetail.organization.user.profile_image.path
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
                {fypDetail.organization.name}
              </Text>
              <Text style={[styles.date, {color: theme.TEXT_COLOR}]}>
                {new Date(fypDetail.created_at).toDateString() ===
                new Date(fypDetail.updated_at).toDateString()
                  ? `${new Date(fypDetail.created_at).toDateString()}`
                  : `Updated at ${new Date(
                      fypDetail.updated_at,
                    ).toDateString()}`}
              </Text>
            </View>
            {/* right icon  */}
            <View style={styles.headerIconContainer}>
              <STDPopMenu
                navigation={navigation}
                handleBookmark={handleBookmark}
                handleShare={handleShare}
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
              {fypDetail.name}
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

        <View style={[styles.descriptionContainer, styles.center]}>
          {/* description of the project  */}
          <Text style={[styles.descriptionText, {color: theme.TEXT_COLOR}]}>
            {fypDetail.description}
          </Text>
        </View>
      </View>
      {/* icons container  */}
      <View style={{marginTop: 10}}>
        {/* category icon container  */}
        <View style={styles.iconContainer}>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <Ionicons
              size={ICON_SIZE * 0.9}
              color={theme.GREEN_COLOR}
              name={'grid-outline'}
            />
            <View style={styles.iconTextContainer}>
              {fypDetail.category.map((categ, index) => {
                if (index < 1) {
                  return (
                    <Text
                      style={[
                        styles.iconText,
                        {
                          color: theme.TEXT_COLOR,
                        },
                      ]}>
                      {categ}
                      {fypDetail.category.length > 0 && index !== 0
                        ? ','
                        : fypDetail.category.length === 1 && index === 0
                        ? '.'
                        : fypDetail.category.length === 0 && index === 0 && '.'}
                    </Text>
                  );
                }
              })}
              {fypDetail.category.length > 1 && (
                <Text style={[styles.iconText, {color: theme.TEXT_COLOR}]}>
                  . . .
                </Text>
              )}
            </View>
          </View>
        </View>

        {/* technologies container */}
        <View style={styles.iconContainer}>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <Ionicons
              size={ICON_SIZE * 0.9}
              color={theme.GREEN_COLOR}
              name={'code-slash-sharp'}
            />
            <View style={styles.iconTextContainer}>
              {fypDetail.technologies.map((tech, index) => {
                if (index < 2) {
                  return (
                    <Text
                      style={[
                        styles.iconText,
                        {
                          color: theme.TEXT_COLOR,
                        },
                      ]}>
                      {tech}
                      {fypDetail.technologies.length > 1 && index !== 1
                        ? ','
                        : fypDetail.technologies.length === 2 && index === 1
                        ? '.'
                        : fypDetail.technologies.length === 1 &&
                          index === 0 &&
                          '.'}
                    </Text>
                  );
                }
              })}
              {fypDetail.technologies.length > 2 && (
                <Text style={[styles.iconText, {color: theme.TEXT_COLOR}]}>
                  . . .
                </Text>
              )}
            </View>
          </View>
        </View>
        {/* date container  */}

        <View style={styles.iconContainer}>
          <View style={{flex: 1, flexDirection: 'row'}}>
            {fypDetail.is_applied ? (
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
                {fypDetail.days_left !== 0 && fypDetail.status === 'Open' ? (
                  <>
                    <Ionicons
                      size={ICON_SIZE * 0.9}
                      color={theme.GREEN_COLOR}
                      name={'information-circle-outline'}
                    />
                    <View style={styles.iconTextContainer}>
                      <Text
                        style={[
                          styles.iconText,
                          {
                            color: theme.TEXT_COLOR,
                          },
                        ]}>
                        {fypDetail.days_left}
                        {fypDetail.days_left > 1
                          ? ' days left'
                          : fypDetail.days_left === 1
                          ? fypDetail.days_left === 0
                          : ' Last Day to Apply'}
                      </Text>
                    </View>
                  </>
                ) : (
                  <>
                    <Ionicons
                      size={ICON_SIZE * 0.9}
                      color={theme.GREEN_COLOR}
                      name={'information-circle-outline'}
                    />
                    <>
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
                  </>
                )}
              </View>
            )}
          </View>
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

export default FYPCard;

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
  container: {
    marginVertical: 10,
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
  nameContainer: {
    // marginTop: 10,
    flex: 1,
    flexDirection: 'row',
  },
  nameTextContainer: {
    flex: 0.92,
    alignItems: 'center',
    marginLeft: Width * 0.1,
  },
  popUpIconContainer: {
    flex: 0.08,
  },
  nameText: {
    fontSize: Sizes.normal * 1.2,
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
  },
  iconContainer: {
    marginVertical: 5,
    marginHorizontal: Width * 0.04,
  },
  iconTextContainer: {
    flexDirection: 'row',
    marginLeft: 8,
  },
  iconText: {
    fontSize: Sizes.normal * 0.9,
    paddingHorizontal: 2,
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
