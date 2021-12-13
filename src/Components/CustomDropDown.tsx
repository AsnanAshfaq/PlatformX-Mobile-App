// show list of data when clicked on custom drop down

import React, {FC, useState, forwardRef} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {Sizes, Width} from '../Constants/Size';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useStateValue} from '../../src/Store/StateProvider';
import Divider from './Divider';

type props = {
  data: Array<string>;
  width?: number;
};

const ICON_SIZE = Width * 0.055;

const CustomDropDown: FC<props> = ({data, width}) => {
  const [{theme}, dispatch] = useStateValue();

  const [isShow, setisShow] = useState(false);
  const [Selected, setSelected] = useState(data[0]);

  const toggleDropDown = () => setisShow(!isShow);

  return (
    <View style={styles.parent}>
      <TouchableOpacity
        onPress={() => toggleDropDown()}
        style={[
          styles.dropDownBar,
          {
            backgroundColor: theme.DROP_DOWN_BACKGROUND_COLOR,
            width: width ? width : Width * 0.9,
          },
        ]}>
        <View style={{flexDirection: 'row'}}>
          <Text style={[styles.selectedText, {color: theme.TEXT_COLOR}]}>
            {Selected}
          </Text>
          <Ionicons
            name={isShow === false ? 'caret-down-outline' : 'caret-up-outline'}
            size={ICON_SIZE}
            color={theme.ICON_COLOR}
            style={styles.dropDownIcon}
          />
        </View>
      </TouchableOpacity>

      {/* drop down view  */}
      <View
        style={[
          styles.droppedViewContainer,
          {
            backgroundColor: theme.DROP_DOWN_BACKGROUND_COLOR,
          },
        ]}>
        {isShow &&
          data.map((type, index) => {
            if (index !== 0)
              return (
                <TouchableOpacity
                  onPress={() => {
                    toggleDropDown();
                    setSelected(type);
                  }}
                  key={type}>
                  <View
                    style={[
                      styles.droppedView,
                      {width: width ? width : Width * 0.87},
                    ]}>
                    <Text
                      style={[styles.droppedText, {color: theme.TEXT_COLOR}]}>
                      {type}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
          })}
      </View>
    </View>
  );
};

export default CustomDropDown;

const styles = StyleSheet.create({
  parent: {
    // justifyContent: 'center',
    alignItems: 'center',
  },
  dropDownBar: {
    marginHorizontal: Width * 0.01,
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'transparent',
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  dropDownIcon: {
    flex: 0.1,
  },
  selectedText: {
    fontSize: Sizes.normal,
    flex: 0.9,
  },
  droppedViewContainer: {
    // width: Width * 0.8,
    // marginHorizontal: 10,
    marginVertical: 5,
    // paddingHorizontal: 10,
    borderRadius: 10,
    borderWidth: 1,
  },
  droppedView: {
    paddingHorizontal: 8,
    paddingVertical: 5,
  },
  droppedText: {
    fontSize: Sizes.normal,
  },
});
