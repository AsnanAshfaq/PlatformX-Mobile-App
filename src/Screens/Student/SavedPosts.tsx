import React, {FC, useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  ToastAndroid,
  View,
  FlatList,
  RefreshControl,
} from 'react-native';
import CustomHeader from '../../Components/CustomHeader';
import Loading from '../../Components/Loading';
import PostCard from '../../Components/PostCard';
import {Sizes, Width} from '../../Constants/Size';
import {useStateValue} from '../../Store/StateProvider';
import axios from '../../Utils/Axios';

type props = {
  navigation: any;
};
const SavedPosts: FC<props> = ({navigation}) => {
  const {theme} = useStateValue()[0];
  const [loading, setloading] = useState(false);
  const [data, setdata] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const getData = async () => {
    setloading(true);

    axios
      .get('/api/posts/saved/')
      .then(response => {
        if (response.status === 200) {
          setdata(response.data.post);
        }
        setloading(false);
      })
      .catch(error => {
        if (error.response) {
          ToastAndroid.show(error.response.error.data, 1500);
        }
        setloading(false);
      });
  };

  const onRefresh = () => {
    setRefreshing(true);
    getData().then(() => setRefreshing(false));
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <View
      style={[styles.parent, {backgroundColor: theme.SCREEN_BACKGROUND_COLOR}]}>
      <CustomHeader
        navigation={navigation}
        title={'Saved Posts'}
        back
        onBackPress={() => navigation.goBack()}
      />

      {loading || data.length === 0 ? (
        <View style={[styles.center, styles.parent]}>
          <Loading size={'large'} />
        </View>
      ) : !loading && data.length === 0 ? (
        <View style={[styles.center, styles.noPostContainer]}>
          <Text style={[styles.noPostText, {color: theme.DIM_TEXT_COLOR}]}>
            You have not saved any post yet.
          </Text>
        </View>
      ) : (
        <View style={[styles.container, styles.scroll]}>
          <FlatList
            data={data}
            nestedScrollEnabled
            keyExtractor={(item: any) => `${item.id}`}
            renderItem={({item: post, index, separators}: any) => (
              <PostCard
                key={post.id}
                postDetail={post}
                navigation={navigation}
                showPopUpIcon={false}
              />
            )}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                colors={[theme.REFRESH_COLOR]}
                progressBackgroundColor={theme.REFRESHING_BACKGROUND_COLOR}
                progressViewOffset={20}
                size={Sizes.large}
              />
            }
          />
        </View>
      )}
    </View>
  );
};

export default SavedPosts;

const styles = StyleSheet.create({
  parent: {
    flex: 1,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  margin: {
    marginHorizontal: Width * 0.04,
  },
  scroll: {
    marginBottom: 50,
  },
  normalText: {
    fontSize: Sizes.normal,
  },
  container: {
    marginTop: 10,
  },

  myPostContainer: {
    marginVertical: 5,
    // marginHorizontal: Width * 0.04,
  },
  myPostText: {
    fontSize: Sizes.normal * 1.1,
  },
  noPostContainer: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  noPostText: {
    fontSize: Sizes.normal * 0.8,
  },
  smallText: {
    fontSize: Sizes.small,
  },
});
