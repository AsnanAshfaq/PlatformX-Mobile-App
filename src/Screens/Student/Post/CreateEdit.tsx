// TODO:
// screen (Create OR Edit)
// screen header ( Create Post OR Edit Post)
// post text input (Write your post OR text passed as prop)
// post category (Select Post Type OR category passed as prop)
// post images (empty OR list of images passed as prop)
// post button (Post)
import React, {FC, useRef, useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Keyboard,
  Image,
  ToastAndroid,
  TextInput,
  ScrollView,
} from 'react-native';
import CustomHeader from '../../../Components/CustomHeader';
import CustomDropDown from '../../../Components/CustomDropDown';
import CustomTextField from '../../../Components/CustomTextField2';
import ImagePicker, {ImageOrVideo} from 'react-native-image-crop-picker';
import {POST_TYPE} from '../../../Constants/sample';
import {Height, Sizes, Width} from '../../../Constants/Size';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Axios from '../../../Utils/Axios';
//@ts-ignore
import {BASE_URL} from 'react-native-dotenv';
import {useStateValue} from '../../../Store/StateProvider';
import CustomButton from '../../../Components/CustomButton';

type base = {
  navigation: any;
  route: any;
};
interface props {
  id: any;
  text: string;
  category: string;
}
type screen = 'Create' | 'Edit';

const ICON_SIZE = Width * 0.07;

const Create_Edit: FC<base> = ({navigation, route}) => {
  const {screen}: {screen: screen} = route.params;
  const [{theme}, dispatch] = useStateValue();
  var data: props = {
    id: '', // id of the post to be edited
    text: '',
    category: 'Select Post Category',
  };

  if (screen === 'Edit') {
    // if the screen is 'Edit'
    data = route.params;
  }

  const [Post, setPost] = useState({
    text: data.text,
    textPlacholder: 'Write here . . .',
    category: data.category,
  });
  const [ToggleDropDown, setToggleDropDown] = useState(false);
  const [Images, setImages] = useState<ImageOrVideo[]>([]);
  const textInputRef = useRef(null);
  const [submit, setsubmit] = useState(false);

  const openGallery = () => {
    ImagePicker.openPicker({
      multiple: true,
      cropping: true,
      freeStyleCropEnabled: true,
    }).then(images => {
      setImages(prev => [...images, ...prev]);
    });
    // first hide the drop down if it is open
    if (textInputRef && textInputRef.current) {
      setToggleDropDown(false);
    }
  };

  const handlePost = (method: string) => {
    var bodyFormData = new FormData();

    if (Post.text.trim() !== '') {
      if (
        Post.category.trim() !== 'Select Post Category' ||
        Post.category.trim() !== ''
      ) {
        // if we have images array
        if (Images.length > 0) {
          Images.forEach((image, index) => {
            // append all the images
            bodyFormData.append('path', {
              uri: image.path,
              type: image.mime,
              name: image.path.replace(
                'file:///data/user/0/com.platformx/cache/react-native-image-crop-picker/', // replace path with empty string
                '',
              ),
            });
            // append meta data
            bodyFormData.append(
              'metadata',
              image.path
                .replace(
                  'file:///data/user/0/com.platformx/cache/react-native-image-crop-picker/', // replace path with empty string
                  '',
                )
                .substring(0, 20),
            );
          });
        }
        // append text
        bodyFormData.append('text', Post.text);
        // append category
        bodyFormData.append('category', Post.category);

        method = method.toLowerCase();
        if (method === 'edit') {
          bodyFormData.append('post', data.id);
        }
        setsubmit(true);
        Axios({
          method: 'post',
          url: `${BASE_URL}/api/post/${method}/`,
          data: bodyFormData,
          headers: {'Content-Type': 'multipart/form-data'},
        })
          .then(function (response) {
            //handle success
            // if the request status code is 201, then the post has been created
            if (response.status === 201) {
              ToastAndroid.show(response.data.success, 1500);
              // navigate user to main screen
              navigation.pop();
            } else {
              ToastAndroid.show(response.data.error + response.status, 1500);
            }
            setsubmit(false);
          })
          .catch(function (error) {
            //handle error
            if (error.response) {
              ToastAndroid.show(error.response.data.error, 1500);
            }
            setsubmit(false);
          });
      } else {
        ToastAndroid.show('Selecte Post Category', 1500);
      }
    } else {
      ToastAndroid.show('Post is Empty', 1500);
    }
  };

  // removing image
  const removeImage = (index: number) => {
    // remove image from setImages
    setImages(Images.filter((_, i) => i != index));
    // make api call to delete image
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
        navigation={navigation}
        title={`${screen} Post`}
        back
        onBackPress={() => navigation.goBack()}
      />
      <ScrollView>
        {/* post text view  */}
        <View style={[styles.textInputContainer]}>
          <CustomTextField
            onChangeText={text =>
              setPost(prev => {
                return {
                  ...prev,
                  text: text,
                };
              })
            }
            defaultValue={Post.text}
            placeholder={Post.textPlacholder}
            placeholderColor={theme.PLACE_HOLDER_TEXT_COLOR}
            keyboardType={'default'}
            textContentType={'addressCityAndState'}
            width={Width * 0.9}
            multiLine={true}
          />
        </View>
        {/* custom drop down  */}
        <View style={{marginBottom: 20}}>
          <CustomDropDown data={POST_TYPE} />
        </View>

        {/* show image view in a scrollview*/}
        {Images.length > 0 && (
          <ScrollView horizontal>
            {Images.map((image, index) => {
              return (
                <View style={styles.imageContainer} key={index}>
                  <Image
                    source={{uri: image?.path}}
                    style={styles.imageSelected}
                    resizeMode={'cover'}
                  />

                  <View style={styles.crossContainer}>
                    <TouchableOpacity onPress={() => removeImage(index)}>
                      <Ionicons
                        name={'close-circle-outline'}
                        size={ICON_SIZE}
                        color={theme.ICON_COLOR}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              );
            })}
          </ScrollView>
        )}

        {/* add  image view  */}
        <View style={styles.addImageContainer}>
          <TouchableOpacity onPress={() => openGallery()}>
            <Ionicons
              name={'add-circle-outline'}
              size={ICON_SIZE * 2.7}
              color={theme.SHADOW_COLOR}
            />
          </TouchableOpacity>
          <Text
            style={[
              styles.addImageText,
              {
                color: theme.TEXT_COLOR,
              },
            ]}>
            Add Image
          </Text>
        </View>
      </ScrollView>

      {/* post button view  */}
      <CustomButton
        onPress={() => handlePost(screen)}
        text={screen === 'Create' ? 'Post' : 'Edit Post'}
        loading={submit}
      />
    </View>
  );
};

export default Create_Edit;

const styles = StyleSheet.create({
  parent: {
    flex: 1,
  },
  textInputContainer: {
    marginVertical: 10,
    alignItems: 'center',
  },
  text: {
    width: Width * 0.9,
    marginHorizontal: Width * 0.01,
    marginVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 8,
    borderWidth: 1,
    fontSize: Sizes.normal * 1.1,
  },
  addImageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  addImageText: {
    fontSize: Sizes.normal,
    fontFamily: 'ComicNeue-Light',
  },
  imageContainer: {
    margin: 0,
  },
  imageSelected: {
    width: 200,
    height: 300,
    marginHorizontal: 7,
    borderRadius: 10,
  },
  image: {
    width: Width * 0.9,
    height: Width * (9 / 16),
  },
  crossContainer: {
    position: 'absolute',
    top: 0,
    right: 10,
    bottom: 10,
  },
  // cross: {
  //   fontSize: Sizes.large * 1.2,
  //   fontFamily: 'ComicNeue-Bold',
  // },
  postButtonContainer: {
    marginHorizontal: Width * 0.04,
    marginVertical: 5,
    padding: 5,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  postButton: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'transparent',
    maxHeight: Height * 0.06,
    width: Width * 0.9,
    height: Height * 0.06,
    justifyContent: 'center',
    alignItems: 'center',
  },
  postButtonText: {
    fontSize: Sizes.normal * 1.1,
    paddingVertical: 2,
  },
});
