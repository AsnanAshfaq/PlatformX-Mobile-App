import React, {FC} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useStateValue} from '../Store/StateProvider';

type props = {
  color?: string;
  width?: number;
  height?: number;
};
const Bullet: FC<props> = ({color, width = 10, height = 10}) => {
  const [{theme}, dispatch] = useStateValue();

  return (
    <View
      style={[
        styles.bulletView,
        {
          width: width,
          height: height,
          backgroundColor: color ? color : theme.TEXT_COLOR,
        },
      ]}
    />
  );
};

export default Bullet;

const styles = StyleSheet.create({
  bulletView: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'transparent',
    marginTop: 5,
    marginRight: 10,
  },
});
