import {applyMiddleware, combineReducers, createStore} from 'redux';
import dialogsReducer from './dialogsReducer';
import profileReducer from './profileReducer';
import usersReducer from './usersReducer';
import authReducer from './authReducer';
import thunkMiddleWare from 'redux-thunk';
import {reducer as formReducer} from 'redux-form'
import {appReducer} from './appReducer';

let reducersPackage = combineReducers({
        profilePage: profileReducer,
        dialogsPage: dialogsReducer,
        usersPage: usersReducer,
        auth: authReducer,
        app: appReducer,
        form: formReducer
    })

export type GetStateType = ReturnType<typeof reducersPackage>

let store = createStore(reducersPackage, applyMiddleware(thunkMiddleWare));

//Для Thunk
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

//@ts-ignore
window.store = store

export default store;
