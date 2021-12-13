import React, {FC, useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  FlatList,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from 'react-native';
import CustomButton from '../../../../Components/CustomButton';
import {Height, Sizes, Width} from '../../../../Constants/Size';
import {useStateValue} from '../../../../Store/StateProvider';
import CheckBox from '../../../../Components/CheckBox';
import {hackathonThemeTags} from '../../../../Constants/sample';
import HelpText from '../../../../Components/HelpText';
import DateTimePicker from '../../../../Components/DateTimePicker';
import {Calendar, Clock, PlusCircle} from '../../../../Components/Icons';
import CustomTextField from '../../../../Components/CustomTextField2';
import Create from '../../../../Modals/Workshop/Create';

type Props = {};
const BreakDowns: FC<Props> = ({}) => {
  const {theme} = useStateValue()[0];

  const [breakDowns, setbreakDowns] = useState({
    time: {value: new Date().toLocaleTimeString(), error: ''},
    activity: {value: '', error: ''},
  });

  const [modal, setmodal] = useState(false);

  const openModal = () => {
    setmodal(true);
  };
  return (
    <>
      <DateTimePicker
        open={modal}
        date={new Date()}
        mode={'time'}
        setDate={response => {
          // hide modal first
          setmodal(false);
          const getTime = new Date(response).toLocaleTimeString();
          setbreakDowns(props => {
            return {
              ...props,
              time: {
                value: getTime,
                error: '',
              },
            };
          });
        }}
        cancel={() => setmodal(false)}
      />
      <View
        style={{
          // marginHorizontal: Width * 0.009,
          flexDirection: 'row',
          flex: 1,
          justifyContent: 'center',
        }}>
        <View
          style={[
            styles.subHeadingContainer,
            {flex: 0.5, justifyContent: 'center', alignItems: 'center'},
          ]}>
          <View style={[styles.headingContainer, {flexDirection: 'row'}]}>
            <Text style={[styles.subHeading, {color: theme.TEXT_COLOR}]}>
              Time
            </Text>
          </View>
          <View style={styles.breakDownListContainer}>
            <TouchableOpacity
              onPress={openModal}
              style={[
                styles.cardContainer,
                {
                  backgroundColor: theme.CARD_BACKGROUND_COLOR,
                  width: Width * 0.4,
                },
              ]}>
              <View style={styles.cardTextContainer}>
                <Text
                  style={[styles.breakDownTimeText, {color: theme.TEXT_COLOR}]}>
                  {breakDowns.time.value}
                </Text>
              </View>
              <View style={styles.cardIconContainer}>
                <Clock size={0.7} color={theme.GREEN_COLOR} />
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={[
            styles.subHeadingContainer,
            {flex: 0.5, justifyContent: 'center', alignItems: 'center'},
          ]}>
          <View style={[styles.headingContainer]}>
            <Text style={[styles.subHeading, {color: theme.TEXT_COLOR}]}>
              Activity
            </Text>
          </View>
          <View style={styles.breakDownListContainer}>
            <View
              style={[
                {
                  marginTop: 10,
                  padding: 8,
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: Width * 0.4,
                },
              ]}>
              <CustomTextField
                defaultValue={''}
                keyboardType={'default'}
                onChangeText={text => console.log('Activity text is', text)}
                placeholder={'Enter an activity'}
                placeholderColor={theme.PLACE_HOLDER_TEXT_COLOR}
                textContentType={'streetAddressLine2'}
                //   maxLength={3}
                error={''}
                width={Width * 0.4}
                height={Width * 0.11}
              />
            </View>
          </View>
        </View>
      </View>
    </>
  );
};
type props = {
  method: string;
  data: any;
  submit: boolean;
  handleCreateWorkshop: (ev, st) => void;
  setSubmit: (value: boolean) => void;
};

const Schedule: FC<props> = ({
  method,
  submit,
  setSubmit,
  handleCreateWorkshop,
}) => {
  const {theme} = useStateValue()[0];

  const [Input, setInput] = useState({
    event_date: {value: new Date(), error: ''},
    start_time: {value: new Date(), error: ''},
  });

  const [modal, setmodal] = useState<{
    isShown: boolean;
    mode: 'date' | 'time' | 'datetime';
    type: 'start' | 'end';
  }>({
    isShown: false,
    mode: 'date',
    type: 'start',
  });

  const [createEditModal, setCreateEditModal] = useState(false);

  const handleSave = () => {
    const x = Input;
    let isAllInputValid = true;

    if (
      Input.event_date.value.toLocaleDateString() ===
      new Date().toLocaleDateString()
    ) {
      x['event_date']['error'] = 'Event date cannot be today.';
      isAllInputValid = false;
    } else if (Input.event_date.value < new Date()) {
      x['event_date']['error'] = 'Invalid date.';
      isAllInputValid = false;
    }

    setInput(props => {
      return {
        ...x,
      };
    });

    if (isAllInputValid) {
      if (method === 'create') {
        setSubmit(true);
        handleCreateWorkshop(Input.event_date.value, Input.start_time.value);
      }
    } else {
      // console.log('Error');
    }
  };

  return (
    <View style={styles.parent}>
      <DateTimePicker
        open={modal.isShown}
        date={new Date()}
        mode={modal.mode}
        setDate={response => {
          // hide modal first
          setmodal(props => {
            return {
              ...props,
              isShown: false,
            };
          });

          //   get type of modal
          const {mode, type} = modal;
          const getDate = new Date(response);
          const getTime = new Date(response);

          if (mode === 'date') {
            setInput(props => {
              return {
                ...props,
                event_date: {
                  value: getDate,
                  error: '',
                },
              };
            });
          } else {
            if (mode === 'time' && type === 'start') {
              setInput(props => {
                return {
                  ...props,
                  start_time: {
                    value: getTime,
                    error: '',
                  },
                };
              });
            }
            if (mode === 'time' && type === 'end') {
              setInput(props => {
                return {
                  ...props,
                  end_time: {
                    value: getTime,
                    error: '',
                  },
                };
              });
            }
          }
        }}
        cancel={() =>
          setmodal(props => {
            return {
              ...props,
              isShown: false,
            };
          })
        }
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{flex: 1}}>
        <ScrollView
          style={styles.scroll}
          showsVerticalScrollIndicator={false}
          horizontal={false}>
          {/* event date container  */}
          <View style={styles.container}>
            <View style={styles.headingContainer}>
              <Text style={[styles.heading, {color: theme.TEXT_COLOR}]}>
                Event Date
              </Text>
            </View>
            <View style={[styles.center, styles.container]}>
              <TouchableOpacity
                onPress={() =>
                  setmodal(props => {
                    return {
                      ...props,
                      isShown: true,
                      mode: 'date',
                      type: 'start',
                    };
                  })
                }
                style={[
                  styles.cardContainer,
                  {
                    backgroundColor: theme.CARD_BACKGROUND_COLOR,
                    width: Width * 0.65,
                    borderColor:
                      Input.event_date.error !== ''
                        ? theme.ERROR_TEXT_COLOR
                        : theme.CARD_BACKGROUND_COLOR,
                  },
                ]}>
                <View style={styles.cardTextContainer}>
                  <Text style={[styles.cardText, {color: theme.TEXT_COLOR}]}>
                    {new Date(Input.event_date.value).toLocaleDateString()}
                  </Text>
                </View>
                <View style={styles.cardIconContainer}>
                  <Calendar size={0.9} color={theme.GREEN_COLOR} />
                </View>
              </TouchableOpacity>
              {Input.event_date.error !== '' && (
                <View style={{alignItems: 'center', marginTop: 5}}>
                  <Text
                    style={[{color: theme.ERROR_TEXT_COLOR}, styles.errorText]}>
                    {Input.event_date.error}
                  </Text>
                </View>
              )}
            </View>
          </View>
          {/* start time container  */}
          <View style={styles.container}>
            <View style={styles.headingContainer}>
              <Text style={[styles.heading, {color: theme.TEXT_COLOR}]}>
                Start Time
              </Text>
            </View>
            <View style={[styles.center, styles.container]}>
              <TouchableOpacity
                onPress={() =>
                  setmodal(props => {
                    return {
                      ...props,
                      isShown: true,
                      mode: 'time',
                      type: 'start',
                    };
                  })
                }
                style={[
                  styles.cardContainer,
                  {
                    backgroundColor: theme.CARD_BACKGROUND_COLOR,
                    width: Width * 0.65,
                    borderColor:
                      Input.start_time.error !== ''
                        ? theme.ERROR_TEXT_COLOR
                        : theme.CARD_BACKGROUND_COLOR,
                  },
                ]}>
                <View style={styles.cardTextContainer}>
                  <Text style={[styles.cardText, {color: theme.TEXT_COLOR}]}>
                    {new Date(Input.start_time.value).toLocaleTimeString()}
                  </Text>
                </View>
                <View style={styles.cardIconContainer}>
                  <Clock size={0.9} color={theme.GREEN_COLOR} />
                </View>
              </TouchableOpacity>
              {Input.start_time.error !== '' && (
                <View style={{alignItems: 'center', marginTop: 5}}>
                  <Text
                    style={[{color: theme.ERROR_TEXT_COLOR}, styles.errorText]}>
                    {Input.start_time.error}
                  </Text>
                </View>
              )}
            </View>
          </View>

          <View style={{marginTop: 20}}>
            <HelpText
              text={'Note: Duration of workshop will be maximum 1 hour.'}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      <CustomButton
        text={'Save and Schedule'}
        onPress={handleSave}
        loading={submit}
      />
    </View>
  );
};

export default Schedule;

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    marginHorizontal: Width * 0.04,
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
  heading: {
    fontSize: Sizes.normal * 1.1,
  },
  subHeadingContainer: {
    marginTop: 5,
    marginLeft: 10,
  },
  subHeading: {
    fontSize: Sizes.normal * 0.9,
  },
  inputContainer: {
    marginTop: 4,
  },
  checkBoxContainer: {
    marginTop: 10,
    marginLeft: 5,
    flexDirection: 'row',
  },
  checkBoxText: {
    fontSize: Sizes.normal * 0.8,
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
  breakDownListContainer: {},
  breakDownTimeText: {
    fontSize: Sizes.normal * 0.85,
  },

  errorText: {
    fontSize: Sizes.small,
  },
});
