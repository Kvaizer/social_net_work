import React, {useMemo} from 'react';
import s from './MyPosts.module.css';
import Post from './Post/Post';
import {Field, reduxForm} from 'redux-form';
import {maxLengthCreator, required} from '../../../utils/validators/validators';
import {Textarea} from '../../common/FormsControls/FormControls';

export type PostDataPropsType = {
    id: number
    message: string
    likesCount: number
}

type MyPostsPropsType = {
    addPost: (newPostText: string) => void
    postData: PostsDataPropsType
}

export type PostsDataPropsType = Array<PostDataPropsType>;

const MyPosts = React.memo((props: MyPostsPropsType) => {

    let postsElements = props.postData.map((item) => {
        return <Post key={item.id} message={item.message} likesCounter={item.likesCount}/>
    });

    let onAddPost = (values: any) => {
        props.addPost(values.newPostText)
    }

    return <div className={s.content}>
        <div className={s.postsBlock}>
            <h2>My posts</h2>
            <AddNewPostReduxForm onSubmit={onAddPost}/>
            <div className={s.posts}>
                {postsElements}
            </div>
        </div>
    </div>
})


const AddNewPostForm = (props: any) => {

    const maxLength30 = useMemo(() => maxLengthCreator(30), [])

    return <form onSubmit={props.handleSubmit}>
        <div>
            <Field name='newPostText'
                   component={Textarea}
                   placeholder='Post message'
                   validate={[required, maxLength30]}/>
        </div>
        <div>
            <button>Add post</button>
        </div>
    </form>
}

const AddNewPostReduxForm = reduxForm({form: 'ProfileAddNewPostForm'})(AddNewPostForm)

export default MyPosts;
