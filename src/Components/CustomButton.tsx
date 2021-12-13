/* eslint-disable react-native/no-inline-styles */
import React, {FC} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Sizes, Width} from '../Constants/Size';
import {useStateValue} from '../Store/StateProvider';
import Loading from './Loading';

type props = {
  text: string;
  onPress: () => void;
  loading?: boolean;
  color?: string;
  width?: number;
  height?: number;
  textSize?: number;
};
const CustomButton: FC<props> = ({
  text,
  onPress,
  loading = false,
  color,
  width = Width * 0.9,
  height = Width * 0.12,
  textSize = Sizes.normal,
  children,
}) => {
  const [{theme}, dispatch] = useStateValue();
  return (
    <View style={styles.buttonContainer}>
      <TouchableOpacity
        style={[
          styles.joinNowButton,
          {
            backgroundColor: color ? color : theme.GREEN_COLOR,
            width: width,
            height: height,
          },
        ]}
        activeOpacity={0.5}
        disabled={loading}
        onPress={onPress}>
        {loading ? (
          <Loading size={'small'} color={theme.SCREEN_BACKGROUND_COLOR} />
        ) : (
          <>
            <View
              style={{
                flex: typeof children !== undefined ? 0.7 : 1,
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row',
              }}>
              <Text
                style={[
                  {
                    fontSize: textSize,
                    color: theme.TEXT_COLOR,
                  },
                ]}>
                {text}
              </Text>
            </View>
            {children}
          </>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  buttonContainer: {
    // width: Width * 0.9,
    marginHorizontal: Width * 0.03,
    height: Width * 0.14,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 5,
  },
  joinNowButton: {
    // marginHorizontal: Width * 0.05,
    flexDirection: 'row',
    justifyContent: 'center',
    borderRadius: 10,
    alignItems: 'center',
  },
});
