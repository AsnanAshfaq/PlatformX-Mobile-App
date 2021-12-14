import React, {FC, useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native';
import CustomHeader from '../../../Components/CustomHeader';
import {Sizes, Width} from '../../../Constants/Size';
import {useStateValue} from '../../../Store/StateProvider';
import axios from '../../../Utils/Axios';
import CodeStyleSkeleton from '../../../Skeleton/ListSkeleton';
import Divider from '../../../Components/Divider';

type props = {
  navigation: any;
  route: any;
};
const MyCode: FC<props> = ({navigation, route}) => {
  const {theme} = useStateValue()[0];
  const [code, setCode] = useState({
    input: '',
    output: '',
    error: '',
  });
  const [loading, setloading] = useState(true);
  const [error, seterror] = useState('');

  const {ID} = route.params;

  const getData = async () => {
    setloading(true);
    seterror('');

    axios
      .get(`/api/submission/${ID}/`)
      .then(response => {
        // fetching input code

        fetch(response.data.data.result.streams.source.uri)
          .then(res => {
            console.log('Response is', res.text());
            return res.text();
          })
          .then(json => {
            setCode(props => {
              return {
                ...props,
                input: json,
              };
            });
          });

        // fetching output code
        if (response.data.data.result.streams.output !== null) {
          fetch(response.data.data.result.streams.output.uri)
            .then(res => {
              return res.text();
            })
            .then(json => {
              setCode(props => {
                return {
                  ...props,
                  output: json,
                };
              });
              // make loading false
              setloading(false);
            });
        }
        if (response.data.data.result.streams.error !== null) {
          fetch(response.data.data.result.streams.error.uri)
            .then(res => {
              return res.text();
            })
            .then(json => {
              setCode(props => {
                return {
                  ...props,
                  error: json,
                };
              });
              // make loading false
              setloading(false);
            });
        }
      })
      .catch(err => {
        if (err.response) {
          if (err.response.data.not_found) {
            seterror(err.response.data.not_found);
          }
        }
        setloading(false);
        return err.response;
      });
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <View
      style={[
        styles.parent,
        {
          backgroundColor: theme.SCREEN_BACKGROUND_COLOR,
        },
      ]}>
      <CustomHeader
        title={'My Code'}
        navigation={navigation}
        back
        onBackPress={() => navigation.goBack()}
      />
      {!loading && code ? (
        <ScrollView>
          <View style={[styles.scroll]}>
            <View style={[styles.container, {flex: 1}]}>
              <Text style={[styles.heading, {color: theme.TEXT_COLOR}]}>
                Code{' '}
              </Text>

              <View style={[styles.container, styles.codeContainer]}>
                <Text style={[{color: theme.DIM_TEXT_COLOR}]}>
                  {code.input}
                </Text>
              </View>
              <Divider
                size={'large'}
                marginHorizontal={0}
                width={Width * 0.9}
              />
            </View>

            {code.output !== '' && (
              <View style={[styles.container, {flex: 1}]}>
                <Text style={[styles.heading, {color: theme.TEXT_COLOR}]}>
                  Output{' '}
                </Text>
                <View style={[styles.container, styles.codeContainer]}>
                  <Text style={[{color: theme.DIM_TEXT_COLOR}]}>
                    {code.output}
                  </Text>
                </View>
              </View>
            )}
            {code.error !== '' && (
              <View style={[styles.container, {flex: 1}]}>
                <Text style={[styles.heading, {color: theme.ERROR_TEXT_COLOR}]}>
                  Error{' '}
                </Text>
                <View style={[styles.container, styles.codeContainer]}>
                  <Text style={[{color: theme.DIM_TEXT_COLOR}]}>
                    {code.error}
                  </Text>
                </View>
              </View>
            )}
          </View>
        </ScrollView>
      ) : !loading && error !== '' ? (
        <View style={[{flex: 1}, styles.center]}>
          <Text style={[styles.noCodeText, {color: theme.TEXT_COLOR}]}>
            You have not submitted any code
          </Text>
        </View>
      ) : loading ? (
        <View style={[{flex: 1}, styles.center]}>
          <CodeStyleSkeleton repition={5} />
        </View>
      ) : (
        <View style={[{flex: 1}, styles.center]}>
          <Text style={[styles.refreshText, {color: theme.TEXT_COLOR}]}>
            Failed to get your code.{' '}
          </Text>
          <TouchableOpacity onPress={() => setloading(true)}>
            <Text style={[styles.refreshText, {color: theme.GREEN_COLOR}]}>
              Refresh
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default MyCode;

const styles = StyleSheet.create({
  parent: {
    flex: 1,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  scroll: {
    marginHorizontal: Width * 0.04,
    flex: 1,
    flexDirection: 'column',
  },
  container: {
    marginTop: 10,
  },
  codeContainer: {
    flex: 1,
    marginHorizontal: Width * 0.04,
  },
  heading: {
    fontSize: Sizes.normal * 1.1,
  },
  noCodeText: {
    fontSize: Sizes.normal,
  },
  smallText: {
    fontSize: Sizes.normal * 0.66,
  },
  refreshText: {
    fontSize: Sizes.normal,
  },
});
