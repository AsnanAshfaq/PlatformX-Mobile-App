import React, {FC} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import CustomHeader from '../../Components/CustomHeader';
import {Height, Sizes, Width} from '../../Constants/Size';
import {useStateValue} from '../../Store/StateProvider';
import {ForwardArrow} from '../../Components/Icons';

type props = {
  navigation: any;
};

type cardProps = {
  title: string;
  description: string;
  onPress: () => void;
};

const Card: FC<cardProps> = ({title, description, onPress}) => {
  const {theme} = useStateValue()[0];

  return (
    <TouchableOpacity
      style={[
        styles.cardContainer,
        {backgroundColor: theme.CARD_BACKGROUND_COLOR},
      ]}
      activeOpacity={0.5}
      onPress={onPress}>
      <View
        style={[
          styles.cardTitleContainer,
          {backgroundColor: theme.SCREEN_BACKGROUND_COLOR},
        ]}>
        <Text style={[styles.cardTitleText, {color: theme.TEXT_COLOR}]}>
          {title}
        </Text>
      </View>
      <View style={[styles.cardDescriptionContainer, {}]}>
        <Text style={[styles.cardDescText, {color: theme.TEXT_COLOR}]}>
          {description}
        </Text>
      </View>
      <View style={[styles.buttonContainer]}>
        <ForwardArrow size={1.5} color={theme.GREEN_COLOR} />
      </View>
    </TouchableOpacity>
  );
};
const Create: FC<props> = ({navigation}) => {
  const {theme} = useStateValue()[0];
  return (
    <View
      style={[styles.parent, {backgroundColor: theme.SCREEN_BACKGROUND_COLOR}]}>
      <CustomHeader title={'Create'} navigation={navigation} drawer bell />
      <ScrollView style={styles.scroll}>
        <Card
          title={'Hackathon'}
          description={`Hackathons are taking over the world! Make yours run better and show the world what gets made at your event.${'\n'}START HOSTING YOUR HACKATHON NOW.`}
          onPress={() =>
            navigation.navigate('HackahtonScreens', {
              screen: 'Create_Edit_Hackathon',
              params: {
                method: 'create',
              },
            })
          }
        />
        <Card
          title={'Workshop'}
          description={`Structured, design-thinking workshops created in minutes: facilitate inclusive, productive, and engaging sessions with confidence.${'\n'}START SCHEDULING YOUR WORKSHOPS NOW.`}
          onPress={() =>
            navigation.navigate('WorkshopScreens', {
              screen: 'Create_Edit_Workshop',
              params: {
                method: 'create',
              },
            })
          }
        />
        <Card
          title={`F.Y.P${"'"}s`}
          description={`Have an idea of Final Year Project for Computer Science Students? Post your idea, make a coding test, find out participants who you want to work with and start collaborating.${'\n'}START DEVELOPNG YOUR PROJECT NOW`}
          onPress={() =>
            navigation.navigate('FYPScreens', {
              screen: 'Create_Edit_FYP',
              params: {
                method: 'create',
              },
            })
          }
        />
        <Card
          title={'Internship'}
          description={`Internships are a great way to start exploring talent among the freshly experienced developers.${'\n'}START HOSTING YOUR INTERNSHIP NOW  !!!`}
          onPress={() =>
            navigation.navigate('InternshipScreens', {
              screen: 'Create_Edit_Internship',
              params: {
                method: 'create',
              },
            })
          }
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  parent: {
    flex: 1,
  },
  scroll: {
    paddingTop: Height * 0.02515,
    marginBottom: 10,
  },
  cardContainer: {
    marginHorizontal: Width * 0.06,
    marginVertical: Height * 0.02515,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'transparent',
  },
  cardTitleContainer: {
    width: Width * 0.34,
    paddingHorizontal: 6,
    paddingVertical: 4,
    borderRadius: 8,
    borderColor: 'transparent',
    position: 'absolute',
    top: -(Height * 0.0253),
    alignItems: 'center',
    // justifyContent:'center',
    left: Width * 0.27, //3
    flex: 1,
    // elevation: 14,
  },
  cardTitleText: {
    fontSize: Sizes.normal * 1.3,
  },
  cardDescriptionContainer: {
    // flex: 1,
    marginRight: 24,
    marginLeft: 20,
    marginTop: 30,
    marginBottom: 10,
  },
  cardDescText: {
    fontSize: Sizes.normal * 0.88,
    lineHeight: 22,
    textAlign: 'center',
  },
  buttonContainer: {
    width: 40,
    height: 40,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'transparent',
    alignItems: 'flex-end',
    position: 'absolute',
    right: -(Width * 0.0343),
    top: Height * 0.06,
  },
});
export default Create;
