//TODO:
// logo
// Heading
// Two images

import React, {FC} from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import {Height, Sizes, Width} from '../../Constants/Size';
import {useStateValue} from '../../Store/StateProvider';

type props = {
  navigation: any;
};
const UserType: FC<props> = ({navigation}) => {
  const [{theme}, dispatch] = useStateValue();

  const navigateTo = (screen: string) => {
    navigation.navigate(screen);
  };

  return (
    <View
      style={[styles.parent, {backgroundColor: theme.SCREEN_BACKGROUND_COLOR}]}>
      <View style={[styles.logoContainer]}>
        <Text style={[styles.bracket, {color: theme.TEXT_COLOR}]}>{'<'}</Text>
        <Text style={[styles.logo, {color: theme.TEXT_COLOR}]}>PlatformX</Text>
        <Text style={[styles.bracket, {color: theme.TEXT_COLOR}]}>{'/>'}</Text>
      </View>

      {/* heading  */}
      <View style={styles.headingContainer}>
        <Text style={[styles.heading, {color: theme.TEXT_COLOR}]}>
          Who are you?
        </Text>
      </View>
      {/* image containers  */}
      <View style={styles.imagesContainers}>
        <TouchableOpacity
          style={[styles.imageContainer, {borderColor: theme.SHADOW_COLOR}]}
          onPress={() => navigateTo('StudentSignUp')}>
          <Image
            style={styles.image}
            source={{
              uri:
                'data:image/png;base64,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',
            }}
          />
          <View style={styles.labelContainer}>
            <Text style={[styles.label, {color: theme.TEXT_COLOR}]}>
              Student
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.imageContainer, {borderColor: theme.SHADOW_COLOR}]}
          onPress={() => navigateTo('OrganizationSignUp')}>
          <Image
            style={styles.image}
            source={{
              uri:
                'data:image/png;base64,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',
            }}
          />
          <View style={styles.labelContainer}>
            <Text style={[styles.label, {color: theme.TEXT_COLOR}]}>
              Organization
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default UserType;

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    flexDirection: 'column',
  },
  logoContainer: {
    flex: 0.3,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  bracket: {
    fontSize: Sizes.large * 2,
    // fontWeight: 'bold',
    fontFamily: 'ComicNeue-Regular',
  },
  logo: {
    fontSize: Sizes.large * 1.7,
    fontFamily: 'Comfortaa-SemiBold',
  },
  headingContainer: {
    flex: 0.1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    fontSize: Sizes.large * 1.5,
  },
  imagesContainers: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  imageContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderRadius: 40,
    padding: 13,
    marginHorizontal: 5,
  },
  image: {
    width: Width * 0.4,
    height: Width * 0.5,
    borderWidth: 1,
    borderRadius: 40,
  },
  labelContainer: {
    marginVertical: 5,
  },
  label: {
    fontSize: Sizes.normal * 1.5,
  },
});
