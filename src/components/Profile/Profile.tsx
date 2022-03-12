import React from 'react';
import s from './Profile.module.css';
import MyPosts, {PostDataPropsType, PostsDataPropsType} from './MyPosts/MyPosts';
import {ProfileInfo} from './ProfileInfo/ProfileInfo';
import {ActionType} from '../../Redux/state';

const Profile = (props: any) => {
    return <div>
        <ProfileInfo/>
        <MyPosts postData={props.profilePage.postData}
                 dispatch={props.dispatch}
                 newPostText={props.profilePage.newPostText}
                 />
    </div>
}



export default Profile;
