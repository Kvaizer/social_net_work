import {usersAPI} from '../api/api';
import {ThunkAction} from 'redux-thunk';
import {Dispatch} from 'redux';
import {GetStateType} from './redux-store';

const FOLLOW = 'FOLLOW'
const UNFOLLOW = 'UNFOLLOW'
const SET_USERS = 'SET_USERS'
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE'
const SET_TOTAL_COUNT = 'SET_TOTAL_COUNT'
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING'
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE_IS_FOLLOWING_PROGRESS'

type FollowAT = ReturnType<typeof followSuccess>
type UnfollowAT = ReturnType<typeof unfollowSuccess>
type SetUsersAT = ReturnType<typeof setUsers>
type SetCurrentPageAT = ReturnType<typeof setCurrentPage>
type setTotalUsersCountAT = ReturnType<typeof setTotalUsersCount>
type toggleIsFetchingAT = ReturnType<typeof toggleIsFetching>
type toggleIsFollowingProgressAT = ReturnType<typeof toggleFollowingProgress>

export type UserPageAT =
    FollowAT
    | UnfollowAT
    | SetUsersAT
    | SetCurrentPageAT
    | setTotalUsersCountAT
    | toggleIsFetchingAT
    | toggleIsFollowingProgressAT


export type UserType = {
    name: string
    id: number
    uniqueUrlName: string | null
    photos: PhotosType
    status: string
    followed: boolean
}

export type PhotosType = {
    small: string | null
    large: string | null
}

type UsersPageType = {
    users: Array<UserType>
    pageSize: number
    totalCount: number
    currentPage: number
    isFetching: boolean
    followingInProgress: number[]
}

let initialState = {
    users: [],
    pageSize: 5,
    totalCount: 19,
    currentPage: 1,
    isFetching: true,
    followingInProgress: []
}

const usersReducer = (state: UsersPageType = initialState, action: UserPageAT): UsersPageType => {

    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: state.users.map(item => item.id === action.userId ? {...item, followed: true} : item)
            }

        case UNFOLLOW:
            return {
                ...state,
                users: state.users.map(item => item.id === action.userId ? {...item, followed: false} : item)
            }

        case SET_USERS:
            return {
                ...state,
                users: [...action.users]
            }

        case SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.currentPage
            }

        case SET_TOTAL_COUNT:
            return {
                ...state,
                totalCount: action.totalUsersCount
            }

        case TOGGLE_IS_FETCHING:
            return {
                ...state,
                isFetching: action.isFetching
            }

        case TOGGLE_IS_FOLLOWING_PROGRESS :
            return {
                ...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : [...state.followingInProgress.filter(id => id !== action.userId)]
            }

        default:
            return state;
    }
}

export const followSuccess = (userId: number) => ({type: FOLLOW, userId} as const)

export const unfollowSuccess = (userId: number) => ({type: UNFOLLOW, userId} as const)

export const setUsers = (users: Array<UserType>) => ({type: SET_USERS, users} as const)

export const setCurrentPage = (currentPage: number) => ({type: SET_CURRENT_PAGE, currentPage} as const)

export const setTotalUsersCount = (totalUsersCount: number) => ({type: SET_TOTAL_COUNT, totalUsersCount} as const)

export const toggleIsFetching = (isFetching: boolean) => ({type: TOGGLE_IS_FETCHING, isFetching} as const)

export const toggleFollowingProgress = (isFetching: boolean, userId: number) => ({
    type: TOGGLE_IS_FOLLOWING_PROGRESS,
    isFetching,
    userId
} as const)

type ThunkType = ThunkAction<void, GetStateType, unknown, UserPageAT>

export const getUsers = (currentPage: number, pageSize: number): ThunkType => {
    return (dispatch: Dispatch) => {
        dispatch(toggleIsFetching(true))
        usersAPI.getUsers(currentPage, pageSize).then(data => {
            dispatch(toggleIsFetching(false))
            dispatch(setUsers(data.items))
            dispatch(setTotalUsersCount(data.totalCount))
        });
    }
}

export const setUserPage = (pageNumber: number, pageSize: number) => {
    return (dispatch: Dispatch) => {
        dispatch(toggleIsFetching(true))
        dispatch(setCurrentPage(pageNumber));
        usersAPI.getUsers(pageNumber, pageSize).then(data => {
            dispatch(toggleIsFetching(false))
            dispatch(setUsers(data.items))
        });
    }
}

export const follow = (userId: number): ThunkType => {
    return (dispatch: Dispatch) => {
        dispatch(toggleFollowingProgress(true, userId))
        usersAPI.postFollow(userId).then(response => {
            if (response.data.resultCode === 0) {
                dispatch(followSuccess(userId))
            }
            dispatch(toggleFollowingProgress(false, userId))
        })
    }
}

export const unfollow = (userId: number): ThunkType => {
    return (dispatch: Dispatch) => {
        dispatch(toggleFollowingProgress(true, userId))
        usersAPI.deleteUnfollow(userId).then(response => {
            if (response.data.resultCode === 0) {
                dispatch(unfollowSuccess(userId))
            }
            dispatch(toggleFollowingProgress(false, userId))
        })
    }
}




export default usersReducer;