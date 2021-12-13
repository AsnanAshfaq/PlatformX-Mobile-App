import React, {FC, useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  FlatList,
  Image,
} from 'react-native';
import CustomHeader from '../../../Components/CustomHeader';
import Search from '../../../Components/Search';
import FollowingModal from '../../../Modals/FollowingModal';
import Axios from '../../../Utils/Axios';
import {TabView, TabBar} from 'react-native-tab-view';
import {Sizes, Width} from '../../../Constants/Size';
import PopUpMenu from '../../../Menu/FollowingCardPopUpMenu';
import {PROFILE_IMAGE} from '../../../Constants/sample';
//@ts-ignore
import {BASE_URL} from 'react-native-dotenv';
import Loading from '../../../Components/Loading';
import {useStateValue} from '../../../Store/StateProvider';

type cardProps = {
  id: string;
  data: any;
  screens: 'Followers' | 'Following';
  showModal: () => void;
};

type screens = 'Followers' | 'Following';

const Card: FC<cardProps> = ({data, screens, id, showModal}) => {
  const [{theme}, dispatch] = useStateValue();

  return (
    <View
      style={[
        styles.cardParent,
        {
          backgroundColor: theme.CARD_BACKGROUND_COLOR,
        },
      ]}>
      {/* profile image container  */}
      <View style={styles.cardImageContainer}>
        <Image
          style={styles.cardImage}
          source={{
            uri:
              data.user_profile_image !== null
                ? BASE_URL + data.user_profile_image.path
                : PROFILE_IMAGE,
          }}
        />
      </View>
      {/* details container  */}
      <View style={styles.cardDetailsContainer}>
        <Text style={[styles.cardTextName, {color: theme.TEXT_COLOR}]}>
          {data.first_name + data.last_name}
        </Text>
        <Text style={[styles.cardTextUserName, {color: theme.TEXT_COLOR}]}>
          @{data.username}
        </Text>
      </View>
      {/* icon container */}
      <View style={styles.cardIconContainer}>
        {screens === 'Following' && (
          <TouchableWithoutFeedback onPress={() => {}}>
            <PopUpMenu Modal={showModal} />
          </TouchableWithoutFeedback>
        )}
      </View>
    </View>
  );
};

const NoDataView: FC<{screen: 'Followers' | 'Following'}> = ({screen}) => {
  const [state, dispatch] = useStateValue();

  return (
    <View style={styles.center}>
      <Text
        style={{
          fontSize: Sizes.normal,
          color: state.theme.TEXT_COLOR,
        }}>
        You don't have any {screen} yet
      </Text>
    </View>
  );
};

const Followers: FC = () => {
  const [followers, setFollowers] = useState([]);
  const [isLoading, setisLoading] = useState(true);
  const [{theme}, dispatch] = useStateValue();

  useEffect(() => {
    Axios.get('/user/follower')
      .then(result => {
        setFollowers(result.data);
      })
      .then(() => {
        // set the loading to false
        setisLoading(false);
      });
  }, []);

  if (isLoading) {
    return <Loading size={Width * 0.15} />;
  }

  return (
    <View style={styles.parent}>
      {followers.length === 0 ? (
        // if there are no followers then show the no data view
        <NoDataView screen={'Followers'} />
      ) : (
        <View style={{marginTop: 10}}>
          <FlatList
            data={followers}
            renderItem={({item}: any) => (
              <Card
                data={item.follower_id}
                id={item.id}
                screens={'Followers'}
                showModal={() => null}
              />
            )}
            keyExtractor={(item: any, _) => `${item.id}`}
          />
        </View>
      )}
    </View>
  );
};

const Following: FC = () => {
  const [isLoading, setisLoading] = useState(true);
  const [following, setFollowing] = useState([]);
  const [unFollowData, setUnFollowModalData] = useState({
    show: false,
    id: '', // id of the user
    description: '',
  });
  const [{theme}, dispatch] = useStateValue();

  useEffect(() => {
    Axios.get('/user/following')
      .then(result => {
        setFollowing(result.data);
      })
      .then(() => {
        // set the loading to false
        setisLoading(false);
      });
  }, []);

  if (isLoading) {
    return <Loading size={Width * 0.15} />;
  }

  return (
    <View style={styles.parent}>
      {/* if we dont have any following  */}
      {following.length === 0 ? (
        // if there are no following then show the no data view
        <NoDataView screen={'Following'} />
      ) : (
        <View style={{marginTop: 10}}>
          {/* un-follow modal  */}
          <FollowingModal
            heading={'UnFollow'}
            unFollow={unFollowData}
            toggleModal={() =>
              setUnFollowModalData(props => {
                return {
                  ...props,
                  show: !props.show,
                };
              })
            }
          />

          <FlatList
            data={following}
            keyExtractor={(item: any, _) => `${item.id}`}
            renderItem={({item}: any) => (
              <Card
                data={item?.followed_id}
                id={item.id}
                screens={'Following'}
                showModal={() => {
                  // show the modal
                  setUnFollowModalData(props => {
                    return {
                      id: item.followed_id.id,
                      show: true,
                      description: `Are you sure that you want to unfollow  @${item.followed_id.username}?`,
                    };
                  });
                }}
              />
            )}
          />
        </View>
      )}
    </View>
  );
};

type props = {
  navigation: any;
  route: any;
};

const Tab: FC<props> = ({navigation, route: Route}) => {
  const {
    activeScreen,
    userName,
  }: {activeScreen: screens; userName: string} = Route.params;

  const [index, setIndex] = useState(activeScreen === 'Followers' ? 0 : 1);
  const [routes] = useState([
    {key: 'followers', title: 'Followers'},
    {key: 'following', title: 'Following'},
  ]);
  const [state, dispatch] = useStateValue();

  const renderScene = ({route}) => {
    switch (route.key) {
      case 'followers':
        return <Followers />;
      case 'following':
        return <Following />;
      default:
        return null;
    }
  };

  return (
    <View
      style={[
        styles.parent,
        {backgroundColor: state.theme.SCREEN_BACKGROUND_COLOR},
      ]}>
      <CustomHeader
        title={`@${userName}`}
        navigation={navigation}
        back
        onBackPress={() => navigation.goBack()}
      />

      {/* follower and following tabs  */}

      <TabView
        navigationState={{index, routes}}
        onIndexChange={setIndex}
        renderScene={renderScene}
        renderTabBar={props => (
          <TabBar
            {...props}
            indicatorStyle={{
              backgroundColor: state.theme.CARD_BACKGROUND_COLOR,
            }}
            style={{backgroundColor: state.theme.SCREEN_BACKGROUND_COLOR}}
            activeColor={state.theme.TEXT_COLOR}
            inactiveColor={state.theme.NAV_BAR_INACTIVE_TEXT_COLOR}
          />
        )}
        keyboardDismissMode={'auto'}
      />
    </View>
  );
};

export default Tab;

const styles = StyleSheet.create({
  parent: {
    flex: 1,
  },
  cardParent: {
    flexDirection: 'row',
    marginHorizontal: Width * 0.04,
    marginVertical: Width * 0.01,
    // minHeight: Height * 0.35,
    // maxHeight: Height * 0.4,
    borderRadius: 10,
    padding: 10,
    shadowOpacity: 1,
    shadowRadius: 25,
    shadowOffset: {
      width: 10,
      height: 12,
    },
    elevation: 30,
  },
  cardImageContainer: {
    margin: 2,
    flex: 0.2,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardImage: {
    width: Width * 0.14,
    height: Width * 0.14,
    borderWidth: 1,
    borderRadius: 40,
    borderColor: 'transparent',
  },
  cardDetailsContainer: {
    flex: 0.7,
    justifyContent: 'center',
  },
  cardTextName: {
    fontSize: Sizes.normal,
  },
  cardTextUserName: {
    fontSize: Sizes.normal * 0.9,
  },
  cardIconContainer: {
    flex: 0.1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
