/* eslint-disable no-sparse-arrays */
import React, {FC, useState} from 'react';
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
import {hackathonFilterData} from '../Constants/sample';
import CheckBox from '../Components/CheckBox';
import {useStateValue} from '../Store/StateProvider';
import Divider from '../Components/Divider';
const ALLOWED_FILE_TYPE = [
  {
    key: 'APK',
    isSelected: false,
  },
  {
    key: 'BIN',
    isSelected: false,
  },
  {
    key: 'CSV',
    isSelected: false,
  },
  {
    key: 'DOC',
    isSelected: false,
  },
  {
    key: 'EXE',
    isSelected: false,
  },
  {
    key: 'GIF',
    isSelected: false,
  },
  {
    key: 'JPEG',
    isSelected: false,
  },
  {
    key: 'JPG',
    isSelected: false,
  },
  {
    key: 'MP4',
    isSelected: false,
  },
  {
    key: 'PDF',
    isSelected: false,
  },
  {
    key: 'PNG',
    isSelected: false,
  },
  {
    key: 'PPT',
    isSelected: false,
  },
  {
    key: 'PPS',
    isSelected: false,
  },
  {
    key: 'TIFF',
    isSelected: false,
  },
  {
    key: 'XLS',
    isSelected: false,
  },
  {
    key: 'ZIP',
    isSelected: false,
  },
  ,
];

type props = {
  isShow: boolean;
  toggleModal: () => void;
  onSelect: (values: Array<string>) => void;
  // Data: Array<any>;
};

const FilterModal: FC<props> = ({isShow, toggleModal, onSelect}) => {
  const [selected, setselected] = useState(ALLOWED_FILE_TYPE);

  const [{theme}, dispatch] = useStateValue();

  const handleSelect = () => {
    // get all the selected file types
    // pass the file types to onSelect function
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
            File Type{' '}
          </Text>
        </View>
        <Divider size={'medium'} />
        <FlatList
          data={ALLOWED_FILE_TYPE}
          numColumns={2}
          keyExtractor={(item, index) => `${item?.key} -${index}`}
          contentContainerStyle={styles.scroll}
          renderItem={({item: filetype}) => (
            <View key={filetype?.key} style={[styles.container]}>
              {/* label of the filter  */}
              <View style={styles.checkBoxContainer}>
                <CheckBox
                  onPress={isChecked =>
                    console.log(`${filetype?.key} is ${isChecked}`)
                  }
                  size={20}
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
                  {filetype?.key}
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

              handleSelect();
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
    marginVertical: Height * 0.22,
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
    marginHorizontal: Width * 0.05,
    // marginVertical: 5,
  },
  tag: {
    fontSize: Sizes.normal * 0.8,
    marginRight: 30,
    padding: 3,
  },
  container: {
    flexDirection: 'row',
    flex: 1,
    marginTop: 10,
    marginLeft: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkBoxContainer: {
    flex: 0.4,
    alignItems: 'flex-end',
  },
  textContainer: {
    flex: 0.5,
    alignItems: 'flex-start',
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
export default FilterModal;
