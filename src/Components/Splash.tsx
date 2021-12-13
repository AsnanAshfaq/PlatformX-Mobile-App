import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Sizes, Width} from '../Constants/Size';
import {useStateValue} from '../Store/StateProvider';
import Loading from './Loading';

const Splash = () => {
  const [{theme}, dispatch] = useStateValue();
  return (
    <View
      style={[styles.parent, {backgroundColor: theme.SCREEN_BACKGROUND_COLOR}]}>
      <View style={styles.logoContainer}>
        <Text style={[styles.bracket, {color: theme.TEXT_COLOR}]}>{'<'}</Text>
        <Text style={[styles.logo, {color: theme.TEXT_COLOR}]}>PlatformX</Text>
        <Text style={[styles.bracket, {color: theme.TEXT_COLOR}]}>{'/>'}</Text>
      </View>
      {/* loading view  */}
      <View style={styles.loadingContainer}>
        <Loading size={Width * 0.15} />
      </View>
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    flex: 0.6,
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexDirection: 'row',
  },
  bracket: {
    fontSize: Sizes.large * 3,
    // fontWeight: 'bold',
    fontFamily: 'ComicNeue-Regular',
  },
  logo: {
    fontSize: Sizes.large * 2,
    fontFamily: 'ComicNeue-Regular',
  },
  loadingContainer: {
    flex: 0.1,
  },
});
