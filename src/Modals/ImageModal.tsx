// import React, {FC} from 'react';
// import {StyleSheet, Text, View} from 'react-native';
// import ImageModal from 'react-native-image-modal';
// import {Height, Width} from '../Constants/Size';

// type props = {
//   uri: string;
//   showImageModal: boolean;
//   toggleModal: () => void;
// };

// const ImageModalComponent: FC<props> = ({uri, showImageModal, toggleModal}) => {
//   console.log('Show modal is ', showImageModal);
//   if (showImageModal) {
//     return (
//       <ImageModal
//         // disabled={showImageModal}
//         resizeMode="contain"
//         imageBackgroundColor="#000000"
//         style={{
//           width: 250,
//           height: 250,
//         }}
//         source={{
//           uri: uri,
//         }}
//         onClose={toggleModal}
//         didOpen={() => console.log('Modal did open')}
//       />
//     );
//   }

//   return null;
// };

// export default ImageModalComponent;

// const styles = StyleSheet.create({});
