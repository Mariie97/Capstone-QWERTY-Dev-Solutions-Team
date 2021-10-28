import React, { Component } from 'react';
import { MenuItem, Select } from "@material-ui/core";
import StyledEngineProvider from '@material-ui/styles/StylesProvider';
import ReportProblemIcon from '@material-ui/icons/ReportProblem';


class CitiesDropdown extends Component {

    constructor(props) {
        super(props);

        this.state = {
            item: this.props.initial_value !== ''? this.props.initial_value : undefined,
            itemError: undefined,
        };

        //event method - before render method
        this.handleOnChangeCity = this.handleOnChangeCity.bind(this);

        // validation method - end of render method
        this.validateItem = this.validateItem.bind(this);
        this.validate = this.validate.bind(this);

    }

    handleOnChangeCity(event) {
        this.setState({
            item: event.target.value.toString()
        }, this.validate);
    }

    validate() {
        const { validate, validationFunc } = this.props;
        if(validationFunc)
            validationFunc();
        else
        if (validate)
            this.validateItem();
    }

    allCities() {
        const { itemsList } = this.props;
        return itemsList.map((item, index) =>
            <MenuItem value={index+1}>{item}</MenuItem>
        )
    }



    render() {
        const { item, itemError } = this.state;

        return (
            <StyledEngineProvider injectFirst>
                <div>
                    <Select
                        value={item}
                        onChange={this.handleOnChangeCity}
                        className={itemError===undefined ? "job-creation-dropdown" : 'job-creation-dropdown error'}
                        onClose={this.validate}
                        inputProps={{
                            underline: {
                                "&&&:before": {
                                    borderBottom: "none"
                                },
                                "&&:after": {
                                    borderBottom: "none"
                                }
                            }
                        }}
                        disableUnderline
                    >
                        {this.allCities()}
                    </Select>
                    {itemError !== undefined &&
                    <div className="required-field-2-job-creation">
                        <ReportProblemIcon style={report} />
                        {itemError}
                    </div>
                    }
                </div>
            </StyledEngineProvider>
        )
    }

    validateItem(){
        if (this.state.item === undefined) {
            this.setState({
                itemError: "This field is required"
            })
            return false;
        }

        this.setState({
            itemError: undefined
        })
        return true;
    }
}

//small icons & elements css
const report = {
    color: "red",
    position: "relative",
    top: "4px"
}

export default CitiesDropdown;