import React from 'react';
import s from './ProfileInfo.module.css'
import Preloader from '../../common/preloader/preloader';
import {ProfilePropsType} from '../Profile';
import manWithoutAvatar from '../../../assets/images/manWithoutFoto.jpg';
import ProfileStatus from './ProfileStatus';
import ProfileStatusWithHooks from './ProfileStatusWithHooks';

type ProfileInfoPropsType = {
    profile: ProfilePropsType
    status: string
    updateStatus: (status: string) => void
}

export const ProfileInfo = (props: ProfileInfoPropsType) => {
    if(!props.profile) {
        return <Preloader/>
    }

    return <div>
        <div className={s.descriptionBlock}>
            <img src={props.profile.photos.large ? props.profile.photos.large : manWithoutAvatar} width='200' height='200'/>
        </div>
        <ProfileStatusWithHooks status={props.status} updateStatus={props.updateStatus}/>
        <div>{props.profile.aboutMe}</div>
    </div>
}

