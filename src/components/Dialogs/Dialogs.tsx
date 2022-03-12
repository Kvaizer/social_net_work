import React, {KeyboardEventHandler} from 'react';
import s from './Dialogs.module.css'
import {DialogsItemPropsType} from './DialogItem/DialogsItem';
import {MessagePropsType} from './Message/MessageItem';
import DialogItem from './DialogItem/DialogsItem';
import MessageItem from './Message/MessageItem';
import {ActionType, DialogsPageType, sendMessageActionCreator, updateNewMessageActionCreator} from '../../Redux/state';

type DialogsPropsType = {
    dialogsPage: DialogsPageType
    dispatch: <A extends ActionType>(action: A) => void
}

export type DialogPropsType = Array<DialogsItemPropsType>;

export type MessagesPropsType = Array<MessagePropsType>;

const Dialogs = (props: DialogsPropsType) => {
    let messagesElements = props.dialogsPage.messagesData.map((item) => {
        return <MessageItem id={item.id} message={item.message}/>
    });

    let dialogElements = props.dialogsPage.dialogsData.map((item) => {
        return <DialogItem name={item.name} id={item.id}/>
    });


    let newMessageElement = React.createRef<HTMLTextAreaElement>();
    let sendMessage = () => {
        if (newMessageElement.current) {
            props.dispatch(sendMessageActionCreator());
        }
    }

    let onMessageChange = () => {
        if (newMessageElement.current) {
            props.dispatch(updateNewMessageActionCreator(newMessageElement.current.value));
        }
    }

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogElements}
            </div>
            <div className={s.messages}>
                {messagesElements}
                <div>
                    <textarea onChange={onMessageChange}
                              ref={newMessageElement}
                              value={props.dialogsPage.newMessageText}>
                    </textarea>
                </div>
                <div>
                    <button onClick={sendMessage}
                    >SendMessage
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Dialogs;