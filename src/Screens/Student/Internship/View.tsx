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
import ViewInternshipComponent from '../../../Components/ViewInternship';

type props = {
  navigation: any;
  route: any;
};

const ViewInternship: FC<props> = ({navigation, route}) => {
  const {ID} = route.params;
  return (
    <ViewInternshipComponent
      navigation={navigation}
      ID={ID}
      route={route}
      screen={'student'}
    />
  );
};

export default ViewInternship;
