import React, {FC, useState} from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  ScrollView,
  ToastAndroid,
  TouchableOpacity,
} from 'react-native';
import Modal from 'react-native-modal';
import {Height, Sizes, Width} from '../Constants/Size';
import Axios from '../Utils/Axios';
import {useStateValue} from '../../src/Store/StateProvider';
import Loading from '..//Components/Loading';
import Divider from '../Components/Divider';
//@ts-ignore
import {BASE_URL} from 'react-native-dotenv';

type props = {
  isShow: boolean;
  title: string;
  id: string;
  toggleModal: () => void;
};

const DeleteFYPModal: FC<props> = ({isShow, id, title, toggleModal}) => {
  const [{theme}, dispatch] = useStateValue();
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    // set the loading to true
    setLoading(true);

    Axios({
      method: 'delete',
      url: `${BASE_URL}/api/fyp/delete/`,
      data: {
        id: id,
      },
    })
      .then(response => {
        if (response.status === 200) {
          //   it has been deleted
          ToastAndroid.show(response.data.success, 1550);
        }
      })
      .catch(error => {
        console.log('Error is', error);
        ToastAndroid.show(error.response.data.error, 1500);
      })
      .finally(() => {
        setLoading(false);
        // close the modal
        toggleModal();
      });
  };
  return (
    // <View
    //   style={{
    //     flex: 1,
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //   }}>
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
        {/* heading container  */}
        <View style={[styles.headingContainer]}>
          <Text style={[styles.heading, {color: theme.TEXT_COLOR}]}>
            Deleting Final Year Project
          </Text>
        </View>
        <Divider size={'large'} />

        {/* description container  */}
        <View style={[styles.descriptionContainer]}>
          <Text style={[styles.descriptionText, {color: theme.TEXT_COLOR}]}>
            Are you sure that you want to delete {title.toUpperCase()} Project?
          </Text>
        </View>

        {!loading ? (
          <View style={styles.buttonsContainer}>
            {/*  buttons  */}
            <TouchableOpacity
              onPress={toggleModal}
              style={[styles.Button, {backgroundColor: theme.GREEN_COLOR}]}>
              <Text style={[styles.buttonText, {color: theme.TEXT_COLOR}]}>
                Cancel
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleDelete()}
              style={[styles.Button, {backgroundColor: theme.RED_COLOR}]}>
              <Text style={[styles.buttonText, {color: theme.TEXT_COLOR}]}>
                Delete
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={[styles.buttonsContainer, styles.center]}>
            <Loading size={'small'} />
          </View>
        )}
      </>
    </Modal>
    // </View>
  );
};

const styles = StyleSheet.create({
  Modalparent: {
    // flex: 1,
    maxHeight: Height * 0.3,
    borderRadius: 20,
    borderWidth: 2,
    // justifyContent: 'center',
    // alignItems: 'center',
    borderColor: 'transparent',
    // margin: 0,
    // marginTop: Height * 0.28,
    // marginBottom: Height * 0.28,
    marginVertical: Height * 0.3,
  },
  headingContainer: {
    flex: 0.25,
    marginTop: 10,
    marginHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    fontSize: Sizes.normal * 1.2,
  },
  descriptionContainer: {
    flex: 0.5,
    marginHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  descriptionText: {
    fontSize: Sizes.normal,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
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

  buttonsContainer: {
    flex: 0.25,
    flexDirection: 'row',
    marginVertical: 5,
    justifyContent: 'center',
  },
  Button: {
    width: Width * 0.35,
    marginHorizontal: 10,
    height: Width * 0.1,
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  buttonText: {
    fontSize: Sizes.normal,
  },
});
export default DeleteFYPModal;
