import React, {FC, useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Keyboard,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import {Height, Sizes, Width} from '../../Constants/Size';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomTextField from '../../Components/CustomTextField';
import {useStateValue} from '../../Store/StateProvider';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';

type props = {
  navigation: any;
  route: any;
};

const ICON_SIZE = Width * 0.07;

const CELL_COUNT = 6;

const CodeConfirmation: FC<props> = ({navigation, route}) => {
  const [code, setcode] = useState<number>(route.params.otp);
  const [value, setValue] = useState('');
  const [Error, setError] = useState('');
  const [{theme}, dispatch] = useStateValue();
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  const [countDown, setcountDown] = useState<number>(60);

  useEffect(() => {
    // set the timer
    const Interval = setInterval(() => {
      if (countDown > 1) {
        setcountDown(value => value - 1);
      }
    }, 1000);

    if (countDown < 1) {
      clearInterval(Interval);
    }
    return () => {
      clearInterval(Interval);
    };
  }, [countDown]);

  const verifyCode = () => {
    // dismiss the keyboard first
    setError('');
    Keyboard.dismiss();
    // verify the code

    if (code.toString().trim() === value.trim()) {
      // code is valid
      // navigate to other screen
      // then navigate to new password screen
      navigation.navigate('NewPassword', {
        email: route.params.email,
      });
    } else {
      // set error
      setError('Invalid Code');
    }
  };
  return (
    <View
      style={[
        styles.parent,
        {
          backgroundColor: theme.SCREEN_BACKGROUND_COLOR,
        },
      ]}>
      {/* Back button  */}
      <View style={styles.backContainer}>
        <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
          <Ionicons
            name={'chevron-back'}
            color={theme.TAB_BAR_ACTIVE_COLOR}
            size={ICON_SIZE}
          />
        </TouchableWithoutFeedback>
      </View>
      {/* title  */}
      <View style={styles.titleContainer}>
        <Text
          style={[
            styles.titleText,
            {
              color: theme.TEXT_COLOR,
            },
          ]}>
          Verify Code
        </Text>
      </View>
      <View style={styles.mainContainer}>
        {/* <CustomTextField
          defaultValue={Input}
          onChangeText={input => setInput(input)}
          placeholder={'Verification Code'}
          textContentType={'creditCardNumber'}
          keyboardType={'number-pad'}
          maxLength={6}
        /> */}
        <CodeField
          ref={ref}
          {...props}
          // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
          value={value}
          onChangeText={setValue}
          cellCount={6}
          rootStyle={styles.codeFieldRoot}
          keyboardType="number-pad"
          textContentType="oneTimeCode"
          renderCell={({index, symbol, isFocused}) => (
            <Text
              key={index}
              style={[
                styles.cell,
                isFocused && {
                  borderColor: theme.GREEN_COLOR,
                },
                {
                  borderColor: theme.SHADOW_COLOR,
                  color: theme.TEXT_COLOR,
                },
              ]}
              onLayout={getCellOnLayoutHandler(index)}>
              {symbol || (isFocused ? <Cursor /> : null)}
            </Text>
          )}
        />
        {Error.length > 0 && (
          <View
            style={{
              alignItems: 'flex-start',
              justifyContent: 'flex-start',
              marginTop: 10,
            }}>
            <Text
              style={{color: theme.GREEN_COLOR, fontSize: Sizes.normal * 0.8}}>
              {Error}
            </Text>
          </View>
        )}
        <View style={styles.noteContainer}>
          <Text
            style={[
              styles.simpleText,
              {
                color: theme.TEXT_COLOR,
              },
            ]}>
            Enter the code you just recieved in your email.{'\n'}
            <Text
              style={[
                styles.noteText,
                {
                  color: theme.TEXT_COLOR,
                },
              ]}>
              Note: The code is valid only for a short time (60 seconds)
            </Text>
          </Text>
        </View>
      </View>
      {countDown !== 1 ? (
        <View style={styles.countDownContainer}>
          <Text
            style={[
              styles.simpleText,
              {
                color: theme.TEXT_COLOR,
              },
            ]}>
            Time left{' '}
            <Text style={{color: theme.GREEN_COLOR}}> {countDown}</Text>
          </Text>
        </View>
      ) : (
        <View style={styles.countDownContainer}>
          <Text style={{color: theme.GREEN_COLOR}}>Code has been expired</Text>
        </View>
      )}

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[
            styles.button,
            {
              backgroundColor: theme.GREEN_COLOR,
            },
          ]}
          onPress={() => verifyCode()}
          disabled={countDown === 1 ? true : false}>
          <Text
            style={[
              styles.buttonText,
              {
                color: theme.TEXT_COLOR,
              },
            ]}>
            Verify Code
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CodeConfirmation;

const styles = StyleSheet.create({
  parent: {
    flex: 1,
  },
  backContainer: {
    paddingVertical: (Height * 0.09) / 4,
    paddingLeft: 15,
    height: Height * 0.09,
  },
  titleContainer: {
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginHorizontal: Width * 0.06,
  },
  titleText: {
    fontSize: Sizes.large * 1.5,
  },
  mainContainer: {
    flex: 0.6,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginHorizontal: Width * 0.08,
  },
  codeFieldRoot: {
    marginTop: 0,
  },
  cell: {
    width: 40,
    height: 40,
    lineHeight: 38,
    fontSize: 24,
    borderWidth: 1,
    borderRadius: 8,
    marginHorizontal: 4,
    textAlign: 'center',
  },
  focusCell: {
    borderColor: '#000',
  },
  noteContainer: {
    marginVertical: 20,
  },
  simpleText: {
    fontSize: Sizes.normal * 0.8,
  },
  noteText: {
    fontSize: Sizes.small,
  },
  countDownContainer: {
    alignItems: 'flex-start',
    marginHorizontal: Width * 0.099,
  },
  buttonContainer: {
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: Width * 0.04,
    marginVertical: 5,
    padding: 5,
  },
  button: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'transparent',
    maxHeight: Height * 0.06,
    width: Width * 0.9,
    height: Height * 0.06,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: Sizes.normal,
  },
});
