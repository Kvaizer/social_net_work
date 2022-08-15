import React from 'react';
import {Field, InjectedFormProps, reduxForm} from 'redux-form';
import {Input} from '../common/FormsControls/FormControls';
import {required} from '../../utils/validators/validators';
import {connect} from 'react-redux';
import {login} from '../../Redux/authReducer';
import {Redirect} from 'react-router-dom';
import {GetStateType} from '../../Redux/redux-store';
import s from './../common/FormsControls/FormControl.module.css'

type FormDataType = {
    email: string
    password: string
    rememberMe: boolean
}

export const LoginForm: React.FC<InjectedFormProps<FormDataType>> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <p>Test account</p>
            <p>Login: free@samuraijs.com</p>
            <p>Password: free</p>
        <div>
            <Field
                placeholder={'Email'}
                name={'email'}
                component={Input}
                validate={[required]}
            />
        </div>
        <div>
            <Field
                placeholder={'Password'}
                name={'password'}
                component={Input}
                validate={[required]}
                type={'password'}
            />
        </div>
        <div>
            <Field
                component={Input}
                name={'rememberMe'}
                type={'checkbox'}/>remember me
        </div>
        {props.error && <div className={s.formSummaryError}>{props.error}</div>}
        <div>
            <button>Login</button>
        </div>
    </form>
    )
};

const LoginReduxForm = reduxForm<FormDataType>({
    form: 'login'
})(LoginForm)

const Login = (props: any) => {

    const onSubmit = (formData: FormDataType) => {
        props.login(formData.email, formData.password, formData.rememberMe)
    }

    if (props.isAuth) {
        return <Redirect to={'/profile'}/>
    }

    return <div>
        <h1>Login</h1>
        <LoginReduxForm onSubmit={onSubmit}/>
    </div>
}

const mapStateToProps = (state: GetStateType) => ({
    isAuth: state.auth.isAuth
})

export default connect(mapStateToProps, {login})(Login);