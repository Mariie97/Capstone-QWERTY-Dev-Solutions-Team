import React, { Component } from 'react'
import "../Layouts/InputField.css"
import {withStyles} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";


const styles = {
    root: {
        color: '#FFFFFF',
        fontSize: '20px'
    },
    input: {
        color: '#FFFFFF',
        fontSize: '24px',

    }
};


class Input extends Component {

    constructor(props) {
        super(props);
        this.state = {
            edit: true,
        };
    }

    render() {
        const { classes } = this.props;
        return (
            <div className='input-field-container'>
                <TextField
                    variant={'outlined'}
                    {...this.props}
                    InputProps={{
                        className: classes.input
                    }}
                    InputLabelProps={{
                        className: classes.root
                    }}
                />
            </div>
        )
    }
}

export default withStyles(styles)(Input);