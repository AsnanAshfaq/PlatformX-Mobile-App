import React, {FC, useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ToastAndroid,
  TouchableWithoutFeedback,
  ScrollView,
} from 'react-native';
import CustomHeader from '../../../Components/CustomHeader';
import {Height, Sizes, Width} from '../../../Constants/Size';
import CheckBox from '../../../Components/CheckBox';
import axios from '../../../Utils/Axios';
import {useStateValue} from '../../../Store/StateProvider';
import Divider from '../../../Components/Divider';
//@ts-ignore
import {BASE_URL} from 'react-native-dotenv';
import CustomButton from '../../../Components/CustomButton';
import {BACKGROUND_IMAGE} from '../../../Constants/sample';

type KnowProps = {
  title: string;
  error: string;
  value: string;
  setCheck: (value: string) => void;
};
const KnowHows: FC<KnowProps> = ({title, value, error, setCheck}) => {
  const [{theme}, dispatch] = useStateValue();

  return (
    <View style={styles.container}>
      <Text
        style={[
          styles.label,
          {
            color: theme.TEXT_COLOR,
            lineHeight: 29,
          },
        ]}>
        How did you know about {title}?{' '}
        <Text style={[styles.label, {color: theme.ERROR_TEXT_COLOR}]}>*</Text>
      </Text>

      <View style={styles.checkBoxContainer}>
        <CheckBox
          onPress={isChecked => setCheck('platformx')}
          size={18}
          disableBuiltInState
          isChecked={value === 'platformx' ? true : false}
        />
        <Text style={[styles.knowHowText, {color: theme.TEXT_COLOR}]}>
          PlatformX
        </Text>
      </View>
      <View style={styles.checkBoxContainer}>
        <CheckBox
          onPress={isChecked => setCheck('friend')}
          size={18}
          disableBuiltInState
          isChecked={value === 'friend' ? true : false}
        />
        <Text style={[styles.knowHowText, {color: theme.TEXT_COLOR}]}>
          A friend
        </Text>
      </View>
      <View style={styles.checkBoxContainer}>
        <CheckBox
          onPress={isChecked => setCheck('social')}
          size={18}
          disableBuiltInState
          isChecked={value === 'social' ? true : false}
        />
        <Text style={[styles.knowHowText, {color: theme.TEXT_COLOR}]}>
          Social Media
        </Text>
      </View>
      <View style={styles.checkBoxContainer}>
        <CheckBox
          onPress={isChecked => setCheck('others')}
          size={18}
          disableBuiltInState
          isChecked={value === 'others' ? true : false}
        />
        <Text style={[styles.knowHowText, {color: theme.TEXT_COLOR}]}>
          Others
        </Text>
      </View>
      {error !== '' && (
        <Text style={{fontSize: Sizes.small, color: theme.ERROR_TEXT_COLOR}}>
          {error}
        </Text>
      )}
    </View>
  );
};

type RulesProps = {
  title: string;
  termsScreen: any;
  error: string;
  first: boolean;
  second: boolean;
  setCheck: (Key: string, value: boolean) => void;
};
const RulesAndRegistration: FC<RulesProps> = ({
  title,
  first,
  second,
  error,
  setCheck,
  termsScreen,
}) => {
  const [{theme}, dispatch] = useStateValue();
  return (
    <View style={styles.container}>
      <Text
        style={[
          styles.label,
          {
            color: theme.TEXT_COLOR,
          },
        ]}>
        Agreement{' '}
        <Text style={[styles.label, {color: theme.ERROR_TEXT_COLOR}]}>*</Text>
      </Text>

      <View style={styles.checkBoxContainer}>
        <View style={styles.rulesCheckBoxContainer}>
          <CheckBox
            onPress={isChecked =>
              setCheck(
                'first',
                typeof isChecked === 'undefined' ? false : isChecked,
              )
            }
            size={18}
            isChecked={first}
          />
        </View>
        <View style={styles.rulesTextContainer}>
          <Text style={[styles.rulesText, {color: theme.TEXT_COLOR}]}>
            I have read and agree to be bound by the Official Rules of {title}
          </Text>
        </View>
      </View>
      <View style={styles.checkBoxContainer}>
        <View style={styles.rulesCheckBoxContainer}>
          <CheckBox
            onPress={isChecked =>
              setCheck(
                'second',
                typeof isChecked === 'undefined' ? false : isChecked,
              )
            }
            size={18}
            isChecked={second}
          />
        </View>
        <View style={styles.rulesTextContainer}>
          <Text style={[styles.rulesText, {color: theme.TEXT_COLOR}]}>
            I have read and agree to be bound by the PlatformX{' '}
            <TouchableWithoutFeedback onPress={termsScreen}>
              <Text style={{color: theme.GREEN_COLOR}}>Terms and Services</Text>
            </TouchableWithoutFeedback>
          </Text>
        </View>
      </View>
      {error !== '' && (
        <Text style={{fontSize: Sizes.small, color: theme.ERROR_TEXT_COLOR}}>
          {error}
        </Text>
      )}
    </View>
  );
};

const TeamMates: FC = ({}) => {
  const [{theme}, dispatch] = useStateValue();

  return (
    <View style={styles.container}>
      <Text
        style={[
          styles.label,
          {
            color: theme.TEXT_COLOR,
          },
        ]}>
        Do you have teammates?
      </Text>
      <View style={styles.checkBoxContainer}>
        <CheckBox onPress={() => console.log('Solo selected')} size={15} />
        <Text style={[styles.teamText, {color: theme.TEXT_COLOR}]}>
          Working Solo
        </Text>
      </View>
      <View style={styles.checkBoxContainer}>
        <CheckBox onPress={isChecked => console.log(isChecked)} size={15} />
        <Text style={[styles.teamText, {color: theme.TEXT_COLOR}]}>
          Add Teammate
        </Text>
      </View>
    </View>
  );
};

type props = {
  navigation: any;
  route: any;
};
const Register: FC<props> = ({navigation, route}) => {
  // get hackathon id from params
  const {ID, backgroundImage, title, tagline} = route.params;
  const [{theme}, dispatch] = useStateValue();
  const [BackgroundImageLoading, setBackgroundImageLoading] = useState(true);
  const [ImageAspectRatio, setImageAspectRatio] = useState(0);
  const [loading, setLoading] = useState(false);
  const [knowHowCheck, setKnowHowCheck] = useState({
    value: '',
    error: '',
  });
  const [rulesCheck, setrulesCheck] = useState({
    first: false,
    second: false,
    error: '',
  });

  const registerHackathon = () => {
    setLoading(true);

    if (knowHowCheck.value === '') {
      setKnowHowCheck(props => {
        return {
          value: props.value,
          error: 'Please select any one checkbox to continue',
        };
      });
      setLoading(false);
    } else if (!rulesCheck.first || !rulesCheck.second) {
      setrulesCheck(props => {
        return {
          ...props,
          error: 'Please confirm agreement checkboxes to continue',
        };
      });
      setLoading(false);
    } else {
      // safe to make api call
      axios
        .post(`/api/hackathon/${ID}/register/`)
        .then(result => {
          if (result.status === 201) {
            // user has been registered
            ToastAndroid.show(result.data.success, 1500);
            // navigate to main screen
            navigation.goBack();
          } else {
            ToastAndroid.show(result.data.error, 1500);
          }
          setLoading(false);
        })
        .catch(error => {
          if (error.response.data) {
            ToastAndroid.show(error.response.data.error, 1500);
          } else {
            ToastAndroid.show(error.error, 1500);
          }
          setLoading(false);
        });
    }
  };

  const termsScreen = () => {
    console.log('Going to terms screen');
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
        navigation
        title={'Register'}
        back
        chat
        bell
        onBackPress={() => navigation.goBack()}
      />
      <ScrollView removeClippedSubviews>
        <View>
          <Image
            style={{
              width: Width,
              height: Height * 0.3,
            }}
            source={{
              uri: BackgroundImageLoading ? BACKGROUND_IMAGE : backgroundImage,
            }}
            onLoadEnd={() => {
              setBackgroundImageLoading(false);
            }}
            onError={() => {
              setBackgroundImageLoading(false);
            }}
            resizeMode={'cover'}
          />
        </View>

        <View
          style={[
            styles.card,
            {
              backgroundColor: theme.BACKGROUND_COLOR,
              marginHorizontal: Width * 0.05,
            },
          ]}>
          {/* title and tagline container  */}
          <View style={[styles.titleContainer, styles.center]}>
            <Text
              style={[
                styles.titleText,
                {
                  color: theme.TEXT_COLOR,
                },
              ]}>
              {title}
            </Text>
          </View>
          <View style={[styles.tagContainer]}>
            <Text
              style={[
                styles.tagLineText,
                {
                  color: theme.DIM_TEXT_COLOR,
                },
              ]}>
              {tagline}
            </Text>
          </View>

          <Divider size={'large'} />
          {/* <TeamMates /> */}
          <KnowHows
            title={title}
            setCheck={value => {
              setKnowHowCheck(props => {
                return {
                  value: value,
                  error: '',
                };
              });
            }}
            error={knowHowCheck.error}
            value={knowHowCheck.value}
          />
          <RulesAndRegistration
            title={title}
            setCheck={(Key, value) => {
              const x = rulesCheck;
              x[Key] = value;
              setrulesCheck(props => {
                return {
                  ...props,
                  ...x,
                  error: '',
                };
              });
            }}
            first={rulesCheck.first}
            second={rulesCheck.second}
            error={rulesCheck.error}
            termsScreen={termsScreen}
          />
        </View>
      </ScrollView>
      {/* Register now  section*/}

      <CustomButton
        text={'Register'}
        onPress={registerHackathon}
        loading={loading}
      />
    </View>
  );
};

export default Register;

const styles = StyleSheet.create({
  parent: {
    flex: 1,
  },
  backgroundImageContainer: {},
  card: {
    marginTop: -45,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: 'transparent',
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleContainer: {
    marginTop: 15,
  },
  titleText: {
    fontSize: Sizes.normal * 1.2,
  },
  tagContainer: {
    marginHorizontal: 20,
  },
  tagLineText: {
    fontSize: Sizes.normal * 0.85,
    textAlign: 'center',
  },
  labelContainer: {
    marginHorizontal: Width * 0.02,
    marginVertical: 10,
    width: Width * 0.95,
    padding: 5,
    borderBottomWidth: 1,
  },
  label: {
    fontSize: Sizes.normal,
    // fontFamily: 'Cindyrella',
  },
  container: {
    marginHorizontal: Width * 0.03,
    marginVertical: 10,
  },
  checkBoxContainer: {
    marginHorizontal: Width * 0.03,
    marginVertical: 10,
    flexDirection: 'row',
  },
  rulesText: {
    fontSize: Sizes.normal * 0.9,
    lineHeight: 24,
  },
  rulesCheckBoxContainer: {
    alignItems: 'flex-start',
    marginTop: 3,
  },
  rulesTextContainer: {
    marginRight: Width * 0.03,
    // alignItems: 'center',
  },
  teamText: {
    fontSize: Sizes.normal * 0.9,
  },
  knowHowText: {
    fontSize: Sizes.normal * 0.9,
  },
  terms: {
    fontSize: Sizes.normal * 0.9,
    textDecorationLine: 'underline',
  },
  registerButtonContainer: {
    height: Width * 0.14,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 5,
  },
  registerButton: {
    width: Width * 0.9,
    height: Width * 0.12,
    justifyContent: 'center',
    borderRadius: 10,
    alignItems: 'center',
  },
  registerText: {
    fontSize: Sizes.large,
  },
});
