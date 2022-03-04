import React from 'react';
import s from './MyPosts.module.css';
import Post from "./Post/Post";

export type PostDataPropsType = {
    id: number
    message: string
    likesCount: number
}

const MyPosts = (props: any) => {

    let postsElements: Array<any> = props.postData.map((item: PostDataPropsType) => {
        return <Post message={item.message} likesCounter={item.likesCount}/>
    });

    return <div className={s.content}>
        <div className={s.postsBlock}>
            <h2>My posts</h2>
            <div>
                <div>
                    <textarea></textarea>
                </div>
                <div>
                    <button>Add post</button>
                </div>
            </div>
            <div className={s.posts}>
                {postsElements}
            </div>
        </div>
    </div>
}


export default MyPosts;
