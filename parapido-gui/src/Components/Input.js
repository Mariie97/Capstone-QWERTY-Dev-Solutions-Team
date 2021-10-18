import React, {Component} from 'react'
import "../Layouts/InputField.css"
import TextField from "@material-ui/core/TextField";


class Input extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className='input-field-container'>
                <TextField
                    variant={'filled'}
                    {...this.props}
                />
            </div>
        )
    }
}

export default Input;