// TODO:
// header containing username, back button, menu button on right side
// on component mount, enable isLoading
// make connection with the web socket
// get date from the web socket in array form

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

const Chat: FC<props> = ({navigation, route}) => {
  const [Messages, setMessages] = useState<Array<any>>([]);
  const [isLoading, setisLoading] = useState(true);
  const [Input, setInput] = useState('');
  // global state
  const [state, dispatch] = useStateValue();
  const {username} = route.params;

  const textInput = useRef<any>(null);

  const socket = useMemo(
    () =>
      new WebSocket(
        `ws://${BASE_ADDRESS}/ws/chat/${state.user.userName}/${username}/`,
      ),
    [state, username],
  );

  const onSend = message => {
    // const [{text}] = message;
    if (Input !== '') {
      setInput('');
      socket.send(message);
    }
  };

  socket.onmessage = function (e) {
    const response = JSON.parse(e.data);

    const created_at =
      response.created_at.slice(0, 10) +
      'T' +
      response.created_at.slice(11, response.created_at.length);

    setMessages(prev => [
      ...prev,
      {
        _id: response.id,
        text: response.message,
        createdAt: created_at,
        user: {
          _id: response.user_name,
          name: response.user_name,
          avatar: BASE_URL + response.profile_image.path,
        },
        sent: true,
      },
    ]);
  };
  // get data
  const loadMessages = async () => {
    const response = await axios.get(`/chat/messages/${username}`);
    response.data.map(message => {
      setMessages(prev => [
        {
          _id: message.id,
          text: message.message,
          createdAt: message.created_at,
          user: {
            _id: message.user_name,
            name: message.user_name,
            avatar: BASE_URL + message.author.profile_image.path,
          },
          sent: true,
        },
        ...prev,
      ]);
    });
  };

  useEffect(() => {
    // lose the focus of text input when keyboard is not showing
    const subscribe = Keyboard.addListener('keyboardDidHide', e => {
      if (textInput !== null && textInput.current !== null) {
        textInput.current.blur();
      }
    });

    loadMessages().then(() => setisLoading(false));
    socket.onopen = function () {
      console.log('Socket connection');
    };

    return () => {
      // unsubscribe keyboard event
      subscribe.remove();

      // close the socket connection
      socket.close();
      socket.close = function () {
        console.log('Closing socket connection');
      };
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View
      style={[
        styles.parent,
        {
          backgroundColor: state.theme.SCREEN_BACKGROUND_COLOR,
        },
      ]}>
      {/* header  */}
      <CustomHeader
        navigation
        title={username}
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
          <Text style={[styles.smallText, {color: state.theme.DIM_TEXT_COLOR}]}>
            Loading your messages...
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
            backgroundColor: state.theme.ICON_COLOR,
          }}
        />
      )}
    </View>
  );
};

export default Chat;

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
