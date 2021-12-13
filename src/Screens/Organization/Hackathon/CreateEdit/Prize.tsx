import React, {FC, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import HelpText from '../../../../Components/HelpText';
import {Height, Sizes, Width} from '../../../../Constants/Size';
import {useStateValue} from '../../../../Store/StateProvider';
import CustomTextField from '../../../../Components/CustomTextField2';
import CustomButton from '../../../../Components/CustomButton';
import FormHandler from '../../../../Utils/FormHandler';

type props = {
  method: string;
  data: any;
  setPrizeData: (data: any) => void;
  movePage: (index) => void;
};
const Prize: FC<props> = ({data, method, movePage, setPrizeData}) => {
  const {theme} = useStateValue()[0];
  const [prizes, setprizes] = useState({
    first: {value: '', error: ''},
    second: {value: '', error: ''},
    third: {value: '', error: ''},
  });
  const [loading, setLoading] = useState(false);

  const {isEmpty} = FormHandler();

  const handleSave = () => {
    const x = prizes;

    let isAllInputValid = true;

    if (isEmpty(prizes.first.value)) {
      x['first']['error'] = 'This field is required.';
      isAllInputValid = false;
    }
    if (isEmpty(prizes.second.value)) {
      x['second']['error'] = 'This field is required.';
      isAllInputValid = false;
    }
    if (isEmpty(prizes.third.value)) {
      x['third']['error'] = 'This field is required.';
      isAllInputValid = false;
    }

    if (isAllInputValid) {
      if (method === 'create') {
        setPrizeData(prizes);
        movePage(3);
      }
    }
  };

  return (
    <View style={styles.parent}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{flex: 1}}>
        <ScrollView
          style={styles.scroll}
          showsVerticalScrollIndicator={false}
          horizontal={false}>
          <View style={{marginHorizontal: Width * 0.04}}>
            {/* first position  */}
            <View style={styles.container}>
              <View style={styles.headingContainer}>
                <Text style={[styles.heading, {color: theme.TEXT_COLOR}]}>
                  Position
                </Text>
              </View>
              <HelpText
                text={'Enter prize money for the winners of the hackahton.'}
              />
              {/* first  prize  */}
              <View style={styles.container}>
                <View style={styles.subHeadingContainer}>
                  <Text style={[styles.subHeading, {color: theme.TEXT_COLOR}]}>
                    First Position
                  </Text>
                  <View style={styles.inputContainer}>
                    <CustomTextField
                      defaultValue={prizes.first.value}
                      keyboardType={'numeric'}
                      onChangeText={text =>
                        setprizes(props => {
                          return {
                            ...props,
                            first: {
                              value: text,
                              error: '',
                            },
                          };
                        })
                      }
                      placeholder={'Enter cash value'}
                      placeholderColor={theme.PLACE_HOLDER_TEXT_COLOR}
                      textContentType={'telephoneNumber'}
                      width={Width * 0.6}
                      error={prizes.first.error}
                    />
                  </View>
                </View>
              </View>

              {/* second prize  */}
              <View style={styles.subHeadingContainer}>
                <Text style={[styles.subHeading, {color: theme.TEXT_COLOR}]}>
                  2nd Position
                </Text>
                <View style={styles.inputContainer}>
                  <CustomTextField
                    defaultValue={prizes.second.value}
                    keyboardType={'numeric'}
                    onChangeText={text =>
                      setprizes(props => {
                        return {
                          ...props,
                          second: {
                            value: text,
                            error: '',
                          },
                        };
                      })
                    }
                    placeholder={'Enter cash value'}
                    placeholderColor={theme.PLACE_HOLDER_TEXT_COLOR}
                    textContentType={'telephoneNumber'}
                    width={Width * 0.6}
                    error={prizes.second.error}
                  />
                </View>
              </View>
              {/* third prize  */}
              <View style={styles.subHeadingContainer}>
                <Text style={[styles.subHeading, {color: theme.TEXT_COLOR}]}>
                  3rd Position
                </Text>
                <View style={styles.inputContainer}>
                  <CustomTextField
                    defaultValue={prizes.third.value}
                    keyboardType={'numeric'}
                    onChangeText={text =>
                      setprizes(props => {
                        return {
                          ...props,
                          third: {
                            value: text,
                            error: '',
                          },
                        };
                      })
                    }
                    placeholder={'Enter cash value'}
                    placeholderColor={theme.PLACE_HOLDER_TEXT_COLOR}
                    textContentType={'telephoneNumber'}
                    width={Width * 0.6}
                    error={prizes.third.error}
                  />
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      <CustomButton
        text={'Save and Continue'}
        onPress={handleSave}
        loading={loading}
      />
    </View>
  );
};

export default Prize;

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    marginTop: Height * 0.025,
  },
  screenName: {
    fontSize: Sizes.large * 1.1,
  },
  scroll: {
    marginTop: Height * 0.003,
  },
  container: {
    marginTop: 10,
  },
  headingContainer: {
    marginVertical: 2,
  },
  subHeadingContainer: {
    marginTop: 5,
    marginLeft: 10,
  },
  heading: {
    fontSize: Sizes.normal * 1.1,
  },
  subHeading: {
    fontSize: Sizes.normal * 0.85,
  },
  inputContainer: {
    marginTop: 4,
    marginLeft: Width * 0.015,
    flexDirection: 'column',
    // alignItems: 'center',
  },
});
