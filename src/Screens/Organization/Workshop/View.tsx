import React, {FC, useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  ScrollView,
  FlatList,
  Image,
  ToastAndroid,
  TouchableOpacity,
} from 'react-native';
import ViewWorkshopComponent from '../../../Components/ViewWorkshop';

type props = {
  navigation: any;
  route: any;
};

const View: FC<props> = ({navigation, route}) => {
  // get hackathon id from params
  // const {ID} = 'adadsrr432';
  console.log(route.params);
  const {ID} = route.params;
  return (
    <ViewWorkshopComponent
      navigation={navigation}
      ID={ID}
      route={route}
      screen={'organization'}
    />
  );
};

export default View;
