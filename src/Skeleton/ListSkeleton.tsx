import React, {FC} from 'react';
import {ScrollView, Text, View} from 'react-native';
import {List} from 'react-content-loader/native';
import ContentLoader from 'react-content-loader/native';
import {useStateValue} from '../Store/StateProvider';

const MyListLoader: FC<{repition: number}> = ({repition = 1}) => {
  const list = new Array(repition);
  const [{theme}, dispatch] = useStateValue();

  for (let i = 0; i < repition; i++) {
    list.push(<List key={i} />);
  }
  return (
    <ScrollView>
      {list.map((item, index) => {
        return (
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <List
              width={250}
              height={250}
              fill={theme.SHADOW_COLOR}
              backgroundColor={theme.SHADOW_COLOR}
              animate={true}
              viewBox="0 0 125 125"
              style={{
                width: '100%',
              }}
            />
          </View>
        );
      })}
    </ScrollView>
  );
};

export default MyListLoader;
