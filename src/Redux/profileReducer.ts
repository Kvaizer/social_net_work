import {PostDataPropsType, PostsDataPropsType} from '../components/Profile/MyPosts/MyPosts';
import {ProfilePropsType} from '../components/Profile/Profile';
import {Dispatch} from 'redux';
import {profileAPI} from '../api/api';

const ADD_POST = 'ADD-POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE'
const SET_STATUS = 'SET_USER_STATUS'

export type AddPostActionCreatorType = ReturnType<typeof addPostActionCreator>

export type SetUserProfileAT = ReturnType<typeof setUserProfile>
export type SetStatusAT = ReturnType<typeof setStatus>

export type ProfileActionType = AddPostActionCreatorType | SetUserProfileAT | SetStatusAT

export type  ProfilePageType = {
    postData: PostsDataPropsType
    profile: ProfilePropsType
    status: string
}

let initialState = {
    postData: [
        {id: 1, message: 'Hi, how are you', likesCount: 12},
        {id: 2, message: 'It\' my first post', likesCount: 13},
        {id: 3, message: 'Yo', likesCount: 14},
    ],
    profile: null,
    status: ''
}

const ProfileReducer = (state: ProfilePageType = initialState, action: ProfileActionType): ProfilePageType => {
    switch (action.type) {
        case ADD_POST: {
            let newPost: PostDataPropsType = {
                id: state.postData.length + 1,
                message: action.newPostText,
                likesCount: 0,
            };
            return {
                ...state,
                postData: [...state.postData, newPost],
            }
        }

        case SET_USER_PROFILE: {
            return {...state, profile: action.profile}
        }

        case SET_STATUS: {
            return {
                ...state,
                status: action.status
            }
        }

        default: return state;
    }
}

export const addPostActionCreator = (newPostText: string) => ({type: ADD_POST, newPostText} as const)

export const setUserProfile = (profile: ProfilePropsType) => ({type: SET_USER_PROFILE, profile} as const)

export const setStatus = (status: string) => ({type: SET_STATUS, status} as const)

export const getUserProfile = (userId:  number) => (dispatch: Dispatch) => {
    profileAPI.getProfile(userId).then(response => {
        dispatch(setUserProfile(response.data))
    })
}

export const getUserStatus = (userId: number) => (dispatch: Dispatch) => {
    profileAPI.getStatus(userId).then(response => {
        dispatch(setStatus(response.data))
    })
}

export const updateStatus = (status: string) => (dispatch: Dispatch) => {
    profileAPI.updateStatus(status).then(response => {
        if(response.data.resultCode === 0) {
            dispatch(setStatus(status))
        }
    })
}

export default ProfileReducer;
