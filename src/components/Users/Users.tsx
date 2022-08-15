//@ts-ignore
import React from 'react';
import {UserType} from '../../Redux/usersReducer';
import s from './Users.module.css'
import axios from 'axios'
import manWithoutAvatar from '../../assets/images/manWithoutFoto.jpg'

export type UsersPropsType = {
    users: Array<UserType>
    totalCount: number
    pageSize: number
    currentPage: number
    follow: (usersId: number) => void
    unfollow: (usersId: number) => void
    setUsers: (users: Array<UserType>) => void
    setCurrentPage: (currentPage: number) => void
    setTotalUsersCount: (totalUsersCount: number) => void
}

const Users = (props: UsersPropsType) => {
    let getUsers = () => {
        if(props.users.length === 0) {
            axios.get('https://social-network.samuraijs.com/api/1.0/users').then(response => {
                props.setUsers(response.data.items)
            });
        }
    }

    const onClickFollowHandler = (id: number) => {
        props.follow(id)
    }

    const onClickUnfollowHandler = (id: number) => {
        props.unfollow(id)
    }

    return (
        <div>
            <button onClick={getUsers}>Get Users</button>
            {
                props.users.map(user => <div key ={user.id}>
                    <span>
                        <div>
                            {user.photos.small ? <img src={user.photos.small} className={s.userPhoto}/> : <img src={manWithoutAvatar} className={s.userPhoto}/>}
                        </div>
                        <div>
                            {
                                user.followed ?
                                <button onClick={() => onClickUnfollowHandler(user.id)}>Unfollow</button> :
                                <button onClick={() => onClickFollowHandler(user.id)}>Folow</button>
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
    );
};

export default Users;