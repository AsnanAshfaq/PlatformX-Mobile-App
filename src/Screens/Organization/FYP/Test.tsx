/* eslint-disable react-hooks/exhaustive-deps */
import React, {FC, useEffect, useState} from 'react';
import {
  StyleSheet,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import CustomHeader from '../../../Components/CustomHeader';
import {Sizes, Width} from '../../../Constants/Size';
import {useStateValue} from '../../../Store/StateProvider';
import Axios from '../../../Utils/Axios';
import Loading from '../../../Components/Loading';
type props = {
  navigation: any;
  route: any;
};
const ViewTest: FC<props> = ({navigation, route}) => {
  const [{theme}, dispatch] = useStateValue();
  const [loading, setloading] = useState(true);
  const [test, settest] = useState<any>();
  const {ID} = route.params;

  const getData = async () => {
    Axios.get(`/api/test/${ID}/`)
      .then(response => {
        settest(response.data);
        console.log(response.data);
        setloading(false);
      })
      .catch(error => {
        setloading(false);
        if (error.response) {
          // ToastAndroid.show(error.response.data.error, 1500);
        }
        return error.response;
      });
  };
  useEffect(() => {
    //   get test of the fyp
    getData();
  }, [loading]);

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
        title={'Problem Statement'}
        onBackPress={() => navigation.goBack()}
      />
      {!loading && test ? (
        <ScrollView>
          <View style={styles.scrollContainer}>
            {/* title of the problem  */}
            <View style={styles.nameContainer}>
              <Text style={[styles.nameText, {color: theme.TEXT_COLOR}]}>
                {test.name}
              </Text>
            </View>
            <View style={styles.descriptionContainer}>
              <Text style={[styles.descriptionText, {color: theme.TEXT_COLOR}]}>
                {test.description}
              </Text>
            </View>
            {/* created at  */}
            <View style={styles.created_atContainer}>
              <Text
                style={[styles.created_atText, {color: theme.DIM_TEXT_COLOR}]}>
                Created at {new Date(test.created_at).toDateString()}
              </Text>
            </View>
          </View>
        </ScrollView>
      ) : loading ? (
        <View style={[styles.center, {flex: 1}]}>
          <Loading size={'large'} />
        </View>
      ) : (
        <View style={[styles.center, {flex: 1}]}>
          <Text style={[styles.normalText, {color: theme.TEXT_COLOR}]}>
            No test yet.
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

export default ViewTest;

const styles = StyleSheet.create({
  parent: {
    flex: 1,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContainer: {
    // alignItems: 'center',
  },
  nameContainer: {
    marginVertical: 10,
    alignItems: 'center',
  },
  nameText: {
    fontSize: Sizes.large,
  },
  descriptionContainer: {
    marginHorizontal: Width * 0.04,
    marginVertical: 10,
  },
  descriptionText: {
    fontSize: Sizes.normal * 0.9,
  },
  created_atContainer: {
    marginVertical: 10,
    marginHorizontal: Width * 0.04,
  },
  normalText: {
    fontSize: Sizes.normal,
  },
  created_atText: {
    fontSize: Sizes.normal * 0.8,
  },
});
