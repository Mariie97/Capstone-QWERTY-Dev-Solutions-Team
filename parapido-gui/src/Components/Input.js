import React, {Component} from 'react'
import "../Layouts/InputField.css"
import TextField from "@material-ui/core/TextField";
import ReportProblemIcon from "@material-ui/icons/ReportProblem";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";


class Input extends Component {

    render() {
        const { errorMsg, labelText, required, multiline, blackLabel, bluelabel} = this.props;
        return (
            <div className='input-field-container'>
                <label className={`custom-input-label ${blackLabel!==undefined && 'black-label-text'} ${bluelabel !==undefined && 'blue-label-text'}`}> 
                {labelText}{required && '*'}
                </label>
                <br />
                {multiline ?
                    <TextareaAutosize
                        className='custom-input-multiline'
                        {...this.props}
                    />
                    :
                    <TextField
                        variant={'filled'}
                        InputProps={{disableUnderline: true}}
                        {...this.props}
                    />
                }
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