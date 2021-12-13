import React, {FC} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {Sizes} from '../Constants/Size';
import {useStateValue} from '../Store/StateProvider';

type props = {
  onPress: () => void;
};
const FloatingActionButton: FC<props> = ({onPress}) => {
  const [{theme}, dispatch] = useStateValue();
  return (
    <View
      style={[
        styles.floatingButtonContainer,
        {
          backgroundColor: theme.GREEN_COLOR,
        },
      ]}>
      <TouchableOpacity onPress={onPress}>
        <Text
          style={[
            styles.plusText,
            {
              color: theme.TEXT_COLOR,
            },
          ]}>
          +
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default FloatingActionButton;

const styles = StyleSheet.create({
  floatingButtonContainer: {
    position: 'absolute',
    width: 60,
    height: 60,
    borderWidth: 2,
    borderRadius: 30,
    bottom: 18,
    right: 18,
    borderColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  plusText: {
    fontSize: Sizes.large * 1.4,
  },
});
