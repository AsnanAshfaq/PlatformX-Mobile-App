/* eslint-disable react-hooks/exhaustive-deps */
import React, {FC, useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList,
  Image,
  TouchableOpacity,
  Linking,
  ToastAndroid,
} from 'react-native';
import axios from '../Utils/Axios';
import CustomHeader from './CustomHeader';
import Divider from './Divider';

import {GREY_IMAGE, BACKGROUND_IMAGE, PROFILE_IMAGE} from '../Constants/sample';
//@ts-ignore
import {BASE_URL} from 'react-native-dotenv';
import ListSkeleton from '../Skeleton/ListSkeleton';
import {Height, Sizes, Width} from '../Constants/Size';
import {commaSeperator} from '../Utils/Numbers';
import {useStateValue} from '../Store/StateProvider';
import CustomButton from './CustomButton';
import CodeStyleSkeleton from '../Skeleton/CodeStyleSkeleton';
import Bullet from './Bullet';
import Loading from './Loading';
import {CodeDownload} from './Icons';

const sampleText =
  'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illo nemo unde qui, totam a facilis rerum veniam in natus earum tempora odio dolorem voluptate placeat perspiciatis. Alias debitis quibusdam dolores!';

type props = {
  navigation: any;
  route: any;
  screen: 'student' | 'organization';
  hackathonID: any;
  projectID: any;
};

const LinkText: FC<{link}> = ({link}) => {
  const [{theme}, dispatch] = useStateValue();
  return (
    <Text
      onPress={() => {
        Linking.openURL(link);
      }}
      style={[
        styles.linkText,
        {
          color: theme.ERROR_TEXT_COLOR,
        },
      ]}>
      {link}
    </Text>
  );
};

const ViewHackathonProject: FC<props> = ({
  navigation,
  route,
  screen,
  hackathonID,
  projectID,
}) => {
  // get hackathon project id from params

  const [projectData, setProjectData] = useState<any>({});
  const [ImageAspectRatio, setImageAspectRatio] = useState(0);
  const [LoadLogoImage, setLoadLogoImage] = useState(false);
  const [loading, setLoading] = useState(false);
  const [{theme}, dispatch] = useStateValue();
  const [download, setdownload] = useState(false);

  const getData = async () => {
    setLoading(true);
    axios
      .get(`/api/hackathon/${hackathonID}/project/${projectID}/`)
      .then(response => {
        setProjectData(response.data);
        setLoading(false);
      })
      .catch(error => {
        if (error.response) {
          ToastAndroid.show(error.response.data.error, 1500);
        }
        setLoading(false);
        return error.response;
      });
  };

  const handleFileDownload = link => {
    setdownload(true);
    Linking.openURL(BASE_URL + link);
    setdownload(false);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <View
      style={[
        styles.parent,
        {
          backgroundColor: theme.SCREEN_BACKGROUND_COLOR,
        },
      ]}>
      <CustomHeader
        title={'Project Description'}
        navigation={navigation}
        back
        onBackPress={() => navigation.goBack()}
      />

      {!loading && Object.keys(projectData).length !== 0 ? (
        <>
          <ScrollView removeClippedSubviews>
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
                  {projectData.title}
                </Text>
                <Text
                  style={[
                    styles.tagLineText,
                    {
                      color: theme.DIM_TEXT_COLOR,
                    },
                  ]}>
                  {projectData.tag_line}
                </Text>
              </View>

              {/* image container  */}
              <View style={styles.center}>
                <Image
                  source={{
                    uri: LoadLogoImage
                      ? GREY_IMAGE
                      : BASE_URL + projectData.logo,
                  }}
                  style={[styles.image]}
                  onLoadEnd={() => {
                    setLoadLogoImage(false);
                  }}
                  onError={() => {
                    setLoadLogoImage(false);
                  }}
                />
              </View>
              <Divider size={'large'} />

              {/* developed by container  */}
              {screen === 'organization' && (
                <>
                  <View style={styles.container}>
                    <Text
                      style={[
                        styles.cardHeadingText,
                        {color: theme.DIM_TEXT_COLOR},
                      ]}>
                      Developed By
                    </Text>
                    <View style={styles.developedContainer}>
                      <View
                        style={[
                          styles.center,
                          {
                            flex: 0.3,
                          },
                        ]}>
                        <Image
                          source={{
                            uri:
                              'https://avatars.githubusercontent.com/u/65377376?s=400&u=812ba5bc16639e502e22fa141f284c0914e1fa80&v=4',
                          }}
                          style={[styles.userImage]}
                        />
                      </View>
                      <View style={{flex: 0.7}}>
                        <Text
                          style={[
                            styles.userNameText,
                            {
                              color: theme.TEXT_COLOR,
                            },
                          ]}>
                          {projectData.student.user.first_name +
                            ' ' +
                            projectData.student.user.last_name}
                        </Text>
                        <Text
                          style={[
                            styles.userEmailText,
                            {
                              color: theme.TEXT_COLOR,
                            },
                          ]}>
                          {projectData.student.user.email}
                        </Text>
                      </View>
                    </View>
                  </View>
                  <Divider size={'large'} />
                </>
              )}

              {/* description container  */}
              <View style={styles.container}>
                <Text
                  style={[
                    styles.cardHeadingText,
                    {color: theme.DIM_TEXT_COLOR},
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
                    {projectData.description}
                  </Text>
                </View>
              </View>
              <Divider size={'small'} />
              {/* about project  */}
              <View style={styles.container}>
                <Text
                  style={[
                    styles.cardHeadingText,
                    {color: theme.DIM_TEXT_COLOR},
                  ]}>
                  About the Project
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
                    {projectData.about}
                  </Text>
                </View>
              </View>
              <Divider size={'small'} />

              {/* built with tags   */}
              <View style={styles.container}>
                <Text
                  style={[
                    styles.cardHeadingText,
                    {color: theme.DIM_TEXT_COLOR},
                  ]}>
                  Built With
                </Text>

                <View style={{marginLeft: Width * 0.1, marginTop: 10}}>
                  {projectData.built_with.map(built => (
                    <View style={styles.bulletTextContainer}>
                      <Bullet color={theme.GREEN_COLOR} />
                      <Text
                        style={{
                          color: theme.TEXT_COLOR,
                          fontSize: Sizes.normal,
                        }}>
                        {built}
                      </Text>
                    </View>
                  ))}
                </View>
              </View>
              <Divider size={'small'} />

              {/* give it a go links  */}
              <View style={styles.container}>
                <Text
                  style={[
                    styles.cardHeadingText,
                    {color: theme.DIM_TEXT_COLOR},
                  ]}>
                  Try it Out Link
                </Text>
                <View style={{marginLeft: Width * 0.1, marginTop: 10}}>
                  <View style={[styles.bulletTextContainer]}>
                    <Bullet />
                    <LinkText link={projectData.links} />
                  </View>
                </View>
              </View>
              {/* video demo link */}
              {projectData.video_link !== '' && (
                <View style={styles.container}>
                  <Text
                    style={[
                      styles.label,
                      {
                        color: theme.TEXT_COLOR,
                      },
                    ]}>
                    Video Demo Link
                  </Text>
                  <View style={{marginLeft: Width * 0.12, marginTop: 10}}>
                    <View style={styles.bulletTextContainer}>
                      <Bullet />
                      <LinkText link={projectData.video_link} />
                    </View>
                  </View>
                </View>
              )}

              <Divider size={'small'} />

              {/* project media  */}
              <View style={styles.container}>
                <Text
                  style={[
                    styles.label,
                    {
                      color: theme.TEXT_COLOR,
                    },
                  ]}>
                  Deliverables
                </Text>
                <View style={styles.center}>
                  <TouchableOpacity
                    onPress={() => handleFileDownload(projectData.file)}
                    disabled={loading}
                    style={[
                      styles.downloadFileContainer,
                      {
                        backgroundColor: theme.CARD_BACKGROUND_COLOR,
                      },
                    ]}>
                    {download ? (
                      <Loading size={'small'} />
                    ) : (
                      <>
                        <View style={styles.cardTextContainer}>
                          <Text
                            style={[
                              styles.cardText,
                              {color: theme.TEXT_COLOR},
                            ]}>
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
          </ScrollView>
          {screen === 'organization' && (
            <CustomButton
              text={'Evaluate'}
              onPress={() => {
                navigation.navigate('Hackathon_Evaluate', {
                  hackathonID: hackathonID, // pass the hackathon data,
                  projectID: projectID,
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

export default ViewHackathonProject;

const styles = StyleSheet.create({
  parent: {
    flex: 1,
  },
  backgroundImageContainer: {
    // flex: 1,
  },
  card: {
    // marginTop: -45,
    marginTop: 10,
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 10,
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
  tagLineText: {
    fontSize: Sizes.normal * 0.85,
    textAlign: 'center',
  },
  image: {
    width: Width * 0.25,
    height: Width * 0.25,
    borderRadius: 50,
    marginVertical: 10,
  },
  developedContainer: {
    marginLeft: Width * 0.04,
    marginTop: 10,
    flexDirection: 'row',
  },
  userImage: {
    width: Width * 0.15,
    height: Width * 0.15,
    borderRadius: 40,
    // marginVertical: 10,
  },
  userNameText: {
    fontSize: Sizes.normal * 0.95,
    paddingVertical: 2,
  },
  userEmailText: {
    fontSize: Sizes.normal * 0.8,
  },
  container: {
    marginHorizontal: Width * 0.03,
    marginVertical: 10,
  },
  mediaContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    marginTop: 10,
    marginHorizontal: Width * 0.15,
    borderRadius: 10,
    padding: 6,
  },
  iconTextContainer: {
    flexDirection: 'row',
    marginLeft: Width * 0.04,
    marginTop: 10,
  },
  descriptionText: {
    fontSize: Sizes.normal * 0.8,
    lineHeight: 22,
    textAlign: 'center',
  },

  cardHeadingText: {
    fontSize: Sizes.normal * 1.2,
  },
  bulletTextContainer: {
    flexDirection: 'row',
    marginHorizontal: 2,
    marginTop: 2,
  },

  label: {
    fontSize: Sizes.normal * 1.1,
    // fontFamily: 'Cindyrella',
  },
  linkText: {
    fontSize: Sizes.normal * 0.7,
    flexShrink: 1,
    lineHeight: 16,
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
