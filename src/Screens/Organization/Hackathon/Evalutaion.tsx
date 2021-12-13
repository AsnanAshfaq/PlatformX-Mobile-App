/* eslint-disable dot-notation */
import React, {FC, useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ScrollView,
  Image,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import CustomHeader from '../../../Components/CustomHeader';
import {Height, Sizes, Width} from '../../../Constants/Size';
import {useStateValue} from '../../../Store/StateProvider';
//@ts-ignore
import {BASE_URL} from 'react-native-dotenv';
import {ForwardArrow, Tick} from '../../../Components/Icons';
import CustomButton from '../../../Components/CustomButton';
import Bullet from '../../../Components/Bullet';
import CustomTextField from '../../../Components/CustomTextField2';
import HelpText from '../../../Components/HelpText';
import {Rating, AirbnbRating} from 'react-native-ratings';
import FormHandler from '../../../Utils/FormHandler';
import axios from '../../../Utils/Axios';

const ICON_SIZE = Width * 0.07;

type categoryProps = {
  heading: string;
  helpText: string;
  input: any;
  error: string;
  onChangeText: (text) => void;
};
const Category: FC<categoryProps> = ({
  heading,
  helpText,
  input,
  error = '',
  onChangeText,
}) => {
  const [{theme}, dispatch] = useStateValue();

  return (
    <View style={[styles.container, {flexDirection: 'row'}]}>
      <View style={styles.categoryContainer}>
        <View style={[styles.categoryHeadingContainer, {flexDirection: 'row'}]}>
          <View style={{flex: 0.1}}>
            <Bullet width={12} height={12} color={theme.GREEN_COLOR} />
          </View>
          <View style={{flex: 0.9}}>
            <Text style={[styles.heading, {color: theme.TEXT_COLOR}]}>
              {heading}
            </Text>
            <View>
              <HelpText text={helpText} />
            </View>
          </View>
        </View>
      </View>
      <View
        style={[
          styles.inputContainer,
          styles.center,
          {flexDirection: 'column'},
        ]}>
        <View style={{flexDirection: 'row'}}>
          <CustomTextField
            defaultValue={input}
            keyboardType={'numeric'}
            onChangeText={text => onChangeText(text)}
            placeholder={'0'}
            placeholderColor={theme.PLACE_HOLDER_TEXT_COLOR}
            textContentType={'telephoneNumber'}
            width={40}
            maxLength={1}
            height={40}
          />
          <View style={[styles.center]}>
            <Text
              style={{
                color: theme.GREEN_COLOR,
                fontSize: Sizes.normal * 1.1,
              }}>
              / 5
            </Text>
          </View>
        </View>
        {error !== '' && (
          <View style={{alignItems: 'flex-start'}}>
            <Text
              style={{fontSize: Sizes.small, color: theme.ERROR_TEXT_COLOR}}>
              {error}
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};

type props = {
  navigation: any;
  route: any;
};
const Evaluation: FC<props> = ({navigation, route}) => {
  const {projectID, hackathonID} = route.params;

  const [submit, setsubmit] = useState(false);

  const [{theme}, dispatch] = useStateValue();

  const [Input, setInput] = useState({
    idea: {value: '', error: ''},
    originality: {value: '', error: ''},
    functionality: {value: '', error: ''},
    design: {value: '', error: ''},
    problem: {value: '', error: ''},
    remarks: {value: '', error: ''},
    rating: 1,
  });

  const {isEmpty} = FormHandler();

  const handleEvalutaion = async () => {
    // checks
    const x = Input;
    let isAllInputValid = true;

    if (isEmpty(Input.idea.value)) {
      x['idea']['error'] = 'Empty';
      isAllInputValid = false;
    }
    if (isEmpty(Input.design.value)) {
      x['design']['error'] = 'Empty';
      isAllInputValid = false;
    }
    if (isEmpty(Input.functionality.value)) {
      x['functionality']['error'] = 'Empty';
      isAllInputValid = false;
    }
    if (isEmpty(Input.originality.value)) {
      x['originality']['error'] = 'Empty';
      isAllInputValid = false;
    }
    if (isEmpty(Input.problem.value)) {
      x['problem']['error'] = 'Empty';
      isAllInputValid = false;
    }

    if (isEmpty(Input.remarks.value)) {
      x['remarks']['error'] = 'Pleave give some remarks.';
      isAllInputValid = false;
    }

    if (Number(Input.idea.value) > 5) {
      x['idea']['error'] = 'Invalid';
      isAllInputValid = false;
    }

    if (Number(Input.design.value) > 5) {
      x['design']['error'] = 'Invalid';
      isAllInputValid = false;
    }

    if (Number(Input.functionality.value) > 5) {
      x['functionality']['error'] = 'Invalid';
      isAllInputValid = false;
    }

    if (Number(Input.originality.value) > 5) {
      x['originality']['error'] = 'Invalid';
      isAllInputValid = false;
    }

    if (Number(Input.problem.value) > 5) {
      x['problem']['error'] = 'Invalid';
      isAllInputValid = false;
    }

    setInput(props => {
      return {
        ...x,
      };
    });

    if (isAllInputValid) {
      // make api request
      setsubmit(true);

      const data = {
        id: projectID,
        idea: Number(Input.idea.value),
        originality: Number(Input.originality.value),
        functionality: Number(Input.functionality.value),
        design: Number(Input.design.value),
        problem: Number(Input.problem.value),
        stars: Number(Input.rating),
        remarks: Input.remarks.value,
      };

      axios
        .post(
          `api/hackathon/${hackathonID}/project/${projectID}/evaluate/`,
          data,
        )
        .then(response => {
          if (response.status === 201) {
            // data has been posted
            ToastAndroid.show(response.data.success, 1500);
            navigation.goBack();
          }
          setsubmit(false);
        })
        .catch(error => {
          setsubmit(false);
          if (error.response) {
            ToastAndroid.show(error.response.data.error, 1500);
          }
          return error.response;
        });
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
        title={'Evaluate'}
        navigation={navigation}
        back
        onBackPress={() => navigation.goBack()}
      />
      <ScrollView>
        <View style={styles.scroll}>
          <View style={styles.container}>
            <View style={[styles.headingContainer]}>
              <Text style={[styles.heading, {color: theme.TEXT_COLOR}]}>
                Start Evaluating hackathon based on following criteria
              </Text>
            </View>
          </View>
          <View style={styles.container}>
            <Category
              input={Input.idea.value}
              onChangeText={text =>
                setInput(props => {
                  return {
                    ...props,
                    idea: {
                      value: text,
                      error: '',
                    },
                  };
                })
              }
              heading={'Idea'}
              helpText={'How impressing is the idea of My First Project was?'}
              error={Input.idea.error}
            />
            <Category
              input={Input.originality.value}
              onChangeText={text =>
                setInput(props => {
                  return {
                    ...props,
                    originality: {
                      value: text,
                      error: '',
                    },
                  };
                })
              }
              heading={'Originality'}
              helpText={`Originality refers to lending one${"'"}s personal uniqueness. So how original is My First Project?`}
              error={Input.originality.error}
            />
            <Category
              input={Input.functionality.value}
              onChangeText={text =>
                setInput(props => {
                  return {
                    ...props,
                    functionality: {
                      value: text,
                      error: '',
                    },
                  };
                })
              }
              heading={'Functionality'}
              helpText={
                'How is My First Project performing the specified task. Does it have the functionality required?'
              }
              error={Input.functionality.error}
            />
            <Category
              input={Input.design.value}
              onChangeText={text =>
                setInput(props => {
                  return {
                    ...props,
                    design: {
                      value: text,
                      error: '',
                    },
                  };
                })
              }
              heading={'Design'}
              helpText={'How good is the actual design of My First Project?'}
              error={Input.design.error}
            />
            <Category
              input={Input.problem.value}
              onChangeText={text =>
                setInput(props => {
                  return {
                    ...props,
                    problem: {
                      value: text,
                      error: '',
                    },
                  };
                })
              }
              heading={'Problem Solving'}
              helpText={'Is My First Project a problem solving project?'}
              error={Input.problem.error}
            />
          </View>

          {/* over all status container  */}
          <View style={styles.container}>
            <View style={styles.headingContainer}>
              <Text style={[styles.heading, {color: theme.TEXT_COLOR}]}>
                Overall Status
              </Text>
            </View>
            <AirbnbRating
              defaultRating={1}
              size={20}
              count={5}
              reviews={['Terrible', 'Bad', 'Fair', 'Good', 'Amazing']}
              reviewSize={Sizes.normal * 1.2}
              reviewColor={theme.TEXT_COLOR}
              selectedColor={theme.GREEN_COLOR}
              onFinishRating={rating =>
                setInput(props => {
                  return {
                    ...props,
                    rating: rating,
                  };
                })
              }
            />
          </View>
          {/* final remarks container  */}
          <View style={styles.container}>
            <View style={styles.headingContainer}>
              <Text style={[styles.heading, {color: theme.TEXT_COLOR}]}>
                Final Remarks
              </Text>
            </View>
            <View style={{marginTop: 4}}>
              <HelpText
                text={
                  'Use this field to provide any final remarks based on your likes and dislikes of the project.'
                }
              />
              <View style={styles.container}>
                <CustomTextField
                  defaultValue={Input.remarks.value}
                  keyboardType={'default'}
                  onChangeText={text =>
                    setInput(props => {
                      return {
                        ...props,
                        remarks: {
                          value: text,
                          error: '',
                        },
                      };
                    })
                  }
                  placeholder={'Enter any remarks for this project'}
                  placeholderColor={theme.PLACE_HOLDER_TEXT_COLOR}
                  textContentType={'name'}
                  multiLine={true}
                  maxLength={100}
                  showLength
                  error={Input.remarks.error}
                />
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      <CustomButton
        text={'Submit'}
        onPress={handleEvalutaion}
        loading={submit}
      />
    </View>
  );
};

export default Evaluation;

const styles = StyleSheet.create({
  parent: {
    flex: 1,
  },
  container: {
    marginTop: 10,
  },
  scroll: {
    marginHorizontal: Width * 0.04,
  },
  headingContainer: {
    // fontSize: Sizes.normal * 1.1,
    marginTop: 10,
  },
  categoryContainer: {
    flex: 0.8,
    flexDirection: 'column',
  },
  heading: {
    fontSize: Sizes.normal * 1.1,
  },
  categoryHeadingContainer: {
    flexDirection: 'row',
  },
  redMark: {},
  inputContainer: {
    flex: 0.2,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
