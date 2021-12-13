import React, {FC, useEffect, useState, useCallback, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  RefreshControl,
  Keyboard,
  ToastAndroid,
  Image,
} from 'react-native';
import PostCard from '../../../Components/PostCard';
import CustomHeader from '../../../Components/CustomHeader';
import CustomSearch from '../../../Components/Search';
import axios from '../../../Utils/Axios';
import {Sizes, Width} from '../../../Constants/Size';
import {useFocusEffect, useIsFocused} from '@react-navigation/native';
import PostSkeleton from '../../../Skeleton/PostCardSkeleton';
import {useStateValue} from '../../../Store/StateProvider';
import FloatingActionButton from '../../../Components/FloatingActionButton';
import {PROFILE_IMAGE} from '../../../Constants/sample';
import {useScrollToTop} from '@react-navigation/native';

//@ts-ignore
import {BASE_URL} from 'react-native-dotenv';

type props = {
  navigation: any;
};
const Posts: FC<props> = ({navigation}) => {
  const [Post, setPost] = useState([]);
  const isFocuses = useIsFocused();
  const [Refreshing, setRefreshing] = useState(false);
  const [IsLoading, setIsLoading] = useState(true);
  const [LoadProfileImage, setLoadProfileImage] = useState(true);
  const [state, dispatch] = useStateValue();
  const {theme} = state;
  const [Searching, setSearching] = useState<{
    isSearching: boolean;
    query: string;
  }>({
    isSearching: false,
    query: '',
  });

  const ref = useRef<any>();

  const getData = async () => {
    try {
      axios.get('/api/posts/').then(response => {
        setPost(response.data);
        setIsLoading(false);
        setSearching({
          isSearching: false,
          query: '',
        });
      });
    } catch (error: any) {
      ToastAndroid.show(error.data.response.error, 1500);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    getData().then(() => {
      setRefreshing(false);
      // handle seaching state
      setSearching({
        isSearching: false,
        query: '',
      });
    });
  };

  const handleSearch = (query: string) => {
    // set the searching to true
    setSearching({
      isSearching: true,
      query: query,
    });
    try {
      axios.get(`/api/post/search/?q=${query}`).then(response => {
        setPost(response.data);
        setIsLoading(false);
        setSearching(props => {
          return {
            isSearching: false,
            query: props.query,
          };
        });
      });
    } catch (error: any) {
      setSearching(props => {
        return {
          isSearching: false,
          query: props.query,
        };
      });
      ToastAndroid.show(error.data.response.error, 1500);
    }
  };

  useEffect(() => {
    getData();
  }, [IsLoading]);

  const renderItem = useCallback(
    ({item: post, index}: any) => (
      <PostCard postDetail={post} navigation={navigation} />
    ),
    [navigation],
  );

  const keyExtractor = useCallback(
    (item: any, index) => `${item.id}-${index}`,
    [],
  );

  const writeNewPost = () => {
    return (
      <View
        style={[
          styles.listHeaderContainer,
          {
            shadowColor: theme.SHADOW_COLOR,
            backgroundColor: theme.CARD_BACKGROUND_COLOR,
          },
        ]}>
        <View style={styles.listHeaderImageContainer}>
          <Image
            source={{
              uri: LoadProfileImage
                ? PROFILE_IMAGE
                : state.user.profilePic !== ''
                ? BASE_URL + state.user.profilePic
                : PROFILE_IMAGE,
            }}
            onLoadEnd={() => setLoadProfileImage(false)}
            onError={() => {
              setLoadProfileImage(false);
              ToastAndroid.show("Couldn't load profile image", 1500);
            }}
            style={styles.profileImage}
          />
        </View>

        <View
          style={[
            styles.listHeaderTextContainer,
            {
              borderColor: theme.BORDER_COLOR,
            },
          ]}>
          <TouchableOpacity
            onPress={() =>
              // opacity.value = Math.random();
              navigation.navigate('Create_Edit_Post', {screen: 'Create'})
            }>
            <Text
              style={[
                styles.listHeaderText,
                {
                  color: theme.TEXT_COLOR,
                },
              ]}>
              Share something with us ...
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.emptyView} />

        <TouchableOpacity
          onPress={() =>
            navigation.navigate('Create_Edit_Post', {screen: 'Create'})
          }
          style={[
            styles.plusTextContainer,
            {backgroundColor: theme.GREEN_COLOR},
          ]}>
          <Text style={[styles.plusText, {color: theme.TEXT_COLOR}]}>+</Text>
        </TouchableOpacity>
      </View>
    );
  };

  useScrollToTop(ref);

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
        image
        chat
        bell
        saerch
        // handleSearch={handleSearch}
      />

      {/* if searching  then show post skeleton without search skeleton*/}
      {Searching.isSearching ? (
        <>
          <PostSkeleton showSearchSkeleton={!Searching.isSearching} />
        </>
      ) : Post.length > 0 ? (
        <>
          <FlatList
            data={Post}
            // disableVirtualization
            keyExtractor={keyExtractor}
            ListHeaderComponent={writeNewPost}
            renderItem={renderItem}
            // progressViewOffset={10}
            ref={ref}
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
            // inverted
            contentOffset={{y: -300, x: 0}}
          />
        </>
      ) : !IsLoading && Post.length === 0 ? (
        <>
          <View style={styles.center}>
            <Text
              style={[
                styles.noMoreText,
                {
                  color: theme.TEXT_COLOR,
                },
              ]}>
              {Searching.query !== '' && Post.length === 0
                ? `No result Found for ${Searching.query}`
                : 'No posts yet'}
            </Text>
            <TouchableOpacity onPress={() => setIsLoading(true)}>
              <Text style={[styles.refreshText, {color: theme.GREEN_COLOR}]}>
                Refresh
              </Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <PostSkeleton showSearchSkeleton={false} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  parent: {
    flex: 1,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listHeaderContainer: {
    flexDirection: 'row',
    marginHorizontal: Width * 0.04,
    marginVertical: Width * 0.03,
    // minHeight: Height * 0.35,
    // maxHeight: Height * 0.4,
    borderRadius: 10,
    padding: 5,
    paddingVertical: 12,
    shadowOpacity: 1,
    shadowRadius: 25,
    shadowOffset: {width: 10, height: 12},
    elevation: 30,
  },
  listHeaderImageContainer: {
    flex: 0.2,
  },
  listHeaderTextContainer: {
    borderWidth: 1,
    flex: 0.65,
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  listHeaderText: {
    fontSize: Sizes.normal * 0.8,
  },
  emptyView: {
    flex: 0.05,
  },
  plusTextContainer: {
    flex: 0.1,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  plusText: {
    fontSize: Sizes.normal,
  },
  profileImage: {
    height: Width * 0.09,
    width: Width * 0.09,
    borderRadius: 40,
    marginHorizontal: 10,
  },
  noMoreText: {
    fontSize: Sizes.normal,
  },
  refreshText: {
    fontSize: Sizes.normal,
  },
});

export default Posts;
