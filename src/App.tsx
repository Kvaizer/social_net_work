import React, {Suspense, useEffect} from 'react';
import './App.css';
import Navbar from "./components/Navbar/Navbar";
import {Route} from 'react-router-dom';
import UsersContainer from './components/Users/UsersContainer';
import HeaderContainer from './components/Header/HeaderContainer';
import LoginPage from './components/Login/Login';
import {useAppDispatch, useAppSelector} from './hooks';
import {initializeApp} from './Redux/appReducer';
import Preloader from './components/common/preloader/preloader';

const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'))
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'))

function App() {

    const dispatch = useAppDispatch()
    const initialized = useAppSelector((state) => state.app.initialized)

    useEffect(() => {
        dispatch(initializeApp())
    }, [])

    return (
            initialized ? <div className='app-wrapper'>
                <HeaderContainer/>
                <Navbar/>
                <div className='app-wrapper-content'>
                    <Route exact path='/dialogs' render={() => <Suspense fallback={<div>Loading...</div>}><DialogsContainer/></Suspense>}
                    />
                    <Route exact path='/profile/:userId?' render={() => <Suspense fallback={<div>Loading...</div>}><ProfileContainer/></Suspense>}
                    />
                    <Route path='/users'
                           render={() => <UsersContainer/>}
                    />
                    <Route path='/login'
                           render={() => <LoginPage/>}
                    />
                </div>
            </div> : <Preloader/>

    );
}

export default App

