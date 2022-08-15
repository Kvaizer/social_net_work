import React from 'react';
import {ProfileInfo} from './ProfileInfo/ProfileInfo';
import MyPostsContainer from './MyPosts/MyPostsContainer';
import {PhotosType} from '../../Redux/usersReducer';

export type ContactsType = {
    facebook: string | null
    github: string | null
    instagram: string | null
    mainLink: string | null
    twitter: string | null
    vk: string | null
    website: string | null
    youtube: string | null
}

export type ProfilePropsType = {
    aboutMe: string
    contacts: ContactsType
    fullName: string
    lookingForAJob: boolean
    lookingForAJobDescription: string
    photos: PhotosType
    userId: number
} | null


type  ProfilePageType = {
    profile: ProfilePropsType
    isAuth: boolean
    status: string
    updateStatus: (status: string) => void
}

const Profile = (props: ProfilePageType) => {
    return <div>
        <ProfileInfo {...props} profile={props.profile} status={props.status} updateStatus={props.updateStatus}/>
        <MyPostsContainer/>
    </div>
}


export default Profile;
