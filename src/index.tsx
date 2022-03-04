import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {PostDataPropsType} from './components/Profile/MyPosts/MyPosts';
import {MessagePropsType} from './components/Dialogs/Message/MessageItem';
import {DialogsPropsType} from './components/Dialogs/Dialogs';

let postData: Array<PostDataPropsType> = [
    {id: 1, message: 'Hi, how are you', likesCount: 12},
    {id: 2, message: 'It\' my first post', likesCount: 13},
    {id: 3, message: 'Yo', likesCount: 14},
];

let dialogsData: DialogsPropsType = [
    {name: 'Artem', id: '1'},
    {name: 'Nastya', id: '2'},
    {name: 'Roma', id: '3'},
    {name: 'Nikita', id: '4'},
    {name: 'Tigra', id: '5'},
];

let messagesData: Array<MessagePropsType> = [
    {id: 1, message: 'Hello'},
    {id: 2, message: 'How are you'},
    {id: 3, message: 'Yo'},
];

ReactDOM.render(
    <App postData={postData} dialogsData={dialogsData} messagesData={messagesData}/>, document.getElementById('root')
);







