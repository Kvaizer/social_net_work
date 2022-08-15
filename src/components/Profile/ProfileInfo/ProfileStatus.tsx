import React, {ChangeEvent, FocusEvent} from 'react';
import s from './ProfileInfo.module.css'


class ProfileStatus extends React.Component<any> {

    state = {
        editMode: false,
        status: this.props.status
    }

    changeEditMode = () => {
        this.setState({
            editMode: !this.state.editMode
        })
    }

    onBlurHandler = (e: FocusEvent<HTMLInputElement>) => {
        this.changeEditMode()
        this.props.updateStatus(e.currentTarget.value)
    }

    onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
            this.setState({
                status: e.currentTarget.value
            })
    }

    componentDidUpdate(prevProps: any, prevState: any): void {
        if(prevProps.status !== this.props.status) {
            this.setState({status: this.props.status})
        }
    }


    render() {
        return (
            <div>
                {!this.state.editMode && <div>
                    <span onDoubleClick={this.changeEditMode}>{this.props.status || '------'}</span>
                </div>}
                {this.state.editMode && <div>
                    <input onChange={this.onStatusChange} autoFocus={true} value={this.state.status} onBlur={this.onBlurHandler}/>
                </div>}
            </div>
        )
    }
}

export default ProfileStatus;
