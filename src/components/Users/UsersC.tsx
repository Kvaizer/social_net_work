import React from 'react';
import s from './Users.module.css';
import manWithoutAvatar from '../../assets/images/manWithoutFoto.jpg';
import {UserType} from '../../Redux/usersReducer';
import {NavLink} from 'react-router-dom';
import Paginator from '../common/Paginator/Paginator';


export type UsersCPropsType = {
    totalCount: number
    pageSize: number
    currentPage: number
    onClickSetPageHandler: (pageNumber: number) => void
    users: Array<UserType>
    followingInProgress: number[]
    follow: (userId: number) => void
    unfollow: (userId: number) => void
}

const UsersC = (props: UsersCPropsType) => {
    let pagesCount = Math.ceil(props.totalCount / props.pageSize)

    let pages = []

    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    return (
        <div>
            <Paginator
                totalCount={props.totalCount}
                pageSize={props.pageSize}
                onClickSetPageHandler={props.onClickSetPageHandler}
                currentPage={props.currentPage}
                portionSize={10}/>
            {
                props.users.map(user => <div key={user.id}>
                    <span>
                        <div>
                            {
                                <NavLink to={'/profile/' + user.id}>
                                    <img src={user.photos.small ? user.photos.small : manWithoutAvatar}
                                         className={s.userPhoto} alt={'User picture'}/>
                                </NavLink>
                            }
                        </div>
                        <div>
                            {
                                user.followed ?
                                    <button disabled={props.followingInProgress.some(id => id === user.id)}
                                            onClick={() => {
                                                props.unfollow(user.id)
                                            }}>Unfollow</button> :
                                    <button disabled={props.followingInProgress.some(id => id === user.id)}
                                            onClick={() => {
                                                props.follow(user.id)
                                            }}>Follow</button>
                            }
                        </div>
                    </span>
                    <span>
                        <span>
                            <div>{user.name}</div>
                            <div>{user.status}</div>
                        </span>
                        <span>
                            <div>{'user.location.country'}</div>
                            <div>{'user.location.city'}</div>
                        </span>
                    </span>
                </div>)
            }
        </div>
    )
}

export default UsersC