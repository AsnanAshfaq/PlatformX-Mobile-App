import React, {FC} from 'react';
import LottieView from 'lottie-react-native';
import {useStateValue} from '../../Store/StateProvider';
import {Height, Width} from '../../Constants/Size';
type props = {
  width?: number;
  heigth?: number;
  loop?: boolean;
};
const Profile: FC<props> = ({
  width = Width * 0.3,
  heigth = Width * 0.3,
  loop = false,
}) => {
  const {theme} = useStateValue()[0];

  return (
    <LottieView
      source={require('../../../assets/lottie/profile.json')}
      style={{
        width: width,
        height: heigth,
      }}
      autoPlay
      loop={loop}
      autoSize
      resizeMode={'cover'}
      colorFilters={[
        {
          keypath: 'Head Outlines',
          color: theme.GREEN_COLOR,
        },
        {
          keypath: 'face Outlines',
          color: theme.GREEN_COLOR,
        },
        {
          keypath: 'Neck Outlines',
          color: theme.GREEN_COLOR,
        },
        {
          keypath: 'Coller Outlines',
          color: theme.GREEN_COLOR,
        },
        {
          keypath: 'derss Outlines',
          color: theme.GREEN_COLOR,
        },
        {
          keypath: 'tie1 Outlines',
          color: theme.GREEN_COLOR,
        },
        {
          keypath: 'tie2 Outlines',
          color: theme.GREEN_COLOR,
        },
        {
          keypath: 'Outter circle Outlines',
          color: theme.GREEN_COLOR,
        },
      ]}
    />
  );
};

export default Profile;
