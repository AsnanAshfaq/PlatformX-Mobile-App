import React, {FC} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Sizes} from '../Constants/Size';
import {useStateValue} from '../Store/StateProvider';

const HelpText: FC<{text: string}> = ({text}) => {
  const {theme} = useStateValue()[0];
  return (
    <View style={styles.helpTextContainer}>
      <Text style={[styles.helpText, {color: theme.DIM_TEXT_COLOR}]}>
        {text}
      </Text>
    </View>
  );
};

export default HelpText;

const styles = StyleSheet.create({
  helpTextContainer: {
    marginTop: 4,
    marginLeft: 4,
  },
  helpText: {
    fontSize: Sizes.normal * 0.72,
    lineHeight: 14,
  },
});
