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
import {useStateValue} from '../Store/StateProvider';
import {Delete, Pencil, ThreeDots} from '../Components/Icons';

const ICON_SIZE = Width * 0.07;

type prop = {
  navigation: any;
  editable: boolean;
  handleEdit: () => void;
  handleDelete: () => void;
};
const PopUpMenu: FC<prop> = ({
  navigation,
  editable,
  handleEdit,
  handleDelete,
}) => {
  const [{theme}, dispatch] = useStateValue();
  return (
    <Menu>
      <MenuTrigger>
        <View>
          <ThreeDots size={0.8} color={theme.ICON_COLOR} />
        </View>
      </MenuTrigger>

      <MenuOptions
        customStyles={{
          optionsContainer: {
            backgroundColor: theme.POP_UP_BACKGROUND_COLOR,
            borderWidth: 5,
            borderRadius: 20,
            width: 150,
            borderColor: 'transparent',
            marginTop: 14,
            marginLeft: -4,
          },
          optionWrapper: {
            height: 35,
          },
        }}>
        {editable && (
          <MenuOption onSelect={() => handleEdit()}>
            <View style={styles.menuOptionContainer}>
              {/* icon  */}
              <Pencil size={0.8} />
              <View style={styles.textContainer}>
                <Text
                  style={[styles.menuOptionText, {color: theme.TEXT_COLOR}]}>
                  Edit
                </Text>
              </View>
            </View>
          </MenuOption>
        )}

        <MenuOption onSelect={() => handleDelete()}>
          <View style={styles.menuOptionContainer}>
            {/* icon  */}
            <Delete size={0.8} />
            <View style={styles.textContainer}>
              <Text style={[styles.menuOptionText, {color: theme.TEXT_COLOR}]}>
                Delete
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
  menuOptionText: {
    fontSize: Sizes.normal,
    // fontFamily: 'Raleway-Medium',
  },
  textContainer: {
    marginLeft: 10,
  },
});
