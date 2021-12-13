/* eslint-disable react-native/no-inline-styles */
//TODO:
// user background image
// user profile image
// user post's, follower's, following's
// user first name + last name , user name
// user user_name
// user bio
// user github link
// user linedin link
// edit profile button

import React, {FC, useRef, useEffect, useState, Dispatch} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
  ToastAndroid,
  FlatList,
  RefreshControl,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import CustomHeader from '../../../Components/CustomHeader';
import PostCard from '../../../Components/PostCard';
import {Height, Sizes, Width} from '../../../Constants/Size';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {PROFILE_IMAGE, BACKGROUND_IMAGE} from '../../../Constants/sample';
import axios from '../../../Utils/Axios';
import Loading from '../../../Components/Loading';
// @ts-ignore
import {BASE_URL} from 'react-native-dotenv';
import BottomImageModal from '../../../Modals/BottomImageModal';
import {useStateValue} from '../../../Store/StateProvider';
import CustomButton from '../../../Components/CustomButton';
import Divider from '../../../Components/Divider';
import Profile from '../../../Animations/Lottie/Profile';

const ICON_SIZE = Width * 0.06;

const CAMERA_ICON_SIZE = Width * 0.065;

const UserInfo = ({icon, label, value}) => {
  const [state, dispatch] = useStateValue();

  return (
    <View style={styles.userInfoContainer}>
      <Ionicons name={icon} size={ICON_SIZE} color={state.theme.GREEN_COLOR} />
      <Text style={[styles.label, {color: state.theme.TEXT_COLOR}]}>
        {'  '}
        {label}
        {'  '}
        <Text style={[styles.value, {color: state.theme.TEXT_COLOR}]}>
          {value}
        </Text>
      </Text>
    </View>
  );
};

type cardProps = {
  label: string;
  value: number;
  onPress: () => void;
};

const Card: FC<cardProps> = ({label, value, onPress}) => {
  const [{theme}, dispatch] = useStateValue();

  return (
    <View
      style={[
        styles.keyValueContainer,
        {
          borderColor: theme.DIVIDER_COLOR,
          borderRightWidth: label === 'Posts' ? 1.2 : 0,
          borderRightColor: label === 'Posts' ? theme.DIVIDER_COLOR : '',
          borderLeftWidth: label === 'Following' ? 1.2 : 0,
          borderLeftColor: label === 'Following' ? theme.DIVIDER_COLOR : '',
        },
      ]}>
      <TouchableOpacity onPress={onPress}>
        <View style={styles.center}>
          <Text style={[styles.label, {color: theme.TEXT_COLOR}]}>{label}</Text>
          <Text style={[styles.value, {color: theme.TEXT_COLOR}]}>{value}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

type props = {
  navigation: any;
};

const StudentProfile: FC<props> = ({navigation}) => {
  // states
  const [ProfileData, setProfileData] = useState<any>(null);
  const [Post, setPost] = useState([]);
  const [loading, setLoading] = useState(true);
  const [Refresh, setRefresh] = useState(false);
  const [state, dispatch] = useStateValue();
  const {theme} = state;

  const [LoadProfileImage, setLoadProfileImage] = useState(true);
  const [Modal, setModal] = useState<{
    imageID: string | null;
    isShow: boolean;
    type: 'profile' | 'background' | '';
    isImageSet: boolean;
  }>({
    imageID: null,
    isShow: false,
    type: '',
    isImageSet: false,
  });

  // ref
  const scrollViewRef = useRef<any>(null);
  const myPostRef = useRef<any>(null);

  // animate to post section
  const animteView = () => {
    if (scrollViewRef.current && myPostRef.current) {
      myPostRef?.current?.measureLayout(scrollViewRef.current, (x, y) => {
        scrollViewRef?.current?.scrollTo({
          x: 0,
          y: y,
          animated: true,
        });
      });
    }
  };

  const getUserDetails = async () => {
    axios
      .get('/user/')
      .then(response => {
        setProfileData(response.data);
        axios.get('/api/post/').then(postResponse => {
          setPost(postResponse.data);
          setLoading(false);
        });
      })
      .catch(error => {
        setLoading(false);
        if (error.response) {
          ToastAndroid.show(error.response.data.error, 1500);
        }
        return null;
      });
  };

  const onRefresh = () => {
    setRefresh(true);
    getUserDetails().then(() => {
      setRefresh(false);
    });
  };

  const handleImagePickerModal = (
    type: 'profile' | 'background',
    isImageSet: boolean,
    imageID = null,
  ) => {
    setModal({
      isShow: true,
      type: type,
      isImageSet: isImageSet,
      imageID: imageID,
    });
  };

  useEffect(() => {
    // get user data from data base
    getUserDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  if (!loading) {
    return (
      <View
        style={[
          styles.parent,
          {backgroundColor: state.theme.SCREEN_BACKGROUND_COLOR},
        ]}>
        <CustomHeader
          title={`@${ProfileData?.username}`}
          navigation={navigation}
          back
          onBackPress={() => navigation.goBack()}
        />

        <BottomImageModal
          isShow={Modal.isShow}
          toggleModal={() =>
            setModal(props => {
              return {
                ...props,
                isShow: !props.isShow,
                type: '',
                isImageSet: false,
              };
            })
          }
          type={Modal.type}
          isImageSet={Modal.isImageSet}
          refresh={onRefresh}
          imageID={Modal.imageID}
        />
        <ScrollView
          ref={scrollViewRef}
          keyboardShouldPersistTaps="handled"
          refreshControl={
            <RefreshControl
              refreshing={Refresh}
              onRefresh={onRefresh}
              colors={[theme.REFRESH_COLOR]}
              progressBackgroundColor={theme.REFRESHING_BACKGROUND_COLOR}
              progressViewOffset={20}
              size={Sizes.large}
            />
          }>
          <View style={styles.center}>
            <View style={{marginVertical: 15}}>
              <Image
                source={{
                  uri: LoadProfileImage
                    ? PROFILE_IMAGE
                    : ProfileData?.user_profile_image
                    ? BASE_URL + ProfileData?.user_profile_image.path
                    : PROFILE_IMAGE,
                }}
                style={[
                  styles.profile_image,
                  !LoadProfileImage &&
                    ProfileData?.user_profile_image && {
                      borderRadius: 50,
                      borderWidth: 3,
                      borderColor: state.theme.GREEN_COLOR,
                    },
                ]}
                resizeMode={'cover'}
                // onLoad={() => setLoadProfileImage(true)}
                onLoadEnd={() => setLoadProfileImage(false)}
                onError={() => {
                  setLoadProfileImage(false);
                  ToastAndroid.show("Couldn't load profile image", 1500);
                }}
              />
              {/* edit photo icon here  */}
              <TouchableWithoutFeedback
                onPress={() =>
                  handleImagePickerModal(
                    'profile',
                    ProfileData?.user_profile_image ? true : false,
                    ProfileData?.user_profile_image
                      ? ProfileData?.user_profile_image.id
                      : null,
                  )
                }>
                <Ionicons
                  name={'camera'}
                  size={CAMERA_ICON_SIZE}
                  color={state.theme.ICON_COLOR}
                  style={styles.profileCameraIcon}
                />
              </TouchableWithoutFeedback>
            </View>
          </View>

          {/* name-username-bio section  */}
          <View style={styles.personalInfoContainer}>
            <Text style={[styles.name, {color: state.theme.TEXT_COLOR}]}>
              {ProfileData?.first_name} {ProfileData?.last_name}
            </Text>
            <Text style={[styles.user_name, {color: state.theme.TEXT_COLOR}]}>
              @{ProfileData?.username}
            </Text>
            <Text style={[styles.bio, {color: state.theme.TEXT_COLOR}]}>
              {ProfileData?.student?.bio}
            </Text>
          </View>

          {/* post-followers-followings section  */}
          <View style={styles.card}>
            <Card
              label={'Posts'}
              value={Post.length !== 0 ? Post.length : 0}
              onPress={() => animteView()}
            />
            <Card
              label={'Followers'}
              value={
                ProfileData?.followed_id.length !== 0
                  ? ProfileData?.followed_id.length
                  : 0
              }
              onPress={() =>
                navigation.navigate('Follow_Tab', {
                  userName: ProfileData?.username,
                  activeScreen: 'Followers',
                })
              }
            />
            <Card
              label={'Following'}
              value={
                ProfileData?.follower_id.length !== 0
                  ? ProfileData?.follower_id.length
                  : 0
              }
              onPress={() =>
                navigation.navigate('Follow_Tab', {
                  userName: ProfileData?.username,
                  activeScreen: 'Following',
                })
              }
            />
          </View>

          {/* education-lives in-gender section */}

          <UserInfo
            icon={'location-outline'}
            label={'Lives in'}
            value={ProfileData?.student?.lives_in}
          />
          <UserInfo
            icon={'book-outline'}
            label={'Education'}
            value={ProfileData?.student?.education}
          />
          {/* <UserInfo
            icon={'calendar-outline'}
            label={'Date of Birth'}
            value={profileData.date_of_birth}
          /> */}
          <CustomButton
            text="Edit Profile"
            onPress={() => {
              navigation.navigate('Edit_Profile', {user: ProfileData});
            }}
            width={Width * 0.55}
            height={Width * 0.095}
          />

          {Post.length !== 0 ? (
            <View ref={myPostRef}>
              <FlatList
                data={Post}
                ListHeaderComponent={() => (
                  <>
                    <View style={[styles.myPostContainer]}>
                      <Text
                        style={[
                          styles.myPostText,
                          {color: state.theme.TEXT_COLOR},
                        ]}>
                        My Posts
                      </Text>
                    </View>
                    <Divider width={Width * 0.9} size="large" />
                  </>
                )}
                nestedScrollEnabled
                renderItem={({item: post, index, separators}: any) => (
                  <PostCard
                    key={post.id}
                    postDetail={post}
                    navigation={navigation}
                  />
                )}
              />
            </View>
          ) : (
            <View style={styles.noPostContainer}>
              <Text
                style={[
                  styles.noPostText,
                  {color: state.theme.DIM_TEXT_COLOR},
                ]}>
                You have not posted anything yet.
              </Text>
            </View>
          )}
        </ScrollView>
      </View>
    );
  }
  return (
    <View style={[styles.parent, styles.center]}>
      <Profile loop />
    </View>
  );
};

const styles = StyleSheet.create({
  parent: {
    flex: 1,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  profile_image: {
    width: Width * 0.25,
    height: Width * 0.25,
  },
  profileCameraIcon: {
    position: 'absolute',
    right: 3,
    bottom: -5,
  },
  personalInfoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  name: {
    fontSize: Sizes.normal * 1.2,
  },
  user_name: {
    fontSize: Sizes.normal * 0.8,
    marginVertical: 5,
  },
  bio: {
    fontSize: Sizes.normal * 0.8,
    marginVertical: 5,
  },
  card: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    marginVertical: 5,
    // marginHorizontal: Width * 0.2,
  },
  column: {
    flexDirection: 'column',
  },
  row: {
    flexDirection: 'row',
  },
  keyValueContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 2,
  },
  userInfoContainer: {
    marginHorizontal: Width * 0.04,
    marginVertical: 5,
    flexDirection: 'row',
  },
  label: {
    fontSize: Sizes.normal * 0.9,
  },
  value: {
    fontSize: Sizes.normal * 0.85,
  },
  viewButtonContainer: {
    // width: Width * 0.8,
    // flex: 1,
    marginHorizontal: Width * 0.04,
    marginVertical: 5,
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'transparent',
  },
  viewButtonText: {
    fontSize: Sizes.normal * 1.1,
    paddingVertical: 2,
  },
  myPostContainer: {
    marginVertical: 5,
    marginHorizontal: Width * 0.04,
  },
  myPostText: {
    fontSize: Sizes.normal * 1.1,
  },
  noPostContainer: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  noPostText: {
    fontSize: Sizes.normal * 0.8,
  },
});

export default StudentProfile;
