/* eslint-disable dot-notation */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {FC, useState, useEffect, createRef} from 'react';
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
import General from './General';
import Schedule from './Schedule';
import Speaker from './Speaker';
import Axios from '../../../../Utils/Axios';
import axios from '../../../../Utils/Axios';
//@ts-ignore
import {BASE_URL} from 'react-native-dotenv';

import Create from '../../../../Modals/Workshop/Create';

type props = {
  navigation: any;
  route: any;
};

const SCREENS = ['General', 'Speaker', 'Schedule '];
const Index: FC<props> = ({navigation, route}) => {
  const {theme} = useStateValue()[0];
  const {method}: {method: 'edit' | 'create'} = route.params;
  const [ID, setID] = useState('');
  const [workshopData, setworkshopData] = useState<any>({
    general: {},
    speaker: {},
    schedule: {},
  });

  const [submit, setsubmit] = useState(false);

  const loadingRef = createRef();

  const [active, setactive] = useState(0);
  const [loading, setloading] = useState(false);
  const [modal, setmodal] = useState(false);

  // get id of the workshop if screen is edit
  useEffect(() => {
    if (method === 'edit') {
      setID(route.params.ID);
    }
  }, []);

  const movePage = index => setactive(index);

  useEffect(() => {
    if (method === 'edit') {
      // get workshop data
      Axios.get(`/api/workshop/${ID}/`)
        .then(response => {
          setloading(true);
          // getting general data
          var general = {
            topic: response.data.topic,
            description: response.data.description,
            poster: response.data.poster,
            take_away: response.data.take_away,
            prerequisites: response.data.prerequisites,
            is_paid: response.data.is_paid,
          };
          // is paid or not
          if (response.data.is_paid) {
            general['charges'] = response.data.charges;
          }

          // getting speaker data
          var speaker = {
            name: response.data.speaker.name,
            email: response.data.speaker.email,
            image: response.data.speaker.image,
            about: response.data.speaker.about,
          };

          // getting schedule data
          var schedule = {
            event_date: response.data.event_date,
            start_time: response.data.start_time,
            end_time: response.data.end_time,
          };

          setworkshopData(props => {
            return {
              schedule: schedule,
              speaker: speaker,
              general: general,
            };
          });
          setloading(false);
          // get general data
        })
        .catch(error => {
          if (error.response) {
            ToastAndroid.show(error.response.data.error, 1500);
          }
          return error.response;
        });
    }
  }, [ID, loading]);

  const setGeneralData = (data: any) => {
    setworkshopData(props => {
      return {
        ...props,
        general: data,
      };
    });
  };

  const setSpeakerData = (data: any) => {
    setworkshopData(props => {
      return {
        ...props,
        speaker: data,
      };
    });
  };

  const handleCreateWorkshop = async (event_date, start_time) => {
    const bodyFormData = new FormData();

    bodyFormData.append('topic', workshopData.general.topic.value.trim());
    bodyFormData.append(
      'description',
      workshopData.general.description.value.trim(),
    );
    bodyFormData.append('poster', workshopData.general.poster.file);
    for (let i = 0; i < workshopData.general.take_aways.length; i++) {
      bodyFormData.append(
        'take_away',
        workshopData.general.take_aways[i]['value'],
      );
    }
    for (let i = 0; i < workshopData.general.pre_requisites.length; i++) {
      bodyFormData.append(
        'pre_req',
        workshopData.general.pre_requisites[i]['value'],
      );
    }

    bodyFormData.append('is_paid', workshopData.general.isPaid.value);
    bodyFormData.append(
      'charges',
      workshopData.general.isPaid.value
        ? workshopData.general.charges.value
        : 0,
    );
    bodyFormData.append('name', workshopData.speaker.name.value.trim());
    bodyFormData.append('about', workshopData.speaker.about.value.trim());
    bodyFormData.append('email', workshopData.speaker.email.value.trim());

    bodyFormData.append('image', workshopData.speaker.image.file);
    bodyFormData.append(
      'github',
      workshopData.speaker.social_links.github.value.trim(),
    );
    bodyFormData.append(
      'twitter',
      workshopData.speaker.social_links.twitter.value.trim(),
    );
    bodyFormData.append(
      'linked_in',
      workshopData.speaker.social_links.linked_in.value.trim(),
    );

    bodyFormData.append('event_date', event_date.toISOString().split('T')[0]);
    bodyFormData.append('start_time', start_time.toLocaleTimeString());

    setsubmit(true);
    axios({
      method: 'post',
      url: `${BASE_URL}/api/workshop/create/`,
      data: bodyFormData,
      headers: {'Content-Type': 'multipart/form-data'},
    })
      .then(response => {
        if (response.status === 201) {
          ToastAndroid.show(response.data.success, 1500);
          setsubmit(false);
          setmodal(true);
        }
        setsubmit(false);
      })
      .catch(error => {
        setsubmit(false);
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
        title={`${method === 'edit' ? 'Edit Workshop' : 'Host Workshop'}`}
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
          data={workshopData.general}
          setGeneralData={setGeneralData}
          movePage={movePage}
        />
      )}
      {active === 1 && (
        <Speaker
          method={method}
          data={workshopData.speaker}
          setSpeakerData={setSpeakerData}
          movePage={movePage}
        />
      )}
      {active === 2 && (
        <Schedule
          method={method}
          data={workshopData.schedule}
          handleCreateWorkshop={(ev, st) => handleCreateWorkshop(ev, st)}
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
