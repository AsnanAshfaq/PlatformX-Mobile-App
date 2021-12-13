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
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ListSkeleton from '../Skeleton/ListSkeleton';
import {Height, Sizes, Width} from '../Constants/Size';
import Bullet from './Bullet';
import {commaSeperator} from '../Utils/Numbers';
import {Calendar} from './Icons';
import FYPDetailsModal from '../Modals/FYPDetailsModal';
import FYPParticipateModal from '../Modals/FYPParticipateModal';
type props = {
  navigation: any;
  route: any;
  ID: any;
  screen: 'student' | 'organization';
};
const ICON_SIZE = Width * 0.07;

const ViewFYP: FC<props> = ({navigation, route, screen, ID}) => {
  const [loading, setLoading] = useState(true);
  const [FYPData, setFYPData] = useState<any>({});
  const [PosterLoading, setPosterLoading] = useState(true);
  const [submit, setsubmit] = useState(false);
  const {theme} = useStateValue()[0];
  const [modals, setmodals] = useState({
    participate: false,
    details: false,
  });

  const getData = async () => {
    setLoading(true);
    axios
      .get(`/api/fyp/${ID}/`)
      .then(result => {
        setFYPData(result.data);
        setLoading(false);
        console.log(result.data);
      })
      .catch(error => setLoading(false));
  };
  useEffect(() => {
    // fetching fyp
    getData();
  }, []);

  const viewDetails = () => {
    // show pop up modal
    setmodals(props => {
      return {
        ...props,
        details: true,
      };
    });
  };

  const applyNow = () => {
    // apply for fyp
    setsubmit(true);
    axios
      .post(`/api/fyp/${ID}/apply/`)
      .then(response => {
        if (response.status === 201) {
          // show participation modal
          setmodals(props => {
            return {
              ...props,
              participate: true,
            };
          });
        }
        setsubmit(false);
      })
      .catch(error => {
        setsubmit(false);
        if (error.response) {
          ToastAndroid.show(error.response.data.error, 1500);
        }
        return error.response;
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

      {!loading && FYPData ? (
        <>
          {/* show fyp details modal  */}
          {screen === 'student' && (
            <FYPDetailsModal
              name={FYPData.name}
              isShow={modals.details}
              toggleModal={() => {
                setmodals(props => {
                  return {
                    ...props,
                    details: false,
                  };
                });
              }}
            />
          )}
          {/* show fyp participate modal  */}

          {screen === 'student' && (
            <FYPParticipateModal
              isShow={modals.participate}
              name={FYPData.name}
              toggleModal={() => {
                setmodals(props => {
                  return {
                    ...props,
                    participate: false,
                  };
                });
                // navigation to previos screen
                setTimeout(() => {
                  navigation.goBack();
                }, 1000);
              }}
            />
          )}
          <ScrollView>
            <View style={styles.scroll}>
              {screen === 'student' &&
                !FYPData.is_applied &&
                FYPData.status !== 'Ended' && (
                  <View style={styles.container} key={Math.random()}>
                    <Text
                      style={[styles.smallText, {color: theme.DIM_TEXT_COLOR}]}>
                      Apply now to start working with us on
                    </Text>
                  </View>
                )}
              {/* topic container  */}
              <View
                style={[styles.container, styles.center]}
                key={Math.random()}>
                <Text style={[styles.topicText, {color: theme.TEXT_COLOR}]}>
                  {FYPData.name}
                </Text>
              </View>

              {/* details container  */}
              <View
                style={[
                  styles.center,
                  styles.card,
                  {backgroundColor: theme.CARD_BACKGROUND_COLOR},
                ]}
                key={Math.random()}>
                <View style={[styles.center, styles.cardIconContainer]}>
                  <Ionicons
                    name={'ios-bulb-sharp'}
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
                    Basic Idea
                  </Text>
                </View>
                <View style={[styles.center, styles.detailsTextContainer]}>
                  <Text style={[styles.detailsText, {color: theme.TEXT_COLOR}]}>
                    {FYPData.description}
                  </Text>
                </View>
              </View>

              {/* category container  */}
              <View
                style={[
                  styles.center,
                  styles.card,
                  {backgroundColor: theme.CARD_BACKGROUND_COLOR},
                ]}
                key={Math.random()}>
                <View style={[styles.center, styles.cardIconContainer]}>
                  <Ionicons
                    name={'grid-outline'}
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
                    Categories
                  </Text>
                </View>
                <View style={[styles.container, {marginLeft: 2}]}>
                  <Text
                    style={[
                      {
                        fontSize: Sizes.normal * 0.65,
                        color: theme.TEXT_COLOR,
                      },
                    ]}>
                    {FYPData.name} falls under the following software
                    development category
                  </Text>
                </View>
                {FYPData.category.map((category, index) => (
                  <View
                    style={[
                      styles.categoryRowsContainer,
                      {
                        marginVertical:
                          index === FYPData.category.length - 1 ? 15 : 0,
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
                            styles.categoryPointsText,
                            {color: theme.TEXT_COLOR},
                          ]}>
                          {category}
                        </Text>
                      </View>
                    </View>
                  </View>
                ))}
              </View>

              {/* technologies container  */}
              <View
                style={[
                  styles.center,
                  styles.card,
                  {backgroundColor: theme.CARD_BACKGROUND_COLOR},
                ]}
                key={Math.random()}>
                <View style={[styles.center, styles.cardIconContainer]}>
                  <Ionicons
                    name={'code-slash'}
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
                    Technologies
                  </Text>
                </View>
                <View
                  style={[styles.container, {marginHorizontal: Width * 0.07}]}>
                  <Text
                    style={[
                      {fontSize: Sizes.normal * 0.65, color: theme.TEXT_COLOR},
                    ]}>
                    Following technologies will be used for the development of{' '}
                    {FYPData.name}
                  </Text>
                </View>

                {FYPData.technologies.map((tech, index) => (
                  <View
                    style={[
                      styles.techRowsContainer,
                      {
                        marginVertical:
                          index === FYPData.technologies.length - 1 ? 15 : 0,
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
                            styles.techPointsText,
                            {color: theme.TEXT_COLOR},
                          ]}>
                          {tech}
                        </Text>
                      </View>
                    </View>
                  </View>
                ))}
              </View>

              {/* learning outcomes  */}
              <View
                style={[
                  styles.center,
                  styles.card,
                  {backgroundColor: theme.CARD_BACKGROUND_COLOR},
                ]}
                key={Math.random()}>
                <View style={[styles.center, styles.cardIconContainer]}>
                  <MaterialCommunityIcons
                    name={'book-open'}
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
                    Learning Outcomes
                  </Text>
                </View>
                <View
                  style={[styles.container, {marginHorizontal: Width * 0.07}]}>
                  <Text
                    style={[
                      {fontSize: Sizes.normal * 0.65, color: theme.TEXT_COLOR},
                    ]}>
                    {FYPData.name} will help you learn following skills
                  </Text>
                </View>

                <View style={[styles.center, styles.detailsTextContainer]}>
                  <Text style={[styles.detailsText, {color: theme.TEXT_COLOR}]}>
                    {FYPData.outcomes}
                  </Text>
                </View>
              </View>

              {!FYPData.is_applied && (
                <View
                  style={[
                    styles.center,
                    styles.card,
                    {backgroundColor: theme.CARD_BACKGROUND_COLOR},
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
                      Deadline{' '}
                    </Text>
                  </View>
                  <View
                    style={[
                      styles.container,
                      styles.center,
                      {marginBottom: 10},
                    ]}>
                    <Text
                      style={[styles.normalText, {color: theme.TEXT_COLOR}]}>
                      {new Date(FYPData.end_date).toLocaleDateString()}
                    </Text>
                  </View>
                </View>
              )}
            </View>
            {screen === 'student' && FYPData.status !== 'Ended' && (
              <CustomButton
                text={FYPData.is_applied ? 'View Details' : 'Apply Now'}
                onPress={() =>
                  !FYPData.is_applied ? applyNow() : viewDetails()
                }
                loading={submit}
                width={Width * 0.8}
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

export default ViewFYP;

const styles = StyleSheet.create({
  parent: {
    flex: 1,
  },
  scroll: {
    marginHorizontal: Width * 0.04,
    marginBottom: 10,
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
    width: Width * 0.8,
    height: Width,
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
  categoryRowsContainer: {
    marginHorizontal: Width * 0.065,
    marginTop: 10,
    flexDirection: 'row',
  },
  categoryPointsText: {
    fontSize: Sizes.normal * 0.8,
    fontWeight: 'bold',
    lineHeight: 20,
    flexShrink: 1,
  },
  techRowsContainer: {
    marginHorizontal: Width * 0.065,
    marginTop: 10,
    flexDirection: 'row',
  },
  techPointsText: {
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
    alignItems: 'flex-end',
  },
  speakerImage: {
    width: Width * 0.15,
    height: Width * 0.15,
    borderRadius: 14,
    borderColor: 'transparent',
  },
  speakerNameText: {
    fontSize: Sizes.normal * 0.95,
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
