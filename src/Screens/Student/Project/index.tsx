import React, {FC, useEffect, useState, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  RefreshControl,
  Keyboard,
} from 'react-native';
import CustomHeader from '../../../Components/CustomHeader';
import CustomSearch from '../../../Components/Search';
import axios from '../../../Utils/Axios';
import {Sizes} from '../../../Constants/Size';
import {useFocusEffect, useIsFocused} from '@react-navigation/native';
import PostSkeleton from '../../../Skeleton/PostCardSkeleton';
import {useStateValue} from '../../../Store/StateProvider';
import {useScrollToTop} from '@react-navigation/native';

type props = {
  navigation: any;
};
const Projects: FC<props> = ({navigation}) => {
  const [Project, setProject] = useState([]);
  const isFocuses = useIsFocused();
  const [Refreshing, setRefreshing] = useState(false);
  const [{theme}, dispatch] = useStateValue();
  const [IsLoading, setIsLoading] = useState(true);
  const [Searching, setSearching] = useState<{
    isSearching: boolean;
    query: string;
  }>({
    isSearching: false,
    query: '',
  });
  const ref = useRef<any>();
  const [modals, setmodals] = useState({
    filter: false,
  });

  // useFocusEffect(
  //   useCallback(() => {
  //     // getData();
  //   }, []),
  // );

  const getData = async () => {
    try {
      axios.get('/api/posts/').then(response => {
        // setProject(response.data);
        setIsLoading(false);
      });
    } catch (error) {
      console.log('Error is', error);
    }
  };

  const handleSearch = () => {
    console.log('Handling search for projects');
  };

  const onRefresh = () => {
    setRefreshing(true);

    getData().then(() => {
      // console.log(Post);
      setRefreshing(false);
    });
  };
  useEffect(() => {
    getData();
  }, [IsLoading]);

  useScrollToTop(ref);

  return (
    <View
      style={[styles.parent, {backgroundColor: theme.SCREEN_BACKGROUND_COLOR}]}>
      <CustomHeader
        title={'Projects'}
        navigation={navigation}
        drawer
        chat
        bell
      />
      {!IsLoading && (
        <CustomSearch
          placeholder={'Search here'}
          isShownInHeader={false}
          showFilterIcon={true}
          handleSearch={handleSearch}
          onFilterPress={() => setmodals}
        />
      )}
      {Searching.isSearching ? (
        <>
          <PostSkeleton showSearchSkeleton={!Searching.isSearching} />
        </>
      ) : Project.length > 0 ? (
        <>
          <FlatList
            data={Project}
            // disableVirtualization
            keyExtractor={(item: any, index) => `${item.id}-${index}`}
            ref={ref}
            renderItem={({item: Project, index}: any) => {
              return <Text>This is the project screen</Text>;
              // return <PostCard key={Project?.id} postDetail={Project} />;
            }}
            // progressViewOffset={10}
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
      ) : !IsLoading ? (
        <View style={styles.center}>
          <Text style={[styles.noMoreText, {color: theme.TEXT_COLOR}]}>
            No more Projects
          </Text>
          <TouchableOpacity onPress={() => setIsLoading(true)}>
            <Text style={[styles.refreshText, {color: theme.GREEN_COLOR}]}>
              Refresh
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <PostSkeleton showSearchSkeleton={true} />
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
  noMoreText: {
    fontSize: Sizes.normal,
  },
  refreshText: {
    fontSize: Sizes.normal,
  },
});

export default Projects;
