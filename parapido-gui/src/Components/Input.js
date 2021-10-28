import React, {Component} from 'react'
import "../Layouts/InputField.css"
import TextField from "@material-ui/core/TextField";
import ReportProblemIcon from "@material-ui/icons/ReportProblem";


class Input extends Component {

    render() {
        const { errorMsg, labelText, required} = this.props;
        return (
            <div className='input-field-container'>
                <label className="custome-input-label"> {labelText}{required && '*'}</label>
                <br />
                <TextField
                    variant={'filled'}
                    InputProps={{disableUnderline: true}}
                    {...this.props}
                />
                {errorMsg!==undefined &&
                    <div className="required-field-error-msg">
                        <ReportProblemIcon style={report}/>
                        {errorMsg}
                    </div>
                }
            </div>
        )
    }
}

const report = {
    color: "red",
    position: "relative",
    top: "4px"
}

export default Input;