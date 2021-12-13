/* eslint-disable react-hooks/exhaustive-deps */
import React, {FC, useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  FlatList,
  SafeAreaView,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import CustomButton from '../../../../Components/CustomButton';
import CustomTextField from '../../../../Components/CustomTextField2';
import {Height, Sizes, Width} from '../../../../Constants/Size';
import {useStateValue} from '../../../../Store/StateProvider';
import CheckBox from '../../../../Components/CheckBox';
import {hackathonThemeTags} from '../../../../Constants/sample';
import HelpText from '../../../../Components/HelpText';
import {Camera, Cross, Delete, PlusCircle} from '../../../../Components/Icons';
import ImagePicker from 'react-native-image-crop-picker';
//@ts-ignore
import {BASE_URL} from 'react-native-dotenv';
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
    topic: {value: '', error: ''},
    description: {value: '', error: ''},
    poster: {value: '', error: '', file: {}},
    isPaid: {value: false},
    charges: {value: '', error: ''},
    take_aways: [
      {
        value: '',
        error: '',
      },
    ],
    pre_requisites: [
      {
        value: '',
        error: '',
      },
    ],
  });
  const [loading, setLoading] = useState(false);

  const {isEmpty} = FormHandler();
  const handleSave = () => {
    let isAllInputValid = true;
    const x = Input;
    if (isEmpty(Input.topic.value)) {
      isAllInputValid = false;
      x['topic']['error'] = 'Topic is requried.';
    }
    if (isEmpty(Input.description.value)) {
      isAllInputValid = false;
      x['description']['error'] = 'Description is required.';
    }
    if (isEmpty(Input.poster.value)) {
      isAllInputValid = false;
      x['poster']['error'] = 'Poster is required.';
    }
    if (Input.take_aways[Input.take_aways.length - 1].value === '') {
      isAllInputValid = false;
      x['take_aways'][Input.take_aways.length - 1]['error'] =
        'This field is required.';
    }
    if (Input.pre_requisites[Input.pre_requisites.length - 1].value === '') {
      isAllInputValid = false;
      x['pre_requisites'][Input.pre_requisites.length - 1]['error'] =
        'This field is required.';
    }
    if (Input.isPaid.value && isEmpty(Input.charges.value)) {
      isAllInputValid = false;
      x['charges']['error'] = 'Charges is required.';
    }

    setInput(props => {
      return {
        ...x,
      };
    });

    if (isAllInputValid) {
      setGeneralData(Input);
      movePage(1);
    }
  };

  useEffect(() => {
    if (method === 'edit') {
      setLoading(true);
      const x = Input;
      x['topic']['value'] = data.topic;
      x['description']['value'] = data.description;
      x['poster']['value'] = data.poster;
      x['isPaid']['value'] = data.is_paid;
      x['charges']['value'] = data.charges;

      setInput(props => {
        return {
          ...x,
        };
      });
      setLoading(false);
    }
  }, [loading, method, data]);

  const unSelectImage = () => {
    const x = Input;
    x['poster']['value'] = '';
    setInput(props => {
      return {...x};
    });
  };

  const handleImagePicker = () => {
    ImagePicker.openPicker({
      // width: 300,
      // height: 400,
      cropping: true,
      multiple: false,
      freeStyleCropEnabled: true,
    }).then(image => {
      const x = Input;
      console.log(image);
      x['poster']['value'] = image.path;
      x['poster']['file'] = {
        uri: image.path,
        type: image.mime,
        name: image.path.replace(
          'file:///data/user/0/com.platformx/cache/react-native-image-crop-picker/', // replace path with empty string
          '',
        ),
      };
      x['poster']['error'] = '';
      setInput(props => {
        return {...x};
      });
    });
  };

  const handleAddTakeAway = () => {
    if (Input.take_aways[Input.take_aways.length - 1].value === '') {
      const state = [...Input.take_aways];
      state[Input.take_aways.length - 1].error = 'Fill this field first';
      setInput(props => {
        return {
          ...props,
          take_aways: state,
        };
      });
    } else {
      // append take away in the array
      const state = [...Input.take_aways];
      state.push({
        value: '',
        error: '',
      });
      setInput(props => {
        return {
          ...props,
          take_aways: state,
        };
      });
    }
  };

  const handleRemoveTakeAway = index => {
    const state = [...Input.take_aways];
    state.splice(index, 1);
    setInput(props => {
      return {
        ...props,
        take_aways: state,
      };
    });
  };

  const handleRemovePreReq = index => {
    const state = [...Input.pre_requisites];
    state.splice(index, 1);
    setInput(props => {
      return {
        ...props,
        pre_requisites: state,
      };
    });
  };
  const handleAddPreReq = () => {
    if (Input.pre_requisites[Input.pre_requisites.length - 1].value === '') {
      const state = [...Input.pre_requisites];
      state[Input.pre_requisites.length - 1].error = 'Fill this field first';
      setInput(props => {
        return {
          ...props,
          pre_requisites: state,
        };
      });
    } else {
      // append take away in the array
      const state = [...Input.pre_requisites];
      state.push({
        value: '',
        error: '',
      });
      setInput(props => {
        return {
          ...props,
          pre_requisites: state,
        };
      });
    }
  };
  if (!loading) {
    return (
      <View style={styles.parent}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{flex: 1}}>
          <ScrollView
            style={styles.scroll}
            showsVerticalScrollIndicator={false}
            horizontal={false}>
            {/* topic  */}
            <View style={styles.container}>
              <View style={styles.headingContainer}>
                <Text style={[styles.heading, {color: theme.TEXT_COLOR}]}>
                  Topic
                </Text>
              </View>
              <View style={styles.inputContainer}>
                <CustomTextField
                  defaultValue={Input.topic.value}
                  keyboardType={'default'}
                  onChangeText={text =>
                    setInput(props => {
                      return {
                        ...props,
                        topic: {
                          value: text,
                          error: '',
                        },
                      };
                    })
                  }
                  placeholder={'Enter Workshop Topic'}
                  placeholderColor={theme.PLACE_HOLDER_TEXT_COLOR}
                  textContentType={'name'}
                  maxLength={30}
                  showLength
                  error={Input.topic.error}
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
                  placeholder={'Enter Workshop Description'}
                  placeholderColor={theme.PLACE_HOLDER_TEXT_COLOR}
                  textContentType={'name'}
                  multiLine={true}
                  maxLength={150}
                  showLength
                  error={Input.description.error}
                />
              </View>
            </View>

            {/* poster  */}
            <View style={styles.container}>
              <View style={styles.headingContainer}>
                <Text style={[styles.heading, {color: theme.TEXT_COLOR}]}>
                  Poster
                </Text>
              </View>
              <>
                <TouchableOpacity
                  style={[
                    styles.imageCardContainer,
                    {
                      backgroundColor: theme.CARD_BACKGROUND_COLOR,
                      height:
                        Input.poster.value === '' ? Height * 0.15 : 'auto',
                      paddingTop: Input.poster.value ? 10 : 0,
                      marginHorizontal:
                        Input.poster.value === '' ? Width * 0.15 : Width * 0.05,
                    },
                  ]}
                  activeOpacity={0.5}
                  onPress={() => handleImagePicker()}>
                  <Camera color={theme.GREEN_COLOR} size={1} />
                  <Text
                    style={[styles.imageText, {color: theme.DIM_TEXT_COLOR}]}>
                    Upload Image
                  </Text>
                  <View>
                    {Input.poster.value !== '' && (
                      <View style={styles.imageContainer}>
                        <TouchableOpacity
                          style={styles.crossContainer}
                          onPress={() => unSelectImage()}>
                          <Cross color={theme.GREEN_COLOR} size={0.9} />
                        </TouchableOpacity>
                        <Image
                          source={{
                            uri:
                              method === 'edit'
                                ? BASE_URL + Input.poster.value
                                : Input.poster.value,
                          }}
                          style={styles.image}
                        />
                      </View>
                    )}
                  </View>
                </TouchableOpacity>
                {Input.poster.error !== '' && (
                  <View style={{alignItems: 'center'}}>
                    <Text
                      style={[
                        styles.errorText,
                        {color: theme.ERROR_TEXT_COLOR},
                      ]}>
                      {Input.poster.error}
                    </Text>
                  </View>
                )}
              </>
            </View>

            {/* take away's */}
            <View style={styles.container}>
              <View style={{flexDirection: 'row'}}>
                <View style={[styles.headingContainer, {flex: 0.9}]}>
                  <Text style={[styles.heading, {color: theme.TEXT_COLOR}]}>
                    Take Aways
                  </Text>
                </View>
                <TouchableOpacity onPress={() => handleAddTakeAway()}>
                  <View style={{flex: 0.1}}>
                    <PlusCircle color={theme.GREEN_COLOR} />
                  </View>
                </TouchableOpacity>
              </View>
              <HelpText
                text={
                  'Provide some key points that the participants will learn at the end of this workhsop.'
                }
              />
              {Input.take_aways.map((take_away, index) => (
                <View style={{flexDirection: 'row'}}>
                  <View style={[styles.inputContainer]}>
                    <CustomTextField
                      defaultValue={take_away.value}
                      keyboardType={'default'}
                      onChangeText={text => {
                        const state = [...Input.take_aways];
                        state[index].value = text;
                        state[index].error = '';
                        setInput(props => {
                          return {
                            ...props,
                            take_aways: state,
                          };
                        });
                      }}
                      placeholder={'Enter a take away'}
                      placeholderColor={theme.PLACE_HOLDER_TEXT_COLOR}
                      textContentType={'name'}
                      maxLength={60}
                      showLength
                      error={Input.take_aways[index].error}
                    />
                  </View>
                  {Input.take_aways.length > 0 && index !== 0 && (
                    <View
                      style={[styles.deleteTextFieldContainer, styles.center]}>
                      <TouchableOpacity
                        onPress={() => handleRemoveTakeAway(index)}>
                        <Cross color={theme.ERROR_TEXT_COLOR} />
                      </TouchableOpacity>
                    </View>
                  )}
                </View>
              ))}
            </View>

            {/* pre-requistie  */}
            <View style={styles.container}>
              <View style={{flexDirection: 'row'}}>
                <View style={[styles.headingContainer, {flex: 0.9}]}>
                  <Text style={[styles.heading, {color: theme.TEXT_COLOR}]}>
                    Prerequisites{' '}
                  </Text>
                </View>
                <TouchableOpacity onPress={() => handleAddPreReq()}>
                  <View style={{flex: 0.1}}>
                    <PlusCircle color={theme.GREEN_COLOR} />
                  </View>
                </TouchableOpacity>
              </View>
              <HelpText
                text={'Specify any prerequisites to attend this workshop.'}
              />
              {Input.pre_requisites.map((pre, index) => (
                <View style={{flexDirection: 'row'}}>
                  <View style={[styles.inputContainer]}>
                    <CustomTextField
                      defaultValue={pre.value}
                      keyboardType={'default'}
                      onChangeText={text => {
                        const state = [...Input.pre_requisites];
                        state[index].value = text;
                        state[index].error = '';
                        setInput(props => {
                          return {
                            ...props,
                            pre_requisites: state,
                          };
                        });
                      }}
                      placeholder={'Enter a pre-requisite'}
                      placeholderColor={theme.PLACE_HOLDER_TEXT_COLOR}
                      textContentType={'name'}
                      maxLength={60}
                      showLength
                      error={Input.pre_requisites[index].error}
                    />
                  </View>
                  {Input.pre_requisites.length > 0 && index !== 0 && (
                    <View
                      style={[styles.deleteTextFieldContainer, styles.center]}>
                      <TouchableOpacity
                        onPress={() => handleRemovePreReq(index)}>
                        <Cross color={theme.ERROR_TEXT_COLOR} />
                      </TouchableOpacity>
                    </View>
                  )}
                </View>
              ))}
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
                          value:
                            typeof isChecked === 'undefined'
                              ? false
                              : isChecked,
                        },
                      };
                    })
                  }
                  size={18}
                />
                <Text style={[styles.heading, {color: theme.TEXT_COLOR}]}>
                  Paid
                </Text>
              </View>
              <HelpText text={'Uncheck if you want to host a free workshop.'} />
              {Input.isPaid.value && (
                <View style={[styles.subHeadingContainer]}>
                  <View
                    style={[styles.headingContainer, {flexDirection: 'row'}]}>
                    <Text
                      style={[styles.subHeading, {color: theme.TEXT_COLOR}]}>
                      Charges
                    </Text>
                  </View>
                  <CustomTextField
                    defaultValue={Input.charges.value}
                    keyboardType={'numeric'}
                    onChangeText={text =>
                      setInput(props => {
                        return {
                          ...props,
                          charges: {
                            value: text,
                            error: '',
                          },
                        };
                      })
                    }
                    placeholder={'Rs 0'}
                    placeholderColor={theme.PLACE_HOLDER_TEXT_COLOR}
                    textContentType={'streetAddressLine2'}
                    maxLength={3}
                    error={Input.charges.error}
                    width={Width * 0.2}
                    height={Width * 0.13}
                  />
                </View>
              )}
            </View>
          </ScrollView>
        </KeyboardAvoidingView>

        <CustomButton
          text={'Continue'}
          onPress={handleSave}
          loading={loading}
        />
      </View>
    );
  }
  return null;
};

export default General;

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
  subHeadingContainer: {
    marginTop: 5,
    marginLeft: 10,
  },
  heading: {
    fontSize: Sizes.normal * 1.1,
  },
  subHeading: {
    fontSize: Sizes.normal * 0.9,
  },
  inputContainer: {
    marginTop: 4,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
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
  imageCardContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    // minHeight: Height * 0.14,
    marginTop: 10,
    // width: Width * 0.2,
    borderRadius: 10,
  },
  imageContainer: {
    // width: 60,
    // height: 60,
    paddingVertical: 5,
  },
  image: {
    width: Width * 0.7,
    height: Width * 0.8,
    borderRadius: 10,
    marginVertical: 10,
  },
  imageText: {
    fontSize: Sizes.normal * 0.95,
  },
  crossContainer: {
    position: 'absolute',
    top: -1,
    // top: 4,
    left: -15,
  },
  errorText: {
    fontSize: Sizes.small,
  },
});
