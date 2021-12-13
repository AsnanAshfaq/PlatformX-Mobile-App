/* eslint-disable no-sparse-arrays */
import React, {FC, useState, useEffect} from 'react';
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
import CheckBox from '../Components/CheckBox';
import {useStateValue} from '../Store/StateProvider';
import Divider from '../Components/Divider';

const CITIES = [
  'Islamabad',
  'Karachi',
  'Lahore',
  'Faisalabad',
  'Rawalpindi',
  'Multan',

  'Hyderabad',
  'Gujranwala',
  'Quetta',
  'Muzaffarabad',
];

type props = {
  isShow: boolean;
  setlocation: (value: string) => void;
  toggleModal: () => void;
  // Data: Array<any>;
};

const LocationModal: FC<props> = ({isShow, toggleModal, setlocation}) => {
  const [{theme}, dispatch] = useStateValue();

  const handleSelect = value => {
    setlocation(value);
  };

  const [isChecked, setisChecked] = useState({
    value: '',
  });

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
            Locations
          </Text>
        </View>
        <Divider size={'medium'} />
        <FlatList
          data={CITIES}
          numColumns={2}
          keyExtractor={(item, index) => `${index}`}
          contentContainerStyle={styles.scroll}
          renderItem={({item: location, index}) => (
            <View key={index} style={[styles.container]}>
              <View style={styles.checkBoxContainer}>
                <CheckBox
                  onPress={isChecked =>
                    setisChecked({
                      value: location,
                    })
                  }
                  isChecked={isChecked.value === location ? true : false}
                  size={20}
                  disableBuiltInState
                />
              </View>
              <View style={styles.textContainer}>
                <Text
                  style={[
                    styles.tag,
                    {
                      color: theme.TEXT_COLOR,
                    },
                  ]}>
                  {location}
                </Text>
              </View>
            </View>
          )}
        />
        {/* done button  */}
        <View style={styles.applyButtonContainer}>
          <TouchableOpacity
            onPress={() => {
              // toggle modal first
              toggleModal();
              handleSelect(isChecked.value);
            }}
            style={[
              styles.applyButton,
              {
                backgroundColor: theme.GREEN_COLOR,
              },
            ]}>
            <Text
              style={[
                styles.apply,
                {
                  color: theme.TEXT_COLOR,
                },
              ]}>
              Done
            </Text>
          </TouchableOpacity>
        </View>
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
    marginVertical: Height * 0.28,
    position: 'absolute',
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
  tag: {
    fontSize: Sizes.normal * 0.85,
    marginRight: 30,
    padding: 3,
    flexShrink: 1,
    lineHeight: 19,
  },
  container: {
    flexDirection: 'row',
    flex: 1,
    marginLeft: Width * 0.05,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkBoxContainer: {
    flex: 0.2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    flex: 0.8,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  applyButtonContainer: {
    // minHeight: Height * 0.05,
    // maxHeight: Height * 0.07
    flexDirection: 'row',
    marginVertical: 10,
    justifyContent: 'center',
  },
  applyButton: {
    width: Width * 0.35,
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  apply: {
    fontSize: Sizes.normal,
  },
});
export default LocationModal;
