import React from 'react';
import './App.css';
import { StreamChat } from 'stream-chat';
import { Chat } from 'stream-chat-react';
import Cookies from 'universal-cookie';

import { ChannelContainer, ChannelListContainer, Auth } from './components';

const cookies = new Cookies();

const apiKey = 'tdhzxkp5np89';
const authToken = cookies.get("token");
const client = StreamChat.getInstance(apiKey);

if (authToken) {
  client.connectUser({
    name: cookies.get('username'),
    fullName: cookies.get('fullName'),
    image: cookies.get('avatarURL'),
    id: cookies.get('userId'),
    phoneNumber: cookies.get('phoneNumber'),
    hashedPassword: cookies.get('hashedPassword'),
  }, authToken);
}


function App() {

  if (!authToken) return <Auth />
  
  return (
    <div className="app__wrapper">
      <Chat client={client} theme="theme light">
        <ChannelListContainer />
        <ChannelContainer />
      </Chat>
    </div>
  );
}

export default App;
