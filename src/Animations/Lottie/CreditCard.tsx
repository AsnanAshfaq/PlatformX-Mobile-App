import React, {FC} from 'react';
import LottieView from 'lottie-react-native';
import {useStateValue} from '../../Store/StateProvider';
import {Height, Width} from '../../Constants/Size';
type props = {
  width?: number;
  heigth?: number;
  loop?: boolean;
};
const CreditCard: FC<props> = ({
  width = Width * 0.3,
  heigth = Width * 0.3,
  loop = false,
}) => {
  const {theme} = useStateValue()[0];

  return (
    <LottieView
      source={require('../../../assets/lottie/credit-card.json')}
      style={{
        width: width,
        height: heigth,
      }}
      autoPlay
      loop={loop}
      autoSize
      resizeMode={'cover'}
    />
  );
};

export default CreditCard;
