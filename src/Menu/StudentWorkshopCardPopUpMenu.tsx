import React, {FC} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Sizes, Width} from '../Constants/Size';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
  renderers,
} from 'react-native-popup-menu';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useStateValue} from '../Store/StateProvider';
import {LinkedIn} from '../Components/Icons';

const ICON_SIZE = Width * 0.07;

type prop = {
  navigation: any;
  handleBookmark: () => void;
  handleReport: () => void;
  handleShare: () => void;
};
const PopUpMenu: FC<prop> = ({
  navigation,
  handleBookmark,
  handleReport,
  handleShare,
}) => {
  const [{theme}, dispatch] = useStateValue();
  return (
    <Menu>
      <MenuTrigger>
        <View>
          <Ionicons
            name={'ellipsis-vertical'}
            size={ICON_SIZE * 0.8}
            color={theme.ICON_COLOR}
          />
        </View>
      </MenuTrigger>

      <MenuOptions
        customStyles={{
          optionsContainer: {
            backgroundColor: theme.POP_UP_BACKGROUND_COLOR,
            borderWidth: 5,
            borderRadius: 20,
            width: 170,
            borderColor: 'transparent',
            marginTop: 19,
            marginLeft: -14,
            // marginRight: 1,
            shadowColor: theme.SHADOW_COLOR,
            // shadowOpacity: 1,
            // shadowRadius: 20,
            elevation: 4.5,
            // marginRight: 30,
          },
          optionWrapper: {
            height: 35,
          },
        }}>
        <MenuOption onSelect={() => handleBookmark()}>
          <View style={styles.menuOptionContainer}>
            <Ionicons
              name={'bookmark'}
              color={theme.ICON_COLOR}
              size={ICON_SIZE * 0.8}
            />
            <View style={styles.textContainer}>
              <Text
                style={[
                  styles.menuOptionText,
                  {
                    color: theme.TEXT_COLOR,
                  },
                ]}>
                Bookmark
              </Text>
            </View>
          </View>
        </MenuOption>
        <MenuOption onSelect={() => handleShare()}>
          <View style={styles.menuOptionContainer}>
            <LinkedIn />
            <View style={styles.textContainer}>
              <Text
                style={[
                  {
                    fontSize: Sizes.normal * 0.9,
                    color: theme.TEXT_COLOR,
                  },
                ]}>
                Share on LinkedIn
              </Text>
            </View>
          </View>
        </MenuOption>
        <MenuOption onSelect={() => handleReport()}>
          <View style={styles.menuOptionContainer}>
            <MaterialIcons
              name={'report'}
              color={theme.ICON_COLOR}
              size={ICON_SIZE * 0.8}
            />
            <View style={styles.textContainer}>
              <Text
                style={[
                  styles.menuOptionText,
                  {
                    color: theme.TEXT_COLOR,
                  },
                ]}>
                Report
              </Text>
            </View>
          </View>
        </MenuOption>
      </MenuOptions>
    </Menu>
  );
};

export default PopUpMenu;

const styles = StyleSheet.create({
  menuOptionContainer: {
    paddingHorizontal: 10,
    flexDirection: 'row',
  },
  textContainer: {
    marginLeft: 10,
  },
  menuOptionText: {
    fontSize: Sizes.normal,
    // fontFamily: 'Raleway-Medium',
  },
});
