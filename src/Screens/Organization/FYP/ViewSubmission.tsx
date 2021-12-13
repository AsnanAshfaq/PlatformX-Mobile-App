/* eslint-disable react-hooks/exhaustive-deps */
import React, {FC, useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  ToastAndroid,
  Linking,
} from 'react-native';
import CustomHeader from '../../../Components/CustomHeader';
import Loading from '../../../Components/Loading';
import {PROFILE_IMAGE} from '../../../Constants/sample';
import {Sizes, Width} from '../../../Constants/Size';
import {useStateValue} from '../../../Store/StateProvider';
import Axios from '../../../Utils/Axios';
//@ts-ignore
import {BASE_URL} from 'react-native-dotenv';
import CustomButton from '../../../Components/CustomButton';
import Divider from '../../../Components/Divider';
import {Calendar, CodeDownload} from '../../../Components/Icons';
import DateTimePicker from '../../../Components/DateTimePicker';
type Props = {
  label: string;
  Key: string;
  accepted?: boolean;
};
const LabelKey: FC<Props> = ({label, Key, accepted = false}) => {
  const [{theme}, dispatch] = useStateValue();

  return (
    <View style={styles.rowContainer}>
      <View style={styles.labelContainer}>
        <Text style={[styles.labelText, {color: theme.DIM_TEXT_COLOR}]}>
          {label}
        </Text>
      </View>
      <View style={[styles.keyContainer]}>
        <Text
          style={[
            styles.keyText,
            {
              color: !accepted
                ? theme.TEXT_COLOR
                : accepted && Key === 'Accepted'
                ? theme.GREEN_COLOR
                : theme.ERROR_TEXT_COLOR,
            },
          ]}>
          {Key}
        </Text>
      </View>
    </View>
  );
};

const DownloadContainer: FC<{loading; onPress}> = ({loading, onPress}) => {
  const [{theme}, dispatch] = useStateValue();

  return (
    <View style={styles.center}>
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
                Download
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
const ViewSubmission: FC<props> = ({navigation, route}) => {
  const [{theme}, dispatch] = useStateValue();
  const [loading, setloading] = useState(true);
  const [submission, setsubmission] = useState<any>();
  const [ImageLoading, setImageLoading] = useState(true);
  const [fileLoading, setfileLoading] = useState({
    sourceCode: false,
    output: false,
  });
  const [scheduling, setscheduling] = useState(false);
  const [dateModal, setdateModal] = useState({
    show: false,
    error: '',
    value: new Date(),
  });
  const {fypID, projectID} = route.params;

  const getData = async () => {
    Axios.get(`/api/submission/${fypID}/${projectID}`)
      .then(response => {
        setsubmission(response.data);
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

  const handleViewProfile = () => {
    navigation.navigate('ViewStudentProfile', {
      ID: submission.student.uuid,
    });
  };

  const handleSourceCodeDownload = (path: string) => {
    Linking.openURL(path);
  };
  const handleOutputeDownload = (path: string) => {
    Linking.openURL(path);
  };

  const handleSchedule = () => {
    console.log('Handling user interview');
  };

  const formDate = (date: string) => {
    var d = date.slice(0, 10) + 'T' + date.slice(12, 19);
    return new Date(d).toLocaleString();
  };
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
        title={'View Submission'}
        onBackPress={() => navigation.goBack()}
      />

      <DateTimePicker
        open={dateModal.show}
        date={new Date()}
        mode={'datetime'}
        setDate={response => {
          // hide modal first
          setdateModal(props => {
            return {
              ...props,
              show: false,
            };
          });

          const getDate = new Date(response);

          setdateModal(props => {
            return {
              ...props,
              value: getDate,
              error: '',
            };
          });
        }}
        cancel={() =>
          setdateModal(props => {
            return {
              ...props,
              error: '',
              show: false,
            };
          })
        }
      />

      {!loading && submission ? (
        <ScrollView>
          <View style={{marginBottom: 10}}>
            {/* image container  */}
            <View style={styles.center}>
              <View style={styles.container}>
                <Image
                  source={{
                    uri: ImageLoading
                      ? PROFILE_IMAGE
                      : submission.student.user.profile_image
                      ? BASE_URL + submission.student.user.profile_image.path
                      : PROFILE_IMAGE,
                  }}
                  onLoadEnd={() => setImageLoading(false)}
                  onError={() => setImageLoading(false)}
                  style={[
                    styles.image,
                    !ImageLoading &&
                      submission.student.user.profile_image && {
                        borderRadius: 50,
                        borderWidth: 3,
                        borderColor: theme.GREEN_COLOR,
                      },
                  ]}
                />
              </View>

              {/* name and username container  */}
              <View style={styles.container}>
                <Text style={[styles.fullname, {color: theme.TEXT_COLOR}]}>
                  {submission.student.user.first_name +
                    ' ' +
                    submission.student.user.last_name}
                </Text>
              </View>
              <View style={styles.container}>
                <Text style={[styles.username, {color: theme.DIM_TEXT_COLOR}]}>
                  @{submission.student.user.username}
                </Text>
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
            </View>
            <Divider size={'large'} width={Width * 0.92} />

            {/* details container  */}
            <View style={[styles.container, styles.margin]}>
              <View style={styles.headingContainer}>
                <Text style={[styles.headingText, {color: theme.TEXT_COLOR}]}>
                  Details
                </Text>
              </View>
              <View style={styles.textContainer}>
                <LabelKey
                  label={'Result Code'}
                  Key={submission.data.result.status.code}
                />
                <LabelKey
                  label={'Result Status'}
                  Key={
                    submission.data.result.status.name.charAt(0).toUpperCase() +
                    submission.data.result.status.name
                      .slice(1, submission.data.result.status.name.length)
                      .toLowerCase()
                  }
                  accepted
                />
                <LabelKey
                  label={'Compile Time'}
                  Key={submission.data.result.time + ' ' + 'seconds'}
                />
                <LabelKey
                  label={'Memory Consumed'}
                  Key={submission.data.result.memory + ' ' + ' KBs'}
                />
                <LabelKey
                  label={'Submission Date'}
                  Key={formDate(submission.data.date)}
                />
              </View>
            </View>

            {/* compiler specifications  */}
            <View style={[styles.container, styles.margin]}>
              <View style={styles.headingContainer}>
                <Text style={[styles.headingText, {color: theme.TEXT_COLOR}]}>
                  Compiler Specifications
                </Text>
              </View>
              <View style={styles.textContainer}>
                <LabelKey label={'ID'} Key={submission.data.id} />
                <LabelKey label={'Name'} Key={submission.data.compiler.name} />
                <LabelKey
                  label={'Version'}
                  Key={submission.data.compiler.version.name}
                />
              </View>
            </View>

            <View style={[styles.container, styles.margin]}>
              <View style={styles.headingContainer}>
                <Text style={[styles.headingText, {color: theme.TEXT_COLOR}]}>
                  Source Code{' '}
                  <Text
                    style={[styles.smallText, {color: theme.DIM_TEXT_COLOR}]}>
                    (Size {submission.data.result.streams.source.size} Bytes)
                  </Text>
                </Text>
              </View>

              {/* download container */}
              <DownloadContainer
                onPress={() =>
                  handleSourceCodeDownload(
                    submission.data.result.streams.source.uri,
                  )
                }
                loading={fileLoading.sourceCode}
              />
            </View>

            <View style={[styles.container, styles.margin]}>
              <View style={styles.headingContainer}>
                <Text style={[styles.headingText, {color: theme.TEXT_COLOR}]}>
                  Output{' '}
                  <Text
                    style={[styles.smallText, {color: theme.DIM_TEXT_COLOR}]}>
                    (Size {submission.data.result.streams.output.size} Bytes)
                  </Text>
                </Text>
              </View>

              {/* download container */}
              <DownloadContainer
                onPress={() =>
                  handleOutputeDownload(
                    submission.data.result.streams.output.uri,
                  )
                }
                loading={fileLoading.output}
              />
            </View>

            {/* scheduling interview  */}

            <Divider size={'large'} width={Width * 0.92} />

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
                    setdateModal(props => {
                      return {
                        ...props,
                        show: true,
                      };
                    })
                  }
                  style={[
                    styles.cardContainer,
                    {
                      backgroundColor: theme.CARD_BACKGROUND_COLOR,
                      borderColor:
                        dateModal.error !== ''
                          ? theme.ERROR_TEXT_COLOR
                          : theme.CARD_BACKGROUND_COLOR,
                      width: Width * 0.65,
                    },
                  ]}>
                  <View style={styles.cardTextContainer}>
                    <Text style={[styles.cardText, {color: theme.TEXT_COLOR}]}>
                      {dateModal.value.toDateString() +
                        ' ' +
                        dateModal.value.toTimeString().slice(0, 8)}
                    </Text>
                  </View>
                  <View style={styles.cardIconContainer}>
                    <Calendar size={0.9} color={theme.GREEN_COLOR} />
                  </View>
                </TouchableOpacity>
                {dateModal.error !== '' && (
                  <View style={{alignItems: 'center', marginTop: 5}}>
                    <Text
                      style={[
                        {color: theme.ERROR_TEXT_COLOR},
                        styles.errorText,
                      ]}>
                      {dateModal.error}
                    </Text>
                  </View>
                )}
              </View>
            </View>

            <View style={[styles.container, styles.margin]}>
              <Text
                style={{color: theme.DIM_TEXT_COLOR, fontSize: Sizes.small}}>
                An email will be send to the applicant contianing meeting link
                and other instructions.
              </Text>
            </View>

            <CustomButton
              text={'Schedule'}
              onPress={handleSchedule}
              loading={scheduling}
            />
          </View>
        </ScrollView>
      ) : loading ? (
        <View style={[styles.center, {flex: 1}]}>
          <Loading size={'large'} />
        </View>
      ) : (
        <View style={[styles.center, {flex: 1}]}>
          <Text style={[styles.normalText, {color: theme.TEXT_COLOR}]}>
            Couldn't get the submission
          </Text>
          <TouchableOpacity onPress={() => setloading(true)}>
            <Text style={[styles.normalText, {color: theme.GREEN_COLOR}]}>
              Refresh
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default ViewSubmission;

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
    width: Width * 0.25,
    height: Width * 0.25,
    borderWidth: 1,
    borderRadius: 80,
    borderColor: 'transparent',
  },
  username: {
    fontSize: Sizes.normal * 0.8,
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
  labelContainer: {
    flex: 1,
  },
  labelText: {
    fontSize: Sizes.normal * 0.9,
  },
  keyContainer: {
    justifyContent: 'center',
    flex: 1,
    alignItems: 'center',
  },
  keyText: {
    fontSize: Sizes.normal * 0.9,
  },
  smallText: {
    fontSize: Sizes.small,
  },
  cardTextContainer: {
    flex: 0.82,
    paddingLeft: 7,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardIconContainer: {
    flex: 0.18,
  },
  cardText: {
    fontSize: Sizes.normal * 0.8,
  },
  cardContainer: {
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 10,
    width: Width * 0.56,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'transparent',
  },
  errorText: {
    fontSize: Sizes.small,
  },
});
