import React, {FC, useEffect, useState, useCallback} from 'react';
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
import {ToastAndroid} from 'react-native';
import WorkshopCard from '../../../Components/WorkshopCard';
import WorkshopSkeleton from '../../../Skeleton/WorkshopCardSkeleton';
import {useStateValue} from '../../../Store/StateProvider';
type props = {
  navigation: any;
};

const Workshop: FC<props> = ({navigation}) => {
  const [Workshops, setWorkshops] = useState([]);
  // const isFocuses = useIsFocused();
  const [IsLoading, setIsLoading] = useState(true);
  const [Refreshing, setRefreshing] = useState(false);
  const [{theme}, dispatch] = useStateValue();
  const [Searching, setSearching] = useState<{
    isSearching: boolean;
    query: string;
  }>({
    isSearching: false,
    query: '',
  });

  const getData = async () => {
    axios
      .get('/api/workshops/')
      .then(response => {
        setWorkshops(response.data);
        setIsLoading(false);
        setSearching({
          isSearching: false,
          query: '',
        });
        // console.log('Response is ', response.data);
      })
      .catch(error => {
        setIsLoading(false);
        if (error.response.data) {
          ToastAndroid.show(error.response.data.error, 1500);
        }
      });
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
      axios.get(`/api/workshop/search/?q=${query}`).then(response => {
        setWorkshops(response.data);
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

  const applyFilters = (
    filter: Array<{subtag: Array<string>; tag: string}>,
  ) => {
    // make query string to be included in api call
    let filterQuery = '';
    // only if filter is not empty
    if (filter.length > 0) {
      for (let i = 0; i < filter.length; i++) {
        // get tag
        const tag = filter[i].tag.toLowerCase();
        // get subtags
        filter[i].subtag.forEach(subtag => {
          // add tag and subtag in query string if subtag is not empty
          if (subtag !== '') {
            if (filterQuery === '') {
              filterQuery += `${tag}=${subtag.toLowerCase()}`;
            } else {
              // append & if query is not empty
              filterQuery += `&${tag}=${subtag.toLowerCase()}`;
            }
          }
        });
      }
    }
    if (filterQuery !== '') {
      console.log('Search query is', Searching.query);
      // call the api if query is not empty and also append search query
      if (Searching.query !== '') {
        filterQuery += `q=${Searching.query}&${filterQuery}`;
      }

      console.log('final query is', filterQuery);
      // try {
      //   axios.get(`/api/workshop/search/?${filterQuery}`).then(response => {});
      // } catch (error) {}
    }
  };

  useEffect(() => {
    getData();
  }, [IsLoading]);

  return (
    <View
      style={[
        styles.parent,
        {
          backgroundColor: theme.SCREEN_BACKGROUND_COLOR,
        },
      ]}>
      <CustomHeader title={'Workshops'} navigation={navigation} drawer bell />

      {!IsLoading && (
        <CustomSearch
          placeholder={'Search workshops'}
          showFilterIcon={false}
          isShownInHeader={false}
          handleSearch={handleSearch}
        />
      )}
      {/* if searching  then show post skeleton without search skeleton*/}
      {Searching.isSearching ? (
        <>
          <WorkshopSkeleton showSearchSkeleton={!Searching.isSearching} />
        </>
      ) : Workshops.length > 0 ? (
        <>
          <FlatList
            data={Workshops}
            // disableVirtualization
            keyExtractor={(item: any, index) => `${item.id}-${index}`}
            renderItem={({item: workshop, index}: any) => {
              return (
                <WorkshopCard
                  navigation={navigation}
                  workshopDetail={workshop}
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
      ) : !IsLoading && Workshops.length === 0 ? (
        <View style={styles.center}>
          <Text style={[styles.noMoreText, {color: theme.TEXT_COLOR}]}>
            {Searching.query !== '' && Workshop.length === 0
              ? `No result Found for ${Searching.query}`
              : 'No workshops yet'}
          </Text>
          <TouchableOpacity onPress={() => setIsLoading(true)}>
            <Text style={[styles.refreshText, {color: theme.GREEN_COLOR}]}>
              Refresh
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <WorkshopSkeleton
          showSearchSkeleton={!Searching.isSearching || Refreshing}
        />
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

export default Workshop;
