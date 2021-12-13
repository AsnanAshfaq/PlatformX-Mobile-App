/* eslint-disable react-native/no-inline-styles */
import React, {FC} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Width} from '../Constants/Size';
import {useStateValue} from '../Store/StateProvider';

type props = {
  size?: 'large' | 'medium' | 'small';
  width?: number;
  marginHorizontal?: number;
  marginVertical?: number;
};
const Divider: FC<props> = ({
  size,
  width,
  marginHorizontal,
  marginVertical,
}) => {
  const [{theme}, dispatch] = useStateValue();

  return (
    <View
      style={{
        width:
          width === undefined
            ? size === 'large'
              ? Width * 0.8
              : size === 'medium'
              ? Width * 0.6
              : size === 'small'
              ? Width * 0.45
              : 0
            : width,
        height: 1.5,
        marginHorizontal:
          marginHorizontal !== undefined
            ? marginHorizontal
            : size === 'large'
            ? Width * 0.04
            : size === 'medium'
            ? Width * 0.14
            : size === 'small'
            ? Width * 0.22
            : 0,
        marginVertical: marginVertical ? marginVertical : 10,
        backgroundColor: theme.DIVIDER_COLOR,
      }}
    />
  );
};

export default Divider;

const styles = StyleSheet.create({});
