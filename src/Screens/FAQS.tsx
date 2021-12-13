/* eslint-disable react-native/no-inline-styles */
import React, {FC, useState} from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import CustomHeader from '../Components/CustomHeader';
import HelpText from '../Components/HelpText';
import {Sizes, Width} from '../Constants/Size';
import Navigation from '../Navigations';
import {useStateValue} from '../Store/StateProvider';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LottieView from 'lottie-react-native';

const STUDENT_FAQS_LIST = [
  {
    id: 0,
    title: 'How am I going to get selected for a Final Year Project?',
    description:
      "Final Year Projects are being hosted by major organizations. First you need to appy for a FYP (Final Year Project) based on your interest. Then, an online coding test will be scheduled for you and we will send you the email containing some instructions. You need to give the test under it's deadline. At the end, organizations will filter out candidates based on their test performance as well as their portoflio.",
  },
  {
    id: 1,
    title: 'How should I pay to participate in a Workshop?',
    description:
      'You need to have a stripe account in order to participate in paid workshops.',
  },
  {
    id: 2,
    title: 'How will i know when the workshop starts?',
    description:
      'We will send you email containing instructions to join the workshop when the workshop starts',
  },
];

const ORGANIZATION_FAQS_LIST = [
  {
    id: 0,
    title: 'How am I going to get selected for a Final Year Project?',
    description:
      "Final Year Projects are being hosted by major organizations. First you need to appy for a FYP (Final Year Project) based on your interest. Then, an online coding test will be scheduled for you and we will send you the email containing some instructions. You need to give the test under it's deadline. At the end, organizations will filter out candidates based on their test performance as well as their portoflio.",
  },
  {
    id: 1,
    title: 'How should I pay to participate in a Workshop?',
    description:
      'You need to have a stripe account in order to participate in paid workshops.',
  },
];

type Props = {
  title: string;
  description: string;
  isShow: boolean;
  onPress: () => void;
};

const Card: FC<Props> = ({title, description, isShow, onPress}) => {
  const {theme} = useStateValue()[0];

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.5}
      style={[
        styles.margin,
        styles.card,
        {
          backgroundColor: theme.CARD_BACKGROUND_COLOR,
        },
      ]}>
      <View style={{flexDirection: 'row', paddingBottom: !isShow ? 13 : 0}}>
        <View style={[styles.container, {marginLeft: 10, flex: 0.9}]}>
          <Text style={[styles.titleText, {color: theme.TEXT_COLOR}]}>
            {title}
          </Text>
        </View>
        <View
          style={[{justifyContent: 'flex-start', flex: 0.1, marginTop: 10}]}>
          <Ionicons
            name={isShow === false ? 'caret-down-outline' : 'caret-up-outline'}
            size={Width * 0.054}
            color={theme.ICON_COLOR}
          />
        </View>
      </View>
      {isShow && (
        <View style={[styles.container, styles.descContainer]}>
          <Text style={[styles.descText, {color: theme.DIM_TEXT_COLOR}]}>
            {description}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const Animation: FC = () => {
  const {theme} = useStateValue()[0];

  return (
    <>
      {/* lottie animation  */}
      <View style={styles.animationContainer}>
        <LottieView
          source={require('../../assets/lottie/faq.json')}
          style={styles.animation}
          autoPlay
          loop={true}
          autoSize
          resizeMode={'cover'}
          colorFilters={[
            {
              keypath: 'Ebene 1 Konturen 3',
              color: theme.GREEN_COLOR,
            },
            {
              keypath: 'Mask 2',
              color: theme.GREEN_COLOR,
            },
            {
              keypath: 'Ebene 1 Konturen 2',
              color: theme.GREEN_COLOR,
            },
            {
              keypath: 'Mask',
              color: theme.GREEN_COLOR,
            },
            {
              keypath: 'Ebene 1 Konturen',
              color: theme.GREEN_COLOR,
            },
            {
              keypath: 'Ebene 1/Faq Konturen',
              color: theme.GREEN_COLOR,
            },
          ]}
        />
      </View>
    </>
  );
};

type props = {
  navigation: any;
  route: any;
};
const FAQS: FC<props> = ({navigation, route}) => {
  const {theme} = useStateValue()[0];

  const [showIndex, setshowIndex] = useState<number>();

  const {source} = route.params;

  const handlePress = id => {
    if (showIndex !== id) {
      setshowIndex(id);
    } else {
      setshowIndex(-1);
    }
    // setshowIndex(id);
  };
  return (
    <View
      style={[styles.parent, {backgroundColor: theme.SCREEN_BACKGROUND_COLOR}]}>
      <CustomHeader
        title={"FAQ's"}
        navigation={navigation}
        back
        onBackPress={() => navigation.goBack()}
      />
      <View style={[styles.container, styles.margin]}>
        <HelpText
          text={"Here are some of the Frequently Asked Questions (FAQ's)."}
        />
      </View>

      <FlatList
        data={
          source === 'organization' ? ORGANIZATION_FAQS_LIST : STUDENT_FAQS_LIST
        }
        ListHeaderComponent={() => <Animation />}
        keyExtractor={(item, index) => `${item} - ${index}`}
        renderItem={({item, index}) => (
          <Card
            {...item}
            onPress={() => handlePress(index)}
            isShow={index === showIndex ? true : false}
          />
        )}
      />
    </View>
  );
};

export default FAQS;

const styles = StyleSheet.create({
  parent: {
    flex: 1,
  },
  scroll: {
    marginHorizontal: Width * 0.04,
    marginBottom: 10,
  },
  margin: {
    marginHorizontal: Width * 0.04,
  },
  container: {
    marginTop: 10,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  smallText: {
    fontSize: Sizes.normal * 0.66,
  },
  animationContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  animation: {
    width: Width * 0.7,
    height: Width * 0.7,
  },
  card: {
    marginHorizontal: Width * 0.04,
    marginVertical: Width * 0.03,
    borderRadius: 10,
  },
  titleText: {
    fontSize: Sizes.normal * 0.9,
    flexShrink: 1,
    lineHeight: 22,
    fontWeight: 'bold',
  },
  descContainer: {
    // marginLeft: Width * 0.04,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
  },
  descText: {
    fontSize: Sizes.normal * 0.85,
    lineHeight: 22,
  },
});
