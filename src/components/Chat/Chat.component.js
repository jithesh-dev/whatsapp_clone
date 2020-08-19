import React, { useState, useEffect } from 'react';
import './Chat.style.css';
import { Avatar, IconButton } from '@material-ui/core';
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import MicIcon from '@material-ui/icons/Mic';
import { useParams } from 'react-router-dom';
import db from '../../firebase';

function Chat() {
  const [input, setInput] = useState('');
  const [seed, setSeed] = useState('');
  const { roomId } = useParams();
  const [roomName, setroomName] = useState('');

  useEffect(() => {
    if (roomId) {
      db.collection('rooms')
        .doc(roomId)
        .onSnapshot((snapshot) => setroomName(snapshot.data().name));
    }
  }, [roomId]);

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, [roomId]);

  const sendMessage = (e) => {
    e.preventDefault();
    console.log('you typed>> ', input);
    setInput('');
  };

  return (
    <div className='chat'>
      <div className='chat__header'>
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
        <div className='chat__headerInfo'>
          <h3>{roomName}</h3>
          <p>last seen </p>
        </div>
        <div className='chat__headerRight'>
          <IconButton>
            <SearchOutlinedIcon />
          </IconButton>
          <IconButton>
            <ChatIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>
      <div className='chat__body'>
        <p className={`chat__message ${true && 'chat__receiver'}`}>
          <span className='chat__name'>Sonny</span>
          "Message"
          <span className='chat__timestamp'>3.44 pm</span>
        </p>
      </div>
      <div className='chat__footer'>
        <InsertEmoticonIcon />
        <form action=''>
          <input
            type='text'
            placeholder='type a message...'
            onChange={(e) => setInput(e.target.value)}
            value={input}
          />
          <button type='submit' onClick={sendMessage}>
            Send a message
          </button>
        </form>
        <MicIcon />
      </div>
    </div>
  );
}

export default Chat;
