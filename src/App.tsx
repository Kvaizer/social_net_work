import React from 'react';
import './App.css';
import Header from "./components/Header/Header";
import Navbar from "./components/Navbar/Navbar";
import Profile from "./components/Profile/Profile";
import Dialogs from './components/Dialogs/Dialogs';
import {BrowserRouter, Route} from 'react-router-dom';
import News from './components/News/News';
import Music from './components/Music/Music';
import Settings from './components/Settings/Settings';
import {ActionType, StateType} from './Redux/state';

type AppPropsType = {
    state: StateType
    dispatch: <A extends ActionType>(action: A) => void
}


function App(props: AppPropsType) {
    return (
        <BrowserRouter>
            <div className='app-wrapper'>
                <Header/>
                <Navbar/>
                <div className='app-wrapper-content'>
                    <Route exact path='/dialogs' render={() => <Dialogs
                        dialogsPage={props.state.dialogsPage}
                        dispatch={props.dispatch}
                        />}/>
                    <Route exact path='/profile' render={() => <Profile
                        profilePage={props.state.profilePage}
                        dispatch={props.dispatch}
                        />}
                        />
                    <Route exact path='/news' component={News}/>
                    <Route exact path='/music' component={Music}/>
                    <Route exact path='/settings' component={Settings}/>
                </div>
            </div>
        </BrowserRouter>
    );
}




export default App

