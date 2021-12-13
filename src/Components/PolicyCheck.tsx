import React, {FC} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Sizes} from '../Constants/Size';
import {useStateValue} from '../Store/StateProvider';
import CheckBox from './CheckBox';

type props = {
  text: string;
  handleCheck: (value) => void;
};
const PolicyCheck: FC<props> = ({text, handleCheck}) => {
  const {theme} = useStateValue()[0];
  return (
    <View style={styles.container}>
      <View style={[styles.center, styles.container]}>
        <View style={styles.checkBoxContainer}>
          <CheckBox
            onPress={isChecked => handleCheck(isChecked)}
            size={18}
            star={true}
            margin={1}
          />
        </View>
      </View>
      <View style={styles.textContainer}>
        <Text style={[styles.text, {color: theme.DIM_TEXT_COLOR}]}>{text}</Text>
      </View>
    </View>
  );
};

export default PolicyCheck;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkBoxContainer: {
    flexDirection: 'row',
  },
  starContainer: {
    // marginBottom: 12,
    // marginHorizontal: 2,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  textContainer: {},
  text: {
    fontSize: Sizes.normal * 0.8,
  },
});
