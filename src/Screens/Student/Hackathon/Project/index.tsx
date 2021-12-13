/* eslint-disable react-hooks/exhaustive-deps */
import React, {FC, useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import CustomHeader from '../../../../Components/CustomHeader';
import {ForwardArrow, Pencil} from '../../../../Components/Icons';
import Loading from '../../../../Components/Loading';
import {Sizes, Width} from '../../../../Constants/Size';
import {useStateValue} from '../../../../Store/StateProvider';
import axios from '../../../../Utils/Axios';
import CreateEditProject from './CreateEdit/index';
import ViewProject from './View';
type props = {
  navigation: any;
  route: any;
};
const Index: FC<props> = ({navigation, route}) => {
  const {theme} = useStateValue()[0];
  const [method, setmethod] = useState('');

  const [active, setactive] = useState<'view' | 'edit' | ''>('');
  const [projectID, setprojectID] = useState('');
  const [loading, setloading] = useState(true);
  const {ID} = route.params;

  const getData = async () => {
    setloading(true);
    axios
      .get(`/api/hackathon/${ID}/project`)
      .then(response => {
        if (response.data.success) {
          setmethod('edit');
          setprojectID(response.data.id);
        } else if (response.data.not_found) {
          setmethod('create');
        }
        setloading(false);
      })
      .catch(error => {
        setloading(false);
      });
  };
  useEffect(() => {
    // get user project
    getData();
  }, []);

  if (loading) {
    <View style={[styles.parent, styles.center]}>
      <Loading size={'large'} />
    </View>;
  }

  console.log('Active state is', active);
  return (
    <View
      style={[
        styles.parent,
        {
          backgroundColor: theme.SCREEN_BACKGROUND_COLOR,
        },
      ]}>
      {method === 'create' ? (
        <CreateEditProject
          navigation={navigation}
          route={route}
          method={'create'}
          ID={ID}
        />
      ) : (
        <>
          {active === '' && (
            <CustomHeader
              navigation={navigation}
              title={`${active === '' ? 'My Project' : 'View Project'}`}
              onBackPress={() => navigation.goBack()}
              back
            />
          )}

          {active === 'view' ? (
            <ViewProject
              hackathonID={ID}
              projectID={projectID}
              navigation={navigation}
            />
          ) : active === 'edit' ? (
            <CreateEditProject
              navigation={navigation}
              route={route}
              method={'edit'}
              ID={ID}
            />
          ) : (
            <View style={[styles.container]}>
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => setactive('view')}>
                <View
                  style={[
                    styles.cardParent,
                    styles.container,
                    {
                      backgroundColor: theme.CARD_BACKGROUND_COLOR,
                    },
                  ]}>
                  <View style={{flex: 0.2, alignItems: 'center'}}>
                    <ForwardArrow color={theme.GREEN_COLOR} size={1.1} />
                  </View>
                  <View style={{flex: 0.7, justifyContent: 'center'}}>
                    <Text
                      style={[
                        styles.cardTitleText,
                        {color: theme.DIM_TEXT_COLOR},
                      ]}>
                      View Project
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => setactive('edit')}>
                <View
                  style={[
                    styles.cardParent,
                    styles.container,
                    {
                      backgroundColor: theme.CARD_BACKGROUND_COLOR,
                    },
                  ]}>
                  <View style={{flex: 0.2, alignItems: 'center'}}>
                    <Pencil color={theme.GREEN_COLOR} size={1.1} />
                  </View>
                  <View style={{flex: 0.7, justifyContent: 'center'}}>
                    <Text
                      style={[
                        styles.cardTitleText,
                        {color: theme.DIM_TEXT_COLOR},
                      ]}>
                      Edit Project
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          )}
        </>
      )}
    </View>
  );
};

export default Index;

const styles = StyleSheet.create({
  parent: {
    flex: 1,
  },
  scroll: {
    flex: 1,
    marginHorizontal: Width * 0.04,
    marginVertical: 10,
  },
  container: {
    marginTop: 10,
  },
  iconContainer: {
    flex: 0.2,
  },
  cardParent: {
    width: Width * 0.9,
    paddingVertical: 15,
    marginHorizontal: Width * 0.04,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
  },
  cardTitleText: {
    fontSize: Sizes.normal * 1.1,
  },
  cardDescText: {
    fontSize: Sizes.normal * 0.85,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  smallText: {
    fontSize: Sizes.normal * 0.66,
  },
  normalText: {
    fontSize: Sizes.normal,
  },
});
