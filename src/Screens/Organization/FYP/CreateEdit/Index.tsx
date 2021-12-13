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
import General from './General';
import Test from './Test';
import Axios from '../../../../Utils/Axios';
import Create from '../../../../Modals/FYP/Create';
type props = {
  navigation: any;
  route: any;
};

const SCREENS = ['General', 'Test'];
const Index: FC<props> = ({navigation, route}) => {
  const {theme} = useStateValue()[0];
  const {method}: {method: 'edit' | 'create'} = route.params;
  const [active, setactive] = useState(0);
  const [FYPID, setFYPID] = useState('');
  const [submit, setsubmit] = useState(false);
  const [fypData, setFYPData] = useState<any>({
    general: {},
    test: {},
  });
  const [modal, setmodal] = useState(false);

  const movePage = index => setactive(index);

  const setGeneralData = (data: any) => {
    setFYPData(props => {
      return {
        ...props,
        general: data,
      };
    });
  };

  const handleFYPCreate = (
    test_name: string,
    test_description: string,
    test_end_date: Date,
  ) => {
    // make loading to true
    setsubmit(true);
    var date = fypData.general.end_date.value;
    const end_date =
      date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();

    Axios.post('/api/fyp/create/', {
      name: fypData.general.name.value.trim(),
      description: fypData.general.description.value.trim(),
      category: fypData.general.category.value,
      technologies: fypData.general.techonologies.value,
      outcomes: fypData.general.learning_outcome.value,
      end_date: end_date,
    })
      .then(response => {
        if (response.status === 201) {
          // make axios request for test
          var end_value = test_end_date;
          const t_end_date =
            end_value.getFullYear() +
            '-' +
            (end_value.getMonth() + 1) +
            '-' +
            end_value.getDate();

          Axios.post('/api/test/create/', {
            name: test_name,
            description: test_description,
            end_date: t_end_date,
            fyp_id: response.data.id,
          });
        }
      })
      .then(() => {
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
        title={'Host FYP'}
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
                    if (method !== 'create') {
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
          movePage={movePage}
          method={method}
          data={fypData.general}
          setGeneralData={setGeneralData}
        />
      )}

      {active === 1 && (
        <Test
          FYPDate={fypData.general.end_date.value}
          handleFYPCreate={handleFYPCreate}
          submit={submit}
          method={method}
          setSubmit={setsubmit}
          FYPID={FYPID}
          data={fypData.test}
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
    width: Width * 0.4,
    paddingHorizontal: 5,
    // marginVertical: 2,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
});
