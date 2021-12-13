/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {FC, useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableWithoutFeedback,
  Linking,
  ScrollView,
  ToastAndroid,
} from 'react-native';

import {useStateValue} from '../Store/StateProvider';
import CustomButton from './CustomButton';
import CustomHeader from './CustomHeader';
import axios from '../Utils/Axios';
import Foundation from 'react-native-vector-icons/Foundation';
import IonIcons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ListSkeleton from '../Skeleton/ListSkeleton';
import {Height, Sizes, Width} from '../Constants/Size';
import Bullet from './Bullet';
import {Calendar, Cash, Github, LinkedIn, Twitter} from './Icons';
import {commaSeperator} from '../Utils/Numbers';
import JoinWorkshopModal from '../Modals/Workshop/StdJoin';
import ORGViewDetails from '../Modals/Workshop/OrgViewDetails';
import {BACKGROUND_IMAGE} from '../Constants/sample';
import STDViewDetails from '../Modals/Workshop/StdViewDetails';
// @ts-ignore
import {BASE_URL} from 'react-native-dotenv';
type props = {
  navigation: any;
  route: any;
  ID: any;
  screen: 'student' | 'organization';
};
const ICON_SIZE = Width * 0.07;

const SCHEDULE = [
  {
    time: '9:30AM',
    label: 'Introduction and setup',
  },
  {
    time: '10:00AM',
    label: 'Components and styling',
  },
  {
    time: '11:00AM',
    label: 'Navigation',
  },
  {
    time: '12:00PM',
    label: 'Network requests and forms',
  },
];

const ViewWorkshop: FC<props> = ({navigation, route, screen, ID}) => {
  const [loading, setLoading] = useState(true);
  const [WorkshopData, setWorkshopData] = useState<any>();
  const [PosterLoading, setPosterLoading] = useState(true);
  const [PosterAspectRatio, setPosterAspectRatio] = useState(0);
  const [modal, setmodal] = useState({
    org: {
      view: false,
    },
    std: {
      join: false,
      view: false,
    },
  });
  const [{theme}, dispatch] = useStateValue();

  const [submit, setsubmit] = useState(false);
  const handleJoin = () => {
    // if workshop is  paid
    if (WorkshopData.is_paid && WorkshopData.status !== 'Ended') {
      // navigate to payment screen
      navigation.navigate('Payment', {
        ID: WorkshopData.id,
        title: WorkshopData.topic,
        charges: WorkshopData.charges,
      });
    } else {
      // make api cal
      setsubmit(true);
      axios
        .post(`/api/workshop/${ID}/register/`)
        .then(result => {
          if (result.status === 201) {
            setsubmit(false);
            // then show join workshop modal that you have appplied for the workshop
            setmodal(props => {
              return {
                ...props,
                joinModal: true,
              };
            });
            ToastAndroid.show(result.data.success, 1500);
          } else {
            setsubmit(false);
          }
        })
        .catch(err => {
          setsubmit(false);
          if (err.response) {
            ToastAndroid.show(err.response.data.error, 1500);
          }
        });

      // navigate to workshop screen
    }

    // else
    // navigate to pay workshop screen
  };

  const viewDetails = () => {
    setmodal(props => {
      return {
        ...props,
        viewDetails: true,
      };
    });
  };

  const getData = () => {
    setLoading(true);
    axios
      .get(`/api/workshop/${ID}/`)
      .then(result => {
        setWorkshopData(result.data);
        setLoading(false);
      })
      .catch(error => {
        setLoading(false);
        if (error.response) {
          ToastAndroid.show(error.response.data.error, 1500);
        }
      });
  };

  useEffect(() => {
    // fetch workshop data
    getData();
  }, []);

  const showOrgDetails = () => {
    setmodal(props => {
      return {
        ...props,
        org: {
          ...props.org,
          view: true,
        },
      };
    });
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
        title={'Details'}
        navigation={navigation}
        back
        onBackPress={() => navigation.goBack()}
      />

      {!loading && WorkshopData ? (
        <>
          {/* join workshop modal  */}
          {screen === 'student' && (
            <JoinWorkshopModal
              isShow={modal.std.join}
              toggleModal={() => {
                setmodal(props => {
                  return {
                    ...props,
                    std: {
                      ...props.std,
                      join: false,
                    },
                  };
                });
                // navigate to previous screen
                setTimeout(() => {
                  navigation.goBack();
                }, 1000);
              }}
            />
          )}

          {screen === 'student' && (
            <STDViewDetails
              name={WorkshopData.topic}
              isShow={modal.std.view}
              toggleModal={() => {
                setmodal(props => {
                  return {
                    ...props,
                    std: {
                      ...props.std,
                      view: false,
                    },
                  };
                });
              }}
            />
          )}

          {/* start workshop modal  */}
          {screen === 'organization' && (
            <ORGViewDetails
              isShow={modal.org.view}
              toggleModal={() => {
                setmodal(props => {
                  return {
                    ...props,

                    org: {
                      ...props.org,
                      view: false,
                    },
                  };
                });
              }}
              isEnded={WorkshopData.status === 'Ended' ? true : false}
            />
          )}
          <ScrollView>
            <View style={styles.scroll}>
              {screen === 'student' &&
                WorkshopData.status !== 'Ended' &&
                !WorkshopData.is_applied && (
                  <View style={styles.container}>
                    <Text
                      style={[styles.smallText, {color: theme.DIM_TEXT_COLOR}]}>
                      Join us for an awesome workshop on
                    </Text>
                  </View>
                )}
              {/* topic container  */}
              <View style={[styles.container, styles.center]}>
                <Text style={[styles.topicText, {color: theme.TEXT_COLOR}]}>
                  {WorkshopData.topic}
                </Text>
              </View>

              {/* poster container  */}
              <View style={[styles.container, styles.center]}>
                <Image
                  style={[
                    styles.poster,
                    {
                      width: Width * 0.78,
                      height: Width * PosterAspectRatio * 0.78,
                    },
                  ]}
                  source={{
                    uri: PosterLoading
                      ? BACKGROUND_IMAGE
                      : BASE_URL + WorkshopData.poster,
                  }}
                  onLoadEnd={() => {
                    Image.getSize(
                      BASE_URL + WorkshopData.poster,
                      (width, heigth) => {
                        // calculate aspect ratio of image
                        setPosterAspectRatio(heigth / width);
                        setPosterLoading(false);
                      },
                    );
                  }}
                  onError={() => setPosterLoading(false)}
                  resizeMode={'contain'}
                />
              </View>

              {/* details container  */}
              <View
                style={[
                  styles.center,
                  styles.card,
                  {backgroundColor: theme.CARD_BACKGROUND_COLOR},
                ]}>
                <View style={[styles.center, styles.cardIconContainer]}>
                  <Foundation
                    name={'clipboard-notes'}
                    size={ICON_SIZE * 2}
                    color={theme.GREEN_COLOR}
                  />
                </View>
                <View style={[styles.center, styles.cardHeadingContainer]}>
                  <Text
                    style={[
                      styles.cardHeadingText,
                      {color: theme.DIM_TEXT_COLOR},
                    ]}>
                    Workshop Details
                  </Text>
                </View>
                <View style={[styles.center, styles.detailsTextContainer]}>
                  <Text style={[styles.detailsText, {color: theme.TEXT_COLOR}]}>
                    {WorkshopData.description}
                  </Text>
                </View>
              </View>

              {/* takeaways container  */}
              <View
                style={[
                  styles.center,
                  styles.card,
                  {backgroundColor: theme.CARD_BACKGROUND_COLOR},
                ]}>
                <View style={[styles.center, styles.cardIconContainer]}>
                  <AntDesign
                    name={'key'}
                    size={ICON_SIZE * 1.5}
                    color={theme.GREEN_COLOR}
                  />
                </View>
                <View style={[styles.center, styles.cardHeadingContainer]}>
                  <Text
                    style={[
                      styles.cardHeadingText,
                      {color: theme.DIM_TEXT_COLOR},
                    ]}>
                    Some Key Take Aways{' '}
                  </Text>
                </View>
                <View style={[styles.container]}>
                  <Text
                    style={[
                      {fontSize: Sizes.normal * 0.65, color: theme.TEXT_COLOR},
                    ]}>
                    By participating along with us in the workshop, you'll
                    learn:
                  </Text>
                </View>
                {WorkshopData.take_away.map((take_away, index) => (
                  <View
                    style={[
                      styles.takeAwayRowContainer,
                      {
                        marginVertical:
                          index === WorkshopData.take_away.length - 1 ? 15 : 0,
                      }, // adding margin vertical only to last item
                    ]}>
                    <View
                      style={{
                        flexDirection: 'row',
                        flex: 1,
                      }}>
                      <View
                        style={{
                          paddingRight: 3,
                          paddingTop: 3,
                          flex: 0.1,
                        }}>
                        <Bullet />
                      </View>
                      <View style={{flex: 0.9}}>
                        <Text
                          style={[
                            styles.takeAwayPointsText,
                            {color: theme.TEXT_COLOR},
                          ]}>
                          {take_away}
                        </Text>
                      </View>
                    </View>
                  </View>
                ))}
              </View>

              {/* schedule  */}
              <View
                style={[
                  styles.center,
                  styles.card,
                  {
                    backgroundColor: theme.CARD_BACKGROUND_COLOR,
                    paddingBottom: 10,
                  },
                ]}>
                <View style={[styles.center, styles.cardIconContainer]}>
                  <Calendar color={theme.GREEN_COLOR} size={2} />
                </View>
                <View style={[styles.center, styles.cardHeadingContainer]}>
                  <Text
                    style={[
                      styles.cardHeadingText,
                      {color: theme.DIM_TEXT_COLOR},
                    ]}>
                    Schedule{' '}
                  </Text>
                </View>
                <View style={[styles.container]}>
                  <Text
                    style={[
                      {
                        fontSize: Sizes.normal * 0.65,
                        fontStyle: 'italic',
                        color: theme.TEXT_COLOR,
                      },
                    ]}>
                    See you on{' '}
                  </Text>
                </View>
                <View style={[styles.container, styles.center]}>
                  <Text style={[styles.normalText, {color: theme.TEXT_COLOR}]}>
                    {new Date(WorkshopData.event_date).toLocaleDateString()}
                  </Text>
                </View>
                <View style={[styles.container, styles.center]}>
                  <Text
                    style={[styles.smallText, {color: theme.DIM_TEXT_COLOR}]}>
                    Maximum Duration 1 Hour
                  </Text>
                </View>
              </View>

              {/* speaker  */}
              <View
                style={[
                  styles.center,
                  styles.card,
                  {backgroundColor: theme.CARD_BACKGROUND_COLOR},
                ]}>
                <View style={[styles.center, styles.cardIconContainer]}>
                  <IonIcons
                    name={'mic'}
                    size={ICON_SIZE * 1.5}
                    color={theme.GREEN_COLOR}
                  />
                </View>
                <View style={[styles.center, styles.cardHeadingContainer]}>
                  <Text
                    style={[
                      styles.cardHeadingText,
                      {color: theme.DIM_TEXT_COLOR},
                    ]}>
                    Speaker
                  </Text>
                </View>

                <View style={[styles.speakerContainer]}>
                  <View
                    style={{
                      flexDirection: 'row',
                      flex: 1,
                    }}>
                    <View style={[styles.speakerImageContainer]}>
                      <Image
                        source={{uri: WorkshopData.speaker[0].image}}
                        style={styles.speakerImage}
                      />
                    </View>
                    <View style={[styles.speakerNameContainer]}>
                      <Text
                        style={[
                          styles.speakerNameText,
                          {color: theme.TEXT_COLOR},
                        ]}>
                        {WorkshopData.speaker[0].name}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.speakerAboutContainer}>
                    <Text
                      style={[
                        styles.speakerAboutText,
                        {color: theme.TEXT_COLOR},
                      ]}>
                      {WorkshopData.speaker[0].about}
                    </Text>
                  </View>
                  <View
                    style={[styles.speakerReachTextContainer, styles.center]}>
                    <Text
                      style={[
                        styles.normalText,
                        {color: theme.DIM_TEXT_COLOR},
                      ]}>
                      Reach me at
                    </Text>
                  </View>
                  <View style={[styles.speakerReachIconContainer]}>
                    <>
                      <TouchableWithoutFeedback
                        onPress={() =>
                          Linking.openURL(WorkshopData.speaker[0].github)
                        }>
                        <View style={styles.iconMargin}>
                          <Github size={1.3} color={theme.GREEN_COLOR} />
                        </View>
                      </TouchableWithoutFeedback>
                      <TouchableWithoutFeedback
                        onPress={() =>
                          Linking.openURL(WorkshopData.speaker[0].linked_in)
                        }>
                        <View style={styles.iconMargin}>
                          <LinkedIn size={1.3} color={theme.GREEN_COLOR} />
                        </View>
                      </TouchableWithoutFeedback>
                      <TouchableWithoutFeedback
                        onPress={() =>
                          Linking.openURL(WorkshopData.speaker[0].twitter)
                        }>
                        <View style={styles.iconMargin}>
                          <Twitter size={1.3} color={theme.GREEN_COLOR} />
                        </View>
                      </TouchableWithoutFeedback>
                    </>
                  </View>
                </View>
              </View>

              {/* charges  */}
              {WorkshopData.is_paid && (
                <View
                  style={[
                    styles.center,
                    styles.card,
                    {backgroundColor: theme.CARD_BACKGROUND_COLOR},
                  ]}>
                  <View style={[styles.center, styles.cardIconContainer]}>
                    <Cash color={theme.GREEN_COLOR} size={1.5} />
                  </View>
                  <View style={[styles.center, styles.cardHeadingContainer]}>
                    <Text
                      style={[
                        styles.cardHeadingText,
                        {color: theme.DIM_TEXT_COLOR},
                      ]}>
                      Charges{' '}
                    </Text>
                  </View>
                  <View
                    style={[
                      styles.center,
                      styles.container,
                      {marginBottom: 10},
                    ]}>
                    <Text
                      style={[styles.chargesText, {color: theme.TEXT_COLOR}]}>
                      Rs {commaSeperator(WorkshopData.charges)}
                    </Text>
                  </View>
                </View>
              )}

              {/* pre-requisites  */}
              <View
                style={[
                  styles.card,
                  {
                    backgroundColor: theme.CARD_BACKGROUND_COLOR,
                    marginBottom: 10,
                  },
                ]}>
                <View style={[styles.center, styles.cardIconContainer]}>
                  <MaterialCommunityIcons
                    name={'notebook'}
                    size={ICON_SIZE * 1.5}
                    color={theme.GREEN_COLOR}
                  />
                </View>
                <View style={[styles.center, styles.cardHeadingContainer]}>
                  <Text
                    style={[
                      styles.cardHeadingText,
                      {color: theme.DIM_TEXT_COLOR},
                    ]}>
                    Prerequisites
                  </Text>
                </View>
                <View style={[styles.container, styles.center]}>
                  <Text
                    style={[
                      {fontSize: Sizes.normal * 0.65, color: theme.TEXT_COLOR},
                    ]}>
                    Following are the prerequisites to attend this workshop{' '}
                  </Text>
                </View>
                {WorkshopData.prerequisites.map((pre, index) => (
                  <>
                    {/* <View
                      style={{marginHorizontal: Width * 0.04, marginTop: 5}}>
                      <Text
                        style={[
                          {
                            fontSize: Sizes.normal * 0.9,
                            color: theme.DIM_TEXT_COLOR,
                          },
                        ]}>
                        {pre.title}
                      </Text>
                    </View> */}
                    <View
                      style={[
                        styles.takeAwayRowContainer,
                        {
                          marginVertical:
                            index === WorkshopData.prerequisites.length - 1
                              ? 10
                              : 0,
                        }, // adding margin vertical only to last item
                      ]}>
                      <View
                        style={{
                          flexDirection: 'row',
                          flex: 1,
                        }}>
                        <View
                          style={{
                            paddingRight: 3,
                            paddingTop: 3,
                            flex: 0.1,
                          }}>
                          <Bullet />
                        </View>
                        <View style={{flex: 0.9}}>
                          <Text
                            style={[
                              styles.preReqText,
                              {color: theme.TEXT_COLOR},
                            ]}>
                            {pre}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </>
                ))}
              </View>
            </View>
            {screen === 'organization' && (
              <CustomButton
                text={'View Details'}
                onPress={showOrgDetails}
                width={Width * 0.78}
              />
            )}

            {screen === 'student' && WorkshopData.status !== 'Ended' && (
              <CustomButton
                text={WorkshopData.is_applied ? 'View Details' : 'Apply Now'}
                onPress={() =>
                  !WorkshopData.is_applied ? handleJoin() : viewDetails()
                }
                loading={submit}
                width={Width * 0.78}
              />
            )}
          </ScrollView>
        </>
      ) : (
        <ListSkeleton repition={5} />
      )}
    </View>
  );
};

export default ViewWorkshop;

const styles = StyleSheet.create({
  parent: {
    flex: 1,
  },
  scroll: {
    marginHorizontal: Width * 0.04,
  },
  container: {
    marginTop: 10,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  smallText: {
    fontSize: Sizes.normal * 0.66,
  },
  normalText: {
    fontSize: Sizes.normal,
  },
  topicText: {
    fontSize: Sizes.large * 1.2,
  },
  poster: {
    borderRadius: 20,
  },
  card: {
    borderRadius: 10,
    borderColor: 'transparent',
    // marginLeft: Width * 0.1,
    // width: Width * 0.8,
    marginHorizontal: Width * 0.058,
    marginTop: 20,
  },
  cardIconContainer: {
    marginTop: 8,
    marginBottom: 5,
    // marginVertical: 5,
  },
  cardHeadingContainer: {
    // marginTop: 3,
  },
  cardHeadingText: {
    fontSize: Sizes.normal * 1.2,
  },
  detailsTextContainer: {
    marginVertical: 10,
    marginHorizontal: Width * 0.03,
    // backgroundColor: 'red',
  },
  detailsText: {
    fontSize: Sizes.normal * 0.8,
    lineHeight: 22,
    textAlign: 'center',
  },
  takeAwayRowContainer: {
    marginHorizontal: Width * 0.065,
    marginTop: 10,
    flexDirection: 'row',
  },
  takeAwayPointsText: {
    fontSize: Sizes.normal * 0.8,
    fontWeight: 'bold',
    lineHeight: 20,
    flexShrink: 1,
  },
  scheduleRowContainer: {
    marginHorizontal: Width * 0.065,
    marginTop: 10,
    flexDirection: 'row',
  },
  scheduleTimeText: {
    fontSize: Sizes.normal * 0.85,
    lineHeight: 18,
    flexShrink: 1,
    fontWeight: 'bold',
  },
  scheduleLabelText: {
    fontWeight: 'bold',
  },
  schedulePointContainer: {
    paddingRight: 3,
    paddingTop: 3,
    flex: 0.35,
    flexDirection: 'row',
  },
  scheduleLabelContainer: {
    flex: 0.65,
    alignItems: 'flex-start',
  },
  speakerContainer: {
    marginHorizontal: Width * 0.065,
    marginTop: 10,
    flex: 1,
    flexDirection: 'column',
  },
  speakerImageContainer: {
    flex: 0.25,
  },
  speakerNameContainer: {
    flex: 0.75,
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginLeft: Width * 0.04,
  },
  speakerImage: {
    width: Width * 0.15,
    height: Width * 0.15,
    borderRadius: 30,
    borderColor: 'transparent',
  },
  speakerNameText: {
    fontSize: Sizes.normal * 0.95,
    flexShrink: 1,
  },
  speakerAboutContainer: {
    marginVertical: 10,
  },
  speakerAboutText: {
    fontSize: Sizes.normal * 0.8,
    lineHeight: 22,
    textAlign: 'left',
  },
  speakerReachTextContainer: {
    marginVertical: 10,
  },
  speakerReachIconContainer: {
    marginHorizontal: Width * 0.065,
    marginVertical: 10,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  iconMargin: {
    marginHorizontal: Width * 0.04,
  },
  chargesTextContainer: {},
  chargesText: {
    fontSize: Sizes.normal * 1.2,
  },
  preReqText: {
    fontSize: Sizes.normal * 0.8,
    lineHeight: 20,
    flexShrink: 1,
  },
});
