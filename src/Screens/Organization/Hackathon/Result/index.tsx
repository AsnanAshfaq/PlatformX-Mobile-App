/* eslint-disable react-hooks/exhaustive-deps */
//TODO:
// if the result is not announed yet
// then show announcing result screen
// else show the result viewing screen

import React, {FC, useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import CustomHeader from '../../../../Components/CustomHeader';
import {Sizes, Width} from '../../../../Constants/Size';
import {useStateValue} from '../../../../Store/StateProvider';
import CreateResult from './Create';
import ViewResult from '../../../../Components/ViewHackathonResult';
import axios from '../../../../Utils/Axios';
import Loading from '../../../../Components/Loading';
type props = {
  navigation: any;
  route: any;
};
const Result: FC<props> = ({navigation, route}) => {
  const ID = route.params.ID;
  const [{theme}, dispatch] = useStateValue();
  const [isResultPublished, setisResultPublished] = useState(true);
  const [loading, setloading] = useState(false);

  const getData = async () => {
    setloading(true);
    // check if result exists or not
    axios
      .get(`api/hackathon/${ID}/project/result/`)
      .then(response => {
        if (response.data.not_found) {
          setisResultPublished(false);
        }
        setloading(false);
      })
      .catch(error => {
        if (error.response) {
          ToastAndroid.show(error.response, 1500);
        }
        setloading(false);
        return error.response;
      });
  };
  useEffect(() => {
    getData();
  }, []);

  if (loading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Loading size={'large'} />
      </View>
    );
  }
  return (
    <View
      style={[
        styles.parent,
        {
          backgroundColor: theme.SCREEN_BACKGROUND_COLOR,
        },
      ]}>
      <CustomHeader
        title={'Result'}
        navigation={navigation}
        back
        onBackPress={() => navigation.goBack()}
      />

      {isResultPublished ? (
        <ViewResult ID={ID} source={'organization'} navigation={navigation} />
      ) : (
        <CreateResult ID={ID} navigation={navigation} />
      )}
    </View>
  );
};

export default Result;

const styles = StyleSheet.create({
  parent: {
    flex: 1,
  },
  container: {
    marginTop: 10,
  },
  scroll: {
    marginHorizontal: Width * 0.04,
  },
  heading: {
    fontSize: Sizes.normal * 1.1,
  },
  smallText: {
    fontSize: Sizes.normal * 0.66,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  projectCardContainer: {
    flexDirection: 'row',
    marginHorizontal: Width * 0.04,
    marginVertical: Width * 0.01,
    borderRadius: 10,
    padding: 10,
    shadowOpacity: 1,
    shadowRadius: 25,
    shadowOffset: {width: 10, height: 12},
    elevation: 30,
  },
  projectCardImageContainer: {
    margin: 2,
    flex: 0.2,
  },
  projectCardImage: {
    width: Width * 0.16,
    height: Width * 0.16,
    borderWidth: 1,
    borderRadius: 40,
    borderColor: 'transparent',
  },
});
