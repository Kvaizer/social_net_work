import React from 'react';
import s from './Dialogs.module.css'
import {DialogsItemPropsType} from './DialogItem/DialogsItem';
import {MessagePropsType} from './Message/MessageItem';
import DialogItem from './DialogItem/DialogsItem';
import MessageItem from './Message/MessageItem';


export type DialogsPropsType = Array<DialogsItemPropsType>;

const Dialogs = (props: any) => {
    let messagesElements: Array<any> = props.messagesData.map((item: MessagePropsType) => {
        return <MessageItem id={item.id} message={item.message}/>
    });

    let dialogElements: Array<any> = props.dialogsData.map((item: DialogsItemPropsType) => {
        return <DialogItem name={item.name} id={item.id}/>
    });

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogElements}
            </div>
            <div className={s.messages}>
                {messagesElements}
            </div>
        </div>
    )
}

export default Dialogs;