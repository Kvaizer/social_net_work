import React from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {GetStateType} from '../Redux/redux-store';


const mapStateToProps = (state: GetStateType): MSTPT => ({
    isAuth: state.auth.isAuth
})
type MSTPT = {
    isAuth: boolean
}
type MDTPT = {}

export function withAuthRedirect<T>(Component: React.ComponentType<T>) {

    const RedirectComponent: React.FC<MSTPT & MDTPT> = (props) => {
        let {isAuth, ...restProps} = props
        if (!isAuth) return <Redirect to='/login'/>
        return <Component  {...restProps as T} />
    }
    return connect<MSTPT, MDTPT, T, GetStateType>(mapStateToProps, {})(RedirectComponent)
}

