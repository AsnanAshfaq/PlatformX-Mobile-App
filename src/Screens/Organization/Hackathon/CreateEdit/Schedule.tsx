//TODO:
// check if start date is equal to or greater than todays date
// check if time to start hackathon is after 1 hour of publishing hackahton
// check if end date is tomorrow or greater than tomorrow
// check if time to start hackathon is after 1 hour of publishing hackahton
// final reminder should not be empty

import React, {FC, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import CustomButton from '../../../../Components/CustomButton';
import CustomTextField from '../../../../Components/CustomTextField2';
import HelpText from '../../../../Components/HelpText';
import {Height, Sizes, Width} from '../../../../Constants/Size';
import {useStateValue} from '../../../../Store/StateProvider';
import DateTimePicker from '../../../../Components/DateTimePicker';
import {Calendar, Clock} from '../../../../Components/Icons';
import FormHandler from '../../../../Utils/FormHandler';

type props = {
  method: string;
  data: any;
  submit: boolean;
  handleCreateHackathon?: (data: any) => void;
  setSubmit: (value: boolean) => void;
};
const Schedule: FC<props> = ({
  method,
  data,
  submit,
  handleCreateHackathon,
  setSubmit,
}) => {
  const {theme} = useStateValue()[0];
  const [Input, setInput] = useState({value: new Date(), error: ''});
  const [modal, setmodal] = useState<{
    isShown: boolean;
  }>({
    isShown: false,
  });

  const {isEmpty} = FormHandler();

  const handleSave = () => {
    let isAllInputValid = true;
    const x = Input;
    if (Input.value.toLocaleDateString() === new Date().toLocaleDateString()) {
      isAllInputValid = false;
      x['error'] = 'Last date cannot be today.';
    } else if (Input.value < new Date()) {
      isAllInputValid = false;
      x['error'] = 'Invalid date.';
    }

    setInput(props => {
      return {
        ...x,
      };
    });

    if (isAllInputValid) {
      if (method === 'create') {
        if (typeof handleCreateHackathon !== 'undefined') {
          handleCreateHackathon(Input.value);
        }
      }
    }
  };
  return (
    <View style={styles.parent}>
      {/* date picker modal  */}
      <DateTimePicker
        open={modal.isShown}
        date={new Date()}
        mode={'date'}
        setDate={response => {
          // hide modal first
          setmodal(props => {
            return {
              ...props,
              isShown: false,
            };
          });
          const getDate = new Date(response);

          setInput({
            value: getDate,
            error: '',
          });
        }}
        cancel={() => {
          setmodal(props => {
            return {
              ...props,
              isShown: false,
            };
          });
        }}
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{flex: 1}}>
        <ScrollView
          style={styles.scroll}
          showsVerticalScrollIndicator={false}
          horizontal={false}>
          <View style={{marginHorizontal: Width * 0.04}}>
            {/* end of hackathon  */}

            <View style={styles.container}>
              <View style={[styles.headingContainer]}>
                <Text style={[styles.heading, {color: theme.TEXT_COLOR}]}>
                  End Date
                </Text>
              </View>
              <HelpText
                text={'Specify last date to apply for this hackathon.'}
              />
              <View style={styles.center}>
                <TouchableOpacity
                  onPress={() =>
                    setmodal(props => {
                      return {
                        ...props,
                        isShown: true,
                      };
                    })
                  }
                  style={[
                    styles.cardContainer,
                    {
                      backgroundColor: theme.CARD_BACKGROUND_COLOR,
                      borderWidth: 1,
                      borderColor:
                        Input.error !== ''
                          ? theme.ERROR_TEXT_COLOR
                          : theme.CARD_BACKGROUND_COLOR,
                      width: Width * 0.65,
                    },
                  ]}>
                  <View style={styles.cardTextContainer}>
                    <Text style={[styles.cardText, {color: theme.TEXT_COLOR}]}>
                      {Input.value.toLocaleDateString()}
                    </Text>
                  </View>
                  <View style={styles.cardIconContainer}>
                    <Calendar size={0.9} color={theme.GREEN_COLOR} />
                  </View>
                </TouchableOpacity>
                {Input.error !== '' && (
                  <View style={{alignItems: 'center'}}>
                    <Text
                      style={[
                        {color: theme.ERROR_TEXT_COLOR},
                        styles.errorText,
                      ]}>
                      {Input.error}
                    </Text>
                  </View>
                )}
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      <CustomButton
        text={'Save and Continue'}
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
    flexDirection: 'row',
  },
  rowContainer: {
    flex: 1,
    flexDirection: 'column',
    marginLeft: Width * 0.015,
  },
  heading: {
    fontSize: Sizes.normal * 1.1,
  },
  subHeading: {
    fontSize: Sizes.normal * 0.85,
  },
  modalContainer: {
    maxWidth: Width * 0.33,
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 10,
    padding: 6,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'transparent',
  },
  modalText: {
    fontSize: Sizes.normal * 0.8,
  },
  iconContainer: {
    marginLeft: 8,
  },
  errorContainer: {
    paddingLeft: 4,
    paddingTop: 8,
  },
  errorText: {
    fontSize: Sizes.small,
  },
  inputContainer: {
    marginTop: 4,
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
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
