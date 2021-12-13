/* eslint-disable react-hooks/exhaustive-deps */
// TODO:
// show list of users who are attending the workshop

import React, {FC, useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableWithoutFeedback,
  Linking,
  RefreshControl,
  ScrollView,
  FlatList,
  ToastAndroid,
} from 'react-native';
import {useStateValue} from '../../../Store/StateProvider';
import CustomButton from '../../../Components/CustomButton';
import CustomHeader from '../../../Components/CustomHeader';
import axios from '../../../Utils/Axios';
import UserCard from '../../../Components/UserCard';
import {Sizes, Width} from '../../../Constants/Size';
import {commaSeperator} from '../../../Utils/Numbers';
import UserSkeleton from '../../../Skeleton/UserCardSkeleton';

type props = {
  navigation: any;
  route: any;
  screen: 'student' | 'organization';
};
const ICON_SIZE = Width * 0.07;

const Participants: FC<props> = ({navigation, route, screen}) => {
  const [loading, setLoading] = useState(true);
  const [participants, setParticipants] = useState([]);
  const [PosterLoading, setPosterLoading] = useState(true);
  const {theme} = useStateValue()[0];
  const [refreshing, setRefreshing] = useState(false);

  const {ID} = route.params;

  const getData = async () => {
    setLoading(true);
    axios
      .get(`/api/workshop/${ID}/participants`)
      .then(result => {
        setParticipants(result.data);
        setLoading(false);
      })
      .catch(error => {
        setLoading(false);
        ToastAndroid.show(error.response.data.error, 1500);
      });
  };
  const onRefresh = () => {
    setRefreshing(true);
    // get data here

    getData().then(() => setRefreshing(false));
  };
  useEffect(() => {
    // fetch workshop participants
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
        title={'Participants'}
        navigation={navigation}
        back
        onBackPress={() => navigation.goBack()}
      />

      {/* if there are no attendees  */}
      {!loading && participants.length > 0 ? (
        <>
          <View style={{marginHorizontal: Width * 0.04}}>
            <View style={styles.container}>
              <Text style={[styles.smallText, {color: theme.DIM_TEXT_COLOR}]}>
                See who is attending your workshop. (Attendees{' '}
                {commaSeperator(participants.length)})
              </Text>
            </View>
          </View>

          <FlatList
            keyExtractor={(item: any, index) => `${item.id}`}
            data={participants}
            renderItem={({item, index}) => {
              return (
                <UserCard
                  navigation={navigation}
                  name={
                    item.student.user.first_name + item.student.user.last_name
                  }
                  id={item.student.user.id}
                  username={item.student.user.username}
                  image={item.student.user.profile_image}
                  onPress={() =>
                    navigation.navigate('ViewStudentProfile', {
                      ID: item.student.user.id,
                    })
                  }
                />
              );
            }}
            contentContainerStyle={styles.scroll}
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
        </>
      ) : !loading && participants.length === 0 ? (
        <View style={[styles.center, {flex: 1}]}>
          <Text style={[styles.normalText, {color: theme.DIM_TEXT_COLOR}]}>
            You don't have any attendees yet
          </Text>
        </View>
      ) : (
        //  show loading
        <UserSkeleton showSearchSkeleton={false} />
      )}
    </View>
  );
};

export default Participants;

const styles = StyleSheet.create({
  parent: {
    flex: 1,
  },
  scroll: {
    flex: 1,
    marginHorizontal: Width * 0.04,
    marginVertical: 10,
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
});
