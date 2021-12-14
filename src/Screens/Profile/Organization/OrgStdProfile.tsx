/* eslint-disable react-hooks/exhaustive-deps */
import React, {FC, useEffect, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  View,
  Image,
} from 'react-native';
import CustomHeader from '../../../Components/CustomHeader';
import Loading from '../../../Components/Loading';
import {PROFILE_IMAGE} from '../../../Constants/sample';
import {useStateValue} from '../../../Store/StateProvider';
import axios from '../../../Utils/Axios';
// @ts-ignore
import {BASE_URL} from 'react-native-dotenv';
import {Sizes, Width} from '../../../Constants/Size';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Calendar, Github, LinkedIn, Twitter} from '../../../Components/Icons';
import Bullet from '../../../Components/Bullet';
import Divider from '../../../Components/Divider';
import Profile from '../../../Animations/Lottie/Profile';

const ICON_SIZE = Width * 0.05;

const UserInfo = ({
  icon,
  label,
  value,
  date = false,
  github = false,
  linked_in = false,
  twitter = false,
}) => {
  const [state, dispatch] = useStateValue();

  return (
    <View style={styles.userInfoContainer}>
      {date ? (
        <Calendar color={state.theme.GREEN_COLOR} size={0.75} />
      ) : github ? (
        <Github color={state.theme.GREEN_COLOR} size={0.75} />
      ) : linked_in ? (
        <LinkedIn color={state.theme.GREEN_COLOR} size={0.75} />
      ) : twitter ? (
        <Twitter color={state.theme.GREEN_COLOR} size={0.75} />
      ) : (
        <Ionicons
          name={icon}
          size={ICON_SIZE}
          color={state.theme.GREEN_COLOR}
        />
      )}

      <Text style={[styles.label, {color: state.theme.TEXT_COLOR}]}>
        <Text style={[styles.value, {color: state.theme.TEXT_COLOR}]}>
          {'   '}
          {value}
        </Text>
      </Text>
    </View>
  );
};

type props = {
  navigation: any;
  route: any;
};
const OrgStdProfile: FC<props> = ({navigation, route}) => {
  const [loading, setloading] = useState(true);
  const [profileImage, setprofileImage] = useState(true);
  const [data, setData] = useState<any>({});
  const {theme} = useStateValue()[0];
  const {ID} = route.params;

  const getData = async () => {
    setloading(true);

    axios
      .get(`/user/student/${ID}`)
      .then(response => {
        setData(response.data);
        setloading(false);
        setprofileImage(false);
      })
      .catch(error => {
        if (error.response) {
          ToastAndroid.show(error.response.data.error, 1500);
        }
        setloading(false);
        setprofileImage(false);
        return error.response;
      });
  };

  useEffect(() => {
    getData();
  }, []);

  if (loading && Object.keys(data).length === 0) {
    return (
      <View style={[styles.parent, styles.center]}>
        <Profile loop />
      </View>
    );
  } else {
    return (
      <View
        style={[
          styles.parent,
          {
            backgroundColor: theme.SCREEN_BACKGROUND_COLOR,
          },
        ]}>
        <CustomHeader
          title={`@${data.student.username}`}
          navigation={navigation}
          back
          onBackPress={() => navigation.goBack()}
        />
        {Object.keys(data).length !== 0 ? (
          <ScrollView>
            <View style={[styles.scroll, {marginBottom: 10}]}>
              <View
                style={[
                  styles.container,
                  styles.center,
                  styles.profileImageContainer,
                ]}>
                <Image
                  source={{
                    uri: profileImage
                      ? PROFILE_IMAGE
                      : data?.student.profile_image
                      ? BASE_URL + data?.student.profile_image.path
                      : PROFILE_IMAGE,
                  }}
                  style={[
                    styles.profileImage,
                    !profileImage &&
                      data?.student.profile_image && {
                        borderRadius: 50,
                        borderWidth: 3,
                        borderColor: theme.GREEN_COLOR,
                      },
                  ]}
                  resizeMode={'cover'}
                  onLoadEnd={() => setprofileImage(false)}
                  onError={() => {
                    setprofileImage(false);
                  }}
                />
              </View>
              <View
                style={[styles.container, styles.center, styles.nameContainer]}>
                <Text style={[styles.name, {color: theme.TEXT_COLOR}]}>
                  {data.student.first_name + ' '}
                  {data.student.last_name}
                </Text>
                <Text style={[styles.user_name, {color: theme.DIM_TEXT_COLOR}]}>
                  @{data.student.username}
                </Text>
                <Text style={[styles.bio, {color: theme.TEXT_COLOR}]}>
                  {data.bio}
                </Text>
              </View>
              <View style={[styles.container, styles.center]}>
                {data.lives_in !== '' && (
                  <UserInfo
                    icon={'location-outline'}
                    label={'Lives in'}
                    value={data.lives_in}
                  />
                )}
                {data.student.email !== '' && (
                  <UserInfo
                    icon={'md-mail-outline'}
                    label={'Email'}
                    value={data.student.email}
                  />
                )}
                {data.education !== '' && (
                  <UserInfo
                    icon={'book-outline'}
                    label={'Education'}
                    value={data?.education}
                  />
                )}
                {data.date_of_birth !== '' && (
                  <UserInfo
                    icon={'book-outline'}
                    label={'Date of Birth'}
                    value={data?.date_of_birth}
                    date
                  />
                )}
                {data.linked_in !== '' && (
                  <UserInfo
                    icon={'book-outline'}
                    label={'LinkedIn'}
                    value={data?.linked_in}
                    linked_in
                  />
                )}
                {data.github !== '' && (
                  <UserInfo
                    icon={'book-outline'}
                    label={'Github'}
                    value={data?.github}
                    github
                  />
                )}
                {data.twitter !== '' && (
                  <UserInfo
                    icon={'book-outline'}
                    label={'Twitter'}
                    value={data?.twitter}
                    twitter
                  />
                )}
              </View>
              <Divider size={'large'} width={Width * 0.83} />

              {data.skills.length > 0 && (
                <View style={styles.container}>
                  <Text style={[styles.normal, {color: theme.TEXT_COLOR}]}>
                    Skills{' '}
                  </Text>

                  <View style={[styles.margin]}>
                    {data.skills.map(skill => (
                      <View style={[styles.container, {flexDirection: 'row'}]}>
                        <Bullet color={theme.GREEN_COLOR} />
                        <Text style={[styles.value, {color: theme.TEXT_COLOR}]}>
                          {skill}
                        </Text>
                      </View>
                    ))}
                  </View>
                </View>
              )}

              {data.interests.length > 0 && (
                <View style={styles.container}>
                  <Text style={[styles.normal, {color: theme.TEXT_COLOR}]}>
                    Interests{' '}
                  </Text>

                  <View style={[styles.margin]}>
                    {data.interests.map(interest => (
                      <View style={[styles.container, {flexDirection: 'row'}]}>
                        <Bullet color={theme.GREEN_COLOR} />
                        <Text style={[styles.value, {color: theme.TEXT_COLOR}]}>
                          {interest}{' '}
                        </Text>
                      </View>
                    ))}
                  </View>
                </View>
              )}
            </View>
          </ScrollView>
        ) : (
          <View style={[styles.center]}>
            <Text style={[styles.normal, {color: theme.TEXT_COLOR}]}>
              Couldn't load profile
            </Text>
          </View>
        )}

        <View></View>
      </View>
    );
  }
};

export default OrgStdProfile;

const styles = StyleSheet.create({
  parent: {
    flex: 1,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    marginTop: 10,
  },
  scroll: {
    marginHorizontal: Width * 0.04,
  },
  margin: {
    marginHorizontal: Width * 0.04,
  },
  normal: {
    fontSize: Sizes.normal,
  },
  profileImageContainer: {
    marginTop: 20,
  },
  profileImage: {
    width: Width * 0.25,
    height: Width * 0.25,
  },
  nameContainer: {
    marginTop: 20,
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
  userInfoContainer: {
    marginHorizontal: Width * 0.04,
    marginVertical: 5,
    flexDirection: 'row',
  },
  label: {
    fontSize: Sizes.normal * 0.9,
  },
  value: {
    fontSize: Sizes.normal * 0.76,
  },
});
