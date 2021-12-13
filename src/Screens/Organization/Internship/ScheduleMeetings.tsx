/* eslint-disable react-hooks/exhaustive-deps */
import React, {FC, useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableWithoutFeedback,
  Linking,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import CustomButton from '../../../Components/CustomButton';
import CustomHeader from '../../../Components/CustomHeader';
import {PROFILE_IMAGE} from '../../../Constants/sample';
import {Sizes, Width} from '../../../Constants/Size';
import {useStateValue} from '../../../Store/StateProvider';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
//@ts-ignore
import {BASE_URL} from 'react-native-dotenv';
import DateTimePicker from '../../../Components/DateTimePicker';
import Loading from '../../../Components/Loading';
import {
  Calendar,
  CodeDownload,
  Github,
  LinkedIn,
} from '../../../Components/Icons';
import Divider from '../../../Components/Divider';
import Axios from '../../../Utils/Axios';
import InternshipScheduleSuccessModal from '../../../Modals/InternshipScheduleSuccessModal';

const DownloadContainer: FC<{loading; onPress; label}> = ({
  loading,
  onPress,
  label,
}) => {
  const [{theme}, dispatch] = useStateValue();

  return (
    <View style={[styles.center, {marginHorizontal: Width * 0.04}]}>
      <TouchableOpacity
        onPress={onPress}
        disabled={loading}
        style={[
          styles.cardContainer,
          {
            backgroundColor: theme.CARD_BACKGROUND_COLOR,
          },
        ]}>
        {loading ? (
          <Loading size={'small'} />
        ) : (
          <>
            <View style={styles.cardTextContainer}>
              <Text style={[styles.cardText, {color: theme.TEXT_COLOR}]}>
                Download {label}
              </Text>
            </View>
            <View style={styles.cardIconContainer}>
              <CodeDownload size={1} color={theme.GREEN_COLOR} />
            </View>
          </>
        )}
      </TouchableOpacity>
    </View>
  );
};

type props = {
  navigation: any;
  route: any;
};
const ScheduleMeetings: FC<props> = ({navigation, route}) => {
  const [{theme}, dispatch] = useStateValue();
  const [loading, setloading] = useState(true);
  const [userdata, setUserData] = useState<any>();
  const [ImageLoading, setImageLoading] = useState(true);
  const {internship_id, user_id} = route.params;
  const [fileLoading, setfileLoading] = useState({
    cv: false,
    resume: false,
  });
  const [dateModal, setDatemodal] = useState<{
    isShown: boolean;
    mode: 'datetime';
    value: Date;
  }>({
    isShown: false,
    mode: 'datetime',
    value: new Date(),
  });
  const [error, seterror] = useState('');
  const [scheduleLoading, setscheduleLoading] = useState(false);
  const [successModal, setSuccessModal] = useState(false);

  const handleViewProfile = () => {
    //   navigate to user profile
    navigation.navigate('ViewStudentProfile', {
      ID: userdata.student.uuid,
    });
  };

  const handleCVDownload = (url: string) => {
    Linking.openURL(BASE_URL + url);
  };

  const handleResumeDownload = (url: string) => {
    Linking.openURL(BASE_URL + url);
  };

  const handleSchedule = () => {
    seterror('');
    setscheduleLoading(true);

    if (
      dateModal.value.toLocaleDateString() === new Date().toLocaleDateString()
    ) {
      let timeDifference = dateModal.value.getHours() - new Date().getHours();
      if (timeDifference === 0 || timeDifference < 0) {
        seterror('Invalid time for interview');
        setscheduleLoading(false);
      } else if (timeDifference < 2) {
        seterror('interview time should be more than 2 hours from now.');
        setscheduleLoading(false);
      } else {
        // make api call
        Axios.post(
          `/api/internship/${internship_id}/applicant/${user_id}/meeting/`,
          {
            time: dateModal.value,
          },
        )
          .then(response => {
            // show success modal
            setscheduleLoading(false);
            setSuccessModal(true);
          })
          .catch(err => {
            setscheduleLoading(false);
            ToastAndroid.show(err.response.data.error, 1500);
          });
      }
    } else if (dateModal.value < new Date()) {
      seterror('Invalid date');
      setscheduleLoading(false);
    } else {
      seterror('');
      setscheduleLoading(false);
    }
  };

  const getData = async () => {
    Axios.get(`/api/internship/${internship_id}/applicant/${user_id}`)
      .then(response => {
        setUserData(response.data);
        setloading(false);
      })
      .catch(error => {
        setloading(false);
        return error.response;
      });
  };

  useEffect(() => {
    getData();
  }, [loading]);
  return (
    <View
      style={[
        styles.parent,
        {
          backgroundColor: theme.SCREEN_BACKGROUND_COLOR,
        },
      ]}>
      <CustomHeader
        navigation={navigation}
        back
        title={'Schedule Meeting'}
        onBackPress={() => navigation.goBack()}
      />

      {/* date time picker  */}
      <DateTimePicker
        open={dateModal.isShown}
        date={new Date()}
        mode={dateModal.mode}
        setDate={response => {
          // hide modal first
          setDatemodal(props => {
            return {
              ...props,
              isShown: false,
            };
          });

          setDatemodal(props => {
            return {
              ...props,
              value: response,
              isShown: false,
            };
          });

          seterror('');
        }}
        cancel={() =>
          setDatemodal(props => {
            return {
              ...props,
              isShown: false,
            };
          })
        }
      />
      {!loading ? (
        <>
          {/* schedule success modal  */}
          <InternshipScheduleSuccessModal
            isShow={successModal}
            toggleModal={() => {
              setSuccessModal(false);
              setTimeout(() => {
                navigation.goBack();
              }, 1000);
            }}
            time={dateModal.value}
            interneeName={
              userdata.student.user.first_name +
              ' ' +
              userdata.student.user.last_name
            }
          />
          <ScrollView>
            <View style={{marginBottom: 10}}>
              <View style={styles.center}>
                <View style={styles.container}>
                  <Image
                    source={{
                      uri: ImageLoading
                        ? PROFILE_IMAGE
                        : userdata.student.user.profile_image
                        ? BASE_URL + userdata.student.user.profile_image.path
                        : PROFILE_IMAGE,
                    }}
                    onLoadEnd={() => setImageLoading(false)}
                    onError={() => setImageLoading(false)}
                    style={styles.image}
                  />
                </View>

                {/* name and username container  */}
                <View style={styles.container}>
                  <Text style={[styles.fullname, {color: theme.TEXT_COLOR}]}>
                    {userdata.student.user.first_name +
                      ' ' +
                      userdata.student.user.last_name}
                  </Text>
                </View>
                <View style={styles.container}>
                  <Text
                    style={[styles.username, {color: theme.DIM_TEXT_COLOR}]}>
                    @{userdata.student.user.username}
                  </Text>
                </View>

                <View style={[styles.container, styles.rowContainer]}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <View style={{marginHorizontal: 10}}>
                      <TouchableWithoutFeedback
                        onPress={() => Linking.openURL(userdata.github)}>
                        <Github color={theme.GREEN_COLOR} size={0.8} />
                      </TouchableWithoutFeedback>
                    </View>
                    <View style={{marginHorizontal: 10}}>
                      <TouchableWithoutFeedback
                        onPress={() => Linking.openURL(userdata.linked_in)}>
                        <LinkedIn color={theme.GREEN_COLOR} size={0.8} />
                      </TouchableWithoutFeedback>
                    </View>

                    {userdata.portfolio !== null && userdata.portfolio !== '' && (
                      <View style={{marginHorizontal: 10}}>
                        <MaterialCommunityIcons
                          name={'web'}
                          color={theme.GREEN_COLOR}
                          size={Width * 0.07 * 0.8}
                        />
                      </View>
                    )}
                  </View>
                </View>

                {/* cv and resume container  */}
                <View style={[styles.rowContainer]}>
                  <DownloadContainer
                    label={'CV'}
                    onPress={() => handleCVDownload(userdata.cv)}
                    loading={fileLoading.cv}
                  />
                  {userdata.resume !== null && (
                    <DownloadContainer
                      label={'Resume'}
                      onPress={() => handleResumeDownload(userdata.resume)}
                      loading={fileLoading.resume}
                    />
                  )}
                </View>
                {/* profile container  */}
                <View style={styles.container}>
                  <CustomButton
                    text={'View Profile'}
                    onPress={handleViewProfile}
                    width={Width * 0.35}
                    height={35}
                  />
                </View>
                <Divider
                  width={Width * 0.95}
                  marginHorizontal={Width * 0.035}
                />

                {/* set date an time container  */}
              </View>
              <View style={[styles.container, styles.margin]}>
                <View style={styles.headingContainer}>
                  <Text style={[styles.headingText, {color: theme.TEXT_COLOR}]}>
                    Schedule
                  </Text>
                </View>
              </View>
              <View style={styles.container}>
                <View style={styles.center}>
                  <TouchableOpacity
                    onPress={() =>
                      setDatemodal(props => {
                        return {
                          isShown: true,
                          mode: 'datetime',
                          value: props.value,
                        };
                      })
                    }
                    style={[
                      styles.cardContainer,
                      {
                        backgroundColor: theme.CARD_BACKGROUND_COLOR,
                        borderColor:
                          error !== ''
                            ? theme.ERROR_TEXT_COLOR
                            : theme.CARD_BACKGROUND_COLOR,
                        width: Width * 0.65,
                      },
                    ]}>
                    <View style={styles.cardTextContainer}>
                      <Text
                        style={[styles.cardText, {color: theme.TEXT_COLOR}]}>
                        {dateModal.value.toDateString() +
                          ' ' +
                          dateModal.value.toTimeString().slice(0, 8)}
                      </Text>
                    </View>
                    <View style={styles.cardIconContainer}>
                      <Calendar size={0.9} color={theme.GREEN_COLOR} />
                    </View>
                  </TouchableOpacity>
                  {error !== '' && (
                    <View style={{alignItems: 'center', marginTop: 5}}>
                      <Text
                        style={[
                          {color: theme.ERROR_TEXT_COLOR},
                          styles.errorText,
                        ]}>
                        {error}
                      </Text>
                    </View>
                  )}
                </View>
              </View>

              {/* note container  */}
              <View style={[styles.container, styles.margin]}>
                <Text
                  style={{color: theme.DIM_TEXT_COLOR, fontSize: Sizes.small}}>
                  An email will be send to the applicant contianing meeting link
                  and other instructions.
                </Text>
              </View>
            </View>
          </ScrollView>
          {/* schedule button container   */}
          <CustomButton
            text={'Schedule'}
            onPress={handleSchedule}
            loading={scheduleLoading}
          />
        </>
      ) : (
        <View style={[styles.center, {flex: 1}]}>
          <Loading size={'large'} />
        </View>
      )}
    </View>
  );
};

export default ScheduleMeetings;

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
    // marginHorizontal: Width * 0.04,
    marginTop: 10,
  },
  topText: {
    fontSize: Sizes.normal * 0.8,
  },
  normalText: {
    fontSize: Sizes.normal,
  },
  image: {
    width: Width * 0.4,
    height: Width * 0.4,
    borderWidth: 1,
    borderRadius: 80,
    borderColor: 'transparent',
  },
  username: {
    fontSize: Sizes.normal * 0.75,
  },
  fullname: {
    fontSize: Sizes.normal,
  },
  margin: {
    marginHorizontal: Width * 0.04,
  },
  headingContainer: {},
  headingText: {
    fontSize: Sizes.normal * 1.1,
  },
  textContainer: {
    marginLeft: Width * 0.08,
    marginVertical: 10,
  },
  rowContainer: {
    marginVertical: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardTextContainer: {
    flex: 0.75,
    paddingLeft: 7,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardIconContainer: {
    flex: 0.25,
  },
  cardText: {
    fontSize: Sizes.normal * 0.75,
  },
  cardContainer: {
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 10,
    width: Width * 0.45,
    padding: 4,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'transparent',
  },
  errorText: {
    fontSize: Sizes.small,
  },
});
