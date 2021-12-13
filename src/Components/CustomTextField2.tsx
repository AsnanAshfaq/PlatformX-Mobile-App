/* eslint-disable react-native/no-inline-styles */
import React, {FC, useState, useEffect, useRef} from 'react';
import {StyleSheet, Text, View, TextInput, Keyboard} from 'react-native';
import {Sizes, Width} from '../Constants/Size';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {useStateValue} from '../Store/StateProvider';
import Divider from './Divider';

type textContentType =
  | 'none' //disable autofill
  | 'URL'
  | 'addressCity'
  | 'addressCityAndState'
  | 'addressState'
  | 'countryName'
  | 'creditCardNumber'
  | 'emailAddress'
  | 'familyName'
  | 'fullStreetAddress'
  | 'givenName'
  | 'jobTitle'
  | 'location'
  | 'middleName'
  | 'name'
  | 'namePrefix'
  | 'nameSuffix'
  | 'nickname'
  | 'organizationName'
  | 'postalCode'
  | 'streetAddressLine1'
  | 'streetAddressLine2'
  | 'sublocality'
  | 'telephoneNumber'
  | 'username'
  | 'password';

type keyboardType =
  | 'default'
  | 'number-pad'
  | 'decimal-pad'
  | 'numeric'
  | 'email-address'
  | 'phone-pad';

type props = {
  defaultValue: any;
  onChangeText: any;
  placeholder: string;
  placeholderColor: string;
  textContentType: textContentType;
  keyboardType: keyboardType;
  multiLine?: boolean;
  showLength?: boolean;
  icon?: string;
  secureTextEntry?: boolean;
  rightIcon?: boolean;
  maxLength?: number;
  autoFocus?: boolean;
  error?: string;
  width?: number;
  height?: number;
  code?: boolean;
};

const ICON_SIZE = Width * 0.07;

const CustomTextField2: FC<props> = ({
  placeholder,
  placeholderColor,
  width,
  height,
  icon,
  multiLine,
  showLength = false,
  defaultValue,
  onChangeText,
  textContentType,
  secureTextEntry,
  rightIcon = false,
  keyboardType,
  maxLength,
  autoFocus,
  error,
  code = false,
}) => {
  const [Security, setSecurity] = useState(secureTextEntry);
  const ref = useRef<any>(null);
  const [{theme}, dispatch] = useStateValue();

  const subscribe = Keyboard.addListener('keyboardDidHide', e => {
    if (ref.current) {
      ref?.current.blur();
    }
  });
  return (
    <>
      <View
        style={[
          styles.textFieldContainer,
          {
            borderColor: error ? theme.ERROR_TEXT_COLOR : theme.SHADOW_COLOR,
            width: width ? width : Width * 0.8,
            height: height && height,
          },
        ]}>
        {code && (
          <View style={styles.codeContainer}>
            <View style={[styles.codeTextContainer]}>
              <Text style={[styles.codeText, {color: theme.TEXT_COLOR}]}>
                +92
              </Text>
            </View>
            <View
              style={{
                height: 48,
                // marginTop: 5,
                marginHorizontal: 6,
                width: 1,
                backgroundColor: theme.DIVIDER_COLOR,
              }}
            />
          </View>
        )}
        <TextInput
          placeholder={placeholder}
          ref={ref}
          style={[
            styles.textField,
            {
              width: showLength ? Width * 0.67 : Width * 0.68,
              color: theme.TEXT_COLOR,
            },
          ]}
          value={defaultValue}
          onChangeText={onChangeText}
          placeholderTextColor={placeholderColor}
          textContentType={textContentType}
          keyboardType={keyboardType}
          secureTextEntry={Security === true ? Security : false}
          maxLength={maxLength}
          autoFocus={autoFocus}
          multiline={multiLine ? multiLine : false}
        />
        {showLength && (
          <View style={{position: 'absolute', width: 40, right: 3, top: 5}}>
            <Text
              style={{
                color: theme.DIM_TEXT_COLOR,
                fontSize: Sizes.small * 0.73,
              }}>
              {defaultValue.trim().length} / {maxLength}
            </Text>
          </View>
        )}
        {rightIcon && (
          <TouchableWithoutFeedback
            onPress={() => setSecurity(!Security)}
            style={styles.iconContainer}>
            <Ionicons
              name={Security ? 'eye-outline' : 'eye-off-outline'}
              size={ICON_SIZE}
              color={theme.GREEN_COLOR}
              style={styles.icon}
            />
          </TouchableWithoutFeedback>
        )}
      </View>
      <Text style={[styles.errorText, {color: theme.ERROR_TEXT_COLOR}]}>
        {error}
      </Text>
    </>
  );
};

export default CustomTextField2;

const styles = StyleSheet.create({
  textFieldContainer: {
    marginVertical: 5,
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 10,
    // paddingVertical: 5,
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  textField: {
    fontSize: Sizes.normal * 0.8,
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    marginVertical: 10,
  },
  errorText: {
    fontSize: Sizes.small,
  },
  codeContainer: {
    flexDirection: 'row',
  },
  codeTextContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 5,
    marginHorizontal: 4,
    borderWidth: 1,
  },
  codeText: {
    fontSize: Sizes.normal * 0.8,
  },
});
