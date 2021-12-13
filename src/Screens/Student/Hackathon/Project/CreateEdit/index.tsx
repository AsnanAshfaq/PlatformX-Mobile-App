/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {FC, useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  FlatList,
  ToastAndroid,
} from 'react-native';
import CustomHeader from '../../../../../Components/CustomHeader';
import {Height, Sizes, Width} from '../../../../../Constants/Size';
import {useStateValue} from '../../../../../Store/StateProvider';
import General from './General';
import Specifications from './Specifications';
//@ts-ignore
import {BASE_URL} from 'react-native-dotenv';
import axios from '../../../../../Utils/Axios';
import ProjectCreate from '../../../../../Modals/Hackathon/ProjectCreate';

type props = {
  navigation: any;
  route: any;
  ID: any;
  method: 'create' | 'edit';
};

const SCREENS = ['General Info', 'Project Specifications'];
const Index: FC<props> = ({navigation, route, ID, method}) => {
  const {theme} = useStateValue()[0];

  const [active, setactive] = useState(0);
  const [submit, setsubmit] = useState(false);

  const [projectData, setprojectData] = useState<any>({
    general: {},
    spevifications: {},
  });
  const [modal, setmodal] = useState(false);

  // get id of the workshop if screen is edit
  useEffect(() => {
    if (method === 'edit') {
      // setID(route.params.ID);
    }
  }, []);

  const movePage = index => setactive(index);

  const setGeneralData = (data: any) => {
    setprojectData(props => {
      return {
        ...props,
        general: data,
      };
    });
  };

  const handleCreateProject = (values: any = {}) => {
    setsubmit(true);

    const bodyFormData = new FormData();
    bodyFormData.append('title', projectData.general.name.value.trim()),
      bodyFormData.append('tag_line', projectData.general.tagLine.value.trim()),
      bodyFormData.append(
        'description',
        projectData.general.description.value.trim(),
      );

    bodyFormData.append('about', projectData.general.about.value.trim());

    for (let i = 0; i < values.built_with.value.length; i++) {
      bodyFormData.append('built_with', values.built_with.value[i]);
    }

    // setsubmit(false);
    bodyFormData.append('links', values.give_it.value.trim());

    bodyFormData.append('video_link', values.video_demo_link.value.trim());

    console.log('File is', values.media.file, ' and logo is', values.logo.file);
    bodyFormData.append('file', values.media.file);
    bodyFormData.append('logo', values.logo.file);

    axios({
      method: 'post',
      url: `${BASE_URL}/api/hackathon/${ID}/project/create/`,
      data: bodyFormData,
      headers: {'Content-Type': 'multipart/form-data'},
    })
      .then(response => {
        if (response.status === 201) {
          ToastAndroid.show(response.data.success, 1500);
        }
        setsubmit(false);
        setmodal(true);
        navigation.goBack();
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
        title={`${method === 'edit' ? 'Edit Project' : 'Create Project'}`}
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
                    width: index !== 1 ? Width * 0.3 : Width * 0.5,
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

      <ProjectCreate isShow={modal} toggleModal={() => setmodal(false)} />

      {active === 0 && (
        <General
          method={method}
          data={projectData.general}
          setGeneralData={data => setGeneralData(data)}
          movePage={movePage}
        />
      )}
      {active === 1 && (
        <Specifications
          method={method}
          data={projectData.spevifications}
          handleCreateProject={data => {
            console.log(typeof data);
            console.log('Data is', data);
            handleCreateProject(data);
          }}
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
    paddingHorizontal: 5,
    // marginVertical: 2,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
});
