import React, {FC, useEffect, useState, useRef, useCallback} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  RefreshControl,
  Keyboard,
  ToastAndroid,
} from 'react-native';
import CustomHeader from '../../../Components/CustomHeader';
import CustomSearch from '../../../Components/Search';
import axios from '../../../Utils/Axios';
import {Sizes} from '../../../Constants/Size';
import {useFocusEffect, useIsFocused} from '@react-navigation/native';
import PostSkeleton from '../../../Skeleton/PostCardSkeleton';
import {useStateValue} from '../../../Store/StateProvider';
import {useScrollToTop} from '@react-navigation/native';
import FYPCard from '../../../Components/FYPCard';

type props = {
  navigation: any;
};
const FYP: FC<props> = ({navigation}) => {
  const [FYPS, setFYP] = useState([]);
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

  const getData = async () => {
    axios
      .get('/api/fyp/')
      .then(response => {
        setFYP(response.data);
        setIsLoading(false);
      })
      .catch(error => {
        setIsLoading(false);
      });
  };

  const handleSearch = () => {
    console.log('Handling search for projects');
  };

  const onRefresh = () => {
    setRefreshing(true);

    getData().then(() => {
      setRefreshing(false);
    });
  };
  useEffect(() => {
    getData();
  }, [IsLoading]);

  const ref = useRef<any>();

  useScrollToTop(ref);

  return (
    <View
      style={[styles.parent, {backgroundColor: theme.SCREEN_BACKGROUND_COLOR}]}>
      <CustomHeader title={"FYP's"} navigation={navigation} drawer bell />
      {!IsLoading && (
        <CustomSearch
          placeholder={'Search here'}
          showFilterIcon={false}
          isShownInHeader={false}
          handleSearch={handleSearch}
        />
      )}
      {Searching.isSearching ? (
        <>
          <PostSkeleton showSearchSkeleton={!Searching.isSearching} />
        </>
      ) : FYPS.length > 0 ? (
        <>
          <FlatList
            data={FYPS}
            // disableVirtualization
            keyExtractor={(item: any, index) => `${item.id}-${index}`}
            renderItem={({item: FYP, index}: any) => {
              return (
                <FYPCard
                  navigation={navigation}
                  fypDetail={FYP}
                  source={'organization'}
                />
              );
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
      ) : !IsLoading && FYPS.length === 0 ? (
        <View style={styles.center}>
          <Text style={[styles.noMoreText, {color: theme.TEXT_COLOR}]}>
            {Searching.query !== '' && FYPS.length === 0
              ? `No result Found for ${Searching.query}`
              : "No fyp's yet"}
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

export default FYP;
