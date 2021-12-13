import React, {FC, useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList,
  Image,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import axios from '../Utils/Axios';
import CustomHeader from './CustomHeader';
import Divider from './Divider';

import {GREY_IMAGE, BACKGROUND_IMAGE, PROFILE_IMAGE} from '../Constants/sample';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Foundation from 'react-native-vector-icons/Foundation';
//@ts-ignore
import {BASE_URL} from 'react-native-dotenv';
import ListSkeleton from '../Skeleton/ListSkeleton';
import {Height, Sizes, Width} from '../Constants/Size';
import {commaSeperator} from '../Utils/Numbers';
import {useStateValue} from '../Store/StateProvider';
import CustomButton from './CustomButton';
import CodeStyleSkeleton from '../Skeleton/CodeStyleSkeleton';
import {Email} from './Icons';
import Bullet from './Bullet';

const ICON_SIZE = Width * 0.07;

type PrizeProps = {
  prize: any;
  index: number;
};
const PrizeCard: FC<PrizeProps> = ({prize, index}) => {
  const [{theme}, dispatch] = useStateValue();

  return (
    <View
      style={[
        styles.prizeCard,
        {
          borderColor: theme.TEXT_COLOR,
          backgroundColor: theme.SCREEN_BACKGROUND_COLOR,
        },
      ]}>
      {/* title  */}
      <View style={[styles.center, {marginVertical: 10}]}>
        <Text style={[styles.prizeTitleText, {color: theme.TEXT_COLOR}]}>
          {prize.title === 'First'
            ? 'First Prize'
            : prize.title === 'Second'
            ? 'Second Prize'
            : 'Third Prize'}
        </Text>
      </View>
      <View style={[styles.center, {marginVertical: 10}]}>
        <AntDesign
          name={'star'}
          color={
            prize.title === 'First'
              ? 'gold'
              : prize.title === 'Second'
              ? 'silver'
              : '#a05822'
          }
          size={ICON_SIZE * 1.1}
        />
      </View>
      <View style={[styles.center, {marginVertical: 10}]}>
        <Text style={[styles.prizeMoneyText, {color: theme.TEXT_COLOR}]}>
          Rs {commaSeperator(prize.value)}
        </Text>
      </View>
    </View>
  );
};

const JudgingCriteria: FC<{title: string; description: string}> = ({
  title,
  description,
}) => {
  const [{theme}, dispatch] = useStateValue();

  return (
    <View style={styles.judgingCriteriaContainer}>
      <Text
        style={[
          styles.judgingCriteriaTitleText,
          {color: theme.DIM_TEXT_COLOR},
        ]}>
        {title}
      </Text>
      <View style={{marginHorizontal: Width * 0.03, marginTop: 5}}>
        <Text
          style={[styles.judgingCriteriaDescText, {color: theme.TEXT_COLOR}]}>
          {description}
        </Text>
      </View>
    </View>
  );
};

type props = {
  navigation: any;
  route: any;
  screen: 'student' | 'organization';
  ID: any;
};
const ViewHackathon: FC<props> = ({navigation, route, screen, ID}) => {
  // get hackathon id from params

  const [HackathonData, setHackathonData] = useState<any>({});
  const [BackgroundImageLoading, setBackgroundImageLoading] = useState(true);
  const [ImageAspectRatio, setImageAspectRatio] = useState(0);
  const [loading, setLoading] = useState(true);
  const [state, dispatch] = useStateValue();

  const {theme} = state;
  useEffect(() => {
    // fetch hackathon data
    axios
      .get(`/api/hackathon/${ID}`)
      .then(result => {
        setHackathonData(result.data);
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
        title={'Overview'}
        navigation={navigation}
        back
        onBackPress={() => navigation.goBack()}
      />

      {!loading && HackathonData ? (
        <>
          <ScrollView removeClippedSubviews>
            {/* background image  */}
            <View style={styles.backgroundImageContainer}>
              <Image
                style={{
                  width: Width,
                  height: Height * 0.3, //Width * ImageAspectRatio * 0.75,
                }}
                source={{
                  uri: BackgroundImageLoading
                    ? BACKGROUND_IMAGE
                    : HackathonData?.background_image
                    ? HackathonData?.background_image
                    : BACKGROUND_IMAGE,
                }}
                onLoadEnd={() => {
                  setBackgroundImageLoading(false);
                }}
                onError={() => {
                  setBackgroundImageLoading(false);
                  ToastAndroid.show("Couldn't load background image", 1500);
                }}
                resizeMode={'contain'}
              />
            </View>

            {/* card  */}
            <View
              style={[
                styles.card,
                {
                  backgroundColor: theme.CARD_BACKGROUND_COLOR,
                  marginHorizontal: Width * 0.05,
                },
              ]}>
              {/* title and tagline container  */}
              <View style={[styles.titleContainer, styles.center]}>
                <Text
                  style={[
                    styles.titleText,
                    {
                      color: theme.TEXT_COLOR,
                    },
                  ]}>
                  {HackathonData.title}
                </Text>
              </View>
              <View style={[styles.tagContainer]}>
                <Text
                  style={[
                    styles.tagLineText,
                    {
                      color: theme.DIM_TEXT_COLOR,
                    },
                  ]}>
                  {HackathonData.tag_line}
                </Text>
              </View>
              <Divider size={'large'} />

              {/* description container  */}
              <View style={styles.container}>
                <Text
                  style={[
                    styles.label,
                    {
                      color: theme.TEXT_COLOR,
                    },
                  ]}>
                  Description
                </Text>
                <View
                  style={{
                    marginLeft: Width * 0.04,
                    marginTop: 10,
                  }}>
                  <Text
                    style={[
                      styles.descriptionText,
                      {
                        color: theme.TEXT_COLOR,
                      },
                    ]}>
                    {HackathonData.description}
                  </Text>
                </View>
              </View>
              <Divider size={'medium'} />

              {/* Theme tags container  */}
              <View style={styles.container}>
                <Text
                  style={[
                    styles.label,
                    {
                      color: theme.TEXT_COLOR,
                    },
                  ]}>
                  Theme Tags
                </Text>
                <View style={{marginLeft: Width * 0.1, marginTop: 10}}>
                  {HackathonData.theme_tags.map(tag => (
                    <View style={styles.themeTagTextContainer}>
                      <Bullet />
                      <Text
                        style={{
                          color: theme.TEXT_COLOR,
                          fontSize: Sizes.normal * 0.9,
                        }}>
                        {tag.charAt(0).toUpperCase() +
                          tag.slice(1, tag.length).toLowerCase()}
                      </Text>
                    </View>
                  ))}
                </View>
              </View>
              <Divider size={'medium'} />
              {/* rules container  */}
              <View style={styles.container}>
                <Text
                  style={[
                    styles.label,
                    {
                      color: theme.TEXT_COLOR,
                    },
                  ]}>
                  Rules
                </Text>
                <View style={{marginLeft: Width * 0.1, marginTop: 10}}>
                  {HackathonData.rules.map(rule => (
                    <View style={styles.ruleTextContainer}>
                      <Bullet />
                      <Text
                        style={[
                          styles.rulesText,
                          {
                            color: theme.TEXT_COLOR,
                          },
                        ]}>
                        {rule}
                      </Text>
                    </View>
                  ))}
                </View>
              </View>
              <Divider size={'medium'} />
              <View style={styles.container}>
                <Text
                  style={[
                    styles.label,
                    {
                      color: theme.TEXT_COLOR,
                    },
                  ]}>
                  Prizes
                </Text>
                {/* flat list */}
                <View style={{marginVertical: 10}}>
                  <ScrollView horizontal={true}>
                    {HackathonData.prizes.map((prize, index) => (
                      <PrizeCard key={index} prize={prize} index={index} />
                    ))}
                  </ScrollView>
                </View>
              </View>
              <Divider size={'medium'} />
              <View style={styles.container}>
                <Text
                  style={[
                    styles.label,
                    {
                      color: theme.TEXT_COLOR,
                    },
                  ]}>
                  Judging Criteria
                </Text>
                {HackathonData.criteria.map(cri => (
                  <JudgingCriteria key={cri.id} {...cri} />
                ))}
              </View>
            </View>
          </ScrollView>
          {screen === 'student' &&
            HackathonData.status !== 'Ended' &&
            !HackathonData.is_applied && (
              <CustomButton
                text={'Join Now'}
                onPress={() => {
                  navigation.navigate('Register_Hackathon', {
                    ID: ID, // pass the hackathon data,
                    backgroundImage: HackathonData?.background_image,
                    title: HackathonData.title,
                    tagline: HackathonData.tag_line,
                  });
                }}
              />
            )}
        </>
      ) : (
        <ListSkeleton repition={5} />
      )}
    </View>
  );
};

export default ViewHackathon;

const styles = StyleSheet.create({
  parent: {
    flex: 1,
  },
  backgroundImageContainer: {
    // flex: 1,
  },
  card: {
    marginTop: -45,
    marginBottom: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'transparent',
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleContainer: {
    marginTop: 15,
  },
  titleText: {
    fontSize: Sizes.normal * 1.2,
  },
  tagContainer: {
    marginHorizontal: 20,
  },
  tagLineText: {
    fontSize: Sizes.normal * 0.85,
    textAlign: 'center',
  },
  container: {
    marginHorizontal: Width * 0.03,
    marginVertical: 10,
  },
  iconTextContainer: {
    flexDirection: 'row',
    marginLeft: Width * 0.04,
    marginTop: 10,
  },
  descriptionText: {
    fontSize: Sizes.normal * 0.8,
    lineHeight: 22,
  },
  prizeCard: {
    borderWidth: 1,
    borderRadius: 15,
    width: Width * 0.35,
    marginTop: 10,
    marginHorizontal: Width * 0.02,
  },
  prizeCardTextContainer: {
    flexDirection: 'row',
    marginHorizontal: 2,
    marginTop: 20,
  },
  judgeCard: {
    flexDirection: 'row',
    // marginHorizontal: Width * 0.02,
    marginLeft: Width * 0.04,
    marginTop: 18,
  },
  judgeImageContainer: {
    flex: 0.2,
  },
  judgeImage: {
    width: Width * 0.14,
    height: Width * 0.14,
    borderWidth: 1,
    borderRadius: 40,
    borderColor: 'transparent',
  },
  judgeDetailContainer: {
    flex: 0.8,
    marginLeft: 10,
  },
  judgingCriteriaContainer: {
    marginLeft: Width * 0.04,
    marginTop: 10,
  },
  judgingCriteriaTitleText: {
    fontSize: Sizes.normal * 0.95,
  },
  judgingCriteriaDescText: {
    lineHeight: 22,
    fontSize: Sizes.normal * 0.85,
  },

  themeTagTextContainer: {
    flexDirection: 'row',
    marginHorizontal: 2,
    marginTop: 2,
  },
  prizeDetailContainer: {
    flex: 0.95,
    justifyContent: 'center',
  },
  prizeTitleText: {
    fontSize: Sizes.normal,
    fontWeight: 'bold',
  },
  prizeMoneyText: {
    fontSize: Sizes.normal,
  },
  label: {
    fontSize: Sizes.normal,
    // fontFamily: 'Cindyrella',
  },
  ruleTextContainer: {
    flexDirection: 'row',
    marginRight: Width * 0.09,
    marginTop: 2,
  },
  rulesText: {
    fontSize: Sizes.normal * 0.8,
    lineHeight: 25,
  },
});
