/* eslint-disable dot-notation */
// TODO:
// Personal Informatoion
// first name (done)
// last name (done)
// username (done)
// bio (done)
// date of birth (done)   (calendar)
// phone number (done)
// Profile Information
// skills (done)
// interests (done)
// lives in (done)
// education (done)
// Social Handle
// linkedIN
// github
// portfolio
// twitter
// joined Date (not editable)
// About PlatformX

import React, {FC, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import CustomButton from '../../../Components/CustomButton';
import CustomHeader from '../../../Components/CustomHeader';
import CustomTextField from '../../../Components/CustomTextField2';
import Loading from '../../../Components/Loading';
import {Sizes, Width} from '../../../Constants/Size';
import InterestModal from '../../../Modals/InterestsModal';
import {useStateValue} from '../../../Store/StateProvider';
import axios from '../../../Utils/Axios';
import FormHandler from '../../../Utils/FormHandler';
import DateTimePicker from '../../../Components/DateTimePicker';
import {Calendar} from '../../../Components/Icons';
import SkillsModal from '../../../Modals/SkillsModal';

type Props = {
  label: string;
  placeholder: string;
  keyboardType: any;
  inputValue: any;
  error: string;
  isRequired?: boolean;
  maxLength?: number;
  showLength?: boolean;
  onInputChange: (text: any) => void;
};
const CommonView: FC<Props> = ({
  label,
  inputValue,
  placeholder,
  keyboardType,
  error,
  maxLength,
  showLength = false,
  isRequired = false,
  onInputChange,
}) => {
  const [state, dispatch] = useStateValue();
  const {theme} = state;
  return (
    <>
      <View
        style={[
          styles.labelContainer,
          {
            backgroundColor: theme.SCREEN_BACKGROUND_COLOR,
            borderBottomColor: theme.SHADOW_COLOR,
          },
        ]}>
        <Text
          style={[
            styles.label,
            {
              color: theme.TEXT_COLOR,
            },
          ]}>
          {label}{' '}
          {isRequired === true && (
            <Text style={{color: theme.GREEN_COLOR}}> *</Text>
          )}
        </Text>
      </View>
      <View style={styles.center}>
        <CustomTextField
          defaultValue={inputValue}
          onChangeText={text => onInputChange(text)}
          placeholder={placeholder}
          textContentType={'name'}
          keyboardType={keyboardType}
          error={error}
          maxLength={maxLength}
          showLength={showLength}
          placeholderColor={theme.PLACE_HOLDER_TEXT_COLOR}
        />
      </View>
    </>
  );
};

type headerProps = {
  heading: string;
};
const Header: FC<headerProps> = ({heading}) => {
  const [{theme}, dispatch] = useStateValue();
  return (
    <View
      style={[
        styles.headingContainer,
        {
          backgroundColor: theme.SCREEN_BACKGROUND_COLOR,
          borderBottomColor: theme.DIVIDER_COLOR,
        },
      ]}>
      <Text
        style={[
          styles.heading,
          {
            color: theme.TEXT_COLOR,
          },
        ]}>
        {heading}
      </Text>
    </View>
  );
};
type props = {
  navigation: any;
  route: any;
};

const ViewProfile: FC<props> = ({navigation, route}) => {
  // get user details from params
  const {user} = route.params;
  const [state, dispatch] = useStateValue();
  console.log('user is', user);

  const [Input, setInput] = useState({
    firstName: {
      value: state.user.firstName !== '' ? state.user.firstName : '',
      error: '',
    },
    lastName: {
      value: state.user.lastName !== '' ? state.user.lastName : '',
      error: '',
    },
    userName: {
      value: state.user.userName !== '' ? state.user.userName : '',
      error: '',
    },
    bio: {value: state.user.bio ? state.user.bio : '', error: ''},
    dateOfBirth: {
      value: state.user.dateOfBirth
        ? new Date(state.user.dateOfBirth)
        : new Date(),
      error: '',
    },
    skills: {value: user.student.skills, error: ''},
    interest: {value: user.student.interests, error: ''},
    livesIn: {value: user?.student?.lives_in, error: ''},
    education: {value: user?.student?.education, error: ''},
    linkedIn: {value: user?.student?.linked_in, error: ''},
    github: {value: user?.student?.github, error: ''},
    twitter: {value: user?.student?.twitter, error: ''},
    portfolio: {value: user?.student?.portfolio, error: ''},
  });

  const [modal, setmodal] = useState({
    skills: false,
    interest: false,
    dateOfBirth: false,
  });

  const [IsLoading, seIsLoading] = useState(false);
  const [editing, setediting] = useState(false);

  const {theme} = state;
  // get some handlers
  const {
    checkLength,
    isEmailValid,
    isEmpty,
    isOnylAlphabets,
    isSame,
    isLinkValid,
    isPhoneNumberValid,
  } = FormHandler();

  const handleInputChange = (key: string, text: any) => {
    const x = Input;
    x[key]['value'] = text;
    x[key]['error'] = '';
    setInput(props => {
      return {
        ...x,
      };
    });
  };

  const handleEditProfile = async () => {
    const y = Input;
    let isInputValid = true;
    // check for urls

    setediting(true);

    const checkURLS = (value: string, key: string) => {
      if (!isEmpty(value) && !isLinkValid(value)) {
        y[key]['error'] = 'Invalid link';
        isInputValid = false;
      } else {
        y[key]['error'] = '';
      }
    };

    checkURLS(Input.linkedIn.value, 'linkedIn');

    checkURLS(Input.github.value, 'github');

    checkURLS(Input.twitter.value, 'twitter');

    checkURLS(Input.portfolio.value, 'portfolio');

    // check for first and last name
    // 5,
    // 14,

    const checkFields = (
      value: string,
      key: string,
      emptyError: string,
      minError: string,
      maxError: string,
    ) => {
      if (isEmpty(value)) {
        y[key]['error'] = emptyError;
        isInputValid = false;
      } else {
        if (key === 'firstName' || key === 'lastName') {
          if (!isOnylAlphabets(value)) {
            y[key]['error'] = `${
              key === 'firstName' ? 'First' : 'Last'
            } Name is invalid`;
            isInputValid = false;
          }
        } else {
          // check length
          const MinMax = checkLength(value, 5, 14);
          if (MinMax === 'min') {
            y[key]['error'] = minError;
            isInputValid = false;
          } else if (MinMax === 'max') {
            y[key]['error'] = maxError;
            isInputValid = false;
          }
        }
      }
    };

    checkFields(
      Input.firstName.value,
      'firstName',
      'First Name cannot be Empty',
      'First Name should be atleast 5 characters.',
      'First Name should be less than 14 characters.',
    );

    checkFields(
      Input.lastName.value,
      'lastName',
      'Last Name cannot be Empty',
      'Last Name should be atleast 5 characters.',
      'Last Name should be less than 14 characters.',
    );

    checkFields(
      Input.userName.value,
      'userName',
      'User Name cannot be Empty',
      'Last Name should be atleast 5 characters.',
      'Last Name should be less than 14 characters.',
    );

    if (!isEmpty(Input.bio.value)) {
      // check length
      const MinMax = checkLength(Input.bio.value, 3, 16);
      if (MinMax === 'min') {
        y['bio']['error'] = 'Bio should be atleast 3 characters.';
        isInputValid = false;
      } else if (MinMax === 'max') {
        y['bio']['error'] = 'Bio should be less than 16 characters.';
        isInputValid = false;
      }
    }

    setInput(props => {
      return {
        ...y,
      };
    });

    if (isInputValid) {
      // make api request

      const data = {
        first_name: Input.firstName.value,
        last_name: Input.lastName.value,
        bio: Input.bio.value,
        date_of_birth: Input.dateOfBirth.value.toISOString().split('T')[0],
        lives_in: Input.livesIn.value,
        education: Input.education.value,
        linked_in: Input.linkedIn.value,
        github: Input.github.value,
        twitter: Input.twitter.value,
        portfolio: Input.portfolio.value,
      };

      if (Input.skills.value.length > 0) {
        data['skills'] = Input.skills.value;
      }

      if (Input.interest.value.length > 0) {
        console.log('Interests are', Input.interest.value);
        data['interests'] = Input.interest.value;
      }
      if (Input.userName.value !== state.user.userName) {
        data['username'] = Input.userName.value;
      }
      try {
        const response = await axios.post('/user/student/edit/', data);
        if (response.status === 201) {
          // update local state
          const userData = {
            firstName: Input.firstName.value.trim(),
            lastName: Input.lastName.value.trim(),
            userName: Input.userName.value.trim(),
            bio: Input.bio.value.trim(),
            dateOfBirth: data['date_of_birth'],
            email: state.user.email,
            profilePic: state.user.profilePic,
          };
          dispatch({type: 'SET_USER', payload: userData});
          ToastAndroid.show(response.data.success, 1500);
          // navigate to old screen
          navigation.goBack();
        } else {
          ToastAndroid.show('Error occured while updating profile', 1500);
        }
      } catch (error: any) {
        if (error.response.data.user_name) {
          setInput(props => {
            return {
              ...props,
              userName: {
                value: props.userName.value,
                error: error.response.data.user_name,
              },
            };
          });
        } else {
          ToastAndroid.show('Error occured while updating profile', 1500);
        }
      }
      setediting(false);
    } else {
      setediting(false);
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
      {/* show modal  */}

      <InterestModal
        isShow={modal.interest}
        toggleModal={() =>
          setmodal(props => {
            return {
              ...props,
              interest: false,
            };
          })
        }
        values={Input.interest.value}
        onSelect={value =>
          setInput(props => {
            return {
              ...props,
              interest: {
                value: value,
                error: '',
              },
            };
          })
        }
      />
      <SkillsModal
        isShow={modal.skills}
        toggleModal={() =>
          setmodal(props => {
            return {
              ...props,
              skills: false,
            };
          })
        }
        values={Input.skills.value}
        onSelect={value =>
          setInput(props => {
            return {
              ...props,
              skills: {
                value: value,
                error: '',
              },
            };
          })
        }
      />

      {/* date modal  */}
      <DateTimePicker
        open={modal.dateOfBirth}
        date={new Date()}
        mode={'date'}
        setDate={response => {
          // hide modal first

          setmodal(props => {
            return {
              ...props,
              dateOfBirth: false,
            };
          });

          const getDate = new Date(response);

          setInput(props => {
            return {
              ...props,
              dateOfBirth: {
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
              dateOfBirth: false,
            };
          })
        }
      />
      <CustomHeader
        title={'Edit Profile'}
        navigation={navigation}
        back
        onBackPress={() => navigation.goBack()}
      />
      <ScrollView>
        <Header heading={'Personal Information'} />
        <CommonView
          label={'First Name'}
          inputValue={Input.firstName.value}
          keyboardType={'default'}
          placeholder={'Enter First Name'}
          onInputChange={text => handleInputChange('firstName', text)}
          error={Input.firstName.error}
          maxLength={14}
          showLength
        />
        <CommonView
          label={'Last Name'}
          inputValue={Input.lastName.value}
          keyboardType={'default'}
          placeholder={'Enter Last Name'}
          onInputChange={text => handleInputChange('lastName', text)}
          error={Input.lastName.error}
          maxLength={14}
          showLength
        />
        <CommonView
          label={'User Name'}
          inputValue={Input.userName.value}
          keyboardType={'default'}
          placeholder={'Enter User Name'}
          onInputChange={text => handleInputChange('userName', text)}
          error={Input.userName.error}
          maxLength={14}
          showLength
        />
        <CommonView
          label={'Bio'}
          inputValue={Input.bio.value}
          keyboardType={'default'}
          placeholder={'Enter Bio'}
          onInputChange={text => handleInputChange('bio', text)}
          error={Input.bio.error}
          maxLength={16}
          showLength
        />

        <View>
          <View
            style={[
              styles.labelContainer,
              {
                backgroundColor: theme.SCREEN_BACKGROUND_COLOR,
                borderBottomColor: theme.SHADOW_COLOR,
              },
            ]}>
            <Text
              style={[
                styles.label,
                {
                  color: theme.TEXT_COLOR,
                },
              ]}>
              Date of Birth
            </Text>
          </View>

          <View style={[styles.center, {marginBottom: 10}]}>
            <TouchableOpacity
              onPress={() =>
                setmodal(props => {
                  return {
                    ...props,
                    dateOfBirth: true,
                  };
                })
              }
              style={[
                styles.cardContainer,
                {
                  backgroundColor: theme.CARD_BACKGROUND_COLOR,
                  borderWidth: 1,
                  borderColor:
                    Input.dateOfBirth.error !== ''
                      ? theme.ERROR_TEXT_COLOR
                      : theme.CARD_BACKGROUND_COLOR,
                  width: Width * 0.65,
                },
              ]}>
              <View style={styles.cardTextContainer}>
                <Text style={[styles.cardText, {color: theme.TEXT_COLOR}]}>
                  {Input.dateOfBirth.value.toLocaleDateString()}
                </Text>
              </View>
              <View style={styles.cardIconContainer}>
                <Calendar size={0.9} color={theme.GREEN_COLOR} />
              </View>
            </TouchableOpacity>
            {Input.dateOfBirth.error !== '' && (
              <View style={{alignItems: 'center'}}>
                <Text
                  style={[{color: theme.ERROR_TEXT_COLOR}, styles.errorText]}>
                  {Input.dateOfBirth.error}
                </Text>
              </View>
            )}
          </View>
        </View>

        <Header heading={'Profile Information'} />

        <View
          style={[
            styles.labelContainer,
            {
              backgroundColor: theme.SCREEN_BACKGROUND_COLOR,
              borderBottomColor: theme.SHADOW_COLOR,
            },
          ]}>
          <Text
            style={[
              styles.label,
              {
                color: theme.TEXT_COLOR,
              },
            ]}>
            Skills
          </Text>
        </View>

        <TouchableOpacity
          onPress={() =>
            setmodal(props => {
              return {
                ...props,
                skills: true,
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
                  Input.skills.error !== ''
                    ? theme.ERROR_TEXT_COLOR
                    : theme.CARD_BACKGROUND_COLOR,
                padding: 6,
              },
            ]}>
            <Text style={[styles.selectionText, {color: theme.DIM_TEXT_COLOR}]}>
              Choose Skills
            </Text>
          </View>
        </TouchableOpacity>
        <View
          style={[
            styles.labelContainer,
            {
              backgroundColor: theme.SCREEN_BACKGROUND_COLOR,
              borderBottomColor: theme.SHADOW_COLOR,
            },
          ]}>
          <Text
            style={[
              styles.label,
              {
                color: theme.TEXT_COLOR,
              },
            ]}>
            Interest
          </Text>
        </View>

        <TouchableOpacity
          onPress={() =>
            setmodal(props => {
              return {
                ...props,
                interest: true,
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
                  Input.interest.error !== ''
                    ? theme.ERROR_TEXT_COLOR
                    : theme.CARD_BACKGROUND_COLOR,
                padding: 6,
              },
            ]}>
            <Text style={[styles.selectionText, {color: theme.DIM_TEXT_COLOR}]}>
              Choose Interests
            </Text>
          </View>
        </TouchableOpacity>

        <CommonView
          label={'Lives In'}
          inputValue={Input.livesIn.value}
          keyboardType={'default'}
          placeholder={'Enter Your Location'}
          onInputChange={text => handleInputChange('livesIn', text)}
          error={Input.livesIn.error}
        />
        <CommonView
          label={'Education'}
          inputValue={Input.education.value}
          keyboardType={'default'}
          placeholder={'Enter Your Education'}
          onInputChange={text => handleInputChange('education', text)}
          error={Input.education.error}
        />
        <Header heading={'Social Handle'} />
        <CommonView
          label={'LinkedIn'}
          inputValue={Input.linkedIn.value}
          keyboardType={'default'}
          placeholder={'Enter LinkedIn URL'}
          onInputChange={text => handleInputChange('linkedIn', text)}
          error={Input.linkedIn.error}
          isRequired={false}
        />
        <CommonView
          label={'Github'}
          inputValue={Input.github.value}
          keyboardType={'default'}
          placeholder={'Enter Github URL'}
          onInputChange={text => handleInputChange('github', text)}
          error={Input.github.error}
          isRequired={false}
        />
        <CommonView
          label={'Twitter'}
          inputValue={Input.twitter.value}
          keyboardType={'default'}
          placeholder={'Enter Twitter URL'}
          onInputChange={text => handleInputChange('twitter', text)}
          error={Input.twitter.error}
          isRequired={false}
        />
        <CommonView
          label={'Portfolio'}
          inputValue={Input.portfolio.value}
          keyboardType={'default'}
          placeholder={'Enter Portfolio URL'}
          onInputChange={text => handleInputChange('portfolio', text)}
          error={Input.portfolio.error}
          isRequired={false}
        />
        {/* joined date contianer */}
        <View style={styles.joinedDateContainer}>
          <Text style={[styles.joinedDateText, {color: theme.DIM_TEXT_COLOR}]}>
            {' '}
            JOINED PLATFORMX ON {new Date(user.date_joined).toDateString()}
          </Text>
        </View>
      </ScrollView>

      <CustomButton
        text={'Edit Profile'}
        onPress={handleEditProfile}
        loading={editing}
      />
    </View>
  );
};

export default ViewProfile;

const styles = StyleSheet.create({
  parent: {
    flex: 1,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  headingContainer: {
    paddingLeft: Width * 0.02,
    paddingVertical: 10,
    width: Width * 0.98,
    padding: 5,
    borderBottomWidth: 1,
    alignItems: 'center',
  },
  heading: {
    fontSize: Sizes.normal * 1.3,
    // fontFamily: 'Cindyrella',
  },
  labelContainer: {
    marginHorizontal: Width * 0.02,
    // marginVertical: 10,
    width: Width * 0.95,
    padding: 5,
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
  label: {
    fontSize: Sizes.normal,
  },
  joinedDateContainer: {
    // marginHorizontal: Width * 0.02,
    // marginVertical: 10,
    // width: Width * 0.95,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
  },
  joinedDateText: {
    fontSize: Sizes.small,
  },
  editButtonContainer: {
    height: Width * 0.14,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 5,
  },
  editButton: {
    width: Width * 0.9,
    height: Width * 0.12,
    justifyContent: 'center',
    borderRadius: 10,
    alignItems: 'center',
  },
  editButtonText: {
    fontSize: Sizes.large,
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
