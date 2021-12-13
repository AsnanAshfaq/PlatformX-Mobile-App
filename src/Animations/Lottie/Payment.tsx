import React, {FC} from 'react';
import LottieView from 'lottie-react-native';
import {useStateValue} from '../../Store/StateProvider';
import {Height, Width} from '../../Constants/Size';
type props = {
  width?: number;
  heigth?: number;
  loop?: boolean;
};
const Payment: FC<props> = ({
  width = Width * 0.3,
  heigth = Width * 0.3,
  loop = false,
}) => {
  const {theme} = useStateValue()[0];

  return (
    <LottieView
      source={require('../../../assets/lottie/payment-loading.json')}
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
          keypath: 'Layer 11 Outlines',
          color: theme.GREEN_COLOR,
        },
        {
          keypath: 'Layer 10 Outlines',
          color: theme.GREEN_COLOR,
        },
        {
          keypath: 'Layer 9 Outlines',
          color: theme.GREEN_COLOR,
        },
        {
          keypath: 'Layer 8 Outlines',
          color: theme.GREEN_COLOR,
        },
        {
          keypath: 'Layer 7 Outlines',
          color: theme.GREEN_COLOR,
        },
        {
          keypath: 'Layer 6 Outlines',
          color: theme.GREEN_COLOR,
        },
        {
          keypath: 'Layer 5 Outlines',
          color: theme.GREEN_COLOR,
        },
        {
          keypath: 'Layer 4 Outlines',
          color: theme.GREEN_COLOR,
        },
        {
          keypath: 'Layer 3 Outlines',
          color: theme.GREEN_COLOR,
        },
        {
          keypath: 'Layer 2 Outlines',
          color: theme.GREEN_COLOR,
        },
      ]}
    />
  );
};

export default Payment;
