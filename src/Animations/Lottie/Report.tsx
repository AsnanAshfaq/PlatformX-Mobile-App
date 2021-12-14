import React, {FC} from 'react';
import LottieView from 'lottie-react-native';
import {useStateValue} from '../../Store/StateProvider';
import {Height, Width} from '../../Constants/Size';
type props = {
  width?: number;
  heigth?: number;
  loop?: boolean;
};
const ReportLottie: FC<props> = ({
  width = Width * 0.3,
  heigth = Width * 0.3,
  loop = true,
}) => {
  const {theme} = useStateValue()[0];

  return (
    <LottieView
      source={require('../../../assets/lottie/report.json')}
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
          keypath: '',
          color: theme.GREEN_COLOR,
        },
        {
          keypath: 'Exclamation 3',
          color: theme.ERROR_TEXT_COLOR,
        },
        {
          keypath: 'Exclamation 2',
          color: theme.ERROR_TEXT_COLOR,
        },
        {
          keypath: 'Exclamation',
          color: theme.ERROR_TEXT_COLOR,
        },
        {
          keypath: 'Circle 3',
          color: theme.ERROR_TEXT_COLOR,
        },
        {
          keypath: 'Circle 2',
          color: theme.ERROR_TEXT_COLOR,
        },
        {
          keypath: 'Circle',
          color: theme.ERROR_TEXT_COLOR,
        },
      ]}
    />
  );
};

export default ReportLottie;
