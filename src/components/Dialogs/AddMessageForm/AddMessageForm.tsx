import {maxLengthCreator, required} from '../../../utils/validators/validators';
import {Field, reduxForm} from 'redux-form';
import {Textarea} from '../../common/FormsControls/FormControls';
import React from 'react';

const maxLength100 = maxLengthCreator(100)

const AddMessageForm = (props: any) => {
    return <form onSubmit={props.handleSubmit}>
        <div>
            <Field
                name='newMessageBody'
                component={Textarea}
                placeholder='Enter your message'
                validate={[required, maxLength100]}/>
        </div>
        <div>
            <button>SendMessage</button>
        </div>
    </form>
}

type FormDataType = {
    newMessageBody: string
}

export default reduxForm<FormDataType>({form: 'dialogAddMessageForm'})(AddMessageForm)