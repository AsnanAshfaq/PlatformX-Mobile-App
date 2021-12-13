import React, {FC, useState} from 'react';
import {StyleSheet, Text, View, ScrollView, RefreshControl} from 'react-native';
import CustomHeader from '../../Components/CustomHeader';
import NotificationCard from '../../Components/NotificationCard';
import {notificationData} from '../../Constants/sample';
import {Sizes} from '../../Constants/Size';
import {useStateValue} from '../../Store/StateProvider';

type props = {
  navigation: any;
};

const Notification: FC<props> = ({navigation}) => {
  const [Refreshing, setRefreshing] = useState(false);
  const [{theme}, dispatch] = useStateValue();

  const onRefresh = () => {
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  return (
    <View
      style={[styles.parent, {backgroundColor: theme.SCREEN_BACKGROUND_COLOR}]}>
      <CustomHeader
        navigation={navigation}
        title={'Notifications'}
        back
        onBackPress={() => navigation.goBack()}
      />
      <ScrollView
        style={{flex: 1}}
        refreshControl={
          <RefreshControl
            refreshing={Refreshing}
            onRefresh={onRefresh}
            colors={[theme.REFRESH_COLOR]}
            progressBackgroundColor={theme.REFRESHING_BACKGROUND_COLOR}
            progressViewOffset={20}
            size={Sizes.large}
          />
        }>
        <>
          {notificationData.map(notify => (
            <NotificationCard
              notification={notify}
              navigation={navigation}
              key={notify.id}
            />
          ))}
        </>
      </ScrollView>
    </View>
  );
};

export default Notification;

const styles = StyleSheet.create({
  parent: {
    flex: 1,
  },
});
