import React, {FC} from 'react';
import LottieView from 'lottie-react-native';
import {useStateValue} from '../../Store/StateProvider';
import {Height, Width} from '../../Constants/Size';
type props = {
  width?: number;
  heigth?: number;
};
const ChatLottie: FC<props> = ({width = Width * 0.3, heigth = Width * 0.3}) => {
  const {theme} = useStateValue()[0];

  return (
    <LottieView
      source={require('../../../assets/lottie/chat.json')}
      style={{
        width: width,
        height: heigth,
      }}
      autoPlay
      loop={true}
      autoSize
      resizeMode={'cover'}
      colorFilters={[
        {
          keypath: 'Chat Bubble 1',
          color: theme.GREEN_COLOR,
        },

        {
          keypath: 'Chat Bubble 2',
          color: theme.GREEN_COLOR,
        },
      ]}
    />
  );
};

export default ChatLottie;
