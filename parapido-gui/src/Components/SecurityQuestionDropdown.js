import React, { Component } from 'react';
import { InputLabel, MenuItem, Select } from "@material-ui/core";

const dropDownStyle = {
    background:"#FFFFFF",
    height: "52px",
    top: "11px",
    padding: '10px',
}

const textStyle = {
    color:"#FFFFFF",
}


class SecurityQuestionDropdown extends Component {

    constructor(props){
        super(props);
        this.state = {
            question: props.question,
            answer: '',
        };

        this.onChangeQuestion = this.onChangeQuestion.bind(this);
        this.onChangeAnswer = this.onChangeAnswer.bind(this);
    }

    onChangeQuestion(event) {
        this.setState({
            question: event.target.value
        });
    }

    onChangeAnswer(event) {
        this.setState({
            answer: event.target.value
        });
    }

    render () {
        const { question } = this.state;
        const { num, style_q, onClick} = this.props;

        return (
            <div >
                <div style={style_q}>
                    <InputLabel id={"question_" + num + "_label"} style={textStyle}>Question {num}</InputLabel>
                    <Select
                        labelId="question_one_label"
                        id={"question_" + num}
                        value={question}
                        onChange={this.onChangeQuestion}
                        style={dropDownStyle}
                        onClick={onClick}
                    >
                        <MenuItem value={1}>In what city were you born? </MenuItem>
                        <MenuItem value={2}>What high school did you attend?</MenuItem>
                        <MenuItem value={3}>What was your favorite food as a child?</MenuItem>
                    </Select>
                </div>
            </div>
        )
    }
}

export default SecurityQuestionDropdown;