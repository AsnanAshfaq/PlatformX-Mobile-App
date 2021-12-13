/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, FC, useEffect, useMemo, useRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Keyboard,
  Image,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import {
  GiftedChat,
  InputToolbar,
  Send,
  Message,
} from 'react-native-gifted-chat';
import CustomHeader from '../../Components/CustomHeader';
//@ts-ignore
import {BASE_ADDRESS} from 'react-native-dotenv';
import {useStateValue} from '../../Store/StateProvider';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Sizes, Width} from '../../Constants/Size';
import axios from '../../Utils/Axios';
import Loading from '../../Components/Loading';
//@ts-ignore
import {BASE_URL} from 'react-native-dotenv';
import ChatLottie from '../../Animations/Lottie/Chat';

type props = {
  navigation: any;
  route: any;
};

const ICON_SIZE = Width * 0.07;

const Bot: FC<props> = ({navigation, route}) => {
  const [state, dispatch] = useStateValue();
  const {theme} = state;

  const getTimeStamp = () => {
    const created_at = new Date();
    const month = created_at.getMonth() + 1;
    const timeStamp =
      created_at.getFullYear() +
      '-' +
      month +
      '-' +
      created_at.getDate() +
      'T' +
      created_at.getHours() +
      ':' +
      created_at.getMinutes() +
      ':' +
      created_at.getSeconds();

    return timeStamp;
  };

  const [Messages, setMessages] = useState<Array<any>>([
    {
      _id: 1,
      text: `Hey ${
        state.user.userName
      }.${'\n'}Welcome to PlatformX World. I am Doxi an intelligent Bot as they say 😉.${'\n'}I have been created to interact with you and make your experience with PlatformX more exciting.${'\n'}Let's Chat  `,
      createdAt: getTimeStamp(),
      user: {
        _id: 'bot',
        name: 'Doxi',
        avatar:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4g8PeVPfEMnE1Em2DRCaw4mnJbgnf-tU3Bw&usqp=CAU',
      },
    },
  ]);
  const [isLoading, setisLoading] = useState(true);
  const [Input, setInput] = useState('');
  // global state

  const textInput = useRef<any>(null);

  const socket = useMemo(
    () =>
      new WebSocket(`ws://${BASE_ADDRESS}/ws/chatbot/${state.user.userName}/`),
    [state],
  );

  const onSend = message => {
    // const [{text}] = message;
    if (Input !== '') {
      setInput('');
      socket.send(message);
    }
  };

  socket.onmessage = function (e) {
    // console.log('Got message', e.data);
    const response = JSON.parse(e.data);

    const message = {
      _id: response.message.id,
      text: response.message.text,
      createdAt: getTimeStamp(),
      user: {
        _id: state.user.userName,
        name: state.user.userName,
      },
      sent: true,
    };

    const bot = {
      _id: response.bot.id,
      text: response.bot.text,
      createdAt: getTimeStamp(),
      user: {
        _id: 'bot',
        name: 'Doxi',
        avatar:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4g8PeVPfEMnE1Em2DRCaw4mnJbgnf-tU3Bw&usqp=CAU',
      },
      sent: true,
    };

    setMessages(prev => [...prev, message, bot]);
  };

  useEffect(() => {
    socket.onopen = function () {
      console.log('Socket connection');
      setisLoading(false);
    };
  }, []);
  return (
    <View
      style={[
        styles.parent,
        {
          backgroundColor: theme.SCREEN_BACKGROUND_COLOR,
        },
      ]}>
      {/* header  */}
      <CustomHeader
        navigation
        title={'Doxi The Bot'}
        back
        onBackPress={() => {
          // close the socket connection
          socket.close();
          socket.close = function () {
            console.log('Closing socket connection');
          };
          navigation.goBack();
        }}
      />

      {isLoading ? (
        <View style={[styles.center, {flex: 1}]}>
          <ChatLottie />
          <Text style={[styles.smallText, {color: theme.DIM_TEXT_COLOR}]}>
            Doxi is getting ready...
          </Text>
        </View>
      ) : (
        <GiftedChat
          messages={Messages}
          user={{
            _id: state.user.userName,
            name: state.user.userName,
          }}
          // onSend={message => onSend(message)}
          inverted={false}
          scrollToBottom
          alignTop
          alwaysShowSend
          bottomOffset={44}
          // keyboardShouldPersistTaps="never"
          renderSend={props => {
            return (
              <Send
                {...props}
                containerStyle={styles.sendContainer}
                onSend={message => onSend(message)}>
                <TouchableOpacity
                  style={
                    {
                      // paddingVertical: ,
                    }
                  }
                  onPress={e => onSend(Input.trim())}>
                  <Text
                    style={{
                      color: state.theme.GREEN_COLOR,
                      fontSize: Sizes.large * 2,
                    }}>
                    {'>'}
                  </Text>
                </TouchableOpacity>
              </Send>
            );
          }}
          renderInputToolbar={props => (
            <InputToolbar
              {...props}
              containerStyle={{
                borderTopColor: state.theme.GREEN_COLOR,
                backgroundColor: state.theme.SCREEN_BACKGROUND_COLOR,
              }}
            />
          )}
          renderComposer={() => {
            return (
              <View
                style={[
                  styles.messageInputContainer,
                  {
                    backgroundColor: state.theme.SCREEN_BACKGROUND_COLOR,
                  },
                ]}>
                <TextInput
                  placeholder={'Type a message...'}
                  style={[
                    styles.messageInputField,
                    {
                      borderColor: state.theme.GREEN_COLOR,
                      color: state.theme.TEXT_COLOR,
                    },
                  ]}
                  ref={textInput}
                  placeholderTextColor={state.theme.PLACE_HOLDER_TEXT_COLOR}
                  value={Input}
                  onChangeText={setInput}
                  onFocus={e => {
                    console.log('Text input focus');
                    // Keyboard.addListener('keyboardWillShow', () =>
                    //   console.log('Opening keyboard'),
                    // );
                  }}
                  onBlur={e => console.log('text input  blur')}
                  multiline
                  // autoFocus={focusTextInput ? true : false}
                  scrollEnabled
                  showSoftInputOnFocus={true}
                />
              </View>
            );
          }}
          scrollToBottomStyle={{
            bottom: 45,
            backgroundColor: state.theme.GREEN_COLOR,
          }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  parent: {
    flex: 1,
  },
  messageInputContainer: {
    flex: 0.9,
  },
  messageInputField: {
    marginHorizontal: 10,
    marginVertical: 10,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderRadius: 20,
    fontSize: Sizes.normal * 0.9,
  },
  sendContainer: {
    flex: 0.1,
    marginRight: 10,
    marginBottom: 10,
    height: 60,
    width: 70,
    justifyContent: 'center',
    alignItems: 'center',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  smallText: {
    fontSize: Sizes.small,
  },
});

export default Bot;
