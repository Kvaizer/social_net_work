import React from 'react';
import s from './Dialogs.module.css'
import {DialogsItemPropsType} from './DialogItem/DialogsItem';
import {MessagePropsType} from './Message/MessageItem';
import DialogItem from './DialogItem/DialogsItem';
import MessageItem from './Message/MessageItem';
import {DialogsPageType} from '../../Redux/dialogsReducer';
import AddMessageForm from './AddMessageForm/AddMessageForm';

export type DialogsPropsType = {
    sendMessage: (newMessageBody: string) => void
    dialogsPage: DialogsPageType
    isAuth: boolean
}

export type DialogPropsType = Array<DialogsItemPropsType>;

export type MessagesPropsType = Array<MessagePropsType>;

const Dialogs = (props: DialogsPropsType) => {
    let state = props.dialogsPage;
    let messagesElements = state.messagesData.map((item) => {
        return <MessageItem id={item.id} message={item.message}/>
    });

    let dialogElements = state.dialogsData.map((item) => {
        return <DialogItem name={item.name} id={item.id}/>
    });

    const addNewMessage = (values: any) => {
        props.sendMessage(values.newMessageBody)
    }
    // if(!props.isAuth) return <Redirect to={'/login'}/>
    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogElements}
            </div>
            <div className={s.messages}>
                {messagesElements}
            </div>
            <AddMessageForm onSubmit={addNewMessage}/>
        </div>
    )
}

export default Dialogs;



