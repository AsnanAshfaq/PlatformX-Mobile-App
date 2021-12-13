/* eslint-disable react/self-closing-comp */
import React, {FC} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useStateValue} from '../Store/StateProvider';

type props = {
  value?: number;
  position?: any;
};
const CustomBadge: FC<props> = ({value, position}) => {
  const [{theme}, dispatch] = useStateValue();

  return (
    <View
      style={[
        styles.badgeStyle,
        {
          backgroundColor: theme.BADGE_COLOR,
          borderColor: theme.BADGE_COLOR,
          ...position,
        },
      ]}></View>
  );
};

export default CustomBadge;

const styles = StyleSheet.create({
  badgeStyle: {
    position: 'absolute',
    top: 5,
    right: 6,
    width: 12,
    height: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 1,
  },
  badgeText: {},
});
