import {Dimensions} from 'react-native';

export const Width = Dimensions.get('screen').width;
export const Height = Dimensions.get('screen').height;

const generateSizes = () => {
  let sizes = {
    large: 0,
    normal: 0,
    small: 0,
  };
  let aspectRatio = Math.round((Height / Width + Number.EPSILON) * 100) / 100;

  if (aspectRatio > 1.7 && aspectRatio < 1.9) {
    sizes = {
      large: (Height / Width) * 10.06,
      normal: (Height / Width) * 7.55,
      small: (Height / Width) * 5.66,
    };
  }
  if (aspectRatio > 1.9 && aspectRatio < 2.1) {
    sizes = {
      large: (Height / Width) * 11.06,
      normal: (Height / Width) * 8.55,
      small: (Height / Width) * 6.66,
    };
  }
  if (aspectRatio > 2.1 && aspectRatio < 2.2) {
    sizes = {
      large: (Height / Width) * 11.06,
      normal: (Height / Width) * 8.55,
      small: (Height / Width) * 6.65,
    };
  }
  return sizes;
};

export const Sizes = generateSizes();
