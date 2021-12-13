/* eslint-disable react-native/no-inline-styles */
import React, {FC, useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {Sizes} from '../../../Constants/Size';
import {useStateValue} from '../../../Store/StateProvider';
import axios from '../../../Utils/Axios';

type cardProps = {
  label: string;
  value: number;
};
const Card: FC<cardProps> = ({label, value}) => {
  const [{theme}, dispatch] = useStateValue();

  return (
    <View
      style={[
        styles.keyValueContainer,
        {
          borderColor: theme.DIVIDER_COLOR,
          borderRightWidth: label === 'Posts' ? 1.2 : 0,
          borderRightColor: label === 'Posts' ? theme.DIVIDER_COLOR : '',
          borderLeftWidth: label === 'Following' ? 1.2 : 0,
          borderLeftColor: label === 'Following' ? theme.DIVIDER_COLOR : '',
        },
      ]}>
      <View style={styles.center}>
        <Text style={[styles.label, {color: theme.TEXT_COLOR}]}>{label}</Text>
        <Text style={[styles.value, {color: theme.TEXT_COLOR}]}>{value}</Text>
      </View>
    </View>
  );
};
type props = {
  navigation: any;
  route: any;
};
const OthersProfile: FC<props> = ({navigation, route}) => {
  const {userID} = route.params;
  const [loading, setloading] = useState(true);

  const getUserProfile = async () => {
    setloading(true);
    // axios.get('/api/');
    setTimeout(() => {
      setloading(false);
    }, 3000);
  };
  useEffect(() => {
    getUserProfile();
  }, []);
  return (
    <View>
      <Text></Text>
    </View>
  );
};

export default OthersProfile;

const styles = StyleSheet.create({
  parent: {
    flex: 1,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  keyValueContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 2,
  },
  label: {
    fontSize: Sizes.normal * 0.9,
  },
  value: {
    fontSize: Sizes.normal * 0.85,
  },
});
