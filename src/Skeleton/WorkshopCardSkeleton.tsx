import React, {FC} from 'react';
import {StyleSheet, Text, View, ScrollView} from 'react-native';
import ContentLoader, {Rect, Circle} from 'react-content-loader/native';
import SearchSkeleton from './SearchSkeleton';
import {useStateValue} from '../Store/StateProvider';

const Skeleton = () => {
  const [{theme}, dispatch] = useStateValue();

  return (
    <ContentLoader
      height={350}
      viewBox="0 0 380 350"
      backgroundColor={theme.SHADOW_COLOR}
      foregroundColor={'grey'}
      interval={0.2}
      speed={1}>
      <Circle cx="40" cy="30" r="30" />
      <Rect x="80" y="17" rx="4" ry="4" width="250" height="13" />
      <Rect x="80" y="40" rx="3" ry="3" width="150" height="10" />
      <Rect x="20" y="80" rx="3" ry="3" width="340" height="200" />
      <Rect x="260" y="290" rx="3" ry="3" width="100" height="35" />
    </ContentLoader>
  );
};

type props = {
  showSearchSkeleton: boolean;
};

const WorkshopSkeleton: FC<props> = ({showSearchSkeleton}) => {
  return (
    <ScrollView>
      <>
        {showSearchSkeleton && <SearchSkeleton />}
        <Skeleton />
        <Skeleton />
      </>
    </ScrollView>
  );
};

export default WorkshopSkeleton;
const styles = StyleSheet.create({});
