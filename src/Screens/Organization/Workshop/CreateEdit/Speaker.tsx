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
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Image,
} from 'react-native';
import CustomButton from '../../../../Components/CustomButton';
import CustomTextField from '../../../../Components/CustomTextField2';
import {Height, Sizes, Width} from '../../../../Constants/Size';
import {useStateValue} from '../../../../Store/StateProvider';
import HelpText from '../../../../Components/HelpText';
import {
  Camera,
  Cross,
  Github,
  LinkedIn,
  PlusCircle,
  Twitter,
} from '../../../../Components/Icons';
import ImagePicker from 'react-native-image-crop-picker';
import FormHandler from '../../../../Utils/FormHandler';

type props = {
  method: string;
  data: any;
  setSpeakerData: (data: any) => void;
  movePage: (index) => void;
};
const Speaker: FC<props> = ({method, data, setSpeakerData, movePage}) => {
  const {theme} = useStateValue()[0];

  const [Input, setInput] = useState({
    name: {value: '', error: ''},
    about: {value: '', error: ''},
    email: {value: '', error: ''},
    image: {value: '', error: '', file: {}},
    social_links: {
      github: {value: '', error: ''},
      linked_in: {value: '', error: ''},
      twitter: {value: '', error: ''},
    },
  });
  const [loading, setLoading] = useState(false);
  const {isEmpty, isEmailValid, isLinkValid} = FormHandler();
  useEffect(() => {
    if (method === 'edit') {
      setLoading(true);
      const x = Input;
      x['name']['value'] = data.name;
      x['email']['value'] = data.email;
      x['image']['value'] = data.image;
      x['about']['value'] = data.about;

      setInput(props => {
        return {
          ...props,
          ...x,
        };
      });
      setLoading(false);
    }
  }, [loading, method, data]);

  const unSelectImage = () => {
    const x = Input;
    x['image']['value'] = '';
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
      x['image']['value'] = image.path;
      x['image']['error'] = '';
      x['image']['file'] = {
        uri: image.path,
        type: image.mime,
        name: image.path.replace(
          'file:///data/user/0/com.platformx/cache/react-native-image-crop-picker/', // replace path with empty string
          '',
        ),
      };
      setInput(props => {
        return {...x};
      });
    });
  };
  const handleSave = () => {
    const x = Input;
    let isAllInputValid = true;

    if (isEmpty(Input.name.value)) {
      x['name']['error'] = 'Name is required.';
      isAllInputValid = false;
    }

    if (isEmpty(Input.about.value)) {
      x['about']['error'] = 'About is required.';
      isAllInputValid = false;
    }

    if (isEmpty(Input.email.value)) {
      x['email']['error'] = 'Email is required.';
      isAllInputValid = false;
    } else if (!isEmailValid(Input.email.value)) {
      x['email']['error'] = 'Email is not valid';
      isAllInputValid = false;
    }
    if (isEmpty(Input.image.value)) {
      x['image']['error'] = 'Image is required.';
      isAllInputValid = false;
    }

    if (isEmpty(Input.social_links.linked_in.value)) {
      x['social_links']['linked_in']['error'] = 'Address is required.';
      isAllInputValid = false;
    } else if (!isLinkValid(Input.social_links.linked_in.value)) {
      x['social_links']['linked_in']['error'] = 'Address is not valid.';
      isAllInputValid = false;
    }

    if (isEmpty(Input.social_links.github.value)) {
      x['social_links']['github']['error'] = 'Address is required.';
      isAllInputValid = false;
    } else if (!isLinkValid(Input.social_links.github.value)) {
      x['social_links']['github']['error'] = 'Address is not valid.';
      isAllInputValid = false;
    }

    if (isEmpty(Input.social_links.twitter.value)) {
      x['social_links']['twitter']['error'] = 'Address is required.';
      isAllInputValid = false;
    } else if (!isLinkValid(Input.social_links.twitter.value)) {
      x['social_links']['twitter']['error'] = 'Address is not valid.';
      isAllInputValid = false;
    }

    setInput(props => {
      return {
        ...x,
      };
    });

    if (isAllInputValid) {
      setSpeakerData(Input);
      movePage(2);
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
            {/* name container  */}
            <View style={styles.container}>
              <View style={[styles.headingContainer, {flex: 0.9}]}>
                <Text style={[styles.heading, {color: theme.TEXT_COLOR}]}>
                  Name{' '}
                </Text>
              </View>
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
                  placeholder={`Enter speaker${"'s"} name`}
                  placeholderColor={theme.PLACE_HOLDER_TEXT_COLOR}
                  textContentType={'name'}
                  maxLength={30}
                  showLength
                  error={Input.name.error}
                />
              </View>
            </View>
            {/* about container  */}
            <View style={styles.container}>
              <View style={[styles.headingContainer]}>
                <Text style={[styles.heading, {color: theme.TEXT_COLOR}]}>
                  About{' '}
                </Text>
              </View>
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
                  placeholder={`Enter something about speaker`}
                  placeholderColor={theme.PLACE_HOLDER_TEXT_COLOR}
                  textContentType={'name'}
                  maxLength={100}
                  showLength
                  error={Input.about.error}
                />
              </View>
            </View>
            {/* email container  */}
            <View style={styles.container}>
              <View style={[styles.headingContainer]}>
                <Text style={[styles.heading, {color: theme.TEXT_COLOR}]}>
                  Email{' '}
                </Text>
              </View>
              <View style={styles.inputContainer}>
                <CustomTextField
                  defaultValue={Input.email.value}
                  keyboardType={'email-address'}
                  onChangeText={text =>
                    setInput(props => {
                      return {
                        ...props,
                        email: {
                          value: text,
                          error: '',
                        },
                      };
                    })
                  }
                  placeholder={`Enter speaker's email address`}
                  placeholderColor={theme.PLACE_HOLDER_TEXT_COLOR}
                  textContentType={'name'}
                  maxLength={30}
                  error={Input.email.error}
                />
              </View>
            </View>
            {/* image  */}
            <View style={styles.container}>
              <View style={styles.headingContainer}>
                <Text style={[styles.heading, {color: theme.TEXT_COLOR}]}>
                  Image
                </Text>
              </View>
              <>
                <TouchableOpacity
                  style={[
                    styles.imageCardContainer,
                    {
                      backgroundColor: theme.CARD_BACKGROUND_COLOR,
                      height: Input.image.value === '' ? Height * 0.15 : 'auto',
                      paddingTop: Input.image.value ? 10 : 0,
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
                    {Input.image.value !== '' && (
                      <View style={styles.imageContainer}>
                        <TouchableOpacity
                          style={styles.crossContainer}
                          onPress={() => unSelectImage()}>
                          <Cross color={theme.GREEN_COLOR} size={0.9} />
                        </TouchableOpacity>
                        <Image
                          source={{uri: Input.image.value}}
                          style={styles.image}
                        />
                      </View>
                    )}
                  </View>
                </TouchableOpacity>
                {Input.image.error !== '' && (
                  <View style={{alignItems: 'center'}}>
                    <Text
                      style={[
                        styles.errorText,
                        {color: theme.ERROR_TEXT_COLOR},
                      ]}>
                      {Input.image.error}
                    </Text>
                  </View>
                )}
              </>
            </View>
            {/* social links  */}
            <View style={styles.container}>
              <View style={[styles.headingContainer]}>
                <Text style={[styles.heading, {color: theme.TEXT_COLOR}]}>
                  Social links{' '}
                </Text>
                <HelpText text={'Provide social links of the speaker.'} />
              </View>
            </View>

            {/* links input container  */}
            <View style={[styles.container, {flexDirection: 'row'}]}>
              <View style={styles.socialIconContainer}>
                <LinkedIn size={1.5} />
              </View>
              <View style={styles.socialLinkInputContainer}>
                <CustomTextField
                  defaultValue={Input.social_links.linked_in.value}
                  keyboardType={'default'}
                  onChangeText={text =>
                    setInput(props => {
                      return {
                        ...props,
                        social_links: {
                          ...props.social_links,
                          linked_in: {
                            value: text,
                            error: '',
                          },
                        },
                      };
                    })
                  }
                  placeholder={'LinkedIn Address'}
                  placeholderColor={theme.PLACE_HOLDER_TEXT_COLOR}
                  textContentType={'emailAddress'}
                  error={Input.social_links.linked_in.error}
                  width={Width * 0.5}
                  height={Width * 0.115}
                />
              </View>
            </View>
            <View style={[styles.container, {flexDirection: 'row'}]}>
              <View style={styles.socialIconContainer}>
                <Twitter size={1.5} />
              </View>
              <View style={styles.socialLinkInputContainer}>
                <CustomTextField
                  defaultValue={Input.social_links.twitter.value}
                  keyboardType={'default'}
                  onChangeText={text =>
                    setInput(props => {
                      return {
                        ...props,
                        social_links: {
                          ...props.social_links,
                          twitter: {
                            value: text,
                            error: '',
                          },
                        },
                      };
                    })
                  }
                  placeholder={'Twitter Address'}
                  placeholderColor={theme.PLACE_HOLDER_TEXT_COLOR}
                  textContentType={'emailAddress'}
                  error={Input.social_links.twitter.error}
                  width={Width * 0.5}
                  height={Width * 0.115}
                />
              </View>
            </View>
            <View style={[styles.container, {flexDirection: 'row', flex: 1}]}>
              <View style={styles.socialIconContainer}>
                <Github size={1.5} />
              </View>
              <View style={styles.socialLinkInputContainer}>
                <CustomTextField
                  defaultValue={Input.social_links.github.value}
                  keyboardType={'default'}
                  onChangeText={text =>
                    setInput(props => {
                      return {
                        ...props,
                        social_links: {
                          ...props.social_links,
                          github: {
                            value: text,
                            error: '',
                          },
                        },
                      };
                    })
                  }
                  placeholder={'Github Address'}
                  placeholderColor={theme.PLACE_HOLDER_TEXT_COLOR}
                  textContentType={'emailAddress'}
                  error={Input.social_links.linked_in.error}
                  width={Width * 0.5}
                  height={Width * 0.115}
                />
              </View>
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

export default Speaker;

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
  inputContainer: {
    marginTop: 4,
  },
  imageCardContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    marginHorizontal: Width * 0.15,
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
    width: Width * 0.5,
    height: Width * 0.5,
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
  socialIconContainer: {
    flex: 0.23,
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    paddingTop: 5,
    marginHorizontal: 10,
  },
  socialLinkInputContainer: {
    flex: 0.77,
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginLeft: 10,
  },
});
