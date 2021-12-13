import React, {FC} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import CustomHeader from '../../Components/CustomHeader';
import {useStateValue} from '../../Store/StateProvider';
import LinkedInModal from 'react-native-linkedin';

type props = {
  navigation: any;
};
const LinkedInSignIn: FC<props> = ({navigation}) => {
  const [{theme}, dispatch] = useStateValue();

  return (
    <View
      style={[
        styles.parent,
        {
          backgroundColor: theme.CARD_BACKGROUND_COLOR,
        },
      ]}>
      <CustomHeader
        title={'LinkedIn Sign In'}
        navigation={navigation}
        back
        onBackPress={() => navigation.goBack()}
      />
    </View>
  );
};

export default LinkedInSignIn;

const styles = StyleSheet.create({
  parent: {
    flex: 1,
  },
});
