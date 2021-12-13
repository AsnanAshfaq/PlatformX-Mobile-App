/* eslint-disable react-hooks/exhaustive-deps */
import React, {FC, useEffect, useState} from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import {AirbnbRating} from 'react-native-ratings';
import {PROFILE_IMAGE} from '../../../../Constants/sample';
import {Sizes, Width} from '../../../../Constants/Size';
import {useStateValue} from '../../../../Store/StateProvider';
import CheckBox from '../../../../Components/CheckBox';
import CustomButton from '../../../../Components/CustomButton';
import axios from '../../../../Utils/Axios';
//@ts-ignore
import {BASE_URL} from 'react-native-dotenv';
import {ForwardArrow, Tick} from '../../../../Components/Icons';
import Loading from '../../../../Components/Loading';
import CreateResult from '../../../../Modals/Hackathon/CreateResult';

type cardProps = {
  data: any;
  showMarks?: boolean;
  marks: number;
  rating?: number;
  isProjectSelected: boolean;
  onPress: (id: string) => void;
};
const Card: FC<cardProps> = ({
  data,
  marks,
  showMarks,
  rating,
  isProjectSelected,
  onPress,
}) => {
  const {theme} = useStateValue()[0];
  const [ImageLoading, setImageLoading] = useState(true);

  return (
    <TouchableOpacity activeOpacity={0.5} onPress={() => onPress(data.id)}>
      <View
        style={[
          styles.cardContainer,
          {
            backgroundColor: theme.CARD_BACKGROUND_COLOR,
          },
        ]}>
        <View style={{flexDirection: 'row'}}>
          <View style={styles.cardImageContainer}>
            <Image
              style={styles.cardImage}
              source={{
                uri: ImageLoading
                  ? PROFILE_IMAGE
                  : data.student.user.profile_image
                  ? BASE_URL + data.student.user.profile_image.path
                  : PROFILE_IMAGE,
              }}
              onLoadEnd={() => setImageLoading(false)}
              onError={() => setImageLoading(false)}
            />
          </View>
          <View style={styles.cardDetailsContainer}>
            <View style={styles.cardDetailTextContainer}>
              <Text style={[styles.titleText, {color: theme.TEXT_COLOR}]}>
                {data.title}
              </Text>
              <Text style={[styles.taglineText, {color: theme.DIM_TEXT_COLOR}]}>
                {data.tag_line}
              </Text>
            </View>
            <View style={[styles.marksContainer]}>
              {showMarks && (
                <>
                  <View style={styles.marksDetailsContainer}>
                    <View
                      style={[
                        styles.markIconContainer,
                        {
                          backgroundColor: theme.GREEN_COLOR,
                        },
                      ]}>
                      <Tick color={theme.ICON_COLOR} size={0.3} />
                    </View>
                    <View style={styles.marksTextContainer}>
                      <Text
                        style={[styles.marksText, {color: theme.TEXT_COLOR}]}>
                        {marks}/25
                      </Text>
                    </View>
                  </View>
                  <View style={[styles.starContainer]}>
                    <AirbnbRating
                      size={
                        rating === 1
                          ? 9
                          : rating === 2
                          ? 8
                          : rating === 3
                          ? 7
                          : rating === 4
                          ? 6
                          : 5
                      }
                      defaultRating={rating}
                      count={rating}
                      selectedColor={theme.GREEN_COLOR}
                      isDisabled={true}
                      showRating={false}
                    />
                  </View>
                </>
              )}
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

type props = {
  navigation: any;
  ID: '';
};
const Create: FC<props> = ({navigation, ID}) => {
  const {theme} = useStateValue()[0];
  const [number, setnumber] = useState<1 | 2 | 3>(1);
  const [selectedProject, setselectedProject] = useState([
    {
      rank: 1,
      id: '',
    },
    {
      rank: 2,
      id: '',
    },
    {
      rank: 3,
      id: '',
    },
  ]);
  const [projects, setprojects] = useState([]);
  const [loading, setloading] = useState(false);
  const [submit, setsubmit] = useState(false);
  const [Modal, setModal] = useState(false);

  const handleProjectSelection = id => {
    const x = selectedProject;
    x[number - 1]['id'] = id;
    x[number - 1]['rank'] = number;

    console.log('X is', x);
    setselectedProject(props => {
      return [...x];
    });
  };

  const isSelectedProject = id => {
    let doesExist = false;
    for (let i = 0; i < selectedProject.length; i++) {
      if (selectedProject[i].id === id) {
        doesExist = true;
        break;
      }
    }
    return doesExist;
  };

  const handleSubmit = () => {
    setsubmit(true);
    const data = {
      hackathon: ID,
      first: selectedProject[0].id,
      second: selectedProject[1].id,
      third: selectedProject[2].id,
    };
    axios
      .post(`/api/hackathon/${ID}/project/result/create/`, data)
      .then(response => {
        if (response.status === 201) {
          setModal(true);
        }
        setsubmit(false);
      })
      .catch(error => {
        setsubmit(false);
        setModal(false);
        if (error.response) {
          ToastAndroid.show(error.response.data.error, 1500);
        }
        return error.response;
      });
  };

  const getData = async () => {
    setloading(true);
    axios
      .get(`/api/hackathon/${ID}/project/all/`)
      .then(response => {
        if (response.status === 200) {
          setprojects(response.data);
        }
        setloading(false);
      })
      .catch(error => {
        if (error.response) {
          ToastAndroid.show(error.response.data.error, 1500);
        }
        setloading(false);
      });
  };
  useEffect(() => {
    getData();
  }, []);

  if (loading || projects.length === 0) {
    return (
      <View style={[styles.parent, styles.center]}>
        <Loading size={'large'} />
      </View>
    );
  }
  return (
    <View style={{flex: 1}}>
      <CreateResult
        isShow={Modal}
        toggleModal={() => {
          setModal(false);
          setTimeout(() => {
            navigation.goBack();
          }, 700);
        }}
      />
      {/* show success modal  */}
      <View style={[styles.container, styles.center, styles.margin]}>
        <Text style={[styles.heading, {color: theme.DIM_TEXT_COLOR}]}>
          PICK YOUR HACKATHON WINNERS
        </Text>
      </View>
      {/* image container  */}
      <View style={[styles.container, styles.center]}>
        <Image
          source={require('../../../../../assets/images/rankings.png')}
          style={styles.image}
        />
      </View>
      {/* button container  */}
      <View
        style={[
          styles.container,
          styles.margin,
          {flexDirection: 'row', marginBottom: 10},
        ]}>
        <View style={[styles.buttonContainer]}>
          <TouchableOpacity
            style={[
              styles.button,
              styles.center,
              {
                backgroundColor:
                  number === 1
                    ? theme.GREEN_COLOR
                    : theme.CARD_BACKGROUND_COLOR,
              },
            ]}
            activeOpacity={0.5}
            onPress={() => setnumber(1)}>
            <Text
              style={[
                {
                  color: number === 1 ? theme.TEXT_COLOR : theme.DIM_TEXT_COLOR,
                  fontSize:
                    number === 1 ? Sizes.normal * 1.1 : Sizes.normal * 0.9,
                },
              ]}>
              1st
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[
              styles.button,
              styles.center,
              {
                backgroundColor:
                  number === 2
                    ? theme.GREEN_COLOR
                    : theme.CARD_BACKGROUND_COLOR,
              },
            ]}
            activeOpacity={0.5}
            onPress={() => setnumber(2)}>
            <Text
              style={[
                {
                  color: number === 2 ? theme.TEXT_COLOR : theme.DIM_TEXT_COLOR,
                  fontSize:
                    number === 2 ? Sizes.normal * 1.1 : Sizes.normal * 0.9,
                },
              ]}>
              2nd
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[
              styles.button,
              styles.center,
              {
                backgroundColor:
                  number === 3
                    ? theme.GREEN_COLOR
                    : theme.CARD_BACKGROUND_COLOR,
              },
            ]}
            activeOpacity={0.5}
            onPress={() => setnumber(3)}>
            <Text
              style={[
                {
                  color: number === 3 ? theme.TEXT_COLOR : theme.DIM_TEXT_COLOR,
                  fontSize:
                    number === 3 ? Sizes.normal * 1.1 : Sizes.normal * 0.9,
                },
              ]}>
              3rd
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        contentContainerStyle={[styles.scroll]}
        keyExtractor={(item: any, index) => `${item.id} - ${index}`}
        data={projects}
        renderItem={({item}: any) => (
          <Card
            data={item}
            rating={item.ratings}
            showMarks={item.marks !== 0 ? true : false}
            marks={item.marks}
            onPress={handleProjectSelection}
            isProjectSelected={isSelectedProject(item.id)}
          />
        )}
      />

      {/* button to submit result  */}
      <CustomButton text={'Submit'} onPress={handleSubmit} loading={submit} />
    </View>
  );
};

export default Create;

const styles = StyleSheet.create({
  parent: {
    flex: 1,
  },
  container: {
    marginTop: 10,
  },
  image: {
    width: Width * 0.4,
    height: Width * 0.4,
  },
  scroll: {
    marginTop: 10,
    marginHorizontal: Width * 0.04,
  },
  heading: {
    fontSize: Sizes.normal * 0.85,
  },
  margin: {
    marginHorizontal: Width * 0.04,
  },
  smallText: {
    fontSize: Sizes.normal * 0.66,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    flex: 1,
  },
  button: {
    marginHorizontal: 18,
    padding: 4,
    borderRadius: 10,
    borderColor: 'transparent',
  },
  buttonText: {
    fontSize: Sizes.normal * 1.2,
  },
  cardContainer: {
    marginVertical: 10,
    flexDirection: 'column',
    borderRadius: 10,
    borderColor: 'transparent',
    paddingVertical: 10,
  },
  selectionContainer: {
    flex: 0.08,
  },
  cardImageContainer: {
    flex: 0.22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardImage: {
    width: Width * 0.16,
    height: Width * 0.16,
    borderWidth: 1,
    borderRadius: 40,
    borderColor: 'transparent',
  },
  cardDetailsContainer: {
    flex: 0.7,
    flexDirection: 'row',
  },
  cardDetailTextContainer: {
    flex: 0.7,
    justifyContent: 'center',
    paddingLeft: 5,
  },
  titleText: {
    fontSize: Sizes.normal * 0.9,
    fontWeight: 'bold',
  },
  taglineText: {
    fontSize: Sizes.normal * 0.8,
    fontStyle: 'italic',
    lineHeight: 20,
  },
  marksContainer: {
    flex: 0.3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  marksText: {
    fontSize: Sizes.normal * 0.9,
  },
  marksDetailsContainer: {
    flexDirection: 'row',
    flex: 0.6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  markIconContainer: {
    borderRadius: 2,
    borderColor: 'transparent',
    width: 10,
    height: 10,
    marginTop: 2,
    marginRight: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  marksTextContainer: {},
  starContainer: {
    flex: 0.4,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  uploadDateTextContainer: {
    flex: 0.5,
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    marginHorizontal: 10,
    paddingBottom: 10,
  },
  uploadedDateText: {
    fontSize: Sizes.normal * 0.62,
    fontStyle: 'italic',
  },
  buttonIconContainer: {
    justifyContent: 'center',
    marginHorizontal: 4,
    alignItems: 'center',
  },
});
