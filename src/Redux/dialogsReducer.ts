import {MessagePropsType} from '../components/Dialogs/Message/MessageItem';
import {DialogPropsType, MessagesPropsType} from '../components/Dialogs/Dialogs';

const SEND_MESSAGE = 'SEND-MESSAGE';

export type SendMessageActionCreatorType = ReturnType<typeof sendMessageActionCreator>


export type DialogsActionType = SendMessageActionCreatorType

export type DialogsPageType = {
    dialogsData: DialogPropsType
    messagesData: MessagesPropsType
}

let initialState = {
    dialogsData: [
        {name: 'Artem', id: '1'},
        {name: 'Nastya', id: '2'},
        {name: 'Roma', id: '3'},
        {name: 'Nikita', id: '4'},
        {name: 'Tigra', id: '5'},
    ],
        messagesData: [
    {id: 1, message: 'Hello'},
    {id: 2, message: 'How are you'},
    {id: 3, message: 'Yo'},
],
    newMessageText: ''
}

const DialogsReducer  = (state: DialogsPageType = initialState, action: DialogsActionType): DialogsPageType => {
    switch (action.type) {
        case SEND_MESSAGE: {
            let newMessage: MessagePropsType = {
                id: state.messagesData.length + 1,
                message: action.newMessageBody,
            };
           return {
                ...state,
                messagesData: [...state.messagesData, newMessage],
            };
        }

        default:
            return state;
    }
}

export const sendMessageActionCreator  = (newMessageBody: string) => ({type: SEND_MESSAGE, newMessageBody} as const)

export default DialogsReducer;