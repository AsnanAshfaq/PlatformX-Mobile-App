/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {FC, useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Linking,
  TouchableOpacity,
} from 'react-native';
import CustomHeader from '../../../../Components/CustomHeader';
import Loading from '../../../../Components/Loading';
import {PROFILE_IMAGE} from '../../../../Constants/sample';
import {Sizes, Width} from '../../../../Constants/Size';
import {useStateValue} from '../../../../Store/StateProvider';
import axios from '../../../../Utils/Axios';
// @ts-ignore
import {BASE_URL} from 'react-native-dotenv';
import Bullet from '../../../../Components/Bullet';
import {CodeDownload} from '../../../../Components/Icons';

type props = {
  navigation: any;
  hackathonID: any;
  projectID: any;
};
const ViewProject: FC<props> = ({navigation, hackathonID, projectID}) => {
  const [data, setdata] = useState<any>({});
  const [downloading, setdownloading] = useState(false);
  const [loading, setloading] = useState(false);
  const [{theme}, dispatch] = useStateValue();
  const [loadingLogo, setloadingLogo] = useState(true);

  const getData = async () => {
    setloading(true);
    axios
      .get(`/api/hackathon/${hackathonID}/project/${projectID}`)
      .then(response => {
        if (response.status === 200) {
          setdata(response.data);
        }

        setloading(false);
      })
      .catch(error => {
        setloading(false);
      });
  };

  const downloadFile = link => {
    setdownloading(true);
    Linking.openURL(BASE_URL + link);
    setdownloading(false);
  };
  useEffect(() => {
    getData();
  }, []);

  if (loading || Object.keys(data).length === 0) {
    return (
      <View style={[styles.parent, styles.center]}>
        <Loading size={'large'} />
      </View>
    );
  }
  return (
    <View
      style={[
        styles.parent,
        {
          backgroundColor: theme.SCREEN_BACKGROUND_COLOR,
        },
      ]}>
      <CustomHeader
        title="View Project"
        navigation={navigation}
        back
        onBackPress={() => navigation.goBack()}
      />
      <ScrollView>
        <View style={styles.scroll}>
          <View style={[styles.container]}>
            {/* logo container  */}
            <View
              style={[
                styles.container,
                styles.center,
                styles.profileImageContainer,
              ]}>
              <Image
                source={{
                  uri: loadingLogo ? PROFILE_IMAGE : BASE_URL + data?.logo,
                }}
                style={[styles.profileImage]}
                resizeMode={'cover'}
                onLoadEnd={() => setloadingLogo(false)}
                onError={() => {
                  setloadingLogo(false);
                }}
              />
            </View>
            {/* title and tag line container  */}
            <View style={[styles.container, styles.center]}>
              <Text style={[styles.titleText, {color: theme.TEXT_COLOR}]}>
                {data.title}
              </Text>
            </View>
            <View style={[styles.container, styles.center]}>
              <Text style={[styles.tagLineText, {color: theme.DIM_TEXT_COLOR}]}>
                {data.tag_line}
              </Text>
            </View>

            {/* description  */}
            <View
              style={[
                styles.center,
                styles.card,
                {backgroundColor: theme.CARD_BACKGROUND_COLOR},
              ]}>
              <View style={[styles.center, styles.cardHeadingContainer]}>
                <Text
                  style={[
                    styles.cardHeadingText,
                    {color: theme.DIM_TEXT_COLOR},
                  ]}>
                  Description
                </Text>
              </View>
              <Text style={[styles.descriptionText, {color: theme.TEXT_COLOR}]}>
                {data.description}
              </Text>
            </View>

            {/* about  */}
            <View
              style={[
                styles.center,
                styles.card,
                {backgroundColor: theme.CARD_BACKGROUND_COLOR},
              ]}>
              <View style={[styles.center, styles.cardHeadingContainer]}>
                <Text
                  style={[
                    styles.cardHeadingText,
                    {color: theme.DIM_TEXT_COLOR},
                  ]}>
                  About {data.title}
                </Text>
              </View>
              <Text style={[styles.descriptionText, {color: theme.TEXT_COLOR}]}>
                {data.about}
              </Text>
            </View>

            {/* built with  */}
            <View
              style={[
                styles.center,
                styles.card,
                {backgroundColor: theme.CARD_BACKGROUND_COLOR},
              ]}>
              <View style={[styles.center, styles.cardHeadingContainer]}>
                <Text
                  style={[
                    styles.cardHeadingText,
                    {color: theme.DIM_TEXT_COLOR},
                  ]}>
                  Built With
                </Text>
              </View>
              {data.built_with.map((built, index) => (
                <>
                  <View
                    style={[
                      styles.builtWithContainer,
                      {
                        marginVertical:
                          index === data.built_with.length - 1 ? 10 : 0,
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
                        <Bullet color={theme.GREEN_COLOR} />
                      </View>
                      <View style={{flex: 0.9}}>
                        <Text
                          style={[
                            styles.BuiltWithText,
                            {color: theme.TEXT_COLOR},
                          ]}>
                          {built}
                        </Text>
                      </View>
                    </View>
                  </View>
                </>
              ))}
            </View>
            {/* try it out link  */}
            <View
              style={[
                styles.center,
                styles.card,
                {backgroundColor: theme.CARD_BACKGROUND_COLOR},
              ]}>
              <View style={[styles.center, styles.cardHeadingContainer]}>
                <Text
                  style={[
                    styles.cardHeadingText,
                    {color: theme.DIM_TEXT_COLOR},
                  ]}>
                  Try it Out Link
                </Text>
              </View>
              <Text style={[styles.linkText, {color: theme.ERROR_TEXT_COLOR}]}>
                {data.links}
              </Text>
              {data.video_link !== '' && (
                <View style={[styles.center, styles.container]}>
                  <Text
                    style={[
                      {
                        color: theme.DIM_TEXT_COLOR,
                        fontSize: Sizes.normal * 0.9,
                      },
                    ]}>
                    Video Demo Link
                  </Text>
                  <Text
                    style={[styles.linkText, {color: theme.ERROR_TEXT_COLOR}]}>
                    {data.video_link}
                  </Text>
                </View>
              )}
            </View>

            {/* file download link  */}
            <View
              style={[
                styles.center,
                styles.card,
                {backgroundColor: theme.CARD_BACKGROUND_COLOR},
              ]}>
              <View style={[styles.center, styles.cardHeadingContainer]}>
                <Text
                  style={[
                    styles.cardHeadingText,
                    {color: theme.DIM_TEXT_COLOR},
                  ]}>
                  Download Deliverables
                </Text>
              </View>
              <View style={styles.center}>
                <TouchableOpacity
                  onPress={downloadFile}
                  disabled={loading}
                  style={[
                    styles.downloadFileContainer,
                    {
                      backgroundColor: theme.CARD_BACKGROUND_COLOR,
                    },
                  ]}>
                  {downloading ? (
                    <Loading size={'small'} />
                  ) : (
                    <>
                      <View style={styles.cardTextContainer}>
                        <Text
                          style={[styles.cardText, {color: theme.TEXT_COLOR}]}>
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
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default ViewProject;

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
  profileImageContainer: {
    marginTop: 20,
  },
  profileImage: {
    width: Width * 0.25,
    height: Width * 0.25,
    borderRadius: 50,
  },
  titleText: {
    fontSize: Sizes.normal * 1.2,
  },
  tagLineText: {
    fontSize: Sizes.normal * 0.85,
    textAlign: 'center',
  },
  card: {
    borderRadius: 10,
    borderColor: 'transparent',
    // marginLeft: Width * 0.1,
    // width: Width * 0.8,
    marginHorizontal: Width * 0.058,
    marginTop: 20,
    padding: 15,
  },
  descriptionText: {
    fontSize: Sizes.normal * 0.8,
    lineHeight: 22,
    textAlign: 'center',
  },
  linkText: {
    fontSize: Sizes.normal * 0.8,
    lineHeight: 22,
    textAlign: 'center',
    flexShrink: 1,
  },
  cardHeadingContainer: {
    // marginTop: 3,
    marginVertical: 5,
  },
  cardHeadingText: {
    fontSize: Sizes.normal * 1.2,
  },
  builtWithContainer: {
    marginHorizontal: Width * 0.065,
    marginTop: 10,
    flexDirection: 'row',
  },
  BuiltWithText: {
    fontSize: Sizes.normal * 0.8,
    fontWeight: 'bold',
    lineHeight: 20,
    flexShrink: 1,
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
    fontSize: Sizes.normal,
  },
  downloadFileContainer: {
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
});
