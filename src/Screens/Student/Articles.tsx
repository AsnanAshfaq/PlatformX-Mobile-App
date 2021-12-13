/* eslint-disable react-native/no-inline-styles */
import React, {FC, useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList,
  RefreshControl,
  ToastAndroid,
  Image,
  Linking,
  TouchableOpacity,
} from 'react-native';
import CustomButton from '../../Components/CustomButton';
import CustomHeader from '../../Components/CustomHeader';
// import Loading from '../../Components/Loading';
import Skeleton from '../../Skeleton/CardSkeleton';
import {GREY_IMAGE} from '../../Constants/sample';
import {Sizes, Width} from '../../Constants/Size';
import {useStateValue} from '../../Store/StateProvider';
import axios from '../../Utils/Axios';
import LottieView from 'lottie-react-native';

type Props = {
  id: number;
  title: string;
  content: string;
  image: string;
  url: string;
};

const Card: FC<Props> = ({id, title, image, content, url}) => {
  const {theme} = useStateValue()[0];
  const [poster, setPoster] = useState({
    loading: true,
    ratio: 0,
  });

  const VisitSite = () => {
    Linking.openURL(url);
  };

  return (
    <View
      style={[
        styles.container,
        styles.cardContainer,
        {
          backgroundColor: theme.CARD_BACKGROUND_COLOR,
        },
      ]}>
      {/* topic container  */}
      <View style={[styles.topicContainer, styles.center]}>
        {/* name of the project  */}
        <View style={styles.topicTextContainer}>
          <Text style={[styles.topicText, {color: theme.TEXT_COLOR}]}>
            {title}
          </Text>
        </View>
      </View>
      {/* image container  */}
      {image !== '' && (
        <View style={[styles.imageContainer, styles.center]}>
          <Image
            source={{
              uri: poster.loading ? GREY_IMAGE : image,
            }}
            onLoadEnd={() => {
              Image.getSize(image, (width, heigth) => {
                // calculate aspect ratio of image
                setPoster(props => {
                  return {
                    loading: false,
                    ratio: heigth / width,
                  };
                });
              });
            }}
            style={{
              width: Width * 0.78,
              height: Width * poster.ratio * 0.78,
              borderRadius: 10,
            }}
            resizeMode={'contain'} //contain
          />
        </View>
      )}

      {/* content container  */}
      <View style={[styles.container, styles.contentContainer]}>
        <Text style={[styles.contentText, {color: theme.TEXT_COLOR}]}>
          {content}
        </Text>
      </View>
      <View style={[{marginRight: 8, alignItems: 'flex-end'}]}>
        <CustomButton
          text={'Visit Site'}
          onPress={VisitSite}
          width={Width * 0.27}
          height={Width * 0.12}
          textSize={Sizes.normal * 0.8}
        />
      </View>
    </View>
  );
};

type props = {
  navigation: any;
};

const Articles: FC<props> = ({navigation}) => {
  const {theme} = useStateValue()[0];
  const [articles, setArticles] = useState([]);
  const [Refreshing, setRefreshing] = useState(false);
  const [loading, setloading] = useState(true);

  const getArticles = async () => {
    setloading(true);
    axios
      .get('/user/articles/')
      .then(response => {
        setloading(false);
        setArticles(response.data.data);
      })
      .catch(error => {
        setloading(false);
        if (error.response) {
          ToastAndroid.show(error.response.data.error, 1500);
        }
        return error.response;
      });
  };
  const onRefresh = () => {
    setRefreshing(true);
    getArticles().then(() => {
      setRefreshing(false);
    });
  };

  useEffect(() => {
    getArticles();
  }, []);
  return (
    <View
      style={[styles.parent, {backgroundColor: theme.SCREEN_BACKGROUND_COLOR}]}>
      <CustomHeader
        title={'Read Articles'}
        navigation={navigation}
        back
        onBackPress={() => navigation.goBack()}
      />

      {!loading && articles.length > 0 ? (
        <>
          <FlatList
            data={articles}
            ListHeaderComponent={() => (
              <View style={styles.container} key={Math.random()}>
                <Text style={[styles.smallText, {color: theme.DIM_TEXT_COLOR}]}>
                  Read articles based on your interests. You can always change
                  them by editing your profile.
                </Text>
              </View>
            )}
            contentContainerStyle={styles.scroll}
            keyExtractor={(item: any, index) => `${item.id}`}
            ListFooterComponent={() => <View style={{marginBottom: 10}} />}
            renderItem={({item, index}) => <Card {...item} />}
            refreshControl={
              <RefreshControl
                refreshing={Refreshing}
                onRefresh={onRefresh}
                colors={[theme.REFRESH_COLOR]}
                progressBackgroundColor={theme.REFRESHING_BACKGROUND_COLOR}
                progressViewOffset={20}
                size={Sizes.large}
              />
            }
          />
        </>
      ) : !loading && articles.length === 0 ? (
        <View style={[styles.center, {flex: 1}]}>
          <Text style={[styles.normalText, {color: theme.DIM_TEXT_COLOR}]}>
            No articles yet
          </Text>
          <TouchableOpacity onPress={() => setloading(true)}>
            <Text style={[styles.normalText, {color: theme.GREEN_COLOR}]}>
              Refresh
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={[{flex: 1}, styles.center]}>
          <LottieView
            source={require('../../../assets/lottie/book.json')}
            style={styles.animation}
            autoPlay
            loop={true}
            autoSize
            // duration={2000}
            resizeMode={'cover'}
            colorFilters={[
              {
                keypath: 'r Outlines',
                color: theme.GREEN_COLOR,
              },
              {
                keypath: 'l Outlines 5',
                color: theme.GREEN_COLOR,
              },
              {
                keypath: 'l Outlines 4',
                color: theme.GREEN_COLOR,
              },
              {
                keypath: 'l Outlines 3',
                color: theme.GREEN_COLOR,
              },
              {
                keypath: 'l Outlines 2',
                color: theme.GREEN_COLOR,
              },
              {
                keypath: 'l Outlines',
                color: theme.GREEN_COLOR,
              },
              {
                keypath: 'book r Outlines',
                color: theme.GREEN_COLOR,
              },
              {
                keypath: 'book l Outlines',
                color: theme.GREEN_COLOR,
              },
            ]}
          />
          <Text style={[styles.smallText, {color: theme.DIM_TEXT_COLOR}]}>
            Getting articles. It might take a while....
          </Text>
        </View>
      )}
    </View>
  );
};

export default Articles;

const styles = StyleSheet.create({
  parent: {
    flex: 1,
  },
  scroll: {
    marginHorizontal: Width * 0.04,
    marginBottom: 10,
  },
  margin: {
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

  animation: {
    width: 120,
    height: 120,
  },
  cardContainer: {
    borderRadius: 10,
    shadowOpacity: 1,
    shadowRadius: 25,
    shadowOffset: {width: 10, height: 12},
    elevation: 5,
  },
  topicContainer: {
    marginBottom: 10,
    marginTop: 10,
    flex: 1,
    flexDirection: 'row',
  },
  topicTextContainer: {
    alignItems: 'center',
  },
  topicText: {
    fontSize: Sizes.normal * 1.2,
    textAlign: 'center',
  },
  imageContainer: {
    marginHorizontal: 0,
    marginTop: 10,
  },
  contentContainer: {
    marginHorizontal: Width * 0.04,
  },
  contentText: {
    fontSize: Sizes.normal * 0.8,
    textAlign: 'center',
    lineHeight: 20,
  },
  refreshText: {
    fontSize: Sizes.normal,
  },
});
