import {DialogPropsType} from '../components/Dialogs/Dialogs';
import {MessagesPropsType} from '../components/Dialogs/Dialogs';
import {PostDataPropsType, PostsDataPropsType} from '../components/Profile/MyPosts/MyPosts';

const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';
const SEND_MESSAGE = 'SEND-MESSAGE';
const UPDATE_NEW_MESSAGE_TEXT = 'UPDATE-NEW-MESSAGE-TEXT';

export type StoreType = {
    _state: StateType
    _callSubscriber: (ololo: any) => void
    //dispatch: <A extends ActionType>(action: A) => void
    dispatch: (action: any) => void



    getState: () => StateType
    subscribe: (observer: () => void) => void

}

export type DialogsPageType = {
    dialogsData: DialogPropsType
    messagesData: MessagesPropsType
    newMessageText: string;
}

export type ProfilePageType = {
    postData: PostsDataPropsType
    newPostText: string,
}

export type StateType = {
    profilePage: ProfilePageType
    dialogsPage: DialogsPageType
}

export type ActionType = {
    type: string
}


let store: StoreType = {
    _state: {
        profilePage: {
            postData: [
                {id: 1, message: 'Hi, how are you', likesCount: 12},
                {id: 2, message: 'It\' my first post', likesCount: 13},
                {id: 3, message: 'Yo', likesCount: 14},
            ],
            newPostText: 'it-kamasutra.com',
        },

        dialogsPage: {
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
            newMessageText: 'samurai.com'
        }
    },
    _callSubscriber(ololo: string) {
    },

    getState() {
        return this._state;
    },

    dispatch(action: any) {
        if (action.type === 'ADD-POST') {
            let newPost: PostDataPropsType = {
                id: this._state.profilePage.postData.length + 1,
                message: this._state.profilePage.newPostText,
                likesCount: 0,
            };
            this._state.profilePage.postData.push(newPost);
            this._state.profilePage.newPostText = '';
            this._callSubscriber(this._state);
        } else if (action.type === 'UPDATE-NEW-POST-TEXT') {
            this._state.profilePage.newPostText = action.newText;
            this._callSubscriber(this._state);
        } else if (action.type === 'SEND-MESSAGE') {
            let newMessage = {
                id: this._state.dialogsPage.messagesData.length + 1,
                message: this._state.dialogsPage.newMessageText,
            };
            this._state.dialogsPage.messagesData.push(newMessage);
            this._state.dialogsPage.newMessageText = '';
            this._callSubscriber(this._state);
        } else if (action.type === 'UPDATE-NEW-MESSAGE-TEXT') {
            this._state.dialogsPage.newMessageText = action.newText;
            this._callSubscriber(this._state);
        }
    },

    subscribe(observer: () => void) {
        this._callSubscriber = observer;
    },
}


export const addPostActionCreator = () => ({type: ADD_POST})

export const updateNewPostTextActionCreator = (text: string) => ({type: UPDATE_NEW_POST_TEXT, newText: text})

export const sendMessageActionCreator = () => ({type: SEND_MESSAGE})

export const updateNewMessageActionCreator = (text: string) => ({type: UPDATE_NEW_MESSAGE_TEXT, newText: text})



// type AddNewPostTextAction = ReturnType<typeof addNewPostTextAC>
// type UpdateNewPostTextAction = ReturnType<typeof updateNewPostTextAC>
//
// type ActionsType = AddNewPostTextAction | UpdateNewPostTextAction

export default store;