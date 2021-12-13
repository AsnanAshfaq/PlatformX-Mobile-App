/* eslint-disable react-native/no-inline-styles */
//TODO:
// logo image
// thumbnail image
// background image
// promotional video
// file type
// is video required

import React, {FC, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Image,
} from 'react-native';
import {Height, Sizes, Width} from '../../../../Constants/Size';
import {useStateValue} from '../../../../Store/StateProvider';
import ImagePicker from 'react-native-image-crop-picker';
import {Camera, Cross} from '../../../../Components/Icons';
import CheckBox from '../../../../Components/CheckBox';
import CustomTextField from '../../../../Components/CustomTextField2';
import CustomButton from '../../../../Components/CustomButton';
import HelpText from '../../../../Components/HelpText';
import FileTypeModal from '../../../../Modals/FileTypeModal';
import FormHandler from '../../../../Utils/FormHandler';

type props = {
  method: string;
  data: any;
  setMediaData: (data: any) => void;
  movePage: (index) => void;
};

const Media: FC<props> = ({method, data, setMediaData, movePage}) => {
  const {theme} = useStateValue()[0];
  const [Paths, setPaths] = useState({
    logo: {value: '', error: '', file: {}},
    background: {value: '', error: '', file: {}},
  });
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const {isEmpty} = FormHandler();
  const handleSave = () => {
    const x = Paths;
    let isAllInputValid = true;

    if (isEmpty(Paths.logo.value)) {
      x['logo']['error'] = 'Logo is required.';
      isAllInputValid = false;
    }

    if (isEmpty(Paths.background.value)) {
      x['background']['error'] = 'Background image is required.';
      isAllInputValid = false;
    }

    if (isAllInputValid) {
      if (method === 'create') {
        setMediaData(Paths);
        movePage(2);
      }
    }
  };

  const handleImagePicker = (key: string) => {
    ImagePicker.openPicker({
      // width: 300,
      // height: 400,
      cropping: true,
      multiple: false,
      freeStyleCropEnabled: true,
    }).then(image => {
      const x = Paths;
      x[key]['value'] = image.path;
      x[key]['file'] = {
        uri: image.path,
        type: image.mime,
        name: image.path.replace(
          'file:///data/user/0/com.platformx/cache/react-native-image-crop-picker/', // replace path with empty string
          '',
        ),
      };
      x[key]['error'] = '';
      setPaths(props => {
        return {...x};
      });
    });
  };

  const unSelectImage = (key: string) => {
    const x = Paths;

    x[key]['value'] = '';
    x[key]['error'] = '';
    setPaths(props => {
      return {...x};
    });
  };

  const ImageView: FC<{Key: string; value: string; error: string}> = ({
    Key,
    value,
    error,
  }) => {
    return (
      <>
        <TouchableOpacity
          style={[
            styles.imageCardContainer,
            {
              backgroundColor: theme.CARD_BACKGROUND_COLOR,
              height: value === '' ? Height * 0.15 : 'auto',
              paddingTop: value ? 10 : 0,
            },
          ]}
          activeOpacity={0.5}
          onPress={() => handleImagePicker(Key)}>
          <Camera color={theme.GREEN_COLOR} size={1} />
          <Text style={[styles.imageText, {color: theme.DIM_TEXT_COLOR}]}>
            Upload Image
          </Text>
          <View>
            {value !== '' && (
              <View style={styles.imageContainer}>
                <TouchableOpacity
                  style={styles.crossContainer}
                  onPress={() => unSelectImage(Key)}>
                  <Cross color={theme.GREEN_COLOR} size={0.9} />
                </TouchableOpacity>
                <Image source={{uri: value}} style={styles.image} />
              </View>
            )}
          </View>
        </TouchableOpacity>
        {error !== '' && (
          <View style={{alignItems: 'center'}}>
            <Text style={[styles.errorText, {color: theme.ERROR_TEXT_COLOR}]}>
              {error}
            </Text>
          </View>
        )}
      </>
    );
  };

  return (
    <View style={styles.parent}>
      <FileTypeModal
        isShow={show}
        toggleModal={() => setShow(false)}
        onSelect={values => console.log('Values are', values)}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{flex: 1}}>
        <ScrollView
          style={styles.scroll}
          showsVerticalScrollIndicator={false}
          horizontal={false}>
          <View style={{marginHorizontal: Width * 0.04}}>
            <View style={styles.container}>
              <View style={styles.headingContainer}>
                <Text style={[styles.heading, {color: theme.TEXT_COLOR}]}>
                  Logo Image
                </Text>
              </View>
              <ImageView
                Key={'logo'}
                value={Paths.logo.value}
                error={Paths.logo.error}
              />
            </View>
            <View style={styles.container}>
              <View style={styles.headingContainer}>
                <Text style={[styles.heading, {color: theme.TEXT_COLOR}]}>
                  Background Image
                </Text>
              </View>
              <ImageView
                Key={'background'}
                value={Paths.background.value}
                error={Paths.background.error}
              />
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

export default Media;

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
  heading: {
    fontSize: Sizes.normal * 1.1,
  },
  imageCardContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    // minHeight: Height * 0.14,
    marginTop: 10,
    marginHorizontal: Width * 0.15,
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
  crossContainer: {
    position: 'absolute',
    top: -1,
    // top: 4,
    left: -15,
  },
  inputContainer: {
    marginTop: 4,
  },
  helpTextContainer: {
    marginTop: 4,
    marginLeft: 4,
  },
  helpText: {
    fontSize: Sizes.normal * 0.62,
    lineHeight: 14,
  },
  imageText: {
    fontSize: Sizes.normal * 0.95,
  },
  checkBoxContainer: {
    marginTop: 10,
    marginLeft: 5,
    flexDirection: 'row',
  },
  checkBoxText: {
    fontSize: Sizes.normal * 0.8,
  },
  errorText: {
    fontSize: Sizes.small,
  },
});
