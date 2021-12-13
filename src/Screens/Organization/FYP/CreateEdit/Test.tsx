/* eslint-disable dot-notation */
/* eslint-disable react-native/no-inline-styles */
import React, {FC, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Platform,
  ToastAndroid,
} from 'react-native';
import CustomButton from '../../../../Components/CustomButton';
import CustomHeader from '../../../../Components/CustomHeader';
import DateTimePicker from '../../../../Components/DateTimePicker';
import CustomTextField from '../../../../Components/CustomTextField2';
import HelpText from '../../../../Components/HelpText';
import {Calendar, PlusCircle} from '../../../../Components/Icons';
import {Height, Sizes, Width} from '../../../../Constants/Size';
import {useStateValue} from '../../../../Store/StateProvider';
import TechnologiesModal from '../../../../Modals/FYPTechnologiesModal';
import CategoriesModal from '../../../../Modals/FYPCategoriesModal';
import FormHandler from '../../../../Utils/FormHandler';
import Axios from '../../../../Utils/Axios';
//@ts-ignore
import {BASE_URL} from 'react-native-dotenv';

type props = {
  method: string;
  data: any;
  submit: boolean;
  FYPDate: Date;
  FYPID: string;
  setSubmit: (value: boolean) => void;
  handleFYPCreate: (name, desc, date) => void;
};

const Test: FC<props> = ({
  method,
  data,
  submit,
  FYPDate,
  FYPID,
  handleFYPCreate,
  setSubmit,
}) => {
  const {theme} = useStateValue()[0];
  const [Input, setInput] = useState({
    name: {value: '', error: ''},
    description: {value: '', error: ''},
    end_date: {value: new Date(), error: ''},
  });

  const [modals, setmodals] = useState({
    date: false,
  });
  const [loading, setloading] = useState(false);
  const {checkLength, isEmpty} = FormHandler();

  const handleSave = () => {
    var isAllInputValid = true;
    const x = Input;

    // name check
    if (isEmpty(Input.name.value)) {
      isAllInputValid = false;
      x['name']['error'] = 'Name is required.';
    }
    if (isEmpty(Input.description.value)) {
      isAllInputValid = false;
      x['description']['error'] = 'Description is required.';
    }

    if (
      Input.end_date.value.toLocaleDateString() ===
      new Date().toLocaleDateString()
    ) {
      isAllInputValid = false;
      x['end_date']['error'] = 'Last date cannot be today.';
    } else if (Input.end_date.value < new Date()) {
      isAllInputValid = false;
      x['end_date']['error'] = 'Invalid date.';
    } else if (Input.end_date.value.getDate() < FYPDate.getDate()) {
      isAllInputValid = false;
      x['end_date'][
        'error'
      ] = `Test end date cannot be less than FYP's end date (${FYPDate.toLocaleDateString()})`;
    }
    setInput(props => {
      return {
        ...x,
      };
    });
    if (isAllInputValid) {
      if (method === 'create') {
        handleFYPCreate(
          Input.name.value,
          Input.description.value,
          Input.end_date.value,
        );
      }
    } else {
      setSubmit(false);
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
      {/* date picker modal  */}
      <DateTimePicker
        open={modals.date}
        date={new Date()}
        mode={'date'}
        setDate={response => {
          // hide modal first
          setmodals(props => {
            return {
              ...props,
              date: false,
            };
          });

          //   get type of modal
          const getDate = new Date(response);

          setInput(props => {
            return {
              ...props,
              end_date: {
                value: getDate,
                error: '',
              },
            };
          });
        }}
        cancel={() =>
          setmodals(props => {
            return {
              ...props,
              date: false,
            };
          })
        }
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{flex: 1}}>
        <ScrollView>
          <View style={styles.scroll}>
            {/* name of the test */}
            <View style={styles.container}>
              <View style={styles.headingContainer}>
                <Text style={[styles.heading, {color: theme.TEXT_COLOR}]}>
                  Name
                </Text>
              </View>
              <HelpText
                text={
                  'Provide name of the test like Reverse words in a given string.'
                }
              />
              <View style={styles.inputContainer}>
                <CustomTextField
                  defaultValue={Input.name.value}
                  keyboardType={'default'}
                  onChangeText={text =>
                    setInput(props => {
                      return {
                        ...props,
                        name: {
                          value: text,
                          error: '',
                        },
                      };
                    })
                  }
                  placeholder={'Enter Test Name'}
                  placeholderColor={theme.PLACE_HOLDER_TEXT_COLOR}
                  textContentType={'name'}
                  maxLength={30}
                  showLength
                  error={Input.name.error}
                />
              </View>
            </View>
            {/* description of the test  */}
            <View style={styles.container}>
              <View style={styles.headingContainer}>
                <Text style={[styles.heading, {color: theme.TEXT_COLOR}]}>
                  Description
                </Text>
              </View>
              <HelpText
                text={
                  'Provide description of the test. Clearly mention problem statement, all inputs on which you want the code to run, and an example output.'
                }
              />
              <View style={styles.inputContainer}>
                <CustomTextField
                  defaultValue={Input.description.value}
                  keyboardType={'default'}
                  onChangeText={text =>
                    setInput(props => {
                      return {
                        ...props,
                        description: {
                          value: text,
                          error: '',
                        },
                      };
                    })
                  }
                  placeholder={'Enter Test Description'}
                  placeholderColor={theme.PLACE_HOLDER_TEXT_COLOR}
                  textContentType={'name'}
                  multiLine={true}
                  error={Input.description.error}
                  maxLength={800}
                  showLength
                />
              </View>
            </View>

            {/* last date to apply  */}
            <View style={styles.container}>
              <View style={[styles.headingContainer]}>
                <Text style={[styles.heading, {color: theme.TEXT_COLOR}]}>
                  Test Last Date
                </Text>
              </View>
              <HelpText text={'Specify last date to apply for this project.'} />
              <View style={styles.center}>
                <TouchableOpacity
                  onPress={() =>
                    setmodals(props => {
                      return {
                        ...props,
                        date: true,
                      };
                    })
                  }
                  style={[
                    styles.cardContainer,
                    {
                      backgroundColor: theme.CARD_BACKGROUND_COLOR,
                      borderWidth: 1,
                      borderColor:
                        Input.end_date.error !== ''
                          ? theme.ERROR_TEXT_COLOR
                          : theme.CARD_BACKGROUND_COLOR,
                      width: Width * 0.65,
                    },
                  ]}>
                  <View style={styles.cardTextContainer}>
                    <Text style={[styles.cardText, {color: theme.TEXT_COLOR}]}>
                      {Input.end_date.value.toLocaleDateString()}
                    </Text>
                  </View>
                  <View style={styles.cardIconContainer}>
                    <Calendar size={0.9} color={theme.GREEN_COLOR} />
                  </View>
                </TouchableOpacity>
                {Input.end_date.error !== '' && (
                  <View style={{alignItems: 'center'}}>
                    <Text
                      style={[
                        {color: theme.ERROR_TEXT_COLOR},
                        styles.errorText,
                      ]}>
                      {Input.end_date.error}
                    </Text>
                  </View>
                )}
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      <CustomButton text={'Save'} onPress={handleSave} loading={submit} />
    </View>
  );
};

export default Test;

const styles = StyleSheet.create({
  parent: {
    flex: 1,
  },
  screenName: {
    fontSize: Sizes.normal * 1.1,
  },
  scroll: {
    marginTop: Height * 0.003,
    marginHorizontal: Width * 0.04,
  },
  container: {
    marginTop: 10,
  },
  headingContainer: {
    marginVertical: 2,
  },
  heading: {
    fontSize: Sizes.normal * 1.1,
  },
  inputContainer: {
    marginTop: 4,
  },
  selectionContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    marginTop: 10,
    marginHorizontal: Width * 0.15,
    paddingVertical: 10,
    borderRadius: 10,
  },
  selectionText: {
    fontSize: Sizes.normal * 0.95,
  },
  cardTextContainer: {
    flex: 0.85,
    alignItems: 'center',
  },
  cardIconContainer: {
    flex: 0.15,
    marginLeft: 8,
  },
  cardText: {
    fontSize: Sizes.normal,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardContainer: {
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 10,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'transparent',
  },
  errorText: {
    fontSize: Sizes.small,
  },
});
