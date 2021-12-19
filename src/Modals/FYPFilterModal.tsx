import React, {FC, useState} from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Modal from 'react-native-modal';
import {Height, Sizes, Width} from '../Constants/Size';
// import {hackathonFilterData} from '../Constants/sample';
import CheckBox from '../Components/CheckBox';
import {useStateValue} from '../Store/StateProvider';

const INTERNSHIP_FILTER_DATA = [
  {
    id: 'status',
    tag: 'Status',
    subtag: ['Applied', 'Open', 'Ended'],
  },
  {
    id: 'technologies',
    tag: 'Technologies',
    subtag: [
      'Angular',
      'Android',
      'ASP.NET',
      'Django',
      'Express',
      'Firebase',
      'Flask',
      'Flutter',
      'Java',
      'Keras',
      'Kotlin',
      'Laravel',
      'MongoDB',
      'MySQL',
      'Node.js',
      'Objective-C',
      'PostgreSQL',
      'Pytorch',
      'Rails',
      'React',
      'React Native',
      'Revel',
      'Spacy',
      'Spring',
      'Swift',
      'TensorFlow',
      'Vue.js',
      'Xamarin',
    ],
  },
  {
    id: 'categories',
    tag: 'Categories',
    subtag: [
      'Artificial Intelligence',
      'Backend Development',
      'Cloud Computing',
      'Desktop Development',
      'DevOps Engineering',
      'Database Development',
      'Frontend Development',
      'Full-Stack Development',
      'Machine Learning',
      'Mobile Development',
      'Security Engineering',
      'Web Development',
    ],
  },
];

type Props = {
  Tag: string;
  list: Array<string>;
  CheckedValues: Array<{
    tag: string;
    subtag: Array<string>;
  }>;
};

const SubTagList: FC<Props> = ({Tag, list, CheckedValues}) => {
  const [{theme}, dispatch] = useStateValue();
  const handleCheckedValues = (
    isCheck: boolean | undefined,
    tag: string,
    subtag: string,
  ) => {
    let isTagExist = false;
    let isSubTagExist = false;
    let tagIndex = -1;
    let subTagIndex = -1;

    if (CheckedValues.length !== 0) {
      CheckedValues.forEach((value, index) => {
        if (value.tag === tag) {
          isTagExist = true;
          tagIndex = index;
        }
        // check for subtags
        for (let i = 0; i < value.subtag.length; i++) {
          if (value.subtag[i] === subtag) {
            subTagIndex = i;
            isSubTagExist = true;
          }
        }
      });

      // if tag does not exist, push tab and subtag
      if (isCheck) {
        if (!isTagExist) {
          CheckedValues.push({tag: tag, subtag: [subtag]});
        }

        // if tag exist but sub tag does not exist
        else if (isTagExist && !isSubTagExist) {
          // push subtag only
          CheckedValues[tagIndex].subtag.push(subtag);
        }
      } else {
        // remove subtag from subtag array
        CheckedValues[tagIndex].subtag.splice(subTagIndex, 1);
      }
    } else {
      // push tag and subtag if CheckValues array is empty
      CheckedValues.push({
        tag: tag,
        subtag: [subtag],
      });
    }
  };
  return (
    <View style={styles.subtagContainer}>
      {list.map(subtag => (
        <View style={{flexDirection: 'row'}} key={subtag}>
          <CheckBox
            size={18}
            onPress={isCheck => {
              handleCheckedValues(isCheck, Tag, subtag);
            }}
          />
          <Text
            style={[
              styles.subtag,
              {
                color: theme.TEXT_COLOR,
              },
            ]}>
            {subtag}
          </Text>
        </View>
      ))}
    </View>
  );
};

type props = {
  isShow: boolean;
  toggleModal: () => void;
  applyFilters?: (filter: Array<{subtag: Array<string>; tag: string}>) => void;
  // Data: Array<any>;
};

const InternshipFilterModal: FC<props> = ({
  isShow,
  toggleModal,
  applyFilters,
}) => {
  const CheckedValues: Array<{
    tag: string;
    subtag: Array<string>;
  }> = [];

  const [{theme}, dispatch] = useStateValue();
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
            Filters{' '}
          </Text>
        </View>
        <ScrollView style={styles.scroll}>
          {INTERNSHIP_FILTER_DATA.map((filterItem, index) => {
            return (
              <View key={filterItem.id}>
                {/* label of the filter  */}
                <Text
                  style={[
                    styles.tag,
                    styles.divider,
                    {
                      color: theme.TEXT_COLOR,
                    },
                  ]}>
                  {filterItem.tag}
                </Text>
                {/* list of subtags  */}
                <SubTagList
                  Tag={filterItem.tag}
                  list={filterItem.subtag}
                  CheckedValues={CheckedValues}
                />
              </View>
            );
          })}
        </ScrollView>
        {/* done button  */}
        <View style={styles.applyButtonContainer}>
          <TouchableOpacity
            onPress={() => {
              // toggle modal first
              toggleModal();
              typeof applyFilters === 'undefined'
                ? undefined
                : applyFilters(CheckedValues);
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
              Apply Filters
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
    maxHeight: Height * 0.85,
    borderRadius: 20,
    borderWidth: 2,
    justifyContent: 'center',
    // alignItems: 'center',
    borderColor: 'transparent',
    marginVertical: Height * 0.15,
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
    marginHorizontal: 20,
    // marginVertical: 5,
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
    // backgroundColor: 'grey',
  },
  tag: {
    fontSize: Sizes.normal,
    marginRight: 30,
    padding: 3,
  },
  subtagContainer: {
    marginLeft: 20,
    marginVertical: 5,
  },
  subtag: {
    fontSize: Sizes.normal * 0.85,
    paddingVertical: 5,
  },
  applyButtonContainer: {
    flexDirection: 'row',
    marginVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
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
export default InternshipFilterModal;
