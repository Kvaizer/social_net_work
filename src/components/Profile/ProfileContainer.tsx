import React from 'react';
import Profile, {ProfilePropsType} from './Profile';
import {connect} from 'react-redux';
import {getUserProfile, getUserStatus, updateStatus} from '../../Redux/profileReducer';
import {GetStateType} from '../../Redux/redux-store';
import {RouteComponentProps, withRouter} from 'react-router-dom';
import {compose} from 'redux';

type PathParamsType = {
    userId: string
}
type MSTPT = {
    profile: ProfilePropsType,
    status: string
    isAuth: boolean
    authorisedUserId: number
}
type MDTPT = {
    getUserProfile: (id: number) => void
    getUserStatus: (id: number) => void
    updateStatus: (status: string) => void
}
type PropsType = MSTPT & MDTPT & RouteComponentProps<PathParamsType>

export class ProfileContainer extends React.Component<PropsType> {
    refreshProfile() {
        let userId: number = +this.props.match.params.userId
        if(!userId) {
            userId = this.props.authorisedUserId
            if(!userId) {
                this.props.history.push('/login')
                return
            }
        }
        this.props.getUserProfile(userId);
        this.props.getUserStatus(userId)
    }

    componentDidMount(): void {
        this.refreshProfile()
    }

    componentDidUpdate(): void {
        this.refreshProfile()
    }

    render() {
        return (
                <Profile {...this.props}
                         profile={this.props.profile}
                         updateStatus={this.props.updateStatus}

                />
        );
    }

}

let mapStateToProps = (state: GetStateType): MSTPT => {
   return {
       profile: state.profilePage.profile,
       status: state.profilePage.status,
       isAuth: state.auth.isAuth,
       authorisedUserId: state.auth.userId
   }
}

export default compose<React.ComponentType<any>>(
    connect(mapStateToProps, {getUserProfile, getUserStatus, updateStatus}),
    withRouter,
)(ProfileContainer);