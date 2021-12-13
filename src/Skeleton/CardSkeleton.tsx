import React, {FC} from 'react';
import {StyleSheet, Text, View, ScrollView} from 'react-native';
import ContentLoader, {Rect, Circle} from 'react-content-loader/native';
import {useStateValue} from '../Store/StateProvider';

const Skeleton = () => {
  const [{theme}, dispatch] = useStateValue();

  return (
    <ContentLoader
      height={350}
      viewBox="0 0 380 380"
      backgroundColor={theme.SHADOW_COLOR}
      foregroundColor={'grey'}
      interval={0.2}
      speed={1}>
      <Rect x="20" y="20" rx="3" ry="3" width="340" height="300" />
    </ContentLoader>
  );
};

type props = {};

const CardSkeleton: FC<props> = ({}) => {
  return (
    <ScrollView>
      <>
        <Skeleton />
        <Skeleton />
      </>
    </ScrollView>
  );
};

export default CardSkeleton;
const styles = StyleSheet.create({});
