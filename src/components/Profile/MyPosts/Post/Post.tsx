import React from 'react';
import s from './Post.module.css';

type PostPropsType = {
    key: number
    message: string,
    likesCounter: number,
}

const Post = (props: PostPropsType) => {
    return <div key={props.key} className={s.item}>
        <img src='https://shapka-youtube.ru/wp-content/uploads/2021/02/prikolnaya-avatarka-dlya-patsanov.jpg'/>
        <p>{props.message}</p>
        <div>
            <span className={s.item}>like</span>
            <span className={s.item}>{props.likesCounter}</span>
        </div>
    </div>
}



export default Post;
