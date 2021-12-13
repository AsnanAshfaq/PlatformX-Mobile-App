import React, {FC, useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableWithoutFeedback,
  Linking,
  ScrollView,
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
import {Calendar, Cash} from './Icons';
import InternshipDetailsModal from '../Modals/InternshipDetailsModa';
// import SkillIcon from '../../assets/images/skills_icon.png';
type props = {
  navigation: any;
  route: any;
  ID: any;
  screen: 'student' | 'organization';
};
const ICON_SIZE = Width * 0.07;

const ViewInternship: FC<props> = ({navigation, route, screen, ID}) => {
  const [loading, setLoading] = useState(true);
  const [internshipData, setInternshipData] = useState<any>({});
  const [PosterLoading, setPosterLoading] = useState(true);
  const {theme} = useStateValue()[0];
  const [modal, setmodal] = useState({
    viewDetails: false,
  });

  const applyNow = () => {
    navigation.navigate('Apply_Now', {
      ID: internshipData.id,
    });
  };

  const viewDetails = () => {
    setmodal(props => {
      return {
        ...props,
        viewDetails: true,
      };
    });
  };

  useEffect(() => {
    // fetching fyp
    axios
      .get(`/api/internship/${ID}`)
      .then(result => {
        setInternshipData(result.data);
        setLoading(false);
      })
      .catch(error => setLoading(false));
  }, [ID]);

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

      {!loading && internshipData ? (
        <>
          {/* show internship details modal  */}
          {screen === 'student' && (
            <InternshipDetailsModal
              isShow={modal.viewDetails}
              toggleModal={() => {
                setmodal(props => {
                  return {
                    ...props,
                    viewDetails: false,
                  };
                });
              }}
              name={internshipData.name}
            />
          )}
          <ScrollView>
            <View style={styles.scroll}>
              {screen === 'student' &&
                !internshipData.is_applied &&
                internshipData.status !== 'Ended' && (
                  <View style={styles.container} key={Math.random()}>
                    <Text
                      style={[styles.smallText, {color: theme.DIM_TEXT_COLOR}]}>
                      Apply now to get hired as an intern
                    </Text>
                  </View>
                )}
              {/* name and description container  */}
              <View
                style={[
                  styles.center,
                  styles.card,
                  {backgroundColor: theme.CARD_BACKGROUND_COLOR},
                ]}
                key={Math.random()}>
                <View
                  style={[
                    styles.container,
                    styles.center,
                    {marginHorizontal: Width * 0.04},
                  ]}
                  key={Math.random()}>
                  <Text style={[styles.nameText, {color: theme.TEXT_COLOR}]}>
                    {internshipData.name}
                  </Text>
                </View>
                <View style={[styles.center, styles.descriptionTextContainer]}>
                  <Text
                    style={[styles.descriptionText, {color: theme.TEXT_COLOR}]}>
                    {internshipData.description}
                  </Text>
                </View>
              </View>
              {/* skills container */}
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
                    Skills Required
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
                    Following skills are required to apply for this internship
                  </Text>
                </View>
                {internshipData.skills.map((skill, index) => (
                  <View
                    style={[
                      styles.categoryRowsContainer,
                      {
                        marginVertical:
                          index === internshipData.skills.length - 1 ? 15 : 0,
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
                          {skill}
                        </Text>
                      </View>
                    </View>
                  </View>
                ))}
              </View>
              {/* responsibilites  */}
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
                    Responsibilities
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
                    Following will be the responsibilities upon internee
                  </Text>
                </View>
                {internshipData.responsibilities.map((res, index) => (
                  <View
                    style={[
                      styles.categoryRowsContainer,
                      {
                        marginVertical:
                          index === internshipData.responsibilities.length - 1
                            ? 15
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
                            styles.categoryPointsText,
                            {color: theme.TEXT_COLOR},
                          ]}>
                          {res}
                        </Text>
                      </View>
                    </View>
                  </View>
                ))}
              </View>
              {/* stipend  */}
              {internshipData.is_paid && (
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
                      Stipend{' '}
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
                      Rs {commaSeperator(internshipData.stipend)}
                    </Text>
                  </View>
                </View>
              )}

              {/* last date to apply  */}
              {!internshipData.is_applied && (
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
                  <View style={[styles.container, styles.center]}>
                    <Text
                      style={[styles.normalText, {color: theme.TEXT_COLOR}]}>
                      {new Date(internshipData.end_date).toLocaleDateString()}
                    </Text>
                  </View>
                  <View
                    style={[
                      styles.container,
                      styles.center,
                      {marginBottom: 10},
                    ]}>
                    <Text
                      style={[styles.smallText, {color: theme.DIM_TEXT_COLOR}]}>
                      Total Duration {internshipData.duration} Months
                    </Text>
                  </View>
                </View>
              )}
            </View>
          </ScrollView>

          {screen === 'student' && internshipData.status !== 'Ended' && (
            <CustomButton
              text={internshipData.is_applied ? 'View Details' : 'Apply Now'}
              onPress={() =>
                !internshipData.is_applied ? applyNow() : viewDetails()
              }
            />
          )}
        </>
      ) : (
        <ListSkeleton repition={5} />
      )}
    </View>
  );
};

export default ViewInternship;

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
  nameText: {
    fontSize: Sizes.normal * 1.2,
    textAlign: 'center',
  },
  descriptionTextContainer: {
    marginVertical: 10,
    marginHorizontal: Width * 0.03,
    // backgroundColor: 'red',
  },
  descriptionText: {
    fontSize: Sizes.normal * 0.8,
    lineHeight: 22,
    textAlign: 'center',
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
