import React, {FC} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import ViewInternshipComponent from '../../../Components/ViewInternship';

type props = {
  route: any;
  navigation: any;
};
const ViewInternship: FC<props> = ({route, navigation}) => {
  const {ID} = route.params;

  return (
    <ViewInternshipComponent
      navigation={navigation}
      ID={ID}
      route={route}
      screen={'organization'}
    />
  );
};

export default ViewInternship;

const styles = StyleSheet.create({});
