import React from 'react';
import {Dispatch} from 'redux';
import {setAuthUser, SetAuthUserDataAT} from './authReducer';
import {ThunkAction} from 'redux-thunk';
import {GetStateType} from './redux-store';
import {AxiosResponse} from 'axios';

const INITIALIZED_SUCCESS = 'INITIALIZED_SUCCESS'

type AppReducerStateType = {
    initialized: boolean
}

type InitializedAT = ReturnType<typeof initializedSuccess>

type ActionsType = InitializedAT

let initialState: AppReducerStateType = {
    initialized: false
}

export const appReducer = (state: AppReducerStateType = initialState, action: ActionsType) => {
    switch (action.type) {
        case INITIALIZED_SUCCESS: {
            return {
                ...state,
                initialized: true
            }
        }
        default:
            return state
    }
}

export const initializedSuccess = () => ({type: INITIALIZED_SUCCESS})

export type ThunkType = ThunkAction<void, GetStateType, unknown, SetAuthUserDataAT | ActionsType>

export const initializeApp = (): ThunkType => (dispatch) => {
    dispatch(setAuthUser()).then(() => {
        dispatch(initializedSuccess())
    })
}