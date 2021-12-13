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
import ViewHackathonProjectComponent from '../../../Components/ViewHackathonProject';

type props = {
  navigation: any;
  route: any;
};

const ViewProject: FC<props> = ({navigation, route}) => {
  // get hackathon id from params
  const {projectID, hackathonID} = route.params;

  return (
    <ViewHackathonProjectComponent
      navigation={navigation}
      route={route}
      hackathonID={hackathonID}
      projectID={projectID}
      screen={'organization'}
    />
  );
};

export default ViewProject;
