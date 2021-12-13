import React, {FC} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Sizes, Width} from '../Constants/Size';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
  renderers,
} from 'react-native-popup-menu';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useStateValue} from '../Store/StateProvider';

const ICON_SIZE = Width * 0.07;

type prop = {
  navigation: any;
  isEditable: boolean;
  post: any;
  deleteModal: (prev: boolean) => void;
};
const PopUpMenu: FC<prop> = ({navigation, isEditable, post, deleteModal}) => {
  const [{theme}, dispatch] = useStateValue();

  return (
    <Menu>
      <MenuTrigger>
        <Ionicons
          name={'ellipsis-vertical'}
          size={ICON_SIZE * 0.8}
          color={theme.TEXT_COLOR}
        />
      </MenuTrigger>
      {/* if the post is editable  */}
      {isEditable ? (
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
          <MenuOption
            onSelect={() =>
              navigation.navigate('Create_Edit_Post', {
                screen: 'Edit',
                id: post.id,
                text: post.text,
                category: post.category,
              })
            }>
            <View style={styles.menuOptionContainer}>
              <Ionicons
                name={'pencil'}
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
                  Edit
                </Text>
              </View>
            </View>
          </MenuOption>
          <MenuOption onSelect={() => deleteModal(true)}>
            <View style={styles.menuOptionContainer}>
              <MaterialIcons
                name={'delete'}
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
                  Delete
                </Text>
              </View>
            </View>
          </MenuOption>
        </MenuOptions>
      ) : (
        // else report post
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
          <MenuOption onSelect={() => console.log('Clicked on save post')}>
            <View style={styles.menuOptionContainer}>
              <Ionicons
                name={'download'}
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
                  Save Post
                </Text>
              </View>
            </View>
          </MenuOption>
          <MenuOption onSelect={() => console.log('Clicked on report')}>
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
      )}
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
