/* eslint-disable no-sparse-arrays */
import React, {FC, useState, createRef} from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  FlatList,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Modal from 'react-native-modal';
import {Height, Sizes, Width} from '../Constants/Size';
import {useStateValue} from '../Store/StateProvider';
import Divider from '../Components/Divider';
// @ts-ignore
import {LINKEDIN_CLIENT_ID, LINKEDIN_CLIENT_SECRET} from 'react-native-dotenv';
import LinkedInModal from 'react-native-linkedin';
type props = {
  isShow: boolean;
  toggleModal: () => void;
  // Data: Array<any>;
};

const LinkedInSignInModal: FC<props> = ({isShow, toggleModal}) => {
  const [{theme}, dispatch] = useStateValue();
  const ref = createRef<LinkedInModal>();

  const handleSelect = () => {
    // get all the selected technologies
    // onSelect(selected);
  };
  return (
    <Modal
      isVisible={isShow}
      style={[
        styles.Modalparent,
        {
          backgroundColor: theme.MODAL_BACKGROUND_COLOR,
        },
      ]}
      animationIn={'slideInUp'}
      animationInTiming={300}
      animationOut={'slideOutDown'}
      animationOutTiming={200}
      backdropColor={'#575959'}
      backdropOpacity={0.3}
      onBackdropPress={toggleModal}
      onBackButtonPress={toggleModal}
      useNativeDriver={true}
      useNativeDriverForBackdrop={true}>
      <>
        <View style={styles.headingContainer}>
          <Text
            style={[
              styles.heading,
              {
                color: theme.TEXT_COLOR,
              },
            ]}>
            Signing In to Linked In{' '}
          </Text>
        </View>
        <Divider size={'medium'} />

        <View style={styles.container}>
          <LinkedInModal
            ref={ref}
            clientID={LINKEDIN_CLIENT_ID}
            clientSecret={LINKEDIN_CLIENT_SECRET}
            redirectUri={'https://www.google.com/'}
            shouldGetAccessToken
            onSuccess={result =>
              console.log(`"Result is ${result.access_token}"`)
            }
          />
        </View>

        {/* done button  */}
      </>
    </Modal>
  );
};

const styles = StyleSheet.create({
  Modalparent: {
    flex: 1,
    borderRadius: 20,
    borderWidth: 2,
    justifyContent: 'center',
    // alignItems: 'center',
    borderColor: 'transparent',
    marginVertical: Height * 0.16,
  },
  headingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 3,
  },
  heading: {
    fontSize: Sizes.normal * 1.2,
  },
  scroll: {
    marginVertical: 15,
  },
  container: {
    flexDirection: 'row',
    flex: 1,
    marginLeft: Width * 0.05,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default LinkedInSignInModal;
