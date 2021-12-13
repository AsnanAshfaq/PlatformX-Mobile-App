/* eslint-disable react-native/no-inline-styles */
import React, {FC, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  FlatList,
  ToastAndroid,
} from 'react-native';
import CustomHeader from '../../../Components/CustomHeader';
import CustomTextField from '../../../Components/CustomTextField2';
import HelpText from '../../../Components/HelpText';
import {Calendar, Cross, PlusCircle} from '../../../Components/Icons';
import {Height, Sizes, Width} from '../../../Constants/Size';
import {useStateValue} from '../../../Store/StateProvider';
import CheckBox from '../../../Components/CheckBox';
import CustomButton from '../../../Components/CustomButton';
import FormHandler from '../../../Utils/FormHandler';
import Axios from '../../../Utils/Axios';
import DateTimePicker from '../../../Components/DateTimePicker';
import Create from '../../../Modals/Internship/Create';

type props = {
  navigation: any;
  route: any;
};

const CreateEdit: FC<props> = ({navigation, route}) => {
  const {theme} = useStateValue()[0];
  const {method}: {method: 'edit' | 'create'} = route.params;
  const [InternshipID, setInternshipID] = useState('');
  const [Input, setInput] = useState({
    name: {value: '', error: ''},
    description: {value: '', error: ''},
    skills: [
      {
        value: '',
        error: '',
      },
    ],
    responsibilities: [
      {
        value: '',
        error: '',
      },
    ],
    duration: {value: 1, error: ''},
    end_date: {value: new Date(), error: ''},
    learning_outcome: {value: '', error: ''},
    isPaid: {value: true},
    stipend: {value: '', error: ''},
  });
  const [loading, setloading] = useState(false);
  const [modal, setmodal] = useState({
    date: false,
    createEdit: false,
  });
  const {isEmpty} = FormHandler();

  const handleAddSkills = () => {
    if (Input.skills[Input.skills.length - 1].value === '') {
      const state = [...Input.skills];
      state[Input.skills.length - 1].error = 'Fill this field first';
      setInput(props => {
        return {
          ...props,
          skills: state,
        };
      });
    } else {
      // append take away in the array
      const state = [...Input.skills];
      state.push({
        value: '',
        error: '',
      });
      setInput(props => {
        return {
          ...props,
          skills: state,
        };
      });
    }
  };

  const handleRemoveSkills = index => {
    const state = [...Input.skills];
    state.splice(index, 1);
    setInput(props => {
      return {
        ...props,
        skills: state,
      };
    });
  };

  const handleRemoveResponsibilities = index => {
    const state = [...Input.responsibilities];
    state.splice(index, 1);
    setInput(props => {
      return {
        ...props,
        responsibilities: state,
      };
    });
  };

  const handleAddResponsibilities = () => {
    if (
      Input.responsibilities[Input.responsibilities.length - 1].value === ''
    ) {
      const state = [...Input.responsibilities];
      state[Input.responsibilities.length - 1].error = 'Fill this field first';
      setInput(props => {
        return {
          ...props,
          responsibilities: state,
        };
      });
    } else {
      // append take away in the array
      const state = [...Input.responsibilities];
      state.push({
        value: '',
        error: '',
      });
      setInput(props => {
        return {
          ...props,
          responsibilities: state,
        };
      });
    }
  };

  const handleSave = () => {
    var isAllInputValid = true;
    const x = Input;
    setloading(true);
    if (isEmpty(Input.name.value)) {
      isAllInputValid = false;
      x['name']['error'] = 'Name is required.';
    }
    if (isEmpty(Input.description.value)) {
      isAllInputValid = false;
      x['description']['error'] = 'Description is required.';
    }
    if (Input.skills[Input.skills.length - 1].value === '') {
      isAllInputValid = false;
      x['skills'][Input.skills.length - 1]['error'] = 'This field is required.';
    }
    if (
      Input.responsibilities[Input.responsibilities.length - 1].value === ''
    ) {
      isAllInputValid = false;
      x['responsibilities'][Input.responsibilities.length - 1]['error'] =
        'This field is required.';
    }
    if (Input.isPaid.value && Input.stipend.value === '') {
      isAllInputValid = false;
      x['stipend']['error'] = 'Invalid stipend value.';
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
    }

    setInput(props => {
      return {
        ...x,
      };
    });

    if (isAllInputValid) {
      var date = Input.end_date.value;
      const end_date =
        date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();

      const getSkills = () => {
        const skills: Array<string> = [];
        for (let i = 0; i < Input.skills.length; i++) {
          skills.push(Input.skills[i].value);
        }
        return skills;
      };

      const getRes = () => {
        const res: Array<string> = [];
        for (let i = 0; i < Input.responsibilities.length; i++) {
          res.push(Input.responsibilities[i].value);
        }
        return res;
      };

      const skills = getSkills();
      const responsibilites = getRes();

      Axios.post('/api/internship/create/', {
        name: Input.name.value.trim(),
        description: Input.description.value.trim(),
        skills: skills,
        responsibilities: responsibilites,
        duration: Input.duration.value,
        is_paid: Input.isPaid.value,
        end_date: end_date,
        stipend: Input.stipend.value,
      })
        .then(response => {
          if (response.status === 201) {
            ToastAndroid.show(response.data.success, 1500);
            setmodal(props => {
              return {
                ...props,
                createEdit: true,
              };
            });
          }
          setloading(false);
        })
        .catch(error => {
          setloading(false);
          if (error.response) {
            ToastAndroid.show(error.response.data.error, 1500);
          }
          return error.response;
        });
    } else {
      setloading(false);
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
      <CustomHeader
        title={'Host Internship'}
        navigation={navigation}
        back
        onBackPress={() => navigation.goBack()}
      />

      <Create
        isShow={modal.createEdit}
        method={method}
        toggleModal={() => {
          setmodal(props => {
            return {
              ...props,
              createEdit: false,
            };
          });
          setTimeout(() => {
            navigation.goBack();
          }, 700);
        }}
      />

      {/* date picker  */}
      <DateTimePicker
        open={modal.date}
        date={new Date()}
        mode={'date'}
        setDate={response => {
          // hide modal first
          setmodal(props => {
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
          setmodal(props => {
            return {
              ...props,
              date: false,
            };
          })
        }
      />

      <ScrollView>
        <View style={styles.scroll}>
          {/* name container  */}
          <View style={styles.container}>
            <View style={styles.headingContainer}>
              <Text style={[styles.heading, {color: theme.TEXT_COLOR}]}>
                Name{' '}
              </Text>
            </View>
            <HelpText text={'Provide name of the internship.'} />
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
                placeholder={'Looking for Django Intern....'}
                placeholderColor={theme.PLACE_HOLDER_TEXT_COLOR}
                textContentType={'name'}
                maxLength={30}
                showLength
                error={Input.name.error}
              />
            </View>
          </View>
          {/* description container  */}
          <View style={styles.container}>
            <View style={styles.headingContainer}>
              <Text style={[styles.heading, {color: theme.TEXT_COLOR}]}>
                Description{' '}
              </Text>
            </View>
            <HelpText text={'Provide description of the internship.'} />
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
                placeholder={'Enter description for the internship'}
                placeholderColor={theme.PLACE_HOLDER_TEXT_COLOR}
                textContentType={'name'}
                maxLength={150}
                multiLine
                showLength
                error={Input.description.error}
              />
            </View>
          </View>
          {/* skills container  */}
          <View style={styles.container}>
            <View style={{flexDirection: 'row'}}>
              <View style={[styles.headingContainer, {flex: 0.9}]}>
                <Text style={[styles.heading, {color: theme.TEXT_COLOR}]}>
                  Skills
                </Text>
              </View>
              <TouchableOpacity onPress={() => handleAddSkills()}>
                <View style={{flex: 0.1}}>
                  <PlusCircle color={theme.GREEN_COLOR} />
                </View>
              </TouchableOpacity>
            </View>
            <HelpText text={'Provide skills required for this internship.'} />
            {Input.skills.map((skill, index) => (
              <View style={{flexDirection: 'row'}}>
                <View style={[styles.inputContainer]}>
                  <CustomTextField
                    defaultValue={skill.value}
                    keyboardType={'default'}
                    onChangeText={text => {
                      const state = [...Input.skills];
                      state[index].value = text;
                      state[index].error = '';
                      setInput(props => {
                        return {
                          ...props,
                          skills: state,
                        };
                      });
                    }}
                    placeholder={'Enter a skill'}
                    placeholderColor={theme.PLACE_HOLDER_TEXT_COLOR}
                    textContentType={'name'}
                    maxLength={60}
                    showLength
                    error={Input.skills[index].error}
                  />
                </View>
                {Input.skills.length > 0 && index !== 0 && (
                  <View
                    style={[styles.deleteTextFieldContainer, styles.center]}>
                    <TouchableOpacity onPress={() => handleRemoveSkills(index)}>
                      <Cross color={theme.ERROR_TEXT_COLOR} />
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            ))}
          </View>

          {/* responsibilites  */}
          <View style={styles.container}>
            <View style={{flexDirection: 'row'}}>
              <View style={[styles.headingContainer, {flex: 0.9}]}>
                <Text style={[styles.heading, {color: theme.TEXT_COLOR}]}>
                  Responsibilites
                </Text>
              </View>
              <TouchableOpacity onPress={() => handleAddResponsibilities()}>
                <View style={{flex: 0.1}}>
                  <PlusCircle color={theme.GREEN_COLOR} />
                </View>
              </TouchableOpacity>
            </View>
            <HelpText text={'Provide responsibilities for the internee.'} />
            {Input.responsibilities.map((res, index) => (
              <View style={{flexDirection: 'row'}}>
                <View style={[styles.inputContainer]}>
                  <CustomTextField
                    defaultValue={res.value}
                    keyboardType={'default'}
                    onChangeText={text => {
                      const state = [...Input.responsibilities];
                      state[index].value = text;
                      state[index].error = '';
                      setInput(props => {
                        return {
                          ...props,
                          responsibilities: state,
                        };
                      });
                    }}
                    placeholder={'Enter a responsibility'}
                    placeholderColor={theme.PLACE_HOLDER_TEXT_COLOR}
                    textContentType={'name'}
                    maxLength={60}
                    showLength
                    error={Input.responsibilities[index].error}
                  />
                </View>
                {Input.responsibilities.length > 0 && index !== 0 && (
                  <View
                    style={[styles.deleteTextFieldContainer, styles.center]}>
                    <TouchableOpacity
                      onPress={() => handleRemoveResponsibilities(index)}>
                      <Cross color={theme.ERROR_TEXT_COLOR} />
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            ))}
          </View>
          {/* duration container  */}
          <View style={styles.container}>
            <View style={styles.headingContainer}>
              <Text style={[styles.heading, {color: theme.TEXT_COLOR}]}>
                Duration{' '}
                <Text style={[styles.smallText, {color: theme.DIM_TEXT_COLOR}]}>
                  (in months){' '}
                </Text>
              </Text>
            </View>
            <HelpText text={'How long is the internship period?'} />
            <View style={styles.inputContainer}>
              <CustomTextField
                defaultValue={Input.duration.value}
                keyboardType={'numeric'}
                onChangeText={text =>
                  setInput(props => {
                    return {
                      ...props,
                      duration: {
                        value: text,
                        error: '',
                      },
                    };
                  })
                }
                placeholder={'1'}
                placeholderColor={theme.PLACE_HOLDER_TEXT_COLOR}
                textContentType={'name'}
                error={Input.duration.error}
                maxLength={1}
                width={Width * 0.2}
              />
            </View>
          </View>

          {/* paid  */}
          <View style={styles.container}>
            <View style={[styles.headingContainer, {flexDirection: 'row'}]}>
              <CheckBox
                onPress={isChecked =>
                  setInput(props => {
                    return {
                      ...props,
                      isPaid: {
                        value: !props.isPaid.value,
                      },
                    };
                  })
                }
                size={18}
                disableBuiltInState={true}
                isChecked={Input.isPaid.value}
              />
              <Text style={[styles.heading, {color: theme.TEXT_COLOR}]}>
                Paid
              </Text>
            </View>
            <HelpText
              text={'Uncheck if you want to host a non-paid internship.'}
            />
            {Input.isPaid.value && (
              <View style={[styles.subHeadingContainer]}>
                <View style={[styles.headingContainer, {flexDirection: 'row'}]}>
                  <Text style={[styles.subHeading, {color: theme.TEXT_COLOR}]}>
                    Stipend
                  </Text>
                </View>
                <CustomTextField
                  defaultValue={Input.stipend.value}
                  keyboardType={'numeric'}
                  onChangeText={text =>
                    setInput(props => {
                      return {
                        ...props,
                        stipend: {
                          value: text,
                          error: '',
                        },
                      };
                    })
                  }
                  placeholder={'Rs 0'}
                  placeholderColor={theme.PLACE_HOLDER_TEXT_COLOR}
                  textContentType={'streetAddressLine2'}
                  maxLength={5}
                  error={Input.stipend.error}
                  width={Width * 0.2}
                  height={Width * 0.13}
                />
              </View>
            )}
          </View>

          <View style={styles.container}>
            <View style={[styles.headingContainer]}>
              <Text style={[styles.heading, {color: theme.TEXT_COLOR}]}>
                Last Date
              </Text>
            </View>
            <HelpText text={'Specify last date to apply for this project.'} />
            <View style={styles.center}>
              <TouchableOpacity
                onPress={() =>
                  setmodal(props => {
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
                    style={[{color: theme.ERROR_TEXT_COLOR}, styles.errorText]}>
                    {Input.end_date.error}
                  </Text>
                </View>
              )}
            </View>
          </View>
        </View>
      </ScrollView>
      <CustomButton text={'Save'} onPress={handleSave} loading={loading} />
    </View>
  );
};

export default CreateEdit;

const styles = StyleSheet.create({
  parent: {
    flex: 1,
  },
  screenName: {
    fontSize: Sizes.normal * 1.1,
  },
  scroll: {
    marginHorizontal: Width * 0.04,
  },
  container: {
    marginTop: 10,
  },
  headingContainer: {
    marginVertical: 2,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    fontSize: Sizes.normal * 1.1,
  },
  inputContainer: {
    marginTop: 4,
  },
  smallText: {
    fontSize: Sizes.small,
  },
  normalText: {
    fontSize: Sizes.normal,
  },
  subHeadingContainer: {
    marginTop: 5,
    marginLeft: 10,
  },
  subHeading: {
    fontSize: Sizes.normal * 0.9,
  },
  deleteTextFieldContainer: {
    marginLeft: 10,
    marginBottom: 10,
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
  errorText: {
    fontSize: Sizes.small,
  },
});
