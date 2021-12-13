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
import ViewFYPComponent from '../../../Components/ViewFYP';

type props = {
  navigation: any;
  route: any;
};

const View: FC<props> = ({navigation, route}) => {
  // get hackathon id from params
  const {ID} = route.params;

  return (
    <ViewFYPComponent
      navigation={navigation}
      ID={ID}
      route={route}
      screen={'student'}
    />
  );
};

export default View;
