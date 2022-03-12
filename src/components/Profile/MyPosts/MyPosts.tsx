import React from 'react';
import s from './MyPosts.module.css';
import Post from "./Post/Post";
import {ActionType, addPostActionCreator, updateNewPostTextActionCreator} from '../../../Redux/state';

export type PostDataPropsType = {
    id: number
    message: string
    likesCount: number
}

type MyPostsPropsType = {
    postData: PostsDataPropsType
    newPostText: string
    dispatch: <A extends ActionType>(action: A) => void
}

export type PostsDataPropsType = Array<PostDataPropsType>;



const MyPosts = (props: MyPostsPropsType) => {

    let postsElements = props.postData.map((item) => {
        return <Post key={item.id} message={item.message} likesCounter={item.likesCount}/>
    });

    let newPostElement = React.createRef<HTMLTextAreaElement>();
    let addPost = () => {
        if (newPostElement.current) {
            props.dispatch(addPostActionCreator());
        }
    }

    let onPostChange = () => {
        if (newPostElement.current) {
            let action = updateNewPostTextActionCreator(newPostElement.current.value);
            props.dispatch(action);
        }
    }

    return <div className={s.content}>
        <div className={s.postsBlock}>
            <h2>My posts</h2>
            <div>
                <div>
                    <textarea onChange={onPostChange} ref={newPostElement} value={props.newPostText}/>
                </div>
                <div>
                    <button onClick={addPost} >Add post</button>
                </div>
            </div>
            <div className={s.posts}>
                {postsElements}
            </div>
        </div>
    </div>
}


export default MyPosts;
