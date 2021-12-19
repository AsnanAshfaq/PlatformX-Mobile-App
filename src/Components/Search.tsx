import React, {FC, useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Keyboard,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import {Height, Sizes, Width} from '../Constants/Size';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import FilterModal from '../Modals/FilterModal';
import {useStateValue} from '../Store/StateProvider';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

type props = {
  placeholder: string;
  isShownInHeader: boolean;
  handleSearch: (query: string) => void;
  showFilterIcon?: boolean;
  applyFilters?: (filter: Array<{subtag: Array<string>; tag: string}>) => void;
  onFilterPress?: () => void;
};

const Search: FC<props> = ({
  placeholder,
  isShownInHeader,
  showFilterIcon,
  handleSearch,
  applyFilters,
  onFilterPress,
}) => {
  const [input, setinput] = useState('');
  const [isModalOpen, setisModalOpen] = useState(false);
  const textInputRef = useRef<any>(null);

  const [{theme}, dispatch] = useStateValue();

  Keyboard.addListener('keyboardDidHide', e => {
    if (textInputRef.current) {
      textInputRef?.current.blur();
    }
  });

  useEffect(() => {
    const subscribe = Keyboard.addListener('keyboardDidHide', e => {
      if (textInputRef.current) {
        textInputRef?.current.blur();
      }
    });
    return () => {
      subscribe.remove();
    };
  }, []);

  const search = () => {
    // hide the keyboard if it is open
    Keyboard.dismiss();
    if (input.trim() !== '') {
      // make api call
      handleSearch(input.trim());
    }
  };

  const emptyInput = () => {
    setinput('');
  };

  return (
    <View style={styles.parent}>
      <View
        style={[
          styles.searchContainer,
          {
            // isShownInHeader true, showFilterIcon false
            // isShownInHeader false, showFilterIcon true
            // isShownInHeader false, showFilterIcon false

            width:
              !isShownInHeader && !showFilterIcon
                ? Width * 0.9
                : !isShownInHeader && showFilterIcon
                ? Width * 0.79
                : Width * 0.5,
            marginHorizontal:
              !isShownInHeader && !showFilterIcon
                ? Width * 0.05
                : Width * 0.045,
            backgroundColor: theme.CARD_BACKGROUND_COLOR,
          },
        ]}>
        <View style={styles.textInputContainer}>
          <TextInput
            value={input}
            ref={textInputRef}
            onChangeText={text => setinput(text)}
            placeholder={placeholder}
            style={[styles.textInput, {color: theme.TEXT_COLOR}]}
            placeholderTextColor={theme.PLACE_HOLDER_TEXT_COLOR}
            maxLength={30}
          />
        </View>
        <View
          style={[
            styles.searchIconContainer,
            {
              marginHorizontal: isShownInHeader ? 8 : 0,
            },
          ]}>
          <TouchableOpacity onPress={() => search()}>
            <Ionicons
              name={'search'}
              size={Width * 0.06}
              style={{
                color: theme.TEXT_COLOR,
              }}
            />
          </TouchableOpacity>

          {/* show the cross sign when the input is !== '' */}
          {input.trim() !== '' && (
            <TouchableOpacity
              onPress={() => emptyInput()}
              style={{marginRight: 8}}>
              <Entypo
                name={'cross'}
                size={Width * 0.064}
                style={{
                  color: theme.ICON_COLOR,
                }}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
      {showFilterIcon !== false && (
        <View
          style={[
            styles.filterContainer,
            {backgroundColor: theme.CARD_BACKGROUND_COLOR},
          ]}>
          <TouchableOpacity onPress={onFilterPress} activeOpacity={0.5}>
            <MaterialCommunityIcons
              name={'filter-variant'}
              size={Width * 0.07}
              style={{color: theme.ICON_COLOR}}
            />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  parent: {
    flexDirection: 'row',
    // flex: 1,
  },
  searchContainer: {
    // flex: 1,
    marginVertical: Width * 0.02,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInputContainer: {
    flex: 0.85,
  },
  textInput: {
    marginHorizontal: Width * 0.01,
    marginLeft: 10,
    fontSize: Sizes.normal * 0.9,
  },
  searchIconContainer: {
    flex: 0.15,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  filterContainer: {
    // width: Width * 0.97,
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'transparent',
    marginVertical: 10,
    padding: 4,
  },
  filterIcon: {},
});
