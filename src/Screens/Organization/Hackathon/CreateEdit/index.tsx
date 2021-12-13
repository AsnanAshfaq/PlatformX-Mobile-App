/* eslint-disable react-native/no-inline-styles */
import React, {FC, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  FlatList,
  ToastAndroid,
} from 'react-native';
import CustomHeader from '../../../../Components/CustomHeader';
import {Height, Sizes, Width} from '../../../../Constants/Size';
import {useStateValue} from '../../../../Store/StateProvider';
import axios from '../../../../Utils/Axios';
import General from './General';
import Judges from './Judges';
import Media from './Media';
import Prize from './Prize';
import Schedule from './Schedule';
import Create from '../../../../Modals/Hackathon/Create';
//@ts-ignore
import {BASE_URL} from 'react-native-dotenv';
type props = {
  navigation: any;
  route: any;
};

const SCREENS = ['General', 'Media', 'Prizes', 'Criteria', 'Schedule'];
const Index: FC<props> = ({navigation, route}) => {
  const {theme} = useStateValue()[0];

  const {method}: {method: 'edit' | 'create'} = route.params;
  const [ID, setID] = useState('');
  const [hackathonData, setHackathonData] = useState<any>({
    general: {},
    media: {},
    prize: {},
    criteria: {},
    schedule: {},
  });
  const [modal, setmodal] = useState(false);
  const [submit, setsubmit] = useState(false);

  const [active, setactive] = useState(0);

  const movePage = index => setactive(index);

  const setGeneralData = (data: any) => {
    setHackathonData(props => {
      return {
        ...props,
        general: data,
      };
    });
  };

  const setMediaData = (data: any) => {
    setHackathonData(props => {
      return {
        ...props,
        media: data,
      };
    });
  };

  const setPrizeData = (data: any) => {
    setHackathonData(props => {
      return {
        ...props,
        prize: data,
      };
    });
  };

  const setJudgeData = (data: any) => {
    setHackathonData(props => {
      return {
        ...props,
        criteria: data,
      };
    });
  };

  const handleCreateHackathon = date => {
    setsubmit(true);
    const bodyFormData = new FormData();

    bodyFormData.append('title', hackathonData.general.title.value.trim());
    bodyFormData.append('tag_line', hackathonData.general.tagLine.value.trim());

    bodyFormData.append(
      'description',
      hackathonData.general.description.value.trim(),
    );

    for (let i = 0; i < hackathonData.general.themes.value.length; i++) {
      bodyFormData.append('theme_tags', hackathonData.general.themes.value[i]);
    }

    for (let i = 0; i < hackathonData.general.rules.length; i++) {
      bodyFormData.append('rules', hackathonData.general.rules[i]['value']);
    }

    for (let i = 0; i < hackathonData.general.resources.length; i++) {
      bodyFormData.append(
        'resources',
        hackathonData.general.resources[i]['value'],
      );
    }
    bodyFormData.append(
      'submission',
      hackathonData.general.submission.value.trim(),
    );

    bodyFormData.append('logo_image', hackathonData.media.logo.file);

    bodyFormData.append(
      'background_image',
      hackathonData.media.background.file,
    );

    bodyFormData.append('first', hackathonData.prize.first.value);

    bodyFormData.append('second', hackathonData.prize.second.value);

    bodyFormData.append('third', hackathonData.prize.third.value);

    for (let i = 0; i < hackathonData.criteria.length; i++) {
      bodyFormData.append(
        'criteria_title',
        hackathonData.criteria[i].title.value,
      );
      bodyFormData.append(
        'criteria_description',
        hackathonData.criteria[i].description.value,
      );
    }

    bodyFormData.append('event_date', date.toISOString().split('T')[0]);

    console.log('Form data is', bodyFormData);

    setsubmit(false);
    setTimeout(() => {
      setsubmit(false);
    }, 3000);

    axios({
      method: 'post',
      url: `${BASE_URL}/api/hackathon/create/`,
      data: bodyFormData,
      headers: {'Content-Type': 'multipart/form-data'},
    })
      .then(response => {
        if (response.status === 201) {
          ToastAndroid.show(response.data.success, 1500);
        }
        setsubmit(false);
        setmodal(true);
      })
      .catch(error => {
        if (error.response) {
          ToastAndroid.show(error.response.data.error, 1500);
        }
        setsubmit(false);
        setmodal(false);
        return error.response;
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
      <CustomHeader
        title={`${method === 'edit' ? 'Edit Hackathon' : 'Host Hackathon'}`}
        navigation={navigation}
        back
        onBackPress={() => navigation.goBack()}
      />

      {/* custom slider  */}
      <View
        style={[
          styles.scroll,
          {
            backgroundColor: theme.SLIDER_BACKGROUND_COLOR,
            borderRadius: 10,
            // paddingHorizontal: 3,
          },
        ]}>
        <FlatList
          data={SCREENS}
          horizontal
          contentContainerStyle={{
            // marginHorizontal: 4,
            height: Height * 0.04,
            borderRadius: 10,
            marginTop: 7,
          }}
          renderItem={({item, index}) => (
            <>
              <View
                style={[
                  styles.container,
                  {
                    backgroundColor:
                      index === active
                        ? theme.SCREEN_BACKGROUND_COLOR
                        : theme.SLIDER_BACKGROUND_COLOR,
                    borderRadius: 10,
                    marginHorizontal: 10,
                  },
                ]}>
                <TouchableOpacity
                  onPress={() => {
                    if (method === 'edit') {
                      setactive(index);
                    }
                  }}>
                  <Text
                    style={[
                      styles.screenName,
                      {
                        color: theme.TEXT_COLOR,
                        fontSize:
                          index === active ? Sizes.normal * 1.1 : Sizes.normal,
                      },
                    ]}>
                    {item}
                  </Text>
                </TouchableOpacity>
              </View>
              {index < SCREENS.length - 1 && (
                <View
                  style={{
                    height: 40,
                    // marginTop: 5,
                    width: 1,
                    backgroundColor: theme.DIVIDER_COLOR,
                  }}
                />
              )}
            </>
          )}
        />
      </View>

      <Create
        isShow={modal}
        toggleModal={() => {
          setmodal(false);
          setTimeout(() => {
            navigation.goBack();
          }, 700);
        }}
        method={method}
      />

      {active === 0 && (
        <General
          method={method}
          data={hackathonData.general}
          setGeneralData={setGeneralData}
          movePage={movePage}
        />
      )}
      {active === 1 && (
        <Media
          method={method}
          data={hackathonData.media}
          setMediaData={setMediaData}
          movePage={movePage}
        />
      )}
      {active === 2 && (
        <Prize
          method={method}
          data={hackathonData.prize}
          setPrizeData={setPrizeData}
          movePage={movePage}
        />
      )}
      {active === 3 && (
        <Judges
          method={method}
          data={hackathonData.criteria}
          setJudgeData={setJudgeData}
          movePage={movePage}
        />
      )}
      {active === 4 && (
        <Schedule
          method={method}
          data={hackathonData.schedule}
          handleCreateHackathon={ev => handleCreateHackathon(ev)}
          submit={submit}
          setSubmit={setsubmit}
        />
      )}
    </View>
  );
};

export default Index;

const styles = StyleSheet.create({
  parent: {
    flex: 1,
  },
  screenName: {
    fontSize: Sizes.normal * 1.1,
  },
  scroll: {
    marginTop: Height * 0.025,
    marginHorizontal: Width * 0.04,
    borderColor: 'transparent',
    height: Height * 0.06,
  },
  container: {
    width: Width * 0.3,
    paddingHorizontal: 5,
    // marginVertical: 2,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
});
