import React from 'react';
import s from './Profile.module.css';
import MyPosts, {PostDataPropsType} from './MyPosts/MyPosts';
import {ProfileInfo} from './ProfileInfo/ProfileInfo';

const Profile = (props: any) => {



    return <div>
        <ProfileInfo/>
        <MyPosts postData={props.postData}/>
    </div>
}

export default Profile;
