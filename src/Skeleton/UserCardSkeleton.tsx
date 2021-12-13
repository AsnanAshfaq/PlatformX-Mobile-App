import React, {FC} from 'react';
import {StyleSheet, Text, View, ScrollView} from 'react-native';
// import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import ContentLoader, {Rect, Circle} from 'react-content-loader/native';
import SearchSkeleton from './SearchSkeleton';
import {useStateValue} from '../Store/StateProvider';
import {Height, Width} from '../Constants/Size';

const Skeleton = () => {
  const [{theme}, dispatch] = useStateValue();

  return (
    <ContentLoader
      height={80}
      viewBox="0 0 380 70"
      backgroundColor={theme.SHADOW_COLOR}
      foregroundColor={'grey'}
      interval={0.2}
      speed={1}>
      <Circle cx="40" cy="30" r="30" />
      <Rect x="80" y="17" rx="4" ry="4" width="250" height="13" />
      <Rect x="80" y="40" rx="3" ry="3" width="150" height="10" />
    </ContentLoader>
  );
};

type props = {
  showSearchSkeleton: boolean;
};
const UserSkeleton: FC<props> = ({showSearchSkeleton}) => {
  return (
    <ScrollView>
      <>
        {/* show search skeleton only if it is required */}
        {showSearchSkeleton && <SearchSkeleton />}
        <Skeleton />
        <Skeleton />
        <Skeleton />
        <Skeleton />
        <Skeleton />
        <Skeleton />
        <Skeleton />
        <Skeleton />
        <Skeleton />
        <Skeleton />
      </>
    </ScrollView>
  );
};

export default UserSkeleton;
const styles = StyleSheet.create({});
