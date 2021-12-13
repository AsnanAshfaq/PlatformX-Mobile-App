import React, {FC} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import ViewHackathonResult from '../../../Components/ViewHackathonResult';

type props = {
  navigation: any;
  route: any;
};
const ViewResult: FC<props> = ({route, navigation}) => {
  return (
    <ViewHackathonResult
      ID={route.params.ID}
      source={'student'}
      navigation={navigation}
    />
  );
};

export default ViewResult;

const styles = StyleSheet.create({});
