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
import { useStateValue } from '../../StateProvider/StateProvider';
import firebase from 'firebase';

function Chat() {
  const [input, setInput] = useState('');
  const [seed, setSeed] = useState('');
  const { roomId } = useParams();
  const [roomName, setroomName] = useState('');
  const [messages, setMessages] = useState([]);
  const [{ user }, dispatch] = useStateValue();

  useEffect(() => {
    if (roomId) {
      db.collection('rooms')
        .doc(roomId)
        .onSnapshot((snapshot) => setroomName(snapshot.data().name));

      db.collection('rooms')
        .doc(roomId)
        .collection('messeges')
        .orderBy('timestamp', 'asc')
        .onSnapshot((snapshot) =>
          setMessages(snapshot.docs.map((doc) => doc.data()))
        );
    }
  }, [roomId]);

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, [roomId]);

  const sendMessage = (e) => {
    e.preventDefault();
    console.log('you typed>> ', user.displayName);
    db.collection('rooms').doc(roomId).collection('messeges').add({
      message: input,
      name: user.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });

    setInput('');
  };

  return (
    <div className='chat'>
      <div className='chat__header'>
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
        <div className='chat__headerInfo'>
          <h3>{roomName}</h3>
          <p>
            last seen{' '}
            {new Date(
              messages[messages.length - 1]?.timestamp?.toDate()
            )?.toLocaleString()}
          </p>
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
        {messages.map(
          (message) =>
            message && (
              <p
                className={`chat__message ${
                  message.name === user.displayName && 'chat__receiver'
                }`}
                key={message.timestamp}
              >
                <span className='chat__name'>{message.name}</span>
                {message.message}
                <span className='chat__timestamp'>
                  {new Date(message.timestamp?.toDate()).toLocaleString()}
                </span>
              </p>
            )
        )}
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
