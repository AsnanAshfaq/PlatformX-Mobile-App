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
import ViewHackathonComponent from '../../../Components/ViewHackathon';
import HackathonCardSkeleton from '../../../Skeleton/HackathonCardSkeleton';

type props = {
  navigation: any;
  route: any;
};

const View: FC<props> = ({navigation, route}) => {
  // get hackathon id from params
  const {ID} = route.params;

  return (
    <ViewHackathonComponent
      navigation={navigation}
      ID={ID}
      route={route}
      screen={'student'}
    />
  );
};

export default View;
