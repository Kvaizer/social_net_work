import React from 'react';
import {connect} from 'react-redux';
import {GetStateType} from '../../Redux/redux-store';
import {
    follow, unfollow,
    UserType, setUserPage, getUsers
} from '../../Redux/usersReducer';
import UsersC from './UsersC';
import Preloader from '../common/preloader/preloader';
import {compose} from 'redux';
import {
    selectCurrentPage, selectFollowingInProgress,
    selectIsFetching,
    selectPageSize,
    selectTotalCount,
    selectUsers
} from '../../Redux/selectors/users-selector';

type UsersContainerComponentPropsType = {
    currentPage: number
    pageSize: number
    totalCount: number
    users: Array<UserType>
    isFetching: boolean
    followingInProgress: number[]
    getUsers: (currentPage: number, pageSize: number) => void
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    setUserPage: (pageNumber: number, pageSize: number) => void
}

class UsersContainerComponent extends React.Component<UsersContainerComponentPropsType> {
    constructor(props: UsersContainerComponentPropsType) {
        super(props);
    } // если в конструкторе не содержится чего-то кроме родительского конструктора, писать этот блок не обязательно
    componentDidMount(): void {
        this.props.getUsers(this.props.currentPage, this.props.pageSize)
    }

    onClickSetPageHandler = (pageNumber: number) => {
        this.props.setUserPage(pageNumber, this.props.pageSize)
    }

    render() {
        return <>
            {this.props.isFetching ? <Preloader/> : null}
            <UsersC totalCount={this.props.totalCount}
                    pageSize={this.props.pageSize}
                    currentPage={this.props.currentPage}
                    onClickSetPageHandler={this.onClickSetPageHandler}
                    users={this.props.users}
                    followingInProgress={this.props.followingInProgress}
                    follow={this.props.follow}
                    unfollow={this.props.unfollow}
            />
        </>
    }
}

let mapStateToProps = (state: GetStateType) => {
    return {
        users: selectUsers(state),
        pageSize: selectPageSize(state),
        totalCount: selectTotalCount(state),
        currentPage: selectCurrentPage(state),
        isFetching: selectIsFetching(state),
        followingInProgress: selectFollowingInProgress(state)
    }
}


export default compose<React.ComponentType>(
    connect(mapStateToProps, {follow, unfollow, getUsers, setUserPage})
)(UsersContainerComponent);