import React from 'react';
import Header from './Header';
import {connect} from 'react-redux';
import {GetStateType} from '../../Redux/redux-store';
import {logout, setAuthUser} from '../../Redux/authReducer';
import {usersAPI} from '../../api/api';

export type HeaderContainerPropsType = {
    isAuth: boolean
    login: string | null
    logout: () => void
}

class HeaderContainer extends React.Component<HeaderContainerPropsType> {

    render() {
        return <Header {...this.props}/>
    }
}

const mapStateToProps = (state: GetStateType) => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login
})


export default connect(mapStateToProps, {logout})(HeaderContainer);