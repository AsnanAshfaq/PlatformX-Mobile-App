import React, {FC} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Width} from '../Constants/Size';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useStateValue} from '../Store/StateProvider';

const ICON_SIZE = Width * 0.07;

type props = {
  size?: number;
  color?: string;
};
export const ThreeDots: FC<props> = ({size, color}) => {
  const {theme} = useStateValue()[0];
  return (
    <Ionicons
      name={'ellipsis-vertical'}
      size={size ? size * ICON_SIZE : ICON_SIZE * 0.7}
      color={color ? color : theme.ICON_COLOR}
    />
  );
};

export const ForwardArrow: FC<props> = ({size, color}) => {
  const {theme} = useStateValue()[0];

  return (
    <Ionicons
      name={'ios-arrow-forward-circle-sharp'}
      size={size ? size * ICON_SIZE : ICON_SIZE * 0.7}
      color={color ? color : theme.ICON_COLOR}
    />
  );
};

export const Delete: FC<props> = ({size, color}) => {
  const {theme} = useStateValue()[0];

  return (
    <MaterialIcons
      name={'delete'}
      color={color ? color : theme.ICON_COLOR}
      size={size ? size * ICON_SIZE : ICON_SIZE * 0.7}
    />
  );
};

export const Cash: FC<props> = ({size, color}) => {
  const {theme} = useStateValue()[0];

  return (
    <FontAwesome
      name={'money'}
      size={size ? size * ICON_SIZE : ICON_SIZE * 0.7}
      color={color ? color : theme.ICON_COLOR}
    />
  );
};

export const Tag: FC<props> = ({size, color}) => {
  const {theme} = useStateValue()[0];

  return (
    <FontAwesome
      name={'tag'}
      size={size ? size * ICON_SIZE : ICON_SIZE * 0.7}
      color={color ? color : theme.ICON_COLOR}
    />
  );
};

export const Clock: FC<props> = ({size, color}) => {
  const {theme} = useStateValue()[0];

  return (
    <Ionicons
      name={'time-outline'}
      size={size ? size * ICON_SIZE : ICON_SIZE * 0.7}
      color={color ? color : theme.ICON_COLOR}
    />
  );
};

export const People: FC<props> = ({size, color}) => {
  const {theme} = useStateValue()[0];

  return (
    <Ionicons
      name={'people-sharp'}
      size={size ? size * ICON_SIZE : ICON_SIZE * 0.7}
      color={color ? color : theme.ICON_COLOR}
    />
  );
};

export const Pencil: FC<props> = ({size, color}) => {
  const {theme} = useStateValue()[0];

  return (
    <Ionicons
      name={'pencil'}
      size={size ? size * ICON_SIZE : ICON_SIZE * 0.7}
      color={color ? color : theme.ICON_COLOR}
    />
  );
};

export const Camera: FC<props> = ({size, color}) => {
  const {theme} = useStateValue()[0];

  return (
    <Feather
      name={'camera'}
      size={size ? size * ICON_SIZE : ICON_SIZE * 0.7}
      color={color ? color : theme.ICON_COLOR}
    />
  );
};

export const Cross: FC<props> = ({size, color}) => {
  const {theme} = useStateValue()[0];

  return (
    <Ionicons
      name={'close-circle-sharp'}
      size={size ? size * ICON_SIZE : ICON_SIZE * 0.7}
      color={color ? color : theme.ICON_COLOR}
    />
  );
};

export const Calendar: FC<props> = ({size, color}) => {
  const {theme} = useStateValue()[0];

  return (
    <MaterialCommunityIcons
      name={'calendar-month'}
      size={size ? size * ICON_SIZE : ICON_SIZE * 0.7}
      color={color ? color : theme.ICON_COLOR}
    />
  );
};

export const PlusCircle: FC<props> = ({size, color}) => {
  const {theme} = useStateValue()[0];
  return (
    <AntDesign
      name={'pluscircle'}
      size={size ? size * ICON_SIZE : ICON_SIZE * 0.7}
      color={color ? color : theme.ICON_COLOR}
    />
  );
};

export const Tick: FC<props> = ({size, color}) => {
  const {theme} = useStateValue()[0];
  return (
    <AntDesign
      name={'check'}
      size={size ? size * ICON_SIZE : ICON_SIZE * 0.7}
      color={color ? color : theme.ICON_COLOR}
    />
  );
};

export const Email: FC<props> = ({size, color}) => {
  const {theme} = useStateValue()[0];
  return (
    <MaterialCommunityIcons
      name={'email'}
      color={color ? color : theme.ICON_COLOR}
      size={size ? size * ICON_SIZE : ICON_SIZE * 0.7}
    />
  );
};

export const Github: FC<props> = ({size, color}) => {
  const {theme} = useStateValue()[0];
  return (
    <Ionicons
      name={'logo-github'}
      color={color ? color : theme.ICON_COLOR}
      size={size ? size * ICON_SIZE : ICON_SIZE * 0.7}
    />
  );
};
export const LinkedIn: FC<props> = ({size, color}) => {
  const {theme} = useStateValue()[0];
  return (
    <Ionicons
      name={'logo-linkedin'}
      color={color ? color : theme.ICON_COLOR}
      size={size ? size * ICON_SIZE : ICON_SIZE * 0.7}
    />
  );
};
export const Twitter: FC<props> = ({size, color}) => {
  const {theme} = useStateValue()[0];
  return (
    <Ionicons
      name={'logo-twitter'}
      color={color ? color : theme.ICON_COLOR}
      size={size ? size * ICON_SIZE : ICON_SIZE * 0.7}
    />
  );
};

export const CodeDownload: FC<props> = ({size, color}) => {
  const {theme} = useStateValue()[0];
  return (
    <Ionicons
      name={'ios-code-download-outline'}
      color={color ? color : theme.ICON_COLOR}
      size={size ? size * ICON_SIZE : ICON_SIZE * 0.7}
    />
  );
};

export const FileUpload: FC<props> = ({size, color}) => {
  const {theme} = useStateValue()[0];
  return (
    <Ionicons
      name={'ios-cloud-upload-outline'}
      color={color ? color : theme.ICON_COLOR}
      size={size ? size * ICON_SIZE : ICON_SIZE * 0.7}
    />
  );
};

const styles = StyleSheet.create({});
