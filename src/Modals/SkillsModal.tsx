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

const INTEREST = [
  'React Native',
  'React',
  'Node.js',
  'Flutter',
  'Angular',
  'Django',
  'Vue',
  'Kotlin',
  'HTML',
  'CSS',
  'Python',
  'PHP',
  'Flask',
  'Express.js',
];

type props = {
  isShow: boolean;
  values: any[];
  toggleModal: () => void;
  onSelect: (values: any) => void;
  // Data: Array<any>;
};

const SkillsModal: FC<props> = ({isShow, values, toggleModal, onSelect}) => {
  const [selected, setselected] = useState<any[]>(values);

  const [{theme}, dispatch] = useStateValue();

  const handleSelect = () => {
    // get all the selected technologies
    onSelect(selected);
    // setselected([]);
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
            Skills{' '}
          </Text>
        </View>
        <Divider size={'medium'} />
        <FlatList
          data={INTEREST}
          numColumns={2}
          keyExtractor={(item, index) => `${index}`}
          contentContainerStyle={styles.scroll}
          renderItem={({item: category, index}) => (
            <View key={index} style={[styles.container]}>
              <View style={styles.checkBoxContainer}>
                <CheckBox
                  onPress={isChecked => {
                    if (isChecked) {
                      // add the index value to state
                      setselected(props => {
                        return [...props, INTEREST[index]];
                      });
                    } else {
                      const value = INTEREST[index];
                      const newArray = selected.filter((v, index) => {
                        return v !== value;
                      });
                      setselected(newArray);
                    }
                  }}
                  isChecked={selected.includes(category)}
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
                  {category}
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
    marginVertical: Height * 0.26,
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
    marginVertical: 2,
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
export default SkillsModal;
