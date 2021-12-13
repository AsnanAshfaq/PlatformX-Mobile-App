import React, {FC} from 'react';
import {ScrollView, Text} from 'react-native';
import {Code} from 'react-content-loader/native';
import ContentLoader from 'react-content-loader/native';
import {useStateValue} from '../Store/StateProvider';

const MyListLoader: FC<{repition: number}> = ({repition = 1}) => {
  const list = new Array(repition);
  const [{theme}, dispatch] = useStateValue();

  for (let i = 0; i < repition; i++) {
    list.push(<Code key={i} />);
  }
  return (
    <ScrollView>
      {list.map((item, index) => {
        return (
          // <ContentLoader
          //   height={350}
          //   viewBox="0 0 380 350"
          //   backgroundColor={theme.SHADOW_COLOR}
          //   foregroundColor={'grey'}
          //   interval={0.2}
          //   key={index}
          //   speed={1}>
          <Code
            width={300}
            height={300}
            fill={theme.SHADOW_COLOR}
            backgroundColor={theme.SHADOW_COLOR}
            animate={true}
            viewBox="0 0 180 150"
            style={{width: '100%'}}
          />
          // </ContentLoader>
        );
      })}
    </ScrollView>

    // <>
    //   {list.map((_, index) => {
    //     return <List key={index} />;
    //   })}
    // </>
  );
};

export default MyListLoader;
