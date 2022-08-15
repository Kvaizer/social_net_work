import {authAPI} from '../api/api';
import {ThunkAction} from 'redux-thunk';
import {GetStateType} from './redux-store';
import {stopSubmit} from 'redux-form';
import {useAppDispatch} from '../hooks';
import {FormAction} from 'redux-form/lib/actions';
import {Dispatch} from 'redux';

const SET_AUTH_USER_DATA = 'SET_AUTH_USER_DATA';

export type SetAuthUserDataAT = ReturnType<typeof setAuthUserData>

export type AuthType = {
    userId: number
    email: string | null
    login: string | null
    isAuth: boolean
}


let initialState = {
    userId: 0,
    email: null,
    login: null,
    isAuth: false
}

const authReducer = (state: AuthType = initialState, action: SetAuthUserDataAT ): AuthType => {
    switch (action.type) {
        case SET_AUTH_USER_DATA :
            return {
                ...state,
                ...action.data,
            }


        default:
            return state;
    }
}

export const setAuthUserData = (userId: number, email: string | null, login: string | null, isAuth: boolean) => {
    return {
        type: SET_AUTH_USER_DATA, data: {userId, email, login, isAuth}
    } as const
}

export type ThunkType = ThunkAction<void, GetStateType, unknown, SetAuthUserDataAT>

export type ThunkTypeS = ThunkAction<Promise<any>, GetStateType, unknown, SetAuthUserDataAT>

export const setAuthUser = (): ThunkTypeS => (dispatch) => {
       return authAPI.getAuth().then(data => {
            if(data.resultCode === 0) {
                let {id, login, email} = data.data
                dispatch(setAuthUserData(id, email, login, true))
            }
        })
    }



export const login = (email: string, password: string, rememberMe: boolean)=> (dispatch: Dispatch<any>) => {
    authAPI.login(email, password, rememberMe)
        .then(response => {
            if(response.data.resultCode === 0) {
                dispatch(setAuthUser())
            } else {
                let message = response.data.messages.length > 0 ? response.data.messages[0] : 'Some error'
                dispatch(stopSubmit('login', {_error: message}));
            }
        })
}

export const logout = (): ThunkType => (dispatch) => {
    authAPI.logout()
        .then(response => {
            if(response.data.resultCode === 0) {
                dispatch(setAuthUserData(0, null, null, false))
            }
        })
}

export default authReducer;