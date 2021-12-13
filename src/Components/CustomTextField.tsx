import React, {FC, useState, useEffect, useRef} from 'react';
import {StyleSheet, Text, View, TextInput, Keyboard} from 'react-native';
import {Sizes, Width} from '../Constants/Size';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {useStateValue} from '../Store/StateProvider';

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
  textContentType: textContentType;
  keyboardType: keyboardType;
  icon?: string;
  secureTextEntry?: boolean;
  rightIcon?: boolean;
  maxLength?: number;
  autoFocus?: boolean;
  error?: string;
};

const ICON_SIZE = Width * 0.07;

const CustomTextField: FC<props> = ({
  placeholder,
  icon,
  defaultValue,
  onChangeText,
  textContentType,
  secureTextEntry,
  rightIcon,
  keyboardType,
  maxLength,
  autoFocus,
  error,
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
            borderColor: error ? theme.GREEN_COLOR : theme.SHADOW_COLOR,
          },
        ]}>
        <TextInput
          placeholder={placeholder}
          ref={ref}
          style={[styles.textField, {color: theme.TEXT_COLOR}]}
          value={defaultValue}
          onChangeText={onChangeText}
          placeholderTextColor={theme.TEXT_COLOR}
          textContentType={textContentType}
          keyboardType={keyboardType}
          secureTextEntry={Security === true ? Security : false}
          maxLength={maxLength}
          autoFocus={autoFocus}
        />
        {rightIcon && (
          <TouchableWithoutFeedback
            onPress={() => setSecurity(!Security)}
            style={styles.iconContainer}>
            <Ionicons
              name={Security ? 'eye-outline' : 'eye-off-outline'}
              size={ICON_SIZE}
              color={theme.ICON_COLOR}
              style={styles.icon}
            />
          </TouchableWithoutFeedback>
        )}
      </View>
      <Text style={[styles.errorText, {color: theme.RED_COLOR}]}>{error}</Text>
    </>
  );
};

export default CustomTextField;

const styles = StyleSheet.create({
  textFieldContainer: {
    marginVertical: 5,
    flexDirection: 'row',
    width: Width * 0.8,
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  textField: {
    width: Width * 0.68,
    fontSize: Sizes.normal,
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
});
