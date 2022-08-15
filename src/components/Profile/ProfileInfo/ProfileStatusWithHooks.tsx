import React, {ChangeEvent, useEffect, useState} from 'react';
import {ProfilePropsType} from '../Profile';

type ProfileStatusWithHooksPropsType = {
    status: string
    updateStatus: (status: string) => void
}

const ProfileStatusWithHooks: React.FC<ProfileStatusWithHooksPropsType> = ({status, updateStatus}) => {
    const [editMode, setEditMode] = useState<boolean>(false)
    const [localStatus, setLocalStatus] = useState<string>(status)
    useEffect(() => {
        setLocalStatus(status)
    }, [status])
    const activateEditMode = () => {
        setEditMode(true)
    }
    const deactivateEditMode = () => {
        setEditMode(false)
        updateStatus(localStatus)
    }
    const setStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        setLocalStatus(e.currentTarget.value)
    }
    return (
        <div>
            {!editMode &&
                <div>
                    <span onDoubleClick={activateEditMode}>{status || '------'}</span>
                </div>
            }
            {editMode &&
                <div>
                    <input onChange={setStatusChange} onBlur={deactivateEditMode} value={localStatus} autoFocus/>
                </div>
            }
        </div>
    );
};

export default ProfileStatusWithHooks;