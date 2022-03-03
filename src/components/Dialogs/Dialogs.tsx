import React from 'react';
import { NavLink } from 'react-router-dom';
import s from './Dialogs.module.css'

const Dialogs = (props: any) => {
    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                <div className={s.dialog + ' ' + s.active}>
                    <NavLink to ='/dialogs/1'>Artem</NavLink>
                </div>
                <div className={s.dialog}>
                    <NavLink to ='/dialogs/2'>Nastya</NavLink>
                </div>
                <div className={s.dialog}>
                    <NavLink to ='/dialogs/3'>Roma</NavLink>
                </div>
                <div className={s.dialog}>
                    <NavLink to ='/dialogs/4'>Nikita</NavLink>
                </div>
                <div className={s.dialog}>
                    <NavLink to ='/dialogs/5'>Tigra</NavLink>
                </div>
            </div>
            <div className={s.messages}>
                <div className={s.message}>Hi</div>
                <div className={s.message}>How are you</div>
                <div className={s.message}>LOL</div>
            </div>
        </div>
    )
}

export default Dialogs;