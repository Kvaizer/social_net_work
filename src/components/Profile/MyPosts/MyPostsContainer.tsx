import React from 'react';
import {addPostActionCreator} from '../../../Redux/profileReducer';
import MyPosts from './MyPosts';
import {connect} from 'react-redux';
import {GetStateType} from '../../../Redux/redux-store';


let mapStateToProps = (state: GetStateType) => {
    return {
        postData: state.profilePage.postData,
    }
}

let mapDispatchToProps = (dispatch: any) => {
    return {
        addPost: (newPostText: string) => {
            dispatch(addPostActionCreator(newPostText));
        }
    }
}

const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts)

export default MyPostsContainer;
