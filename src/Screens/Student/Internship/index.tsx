import React, {FC, useEffect, useState, useCallback, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  RefreshControl,
  ToastAndroid,
} from 'react-native';
import InternshipCard from '../../../Components/InternshipCard';
import CustomHeader from '../../../Components/CustomHeader';
import CustomSearch from '../../../Components/Search';
import axios from '../../../Utils/Axios';
import {Sizes} from '../../../Constants/Size';
import HackathonSkeleton from '../../../Skeleton/HackathonCardSkeleton';
import {useStateValue} from '../../../Store/StateProvider';
import {useScrollToTop} from '@react-navigation/native';
import InternshipFilterModal from '../../../Modals/InternshipFilterModal';

type props = {
  navigation: any;
};

const Internship: FC<props> = ({navigation}) => {
  const [internships, setInterships] = useState([]);
  const [Refreshing, setRefreshing] = useState(false);
  const [IsLoading, setIsLoading] = useState(true);
  const [{theme}, dispatch] = useStateValue();
  const [Searching, setSearching] = useState<{
    isSearching: boolean;
    query: string;
    filter: string;
  }>({
    isSearching: false,
    query: '',
    filter: '',
  });
  const [modal, setmodal] = useState({
    filter: false,
  });
  const ref = useRef<any>();

  const getData = async () => {
    axios
      .get('/api/internships/')
      .then(response => {
        setInterships(response.data);
        setIsLoading(false);
      })
      .catch(error => {
        setIsLoading(false);

        if (error.response) {
          ToastAndroid.show(error.response.data.error, 1500);
        }
        return error.response;
      });
  };

  const onRefresh = () => {
    setRefreshing(true);
    getData().then(() => {
      // console.log(Post);
      setRefreshing(false);

      // handle seaching state
      setSearching({
        isSearching: false,
        query: '',
        filter: '',
      });
    });
  };

  const handleSearch = (query: string) => {
    // set the searching to true
    setSearching({
      isSearching: true,
      query: query,
      filter: '',
    });
    try {
      axios.get(`/api/internship/search/?q=${query}`).then(response => {
        setIsLoading(false);
        if (response.data['error']) {
          setInterships([]);
          setSearching({
            isSearching: false,
            query: '',
            filter: '',
          });
        } else {
          setInterships(response.data);
          setSearching(props => {
            return {
              isSearching: false,
              query: props.query,
              filter: '',
            };
          });
        }
      });
    } catch (error: any) {
      setIsLoading(false);
      setSearching(props => {
        return {
          isSearching: false,
          query: props.query,
          filter: '',
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
          // add tag and subtag in filter query string if subtag is not empty
          if (subtag !== '') {
            if (filterQuery === '') {
              filterQuery += `${tag}=${subtag}`;
            } else {
              // append & if filter query is not empty
              filterQuery += `&${tag}=${subtag}`;
            }
          }
        });
      }
    }
    if (filterQuery !== '') {
      if (Searching.query === '') {
        setSearching({
          isSearching: true,
          query: '',
          filter: filterQuery,
        });
        try {
          axios.get(`/api/internship/search/?${filterQuery}`).then(response => {
            setIsLoading(false);
            if (response.data['error']) {
              setInterships([]);
              setSearching({
                isSearching: false,
                query: '',
                filter: '',
              });
            } else {
              setInterships(response.data);
              setSearching({
                isSearching: false,
                query: '',
                filter: filterQuery,
              });
            }
          });
        } catch (error) {
          setIsLoading(false);
          setSearching({
            isSearching: false,
            query: '',
            filter: '',
          });
        }
      }
    }
  };

  useEffect(() => {
    getData();
  }, [IsLoading]);

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
        title={'Internships'}
        navigation={navigation}
        drawer
        chat
        bell
      />

      {/* filter modal  */}
      <InternshipFilterModal
        isShow={modal.filter}
        toggleModal={() =>
          setmodal(props => {
            return {
              ...props,
              filter: false,
            };
          })
        }
        applyFilters={filters => applyFilters(filters)}
      />

      {!IsLoading && (
        <CustomSearch
          placeholder={'Search internships'}
          handleSearch={handleSearch}
          isShownInHeader={false}
          showFilterIcon={true}
          onFilterPress={() =>
            setmodal(props => {
              return {
                filter: true,
              };
            })
          }
        />
      )}

      {Searching.isSearching ? (
        <>
          <HackathonSkeleton showSearchSkeleton={!Searching.isSearching} />
        </>
      ) : internships.length > 0 ? (
        <>
          <FlatList
            data={internships}
            // disableVirtualization
            keyExtractor={(item: any, index) => `${item.id}-${index}`}
            ref={ref}
            renderItem={({item: internship, index}: any) => {
              return (
                <InternshipCard
                  key={internship?.id}
                  internshipDetail={internship}
                  navigation={navigation}
                  source={'student'}
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
            // contentOffset={{y: -300, x: 0}}
          />
        </>
      ) : !IsLoading && internships.length === 0 ? (
        <View style={styles.center}>
          <Text style={[styles.noMoreText, {color: theme.TEXT_COLOR}]}>
            {Searching.query !== '' && internships.length === 0
              ? `No result Found for ${Searching.query}`
              : Searching.filter !== '' && internships.length === 0
              ? 'No result found'
              : "No internship's yet"}
          </Text>
          <TouchableOpacity onPress={() => setIsLoading(true)}>
            <Text style={[styles.refreshText, {color: theme.GREEN_COLOR}]}>
              Refresh
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <HackathonSkeleton showSearchSkeleton={!Searching.isSearching} />
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

export default Internship;
