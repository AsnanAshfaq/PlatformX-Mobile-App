/* eslint-disable react-native/no-inline-styles */
import React, {FC, useEffect, useState} from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import {Height, Sizes, Width} from '../Constants/Size';
import {useStateValue} from '../Store/StateProvider';
import CustomHeader from './CustomHeader';
// import {useStateValue} from '../../../../Store/StateProvider';

type props = {
  navigation: any;
  ID: string;
  source: 'student' | 'organization';
};
const ViewResult: FC<props> = ({ID, navigation}) => {
  const {theme} = useStateValue()[0];

  const handlePress = () => {
    console.log('Pressed on touchable opacity');
  };

  return (
    <View
      style={[
        styles.parent,
        {
          backgroundColor: theme.SCREEN_BACKGROUND_COLOR,
        },
      ]}>
      {/* <CustomHeader
        title={'Result'}
        navigation={navigation}
        back
        onBackPress={() => navigation.goBack()}
      /> */}
      <View
        style={[
          styles.marginVertical,
          styles.winnerCard,
          styles.center,
          {backgroundColor: theme.CARD_BACKGROUND_COLOR},
        ]}>
        <Text style={[styles.heading, {color: theme.TEXT_COLOR}]}>
          WINNING PROJECTS
        </Text>
      </View>

      {/* cards */}
      <View style={[styles.marginVertical, {flexDirection: 'row'}]}>
        {/* 3rd position  card*/}
        <TouchableOpacity
          style={[
            styles.card,
            styles.center,
            {
              borderColor: theme.CARD_BACKGROUND_COLOR,
              padding: 7,
              position: 'absolute',
              marginTop: 10,
              marginLeft: Width * 0.011,
              borderLeftWidth: 1,
              borderBottomWidth: 1,
              borderRadius: 10,
              borderTopWidth: 1,
              width: Width * 0.29,
              height: Height * 0.2,
            },
          ]}
          onPress={() => handlePress()}>
          <Text
            style={[
              {
                color: theme.TEXT_COLOR,
                flexShrink: 1,
                fontSize: Sizes.normal * 0.8,
              },
            ]}>
            3rd
          </Text>
          <Image
            source={{
              uri:
                'https://images.unsplash.com/photo-1572177812156-58036aae439c?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cHJvamVjdHN8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80',
            }}
            style={{
              borderRadius: 40,
              width: Width * 0.14,
              height: Width * 0.14,
              marginVertical: 5,
            }}
          />
          <Text
            style={[{color: theme.TEXT_COLOR, fontSize: Sizes.normal * 0.7}]}>
            Face Recognition
          </Text>
        </TouchableOpacity>
        {/* 1st position card*/}
        <TouchableOpacity
          style={[
            styles.card,
            styles.center,
            {
              borderColor: theme.CARD_BACKGROUND_COLOR,
              //   padding: 20,
              paddingVertical: 20,
              position: 'absolute',
              marginLeft: Width * 0.295,
              borderWidth: 1,
              borderRadius: 10,
              width: Width * 0.41,
              height: Height * 0.25,
            },
          ]}
          onPress={() => handlePress()}>
          <Text
            style={[{fontSize: Sizes.normal * 1.4, color: theme.TEXT_COLOR}]}>
            1st
          </Text>
          <Image
            source={{
              uri:
                'https://images.unsplash.com/photo-1572177812156-58036aae439c?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cHJvamVjdHN8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80',
            }}
            style={{
              borderRadius: 40,
              width: Width * 0.2,
              height: Width * 0.2,
              marginVertical: 10,
            }}
          />
          <Text style={[{fontSize: Sizes.normal, color: theme.TEXT_COLOR}]}>
            Chat Bot
          </Text>
        </TouchableOpacity>
        {/* 2nd position card */}
        <TouchableOpacity
          style={[
            styles.card,
            styles.center,
            {
              borderColor: theme.CARD_BACKGROUND_COLOR,
              padding: 7,
              position: 'absolute',
              marginTop: 10,
              marginLeft: Width * 0.7,
              borderRightWidth: 1,
              borderBottomWidth: 1,
              borderRadius: 10,
              borderTopWidth: 1,
              width: Width * 0.29,
              height: Height * 0.2,
            },
          ]}
          onPress={() => handlePress()}>
          <Text style={[{color: theme.TEXT_COLOR, fontSize: Sizes.normal}]}>
            2nd
          </Text>
          <Image
            source={{
              uri:
                'https://images.unsplash.com/photo-1572177812156-58036aae439c?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cHJvamVjdHN8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80',
            }}
            style={{
              borderRadius: 40,
              width: Width * 0.17,
              height: Width * 0.17,
              marginVertical: 5,
            }}
          />
          <Text
            style={[
              {
                color: theme.TEXT_COLOR,
                fontSize: Sizes.normal * 0.8,
              },
            ]}>
            Automated System
          </Text>
        </TouchableOpacity>
      </View>
      <View
        style={[
          styles.marginVertical,
          styles.winnerCard,
          styles.center,
          {
            backgroundColor: theme.CARD_BACKGROUND_COLOR,
            marginTop: Height * 0.25,
          },
        ]}>
        <Text style={[styles.heading, {color: theme.TEXT_COLOR}]}>WINNERS</Text>
      </View>

      <View style={[styles.marginVertical]}>
        {/* 3rd position  card*/}
        <TouchableOpacity
          style={[
            styles.card,
            styles.center,
            {
              borderColor: theme.CARD_BACKGROUND_COLOR,
              padding: 7,
              position: 'absolute',
              marginTop: 10,
              marginLeft: Width * 0.011,
              borderLeftWidth: 1,
              borderBottomWidth: 1,
              borderRadius: 10,
              borderTopWidth: 1,
              width: Width * 0.29,
              height: Height * 0.2,
            },
          ]}
          onPress={() => handlePress()}>
          <Text
            style={[
              {
                color: theme.TEXT_COLOR,
                flexShrink: 1,
                fontSize: Sizes.normal * 0.8,
              },
            ]}>
            3rd
          </Text>
          <Image
            source={{
              uri:
                'https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8cGVyc29ufGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80',
            }}
            style={{
              borderRadius: 40,
              width: Width * 0.14,
              height: Width * 0.14,
              marginVertical: 5,
            }}
          />
          <Text
            style={[{color: theme.TEXT_COLOR, fontSize: Sizes.normal * 0.7}]}>
            Zain ul Tariq
          </Text>
        </TouchableOpacity>
        {/* 1st position card*/}
        <TouchableOpacity
          style={[
            styles.card,
            styles.center,
            {
              borderColor: theme.CARD_BACKGROUND_COLOR,
              //   padding: 20,
              paddingVertical: 20,
              position: 'absolute',
              marginLeft: Width * 0.295,
              borderWidth: 1,
              borderRadius: 10,
              width: Width * 0.41,
              height: Height * 0.25,
            },
          ]}
          onPress={() => handlePress()}>
          <Text
            style={[{fontSize: Sizes.normal * 1.4, color: theme.TEXT_COLOR}]}>
            1st
          </Text>
          <Image
            source={{
              uri:
                'https://img.freepik.com/free-photo/mand-holding-cup_1258-340.jpg?size=626&ext=jpg',
            }}
            style={{
              borderRadius: 40,
              width: Width * 0.2,
              height: Width * 0.2,
              marginVertical: 10,
            }}
          />
          <Text style={[{fontSize: Sizes.normal, color: theme.TEXT_COLOR}]}>
            Saqib Zaman
          </Text>
        </TouchableOpacity>
        {/* 2nd position card */}
        <TouchableOpacity
          style={[
            styles.card,
            styles.center,
            {
              borderColor: theme.CARD_BACKGROUND_COLOR,
              padding: 7,
              position: 'absolute',
              marginTop: 10,
              marginLeft: Width * 0.7,
              borderRightWidth: 1,
              borderBottomWidth: 1,
              borderRadius: 10,
              borderTopWidth: 1,
              width: Width * 0.29,
              height: Height * 0.2,
            },
          ]}
          onPress={() => handlePress()}>
          <Text style={[{color: theme.TEXT_COLOR, fontSize: Sizes.normal}]}>
            2nd
          </Text>
          <Image
            source={{
              uri:
                'https://media.istockphoto.com/photos/learn-to-love-yourself-first-picture-id1291208214?b=1&k=20&m=1291208214&s=170667a&w=0&h=sAq9SonSuefj3d4WKy4KzJvUiLERXge9VgZO-oqKUOo=',
            }}
            style={{
              borderRadius: 40,
              width: Width * 0.17,
              height: Width * 0.17,
              marginVertical: 5,
            }}
          />
          <Text
            style={[
              {
                color: theme.TEXT_COLOR,
                fontSize: Sizes.normal * 0.8,
              },
            ]}>
            Saif Waheed Raja
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ViewResult;

const styles = StyleSheet.create({
  parent: {
    flex: 1,
  },
  container: {
    marginTop: 10,
  },
  winnerCard: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    marginTop: 10,
    marginHorizontal: Width * 0.15,
    paddingVertical: 10,
    borderRadius: 10,
  },
  heading: {
    fontSize: Sizes.normal * 1.25,
  },
  smallText: {
    fontSize: Sizes.normal * 0.66,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  margin: {
    marginHorizontal: Width * 0.04,
  },
  marginVertical: {
    marginVertical: Height * 0.028,
  },
  projectImage: {
    borderRadius: 40,
    width: Width * 0.15,
    height: Width * 0.15,
  },
  card: {
    // marginHorizontal: 10,
    flexDirection: 'column',
  },
  projectText: {
    fontSize: Sizes.normal,
  },
});
