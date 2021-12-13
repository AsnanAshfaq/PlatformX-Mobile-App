import React, {FC, useState} from 'react';
import {StyleSheet, Text, View, Switch, TouchableOpacity} from 'react-native';
import CustomHeader from '../../../Components/CustomHeader';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {Height, Sizes, Width} from '../../../Constants/Size';
import {useStateValue} from '../../../Store/StateProvider';
import Axios from '../../../Utils/Axios';

type cardProps = {
  IconComponent: FC;
  title: string;
  description: string;
  onPress: () => void;
};

const ICON_SIZE = Width * 0.07;

const Card: FC<cardProps> = ({IconComponent, title, description, onPress}) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [{theme}, dispatch] = useStateValue();

  return (
    <TouchableOpacity activeOpacity={0.5} onPress={onPress}>
      <View
        style={[
          styles.cardParent,
          styles.container,
          {
            backgroundColor: theme.CARD_BACKGROUND_COLOR,
          },
        ]}>
        <View style={{flex: 0.2, alignItems: 'center'}}>
          <IconComponent />
        </View>
        <View style={{flex: 0.7}}>
          <Text style={[styles.cardTitleText, {color: theme.TEXT_COLOR}]}>
            {title}
          </Text>
          <Text style={[styles.cardDescText, {color: theme.DIM_TEXT_COLOR}]}>
            {description}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

type props = {
  navigation: any;
};
const Index: FC<props> = ({navigation}) => {
  const [{theme}, dispatch] = useStateValue();

  const handleThemePress = () => {
    navigation.navigate('Theme');
  };
  return (
    <View
      style={[
        styles.parent,
        {
          backgroundColor: theme.SCREEN_BACKGROUND_COLOR,
        },
      ]}>
      {/* header  */}
      <CustomHeader
        title="Settings"
        onBackPress={() => navigation.goBack()}
        navigation={navigation}
        back
      />
      {/* account settings  */}

      {/* <Card
        IconComponent={() => (
          <MaterialCommunityIcons
            name={'shield-account'}
            size={ICON_SIZE}
            color={theme.TAB_BAR_ACTIVE_COLOR}
            // style={styles.iconPadding}
          />
        )}
        title={'Activate/Deactivate Account'}
        description={'You can activate/deactivate account'}
        onPress={() =>
          Axios.post('/user/activate/')
            .then(response => console.log(response.data))
            .catch(error => {
              console.log(error.response.data.error);
            })
        }
      /> */}
      {/* theme settings  */}
      <Card
        IconComponent={() => (
          <FontAwesome
            name={'paint-brush'}
            size={ICON_SIZE}
            color={theme.GREEN_COLOR}
            // style={styles.iconPadding}
          />
        )}
        title={'Themes'}
        description={
          'Customize theme of the application based on your preference.'
        }
        onPress={handleThemePress}
      />

      {/* notification settings  */}
      <Card
        IconComponent={() => (
          <Entypo name={'bell'} size={ICON_SIZE} color={theme.GREEN_COLOR} />
        )}
        title={'Notifications'}
        description={'Manage your mail notifications.'}
        onPress={() => console.log('Setting notifications on/off')}
      />
    </View>
  );
};

export default Index;

const styles = StyleSheet.create({
  parent: {
    flex: 1,
  },
  container: {
    marginVertical: 10,
  },
  cardParent: {
    width: Width * 0.9,
    paddingVertical: 10,
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
});
