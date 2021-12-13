//TODO: small, normal, large

import React, {FC} from 'react';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import {useStateValue} from '../Store/StateProvider';

type props = {
  size: 'small' | 'large' | number;
  color?: string;
};
const Loading: FC<props> = ({size, color}) => {
  const [{theme}, dispatch] = useStateValue();

  return (
    <View style={styles.parent}>
      <ActivityIndicator
        size={size}
        color={color ? color : theme.LOADER_COLOR}
      />
    </View>
  );
};

export default Loading;

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
