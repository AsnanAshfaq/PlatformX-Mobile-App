/* eslint-disable react-native/no-inline-styles */
import React, {FC, useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {color} from 'react-native-reanimated';
import CustomButton from '../../../../Components/CustomButton';
import CustomTextField from '../../../../Components/CustomTextField2';
import {Height, Sizes, Width} from '../../../../Constants/Size';
import {useStateValue} from '../../../../Store/StateProvider';
import CheckBox from '../../../../Components/CheckBox';
import {hackathonThemeTags} from '../../../../Constants/sample';
import HelpText from '../../../../Components/HelpText';
import {Cross, PlusCircle} from '../../../../Components/Icons';
import ThemeTagsModal from '../../../../Modals/ThemeTags';
import FormHandler from '../../../../Utils/FormHandler';

type props = {
  method: string;
  data: any;
  setGeneralData: (data: any) => void;
  movePage: (index) => void;
};
const General: FC<props> = ({method, data, setGeneralData, movePage}) => {
  const {theme} = useStateValue()[0];

  const [Input, setInput] = useState({
    title: {value: '', error: ''},
    tagLine: {value: '', error: ''},
    description: {value: '', error: ''},
    resources: [
      {
        value: '',
        error: '',
      },
    ],
    themes: {value: [], error: ''},
    rules: [
      {
        value: '',
        error: '',
      },
    ],
    submission: {value: '', error: ''},
  });
  const [modals, setmodals] = useState({
    theme: false,
  });

  const [loading, setLoading] = useState(false);

  const handleAddRules = () => {
    if (Input.rules[Input.rules.length - 1].value === '') {
      const state = [...Input.rules];
      state[Input.rules.length - 1].error = 'Fill this field first';
      setInput(props => {
        return {
          ...props,
          skills: state,
        };
      });
    } else {
      // append take away in the array
      const state = [...Input.rules];
      state.push({
        value: '',
        error: '',
      });
      setInput(props => {
        return {
          ...props,
          rules: state,
        };
      });
    }
  };

  const handleAddResources = () => {
    if (Input.resources[Input.resources.length - 1].value === '') {
      const state = [...Input.resources];
      state[Input.resources.length - 1].error = 'Fill this field first';
      setInput(props => {
        return {
          ...props,
          resources: state,
        };
      });
    } else {
      // append take away in the array
      const state = [...Input.resources];
      state.push({
        value: '',
        error: '',
      });
      setInput(props => {
        return {
          ...props,
          resources: state,
        };
      });
    }
  };

  const removeRules = (index: number) => {
    const state = [...Input.rules];
    state.splice(index, 1);
    setInput(props => {
      return {
        ...props,
        rules: state,
      };
    });
  };

  const removeResource = (index: number) => {
    const state = [...Input.resources];
    state.splice(index, 1);
    setInput(props => {
      return {
        ...props,
        resources: state,
      };
    });
  };

  const {isEmpty} = FormHandler();

  const handleSave = () => {
    const x = Input;
    let isAllInputValid = true;

    if (isEmpty(Input.title.value)) {
      x['title']['error'] = 'Title is required.';
      isAllInputValid = false;
    }

    if (isEmpty(Input.description.value)) {
      x['description']['error'] = 'Description is required.';
      isAllInputValid = false;
    }

    if (isEmpty(Input.tagLine.value)) {
      x['tagLine']['error'] = 'Tag Line is required.';
      isAllInputValid = false;
    }

    if (Input.themes.value.length === 0) {
      x['themes']['error'] = 'Themes are required.';
      isAllInputValid = false;
    }

    if (Input.resources[Input.resources.length - 1].value === '') {
      isAllInputValid = false;
      x['resources'][Input.resources.length - 1]['error'] =
        'This field is required.';
    }

    if (Input.rules[Input.rules.length - 1].value === '') {
      isAllInputValid = false;
      x['rules'][Input.rules.length - 1]['error'] = 'This field is required.';
    }

    if (isEmpty(Input.submission.value)) {
      x['submission']['error'] = 'Submission requirement cannot be empty.';
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
    }
  };
  return (
    <View style={styles.parent}>
      {/* project modal  */}
      <ThemeTagsModal
        isShow={modals.theme}
        toggleModal={() =>
          setmodals(props => {
            return {
              ...props,
              theme: false,
            };
          })
        }
        onSelect={(values: any) => {
          setInput(props => {
            return {
              ...props,
              themes: {
                value: values,
                error: '',
              },
            };
          });
        }}
        values={Input.themes.value}
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{flex: 1}}>
        <ScrollView
          style={styles.scroll}
          showsVerticalScrollIndicator={false}
          horizontal={false}>
          <View style={{marginHorizontal: Width * 0.04}}>
            {/* title  */}
            <View style={styles.container}>
              <View style={styles.headingContainer}>
                <Text style={[styles.heading, {color: theme.TEXT_COLOR}]}>
                  Title
                </Text>
              </View>
              <HelpText text="Provide a title for your hackathon." />
              <View style={styles.inputContainer}>
                <CustomTextField
                  defaultValue={Input.title.value}
                  keyboardType={'default'}
                  onChangeText={text =>
                    setInput(props => {
                      return {
                        ...props,
                        title: {
                          value: text,
                          error: '',
                        },
                      };
                    })
                  }
                  placeholder={'Enter Hackathon Title'}
                  placeholderColor={theme.PLACE_HOLDER_TEXT_COLOR}
                  textContentType={'name'}
                  maxLength={30}
                  showLength
                  error={Input.title.error}
                />
              </View>
            </View>
            {/* tagline  */}
            <View style={styles.container}>
              <View style={styles.headingContainer}>
                <Text style={[styles.heading, {color: theme.TEXT_COLOR}]}>
                  Tag Line
                </Text>
              </View>
              <HelpText
                text={'Create a short and catchy tagline for your hackathon.'}
              />

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
                  placeholder={'Enter Hackathon Tag Line'}
                  placeholderColor={theme.PLACE_HOLDER_TEXT_COLOR}
                  textContentType={'name'}
                  multiLine={true}
                  maxLength={20}
                  showLength
                  error={Input.tagLine.error}
                />
              </View>
            </View>
            {/* description  */}
            <View style={styles.container}>
              <View style={styles.headingContainer}>
                <Text style={[styles.heading, {color: theme.TEXT_COLOR}]}>
                  Description
                </Text>
              </View>
              <HelpText text="Provide a complete description for your hackathon." />
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
                  placeholder={'Enter Hackathon Description'}
                  placeholderColor={theme.PLACE_HOLDER_TEXT_COLOR}
                  textContentType={'name'}
                  multiLine={true}
                  maxLength={400}
                  showLength
                  error={Input.description.error}
                />
              </View>
            </View>
            {/* theme tags  */}
            <View style={styles.container}>
              <View style={styles.headingContainer}>
                <Text style={[styles.heading, {color: theme.TEXT_COLOR}]}>
                  Theme Tags
                </Text>
              </View>
              <HelpText text={'Choose theme for your hackathon.'} />
              <TouchableOpacity
                onPress={() =>
                  setmodals(props => {
                    return {
                      ...props,
                      theme: true,
                    };
                  })
                }>
                <View
                  style={[
                    styles.selectionContainer,
                    {
                      backgroundColor: theme.CARD_BACKGROUND_COLOR,
                      borderWidth: 1,
                      borderColor:
                        Input.themes.error !== ''
                          ? theme.ERROR_TEXT_COLOR
                          : theme.CARD_BACKGROUND_COLOR,
                      padding: 6,
                    },
                  ]}>
                  <Text
                    style={[
                      styles.selectionText,
                      {color: theme.DIM_TEXT_COLOR},
                    ]}>
                    Choose Themes
                  </Text>
                </View>
              </TouchableOpacity>
              {/* error container  */}
              {Input.themes.error !== '' && (
                <View style={{alignItems: 'center'}}>
                  <Text
                    style={[{color: theme.ERROR_TEXT_COLOR}, styles.errorText]}>
                    {Input.themes.error}
                  </Text>
                </View>
              )}
              {/* show technology container  */}
              {Input.themes.value.length > 0 && (
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginVertical: 5,
                  }}>
                  {Input.themes.value.map(item => (
                    <Text style={{color: theme.TEXT_COLOR}}>{item}</Text>
                  ))}
                </View>
              )}
            </View>
            {/* resources  */}
            <View style={[styles.container, {marginTop: 29}]}>
              <View style={{flexDirection: 'row'}}>
                <View style={[styles.headingContainer, {flex: 0.9}]}>
                  <Text style={[styles.heading, {color: theme.TEXT_COLOR}]}>
                    Resources
                  </Text>
                </View>
                <TouchableOpacity onPress={() => handleAddResources()}>
                  <View style={{flex: 0.1}}>
                    <PlusCircle color={theme.GREEN_COLOR} />
                  </View>
                </TouchableOpacity>
              </View>
              <HelpText
                text={
                  'List any resources that you want to provide to participants such as link to any tutorial, blog, resource tools, helping material or anything that might be useful for the participants'
                }
              />
              {Input.resources.map((res, index) => (
                <View style={{flexDirection: 'row'}}>
                  <View style={[styles.inputContainer]}>
                    <CustomTextField
                      defaultValue={res.value}
                      keyboardType={'default'}
                      onChangeText={text => {
                        const state = [...Input.resources];
                        state[index].value = text;
                        state[index].error = '';
                        setInput(props => {
                          return {
                            ...props,
                            resources: state,
                          };
                        });
                      }}
                      placeholder={'Enter a resource'}
                      placeholderColor={theme.PLACE_HOLDER_TEXT_COLOR}
                      textContentType={'name'}
                      maxLength={60}
                      showLength
                      error={Input.resources[index].error}
                    />
                  </View>
                  {Input.resources.length > 0 && index !== 0 && (
                    <View
                      style={[styles.deleteTextFieldContainer, styles.center]}>
                      <TouchableOpacity onPress={() => removeResource(index)}>
                        <Cross color={theme.ERROR_TEXT_COLOR} />
                      </TouchableOpacity>
                    </View>
                  )}
                </View>
              ))}
            </View>
            {/* rules  */}
            <View style={styles.container}>
              <View style={{flexDirection: 'row'}}>
                <View style={[styles.headingContainer, {flex: 0.9}]}>
                  <Text style={[styles.heading, {color: theme.TEXT_COLOR}]}>
                    Rules
                  </Text>
                </View>
                <TouchableOpacity onPress={() => handleAddRules()}>
                  <View style={[{flex: 0.1}]}>
                    <PlusCircle color={theme.GREEN_COLOR} />
                  </View>
                </TouchableOpacity>
              </View>
              <HelpText
                text={'Clearly mention all the rules for the hackahton.'}
              />
              {Input.rules.map((rule, index) => (
                <View style={{flexDirection: 'row'}}>
                  <View style={[styles.inputContainer]}>
                    <CustomTextField
                      defaultValue={rule.value}
                      keyboardType={'default'}
                      onChangeText={text => {
                        const state = [...Input.rules];
                        state[index].value = text;
                        state[index].error = '';
                        setInput(props => {
                          return {
                            ...props,
                            rules: state,
                          };
                        });
                      }}
                      placeholder={'Enter a rule'}
                      placeholderColor={theme.PLACE_HOLDER_TEXT_COLOR}
                      textContentType={'name'}
                      maxLength={60}
                      showLength
                      error={Input.rules[index].error}
                    />
                  </View>
                  {Input.rules.length > 0 && index !== 0 && (
                    <View
                      style={[styles.deleteTextFieldContainer, styles.center]}>
                      <TouchableOpacity onPress={() => removeRules(index)}>
                        <Cross color={theme.ERROR_TEXT_COLOR} />
                      </TouchableOpacity>
                    </View>
                  )}
                </View>
              ))}
            </View>
            {/* submission requirements  */}
            <View style={styles.container}>
              <View style={styles.headingContainer}>
                <Text style={[styles.heading, {color: theme.TEXT_COLOR}]}>
                  Submission Requirement
                </Text>
              </View>
              <HelpText
                text={
                  'Clearly tell participants what they need to build for this hackathon.'
                }
              />
              <View style={styles.inputContainer}>
                <CustomTextField
                  defaultValue={Input.submission.value}
                  keyboardType={'default'}
                  onChangeText={text =>
                    setInput(props => {
                      return {
                        ...props,
                        submission: {
                          value: text,
                          error: '',
                        },
                      };
                    })
                  }
                  placeholder={'Enter submission requirements'}
                  placeholderColor={theme.PLACE_HOLDER_TEXT_COLOR}
                  textContentType={'name'}
                  multiLine={true}
                  maxLength={150}
                  showLength
                  error={Input.submission.error}
                />
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

export default General;

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
  center: {
    justifyContent: 'center',
    alignItems: 'center',
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
  headingContainer: {
    marginVertical: 2,
  },
  heading: {
    fontSize: Sizes.normal * 1.1,
  },
  inputContainer: {
    marginTop: 4,
  },
  deleteTextFieldContainer: {
    marginLeft: 10,
    marginBottom: 10,
  },
  checkBoxContainer: {
    marginTop: 10,
    marginLeft: 5,
    flexDirection: 'row',
  },
  checkBoxText: {
    fontSize: Sizes.normal * 0.8,
  },
  teamInputContainer: {
    marginLeft: Width * 0.04,
    marginTop: 4,
    flexDirection: 'row',
  },
  teamTextContainer: {
    justifyContent: 'center',
    marginHorizontal: 10,
  },
  errorText: {
    fontSize: Sizes.small,
  },
});
