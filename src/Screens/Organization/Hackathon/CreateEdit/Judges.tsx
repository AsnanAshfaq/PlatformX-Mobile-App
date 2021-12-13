import React, {FC, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Image,
} from 'react-native';
import HelpText from '../../../../Components/HelpText';
import {Height, Sizes, Width} from '../../../../Constants/Size';
import {useStateValue} from '../../../../Store/StateProvider';
import CustomTextField from '../../../../Components/CustomTextField2';
import CustomButton from '../../../../Components/CustomButton';
import ImagePicker from 'react-native-image-crop-picker';
import {Camera, Cross, PlusCircle} from '../../../../Components/Icons';

type props = {
  method: string;
  data: any;
  setJudgeData: (data: any) => void;
  movePage: (index) => void;
};

const Judges: FC<props> = ({method, data, setJudgeData, movePage}) => {
  const {theme} = useStateValue()[0];

  const [criteria, setcriteria] = useState([
    {
      title: {value: '', error: ''},
      description: {value: '', error: ''},
    },
  ]);
  const [loading, setLoading] = useState(false);

  const handleAddCriteria = () => {
    let isValid = true;
    if (criteria[criteria.length - 1].title.value === '') {
      const state = [...criteria];
      state[state.length - 1].title.error = 'This field is required';
      isValid = false;
      setcriteria(props => {
        return [...state];
      });
    }

    if (criteria[criteria.length - 1].description.value === '') {
      const state = [...criteria];
      state[state.length - 1].description.error = 'This field is required';
      isValid = false;
      setcriteria(props => {
        return [...state];
      });
    }
    if (isValid) {
      const state = [...criteria];
      state.push({
        title: {value: '', error: ''},
        description: {value: '', error: ''},
      });
      setcriteria(props => {
        return [...state];
      });
    }
  };

  const removecriteria = (index: number) => {
    const state = [...criteria];
    state.splice(index, 1);
    setcriteria(props => {
      return [...state];
    });
  };
  const handleSave = () => {
    let isAllInputValid = true;

    const x = criteria;
    if (criteria[criteria.length - 1].title.value === '') {
      isAllInputValid = false;
      x[criteria.length - 1].title.error = 'This field is required.';
    }
    if (criteria[criteria.length - 1].description.value === '') {
      isAllInputValid = false;
      x[criteria.length - 1].description.error = 'This field is required.';
    }

    setcriteria(props => {
      return [...x];
    });

    if (isAllInputValid) {
      if (method === 'create') {
        setJudgeData(criteria);
        movePage(4);
      }
    }
  };

  return (
    <View style={styles.parent}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{flex: 1}}>
        <ScrollView
          style={styles.scroll}
          showsVerticalScrollIndicator={false}
          horizontal={false}>
          <View style={{marginHorizontal: Width * 0.04}}>
            <View style={styles.container}>
              <View style={{flexDirection: 'row'}}>
                <View style={[styles.headingContainer, {flex: 0.9}]}>
                  <Text style={[styles.heading, {color: theme.TEXT_COLOR}]}>
                    Judging Criteria
                  </Text>
                </View>
                <TouchableOpacity onPress={() => handleAddCriteria()}>
                  <View style={{flex: 0.1}}>
                    <PlusCircle color={theme.GREEN_COLOR} />
                  </View>
                </TouchableOpacity>
              </View>
              <HelpText text="Clearly provide the details of judging the hackathon" />
              {criteria.map((cri, index) => (
                <>
                  <View style={[styles.container]}>
                    <View style={styles.headingContainer}>
                      <Text
                        style={[styles.subHeading, {color: theme.TEXT_COLOR}]}>
                        Title
                      </Text>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                      <View style={[styles.inputContainer]}>
                        <CustomTextField
                          defaultValue={cri.title.value}
                          keyboardType={'default'}
                          onChangeText={text => {
                            const state = [...criteria];
                            state[index].title.value = text;
                            state[index].title.error = '';
                            setcriteria(props => {
                              return [...state];
                            });
                          }}
                          placeholder={'Enter title'}
                          placeholderColor={theme.PLACE_HOLDER_TEXT_COLOR}
                          textContentType={'name'}
                          maxLength={60}
                          showLength
                          error={criteria[index].title.error}
                        />
                      </View>
                      {criteria.length > 0 && index !== 0 && (
                        <View
                          style={[
                            styles.deleteTextFieldContainer,
                            styles.center,
                          ]}>
                          <TouchableOpacity
                            onPress={() => removecriteria(index)}>
                            <Cross color={theme.ERROR_TEXT_COLOR} />
                          </TouchableOpacity>
                        </View>
                      )}
                    </View>
                  </View>

                  <View style={styles.container}>
                    <View style={styles.headingContainer}>
                      <Text
                        style={[styles.subHeading, {color: theme.TEXT_COLOR}]}>
                        Description
                      </Text>
                    </View>
                    <View style={styles.inputContainer}>
                      <CustomTextField
                        defaultValue={cri.description.value}
                        keyboardType={'default'}
                        onChangeText={text => {
                          const state = [...criteria];
                          state[index].description.value = text;
                          state[index].description.error = '';
                          setcriteria(props => {
                            return [...state];
                          });
                        }}
                        placeholder={'Enter description'}
                        placeholderColor={theme.PLACE_HOLDER_TEXT_COLOR}
                        textContentType={'name'}
                        maxLength={60}
                        showLength
                        error={criteria[index].description.error}
                      />
                    </View>
                  </View>
                </>
              ))}
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

export default Judges;

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    marginTop: Height * 0.025,
  },
  screenName: {
    fontSize: Sizes.normal * 1.1,
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
    fontSize: Sizes.normal * 0.85,
  },
  inputContainer: {
    marginTop: 4,
    marginLeft: Width * 0.015,
    // alignItems: 'center',
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
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteTextFieldContainer: {
    marginLeft: 10,
    marginBottom: 10,
  },
});
