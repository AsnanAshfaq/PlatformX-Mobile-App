import React, {FC, useState} from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import CustomButton from '../../../../../Components/CustomButton';
import CustomTextField from '../../../../../Components/CustomTextField2';
import HelpText from '../../../../../Components/HelpText';
import {Height, Sizes, Width} from '../../../../../Constants/Size';
import {useStateValue} from '../../../../../Store/StateProvider';
import FormHandler from '../../../../../Utils/FormHandler';

type props = {
  method: string;
  data: any;
  setGeneralData: (data: any) => void;
  movePage: (index) => void;
};

const General: FC<props> = ({method, data, movePage, setGeneralData}) => {
  const [Input, setInput] = useState({
    name: {value: 'Surveillance Robot', error: ''},
    tagLine: {value: 'Surveillance Robot', error: ''},
    description: {
      value:
        'Robots in near future will control the whole world. Robots with eyes are even better!. you will build one such surveillance robot that can be controlled from a remote location and capture live video footages.',
      error: '',
    },
    about: {value: 'This is the about of the project', error: ''},
  });
  const [submit, setsubmit] = useState(false);
  const {theme} = useStateValue()[0];

  const {isEmpty} = FormHandler();
  const handleSave = () => {
    // check for errors
    let isAllInputValid = true;
    const x = Input;
    if (isEmpty(Input.name.value)) {
      x['name']['error'] = 'Name is requried.';
      isAllInputValid = false;
    }
    if (isEmpty(Input.description.value)) {
      x['description']['error'] = 'Description is required.';
      isAllInputValid = false;
    }
    if (isEmpty(Input.tagLine.value)) {
      x['tagLine']['error'] = 'Tag line is required';
      isAllInputValid = false;
    }
    if (isEmpty(Input.about.value)) {
      x['about']['error'] = 'About field is required';
      isAllInputValid = false;
    }

    setInput(props => {
      return {
        ...x,
      };
    });

    if (isAllInputValid) {
      if (method === 'create') {
        setGeneralData(Input);
        movePage(1);
      }
    } else {
      setInput(props => {
        return {
          ...x,
        };
      });
    }
  };
  return (
    <View style={styles.parent}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{flex: 1}}>
        <ScrollView>
          <View style={styles.scroll}>
            {/* name of the project */}
            <View style={styles.container}>
              <View style={styles.headingContainer}>
                <Text style={[styles.heading, {color: theme.TEXT_COLOR}]}>
                  Name
                </Text>
              </View>
              <HelpText text={'Provide name of the project.'} />
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
                  placeholder={'Enter Project Name'}
                  placeholderColor={theme.PLACE_HOLDER_TEXT_COLOR}
                  textContentType={'name'}
                  maxLength={30}
                  showLength
                  error={Input.name.error}
                />
              </View>
            </View>
            {/* tagline of the project  */}
            <View style={styles.container}>
              <View style={styles.headingContainer}>
                <Text style={[styles.heading, {color: theme.TEXT_COLOR}]}>
                  Tag Line
                </Text>
              </View>
              <HelpText text={'Provide a catchy tag line for the project.'} />
              <View style={styles.inputContainer}>
                <CustomTextField
                  defaultValue={Input.tagLine.value}
                  keyboardType={'default'}
                  onChangeText={text =>
                    setInput(props => {
                      return {
                        ...props,
                        tagLine: {
                          value: text,
                          error: '',
                        },
                      };
                    })
                  }
                  placeholder={'Enter Project Tag Line'}
                  placeholderColor={theme.PLACE_HOLDER_TEXT_COLOR}
                  textContentType={'name'}
                  maxLength={20}
                  showLength
                  error={Input.tagLine.error}
                />
              </View>
            </View>
            {/* description of the project  */}
            <View style={styles.container}>
              <View style={styles.headingContainer}>
                <Text style={[styles.heading, {color: theme.TEXT_COLOR}]}>
                  Description
                </Text>
              </View>
              <HelpText text={'Provide an overview of the project.'} />
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
                  placeholder={'Enter Project Description'}
                  placeholderColor={theme.PLACE_HOLDER_TEXT_COLOR}
                  textContentType={'name'}
                  multiLine={true}
                  error={Input.description.error}
                  maxLength={150}
                  showLength
                />
              </View>
            </View>
            {/* about the project  */}
            <View style={styles.container}>
              <View style={styles.headingContainer}>
                <Text style={[styles.heading, {color: theme.TEXT_COLOR}]}>
                  About the Project
                </Text>
              </View>
              <HelpText
                text={
                  'Be sure to write what inspired you, what you learned, how you built your project and the challenges you faced.'
                }
              />
              <View style={styles.inputContainer}>
                <CustomTextField
                  defaultValue={Input.about.value}
                  keyboardType={'default'}
                  onChangeText={text =>
                    setInput(props => {
                      return {
                        ...props,
                        about: {
                          value: text,
                          error: '',
                        },
                      };
                    })
                  }
                  placeholder={'Enter things about your project'}
                  placeholderColor={theme.PLACE_HOLDER_TEXT_COLOR}
                  textContentType={'name'}
                  maxLength={400}
                  showLength
                  multiLine
                  error={Input.about.error}
                />
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      <CustomButton text={'Next'} onPress={handleSave} loading={submit} />
    </View>
  );
};

export default General;

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
});
