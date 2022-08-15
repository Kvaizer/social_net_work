import React, {useCallback} from 'react';
import {GetStateType} from '../redux-store';
import {UserType} from '../usersReducer';

export const selectUsers = (state: GetStateType): UserType[] => {
    return state.usersPage.users
}

export const selectPageSize = (state: GetStateType): number => {
    return state.usersPage.pageSize
}

export const selectTotalCount = (state: GetStateType): number => {
    return state.usersPage.totalCount
}

export const selectCurrentPage = (state: GetStateType): number => {
    return state.usersPage.currentPage
}

export const selectIsFetching = (state: GetStateType): boolean => {
    return state.usersPage.isFetching
}

export const selectFollowingInProgress = (state: GetStateType): number[] => {
    return state.usersPage.followingInProgress
}
