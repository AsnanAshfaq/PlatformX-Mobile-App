import React, {FC, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  KeyboardAvoidingView,
  TouchableOpacity,
  Platform,
  Image,
} from 'react-native';
import CustomButton from '../../../../../Components/CustomButton';
import CustomTextField from '../../../../../Components/CustomTextField2';
import HelpText from '../../../../../Components/HelpText';
import {Camera, Cross, FileUpload} from '../../../../../Components/Icons';
import {Height, Sizes, Width} from '../../../../../Constants/Size';
import TechnologiesModal from '../../../../../Modals/FYPTechnologiesModal';
import {useStateValue} from '../../../../../Store/StateProvider';
import DocumentPicker from 'react-native-document-picker';
import ImagePicker from 'react-native-image-crop-picker';
import FormHandler from '../../../../../Utils/FormHandler';
type props = {
  method: string;
  data: any;
  submit: boolean;
  setSubmit: (value: boolean) => void;
  handleCreateProject?: (data: any) => void;
};

const Specifications: FC<props> = ({
  method,
  data,
  submit,
  setSubmit,
  handleCreateProject,
}) => {
  const [Input, setInput] = useState({
    built_with: {value: [], error: ''},
    give_it: {value: 'https://github.com/AsnanAshfaq', error: ''},
    video_demo_link: {value: '', error: ''},
    media: {
      value: {
        name: '',
        uri: '',
      },
      file: {},
      error: '',
    },
    logo: {value: '', error: '', file: {}},
  });
  const [modals, setmodals] = useState({
    tech: false,
  });
  const {theme} = useStateValue()[0];
  const {isEmpty, isLinkValid} = FormHandler();
  const handleSave = () => {
    let isAllInputValid = true;
    const x = Input;

    if (Input.built_with.value.length === 0) {
      x['built_with']['error'] = 'Please select any technology.';
      isAllInputValid = false;
    }
    if (isEmpty(Input.give_it.value)) {
      x['give_it']['error'] = 'URL is required.';
      isAllInputValid = false;
    } else if (!isLinkValid(Input.give_it.value)) {
      x['give_it']['error'] = 'Link is invalid.';
      isAllInputValid = false;
    }
    if (isEmpty(Input.media.value.name)) {
      x['media']['error'] = 'File is required.';
      isAllInputValid = false;
    }
    if (isEmpty(Input.logo.value)) {
      x['logo']['error'] = 'Project logo is required.';
      isAllInputValid = false;
    }

    setInput(props => {
      return {
        ...x,
      };
    });

    if (isAllInputValid) {
      if (method === 'create') {
        if (typeof handleCreateProject !== 'undefined') {
          handleCreateProject(x);
        }
      }
    } else {
      setInput(props => {
        return {
          ...x,
        };
      });
    }
  };

  const handleFilePicker = async () => {
    // Pick a single file
    const x = Input;
    try {
      const res: any = await DocumentPicker.pick({
        type: [DocumentPicker.types.pdf],
      });
      console.log(res);
      x['media']['value']['name'] = res[0].name;
      x['media']['value']['uri'] = res[0].uri;
      x['media']['error'] = '';
      x['media']['file'] = {
        uri: res[0].uri,
        type: res[0].type,
        name: res[0].name,
      };
      setInput(props => {
        return {
          ...props,
          ...x,
        };
      });
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker, exit any dialogs or menus and move on
        x['media']['error'] = '';
        setInput(props => {
          return {
            ...props,
            ...x,
          };
        });
      } else {
        throw err;
      }
    }
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
      x['logo']['value'] = image.path;
      x['logo']['file'] = {
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

  const unSelectImage = () => {
    const x = Input;
    x['logo']['value'] = '';
    setInput(props => {
      return {...x};
    });
  };
  return (
    <View
      style={[
        styles.parent,
        {
          backgroundColor: theme.SCREEN_BACKGROUND_COLOR,
        },
      ]}>
      {/* technologies modal  */}
      <TechnologiesModal
        isShow={modals.tech}
        toggleModal={() =>
          setmodals(props => {
            return {
              ...props,
              tech: false,
            };
          })
        }
        onSelect={(values: any) => {
          setInput(props => {
            return {
              ...props,
              built_with: {
                value: values,
                error: '',
              },
            };
          });
        }}
        values={Input.built_with.value}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{flex: 1}}>
        <ScrollView>
          <View style={styles.scroll}>
            {/* buil with technologies */}
            <View style={styles.container}>
              <View style={styles.headingContainer}>
                <Text style={[styles.heading, {color: theme.TEXT_COLOR}]}>
                  Built With
                </Text>
              </View>
              <HelpText
                text={
                  'Select technologies that you have used in the development of the project.'
                }
              />
              <TouchableOpacity
                onPress={() =>
                  setmodals(props => {
                    return {
                      ...props,
                      tech: true,
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
                        Input.built_with.error !== ''
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
                    Choose Technologies
                  </Text>
                </View>
              </TouchableOpacity>
              {/* error container  */}
              {Input.built_with.error !== '' && (
                <View style={{alignItems: 'center'}}>
                  <Text
                    style={[{color: theme.ERROR_TEXT_COLOR}, styles.errorText]}>
                    {Input.built_with.error}
                  </Text>
                </View>
              )}
              {Input.built_with.value.length > 0 && (
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginVertical: 5,
                  }}>
                  {Input.built_with.value.map(item => (
                    <Text style={{color: theme.TEXT_COLOR}}>{item}</Text>
                  ))}
                </View>
              )}
            </View>
            {/* give it a go link of the project  */}
            <View style={styles.container}>
              <View style={styles.headingContainer}>
                <Text style={[styles.heading, {color: theme.TEXT_COLOR}]}>
                  Give it a go at
                </Text>
              </View>
              <HelpText
                text={'Provide any link where your project can be viewed.'}
              />
              <View style={styles.inputContainer}>
                <CustomTextField
                  defaultValue={Input.give_it.value}
                  keyboardType={'default'}
                  onChangeText={text =>
                    setInput(props => {
                      return {
                        ...props,
                        give_it: {
                          value: text,
                          error: '',
                        },
                      };
                    })
                  }
                  placeholder={'Enter a URL'}
                  placeholderColor={theme.PLACE_HOLDER_TEXT_COLOR}
                  textContentType={'name'}
                  error={Input.give_it.error}
                />
              </View>
            </View>
            {/* video demo link of the project  */}
            <View style={styles.container}>
              <View style={styles.headingContainer}>
                <Text style={[styles.heading, {color: theme.TEXT_COLOR}]}>
                  Video Demo Link
                </Text>
              </View>
              <HelpText
                text={'Provide a video link as a demo of the project.'}
              />
              <View style={styles.inputContainer}>
                <CustomTextField
                  defaultValue={Input.video_demo_link.value}
                  keyboardType={'default'}
                  onChangeText={text =>
                    setInput(props => {
                      return {
                        ...props,
                        video_demo_link: {
                          value: text,
                          error: '',
                        },
                      };
                    })
                  }
                  placeholder={'Enter a URL'}
                  placeholderColor={theme.PLACE_HOLDER_TEXT_COLOR}
                  textContentType={'name'}
                  error={Input.video_demo_link.error}
                />
              </View>
            </View>

            {/* project logo  */}
            <View style={styles.container}>
              <View style={styles.headingContainer}>
                <Text style={[styles.heading, {color: theme.TEXT_COLOR}]}>
                  Logo
                </Text>
              </View>
              <HelpText text={'Provide a suitable logo of the project.'} />
              <>
                <TouchableOpacity
                  style={[
                    styles.imageCardContainer,
                    {
                      backgroundColor: theme.CARD_BACKGROUND_COLOR,
                      height: Input.logo.value === '' ? Height * 0.15 : 'auto',
                      paddingTop: Input.logo.value ? 10 : 0,
                      marginHorizontal:
                        Input.logo.value === '' ? Width * 0.15 : Width * 0.05,
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
                    {Input.logo.value !== '' && (
                      <View style={styles.imageContainer}>
                        <TouchableOpacity
                          style={styles.crossContainer}
                          onPress={() => unSelectImage()}>
                          <Cross color={theme.GREEN_COLOR} size={0.9} />
                        </TouchableOpacity>
                        <Image
                          source={{
                            uri:
                              // method === 'edit'
                              //   ? BASE_URL + Input.poster.value
                              Input.logo.value,
                          }}
                          style={styles.image}
                        />
                      </View>
                    )}
                  </View>
                </TouchableOpacity>
                {Input.logo.error !== '' && (
                  <View style={{alignItems: 'center'}}>
                    <Text
                      style={[
                        styles.errorText,
                        {color: theme.ERROR_TEXT_COLOR},
                      ]}>
                      {Input.logo.error}
                    </Text>
                  </View>
                )}
              </>
            </View>

            {/* project media  */}
            <View style={styles.container}>
              <View style={styles.headingContainer}>
                <Text style={[styles.heading, {color: theme.TEXT_COLOR}]}>
                  Deliverables
                </Text>
              </View>
              <HelpText
                text={
                  'Provide a zip file containing all files related to your project.'
                }
              />
              <>
                <View style={styles.center}>
                  <TouchableOpacity
                    onPress={() => handleFilePicker()}
                    style={[
                      styles.cardContainer,
                      {
                        backgroundColor: theme.CARD_BACKGROUND_COLOR,
                        borderColor:
                          Input.media.error !== ''
                            ? theme.ERROR_TEXT_COLOR
                            : theme.CARD_BACKGROUND_COLOR,
                      },
                    ]}>
                    <View style={styles.cardTextContainer}>
                      <Text
                        style={[styles.cardText, {color: theme.TEXT_COLOR}]}>
                        {Input.media.value.name !== ''
                          ? Input.media.value.name.length > 10
                            ? `${Input.media.value.name.slice(0, 10)}...`
                            : `${Input.media.value.name}`
                          : 'Upload'}
                      </Text>
                    </View>
                    <View style={styles.cardIconContainer}>
                      <FileUpload size={1} color={theme.GREEN_COLOR} />
                    </View>
                  </TouchableOpacity>
                </View>

                {Input.media.error !== '' && (
                  <View style={{alignItems: 'center'}}>
                    <Text
                      style={[
                        {color: theme.ERROR_TEXT_COLOR},
                        styles.smallText,
                      ]}>
                      {Input.media.error}
                    </Text>
                  </View>
                )}
                <View style={styles.center}>
                  <Text
                    style={{
                      color: theme.DIM_TEXT_COLOR,
                      fontSize: Sizes.small * 0.75,
                    }}>
                    File can only be of the type .zip
                  </Text>
                </View>
              </>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      <CustomButton text={'Submit'} onPress={handleSave} loading={submit} />
    </View>
  );
};

export default Specifications;

const styles = StyleSheet.create({
  parent: {
    flex: 1,
  },
  screenName: {
    fontSize: Sizes.normal * 1.1,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  scroll: {
    marginTop: Height * 0.003,
    marginHorizontal: Width * 0.04,
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
  errorText: {
    fontSize: Sizes.small,
  },
  cardTextContainer: {
    flex: 0.82,
    paddingLeft: 7,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardIconContainer: {
    flex: 0.18,
  },
  cardText: {
    fontSize: Sizes.normal,
  },
  cardContainer: {
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 10,
    width: Width * 0.56,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'transparent',
  },
  smallText: {
    fontSize: Sizes.small,
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
    width: Width * 0.3,
    height: Width * 0.3,
    borderRadius: 70,
    marginVertical: 10,
  },
  imageText: {
    fontSize: Sizes.normal * 0.95,
  },
  crossContainer: {
    position: 'absolute',
    top: 8,
    // top: 4,
    // left: -15,
  },
});
