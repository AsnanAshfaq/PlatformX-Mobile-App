import React, {FC} from 'react';
import LottieView from 'lottie-react-native';
import {useStateValue} from '../../Store/StateProvider';
import {Height, Width} from '../../Constants/Size';
type props = {
  width?: number;
  heigth?: number;
  loop?: boolean;
};
const Tick: FC<props> = ({
  width = Width * 0.3,
  heigth = Width * 0.3,
  loop = false,
}) => {
  const {theme} = useStateValue()[0];

  return (
    <LottieView
      source={require('../../../assets/lottie/tick.json')}
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
          keypath: 'Circle 3',
          color: theme.GREEN_COLOR,
        },
        {
          keypath: 'Circle 2',
          color: theme.GREEN_COLOR,
        },
        {
          keypath: 'Circle',
          color: theme.GREEN_COLOR,
        },

        {
          keypath: 'Confeti 7',
          color: theme.GREEN_COLOR,
        },

        {
          keypath: 'Confeti 6',
          color: theme.GREEN_COLOR,
        },

        {
          keypath: 'Confeti 5',
          color: theme.GREEN_COLOR,
        },

        {
          keypath: 'Confeti 4',
          color: theme.GREEN_COLOR,
        },
        {
          keypath: 'Confeti 3',
          color: theme.GREEN_COLOR,
        },
        {
          keypath: 'Confeti 2',
          color: theme.GREEN_COLOR,
        },
        {
          keypath: 'Confeti 1',
          color: theme.GREEN_COLOR,
        },
      ]}
    />
  );
};

export default Tick;
