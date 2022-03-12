import React from 'react';
import s from './../Dialogs.module.css'



export type MessagePropsType = {
    id: number
    message: string
}

const MessageItem = (props: MessagePropsType) => {
    return <div className={s.message}>{props.message}</div>
}



export default MessageItem;