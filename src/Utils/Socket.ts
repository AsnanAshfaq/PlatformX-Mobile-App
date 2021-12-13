//@ts-ignore
import {BASE_ADDRESS} from 'react-native-dotenv';

const Token =
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjMwMDc5NjEwLCJqdGkiOiJlODk1ZGQ4YWFiZjk0MWFmYTZmZmY5MzRmMGY1NDQ0MyIsInVzZXJfaWQiOiJkMzY0MjMxZC00MGJlLTQyN2EtODFiNC05OWMwYzZiYTAzZDcifQ.A75O1MO5BEzRZNKKVk_p-NX3LwrMIdWTu5u0rwzpUSs';

const get_web_socket = (query: string) => {
  // const token = await AsyncStorage.getItem('access');

  return new WebSocket(`ws://${BASE_ADDRESS}/ws/${query}`, null, {
    headers: {
      authorization: `Bearer ${Token}`,
    },
  });
};

export default get_web_socket;
