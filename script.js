import { q, c, createFriendEl, createMessageEl} from './utils.js';
import { GET, POST, DELETE } from './api.js';

const messageBodyPost = {};
const friendsEl = q('.userWrapper')
const messagesListEl = q('.message-box');

const inputTextEl = q('.input-text');
const inputSender = q('.input-sender');
const addMsgBtn = q('.add-new-message-btn');
const filterInput = q('.filter-input');

GET('https://edgemony-backend.herokuapp.com/friends').then((friendList) => {
  friendList.map(friend => createFriendEl(friendsEl,friend.name, friend.photo))
});

GET('https://edgemony-backend.herokuapp.com/messages')
.then((messagesList) => {
  messagesList.reverse().map(({text, sender, date, id}) => createMessageEl(messagesListEl, id, text, sender, date, () => {
    DELETE('https://edgemony-backend.herokuapp.com/messages', id).then(() => location.reload())
  }))
}); 

inputTextEl.addEventListener('input', (e) => messageBodyPost.text = e.target.value);

inputSender.addEventListener('input', (e) => {
    messageBodyPost.sender = e.target.value;
    messageBodyPost.date = new Date().toLocaleTimeString();
  });

addMsgBtn.addEventListener('click', () => {
    POST('https://edgemony-backend.herokuapp.com/messages', messageBodyPost)
      .then(() => document.querySelectorAll('.messageCard').forEach(message => message.remove()))
      .then(() => GET('https://edgemony-backend.herokuapp.com/messages').then((messagesList) => {
        messagesList.reverse().map(({text, sender, date, id}) => createMessageEl(messagesListEl, id, text, sender, date))
    }));
});

filterInput.addEventListener('input', (e) => {
    document.querySelectorAll('.messageCard').forEach(message => message.remove());
  
    GET('https://edgemony-backend.herokuapp.com/messages').then((messagesList) => {
      messagesList
      .reverse()
      .filter(message => message.sender.toLowerCase().includes(e.target.value.toLowerCase()))
      .map(({text, sender, date, id}) => createMessageEl(messagesListEl, id, text, sender, date))
    })
  });