//TODO:
// Fix this damn thing

// on useEffect, get the dimensions of all the images in the post
import React, {FC, useState, useEffect, useRef} from 'react';
import {StyleSheet, Text, View, FlatList, Image} from 'react-native';
import {Width} from '../Constants/Size';
import {POST_IMAGE} from '../Constants/sample';
import {useStateValue} from '../Store/StateProvider';

type imageProps = {
  image: any;
};

const ImageView: FC<imageProps> = ({image}) => {
  const [ImageAspectRatio, setImageAspectRatio] = useState(0);
  const [PostImageLoading, setPostImageLoading] = useState(true);

  return (
    <View style={styles.postImageContainer} key={image.id}>
      <Image
        source={{
          uri: PostImageLoading ? POST_IMAGE : image.path,
        }}
        style={[
          {
            width: Width * 0.912,
            height: Width * ImageAspectRatio * 0.9,
            justifyContent: 'center',
            alignItems: 'center',
            // flex: 1,
          },
        ]}
        resizeMode={'contain'}
        resizeMethod={'scale'}
        onLoadEnd={() => {
          // get image width and height
          Image.getSize(image.path, (width, height) => {
            // calculate aspect ratio of image
            setImageAspectRatio(height / width);
            setPostImageLoading(false);
          });
        }}
      />
    </View>
  );
};

type props = {
  postImages: Array<any>;
};

const PostCarImageSlider: FC<props> = ({postImages}) => {
  const ref = useRef(null);
  const [{theme}, dispatch] = useStateValue();

  return (
    <>
      <FlatList
        data={postImages}
        ref={ref}
        // style={{flexGrow: 1}}
        contentContainerStyle={styles.scroll}
        pagingEnabled
        onScrollEndDrag={e => {
          // console.log('Height is', Height);
          // console.log(postImages);
          // ref.current.
        }}
        onScrollBeginDrag={e => {
          // get the height of the child component
        }}
        horizontal
        showsHorizontalScrollIndicator={true}
        persistentScrollbar={true}
        keyExtractor={(item, _) => `${item.id}`}
        renderItem={({item, index, separators}) => <ImageView image={item} />}

        // onViewableItemsChanged={onViewRef.current}
      />

      {/* indicator  */}
      {postImages.length > 1 && <View></View>}
    </>
  );
};

export default PostCarImageSlider;

const styles = StyleSheet.create({
  scroll: {
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 13,
  },
  postImageContainer: {
    marginRight: 4,
    alignItems: 'center',
  },
});
