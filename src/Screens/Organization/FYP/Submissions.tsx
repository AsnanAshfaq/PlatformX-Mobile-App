/* eslint-disable react-hooks/exhaustive-deps */
import React, {FC, useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  RefreshControl,
} from 'react-native';
import CustomHeader from '../../../Components/CustomHeader';
import Loading from '../../../Components/Loading';
import {PROFILE_IMAGE} from '../../../Constants/sample';
import {Height, Sizes, Width} from '../../../Constants/Size';
import {useStateValue} from '../../../Store/StateProvider';
//@ts-ignore
import {BASE_URL} from 'react-native-dotenv';
import Divider from '../../../Components/Divider';
import Axios from '../../../Utils/Axios';
import CustomButton from '../../../Components/CustomButton';
import {ForwardArrow} from '../../../Components/Icons';

type Props = {
  submissionID: any;
  image: any;
  name: string;
  username: string;
  data: any;
  created_at: any;
  handlePress: () => void;
};
const SubmissionCard: FC<Props> = ({
  submissionID,
  image,
  name,
  username,
  data,
  created_at,
  handlePress,
}) => {
  const [{theme}, dispatch] = useStateValue();
  const [ImageLoading, setImageLoading] = useState(true);
  return (
    <TouchableOpacity activeOpacity={0.5} onPress={handlePress}>
      <View
        style={[
          styles.cardContainer,
          {
            backgroundColor: theme.CARD_BACKGROUND_COLOR,
          },
        ]}>
        {/* image container */}
        <View style={{flexDirection: 'row'}}>
          <View style={styles.imageContainer}>
            <Image
              source={{
                uri: ImageLoading
                  ? PROFILE_IMAGE
                  : image
                  ? BASE_URL + image.path
                  : PROFILE_IMAGE,
              }}
              onLoadEnd={() => setImageLoading(false)}
              onError={() => setImageLoading(false)}
              style={styles.image}
            />
          </View>
          {/* name and user name container  */}
          <View style={styles.nameContainer}>
            <Text
              style={[
                styles.fullname,
                {
                  color: theme.TEXT_COLOR,
                },
              ]}>
              {name}
            </Text>
            <Text
              style={[
                styles.username,
                {
                  color: theme.DIM_TEXT_COLOR,
                },
              ]}>
              @{username}
            </Text>
          </View>
        </View>

        {/* divier  */}
        <Divider width={Width * 0.85} marginHorizontal={2} />
        {/* show data details  */}
        <View style={{marginHorizontal: Width * 0.02}}>
          <View style={{flexDirection: 'row', marginTop: 5}}>
            <View style={{flex: 0.38}}>
              <Text style={[styles.labelText, {color: theme.TEXT_COLOR}]}>
                Submission ID
              </Text>
            </View>

            <Text style={[styles.valueText, {color: theme.GREEN_COLOR}]}>
              {submissionID}
            </Text>
          </View>
          <View style={{flexDirection: 'row', marginVertical: 5}}>
            <View style={{flex: 0.37}}>
              <Text style={[styles.labelText, {color: theme.TEXT_COLOR}]}>
                Status
              </Text>
            </View>
            <View
              style={{
                marginLeft: data.result.status.name !== 'accepted' ? 13 : 0,
              }}>
              <Text
                style={[
                  styles.valueText,
                  {
                    color:
                      data.result.status.name === 'accepted'
                        ? theme.GREEN_COLOR
                        : theme.ERROR_TEXT_COLOR,
                  },
                ]}>
                {data.result.status.name.charAt(0).toUpperCase() +
                  data.result.status.name
                    .slice(1, data.result.status.name.length)
                    .toLowerCase()}{' '}
              </Text>
            </View>
          </View>
          <View style={{flexDirection: 'row'}}>
            <View style={{flex: 0.4}}>
              <Text style={[styles.labelText, {color: theme.TEXT_COLOR}]}>
                Compile Time
              </Text>
            </View>
            <View>
              <Text style={[styles.valueText, {color: theme.GREEN_COLOR}]}>
                {data.result.time} seconds
              </Text>
            </View>
          </View>
          <View style={{flexDirection: 'row', marginVertical: 5}}>
            <View style={{flex: 0.38}}>
              <Text style={[styles.labelText, {color: theme.TEXT_COLOR}]}>
                Memory
              </Text>
            </View>
            <View>
              <Text style={[styles.valueText, {color: theme.GREEN_COLOR}]}>
                {data.result.memory} KBs
              </Text>
            </View>
          </View>
        </View>

        <View style={[styles.buttonContainer]}>
          <View style={styles.uploadDateTextContainer}>
            <Text
              style={[styles.uploadedDateText, {color: theme.DIM_TEXT_COLOR}]}>
              Submitted on {new Date(created_at).toLocaleDateString()}
            </Text>
          </View>
          <View style={styles.button}>
            <CustomButton
              children={
                <View style={styles.buttonIconContainer}>
                  <ForwardArrow size={0.75} />
                </View>
              }
              text={'Details'}
              textSize={Sizes.normal * 0.8}
              onPress={handlePress}
              width={Width * 0.25}
              height={Height * 0.05}
            />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

type props = {
  navigation: any;
  route: any;
};

const Submissions: FC<props> = ({navigation, route}) => {
  const [{theme}, dispatch] = useStateValue();
  const [loading, setloading] = useState(true);
  const [submission, setsubmission] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const {ID} = route.params;

  const getData = async () => {
    Axios.get(`/api/submissions/${ID}/`)
      .then(response => {
        setsubmission(response.data);
        setloading(false);
      })
      .catch(error => {
        setloading(false);
        return error.response;
      });
  };
  const onRefresh = () => {
    setRefreshing(true);
    getData().then(() => setRefreshing(false));
  };
  useEffect(() => {
    //   get test of the fyp
    getData();
  }, [loading]);

  const handleCardPress = id => {
    navigation.navigate('View_Submission', {
      fypID: ID,
      projectID: id,
    });
  };
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
        back
        title={'Submissions'}
        onBackPress={() => navigation.goBack()}
      />
      {!loading && submission.length > 0 ? (
        <>
          <View style={[styles.container, {marginHorizontal: Width * 0.04}]}>
            <Text style={[styles.topText, {color: theme.TEXT_COLOR}]}>
              Total Submissions :{' '}
              <Text style={[styles.normalText, {fontWeight: 'bold'}]}>
                {submission.length}
              </Text>
            </Text>
          </View>
          <FlatList
            contentContainerStyle={styles.scroll}
            keyExtractor={(item, index) => index.toString()}
            data={submission}
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
            renderItem={({item}: any) => {
              return (
                <SubmissionCard
                  submissionID={item.api_submission_id}
                  image={item.student.user.profile_image}
                  name={
                    item.student.user.first_name +
                    ' ' +
                    item.student.user.last_name
                  }
                  username={item.student.user.username}
                  data={item.data}
                  created_at={item.created_at}
                  handlePress={() => handleCardPress(item.id)}
                />
              );
            }}
          />
        </>
      ) : loading ? (
        <View style={[styles.center, {flex: 1}]}>
          <Loading size={'large'} />
        </View>
      ) : (
        <View style={[styles.center, {flex: 1}]}>
          <Text style={[styles.normalText, {color: theme.TEXT_COLOR}]}>
            No Submissions yet.
          </Text>
          <TouchableOpacity onPress={() => setloading(true)}>
            <Text style={[styles.normalText, {color: theme.GREEN_COLOR}]}>
              Refresh
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default Submissions;

const styles = StyleSheet.create({
  parent: {
    flex: 1,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    marginVertical: 10,
  },
  scroll: {
    // marginHorizontal: Width * 0.04,
    marginTop: 10,
  },
  topText: {
    fontSize: Sizes.normal * 0.8,
  },
  normalText: {
    fontSize: Sizes.normal,
  },
  labelText: {
    fontSize: Sizes.normal * 0.8,
  },
  valueText: {
    fontSize: Sizes.normal * 0.85,
  },
  cardContainer: {
    marginHorizontal: Width * 0.04,
    marginVertical: Width * 0.01,
    borderRadius: 10,
    padding: 10,
    shadowOpacity: 1,
    shadowRadius: 25,
    shadowOffset: {width: 10, height: 12},
    elevation: 30,
  },
  imageContainer: {
    margin: 2,
    flex: 0.2,
  },
  image: {
    width: Width * 0.16,
    height: Width * 0.16,
    borderWidth: 1,
    borderRadius: 40,
    borderColor: 'transparent',
  },
  nameContainer: {
    margin: 5,
    marginLeft: 10,
    marginVertical: 10,
    flex: 0.8,
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  username: {
    fontSize: Sizes.normal * 0.75,
  },
  fullname: {
    fontSize: Sizes.normal,
  },

  buttonContainer: {
    flexDirection: 'row',
  },
  uploadDateTextContainer: {
    flex: 0.5,
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    marginHorizontal: 10,
    paddingBottom: 10,
  },
  uploadedDateText: {
    fontSize: Sizes.normal * 0.62,
    fontStyle: 'italic',
  },
  button: {
    flex: 0.5,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    flexDirection: 'row',
  },
  buttonIconContainer: {
    justifyContent: 'center',
    marginHorizontal: 4,
    alignItems: 'center',
  },
});
