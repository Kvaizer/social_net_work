import React from 'react';
import s from './Header.module.css';
import {NavLink} from 'react-router-dom';
import {HeaderContainerPropsType} from './HeaderContainer';



const Header = (props: HeaderContainerPropsType) => {
    return <header className={s.header}>
        <img src='https://cdn.logo.com/hotlink-ok/logo-social.png'/>
        <div className={s.loginBlock}>
            {props.isAuth
                ? <div>{props.login} - <button onClick={props.logout}>LogOut</button></div> :
                <NavLink to={'/login'}>login</NavLink>}
        </div>
    </header>
};

export default Header;