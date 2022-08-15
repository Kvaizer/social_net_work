import React from 'react';
import {sendMessageActionCreator} from '../../Redux/dialogsReducer';
import Dialogs from './Dialogs';
import {GetStateType} from '../../Redux/redux-store';
import {connect} from 'react-redux';
import {withAuthRedirect} from '../../hoc/WithAuthRedirect';
import {compose, Dispatch} from 'redux';
import { withRouter } from 'react-router-dom';

let mapStateToProps = (state: GetStateType) => {
    return {
        dialogsPage: state.dialogsPage,
        isAuth: state.auth.isAuth
    }
}

let mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        sendMessage: (newMessageBody: string) => {
            dispatch(sendMessageActionCreator(newMessageBody))
        },
    }
}


export default compose<React.ComponentType>(
    connect(mapStateToProps, mapDispatchToProps),
    withRouter,
    withAuthRedirect
)(Dialogs);