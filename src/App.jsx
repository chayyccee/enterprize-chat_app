import React from 'react';
import './App.css';
import { StreamChat } from 'stream-chat';
import { Chat } from 'stream-chat-react';
import cookies from 'universal-cookie';

import { ChannelContainer, ChannelListContainer } from './components';

const apiKey = 'tdhzxkp5np89';
const client = StreamChat.getInstance(apiKey);

function App() {
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
