import React, { Component } from 'react';
import { MenuItem, Select } from "@material-ui/core";
import StyledEngineProvider from '@material-ui/styles/StylesProvider';
import ReportProblemIcon from '@material-ui/icons/ReportProblem';
import {cities} from "../Utilities";


class CitiesDropdown extends Component {

    constructor(props) {
        super(props);

        this.state = {
            city: this.props.initial_value !== ''? this.props.initial_value : undefined,
            cityError: undefined,
            externalError: undefined,
        };

        //event method - before render method
        this.handleOnChangeCity = this.handleOnChangeCity.bind(this);

        // validation method - end of render method
        this.validateCity = this.validateCity.bind(this);
        this.validate = this.validate.bind(this);

    }

    handleOnChangeCity(event) {
        this.setState({
            city: event.target.value.toString()
        }, this.validate);
    }

    validate() {
        const { validate, validationFunc } = this.props;
        if(validationFunc)
            validationFunc();
        else
        if (validate)
            this.validateCity();
    }

    allCities() {
        return cities.map((city, index) =>
            <MenuItem value={index+1}>{city}</MenuItem>
        )
    }



    render() {
        const { city, cityError } = this.state;

        return (
            <StyledEngineProvider injectFirst>
                <div>
                    <Select
                        value={city}
                        onChange={this.handleOnChangeCity}
                        className={cityError===undefined ? "job-creation-dropdown" : 'job-creation-dropdown error'}
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
                    {cityError !== undefined &&
                    <div className="required-field-2-job-creation">
                        <ReportProblemIcon style={report} />
                        {cityError}
                    </div>
                    }
                </div>
            </StyledEngineProvider>
        )
    }

    validateCity(){
        if (this.state.city === undefined) {
            this.setState({
                cityError: "This field is required"
            })
            return false;
        }

        this.setState({
            cityError: undefined
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