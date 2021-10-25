
import React, { Component } from 'react';
import {InputLabel, MenuItem, Select} from "@material-ui/core";
import StyledEngineProvider from '@material-ui/styles/StylesProvider';
import ReportProblemIcon from '@material-ui/icons/ReportProblem';


class CategoriesDropdown extends Component {

    constructor(props) {
        super(props);

        this.state = {
            category: this.props.initial_value !== ''? this.props.initial_value : undefined,
            categoryError: undefined
        };

        // event method - before render method

        this.handleOnChangeCategory = this.handleOnChangeCategory.bind(this);
        
        // validation method - end of render method

        this.validateCategory = this.validateCategory.bind(this);
    }

    handleOnChangeCategory(event) {
        this.setState({
            category: event.target.value.toString()

        });
    }

    render() {
        const { category, categoryError } = this.state;

        return (
            <StyledEngineProvider injectFirst>
                <div>
                    <InputLabel></InputLabel>
                    <Select
                        value={category}
                        onChange={this.handleOnChangeCategory}
                        className="job-creation-dropdown"
                        onBlur={this.validateCategory}
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
                    

                        <MenuItem value={1}>Animals</MenuItem>
                        <MenuItem value={2}>Auto</MenuItem>
                        <MenuItem value={3}>Education</MenuItem>
                        <MenuItem value={4}>Events</MenuItem>
                        <MenuItem value={5}>Home</MenuItem>
                        <MenuItem value={6}>Self-Care</MenuItem>
                        <MenuItem value={7}>Shop</MenuItem>
                        <MenuItem value={8}>Other</MenuItem>                   
                    </Select>
                    {this.state.categoryError !== undefined &&
                        <div className="required-field-2-job-creation">
                            <hr className="category-error-job-creation"></hr>
                            <hr className="category-1-error-job-creation"></hr>
                            <hr className="city-error-2-job-creation"></hr>
                            <hr className="category-3-error-job-creation"></hr> 
                            <ReportProblemIcon style={report}/> {categoryError} 
                        </div>
                    }
                </div>
            </StyledEngineProvider>  
        )
    }

    validateCategory(){   
        if (this.state.category === undefined) {
            this.setState({

                categoryError: "This field is required" 
            })
            document.querySelector('.price-miniflex-job-creation').style.cssText = 'margin-left: 66px;';
            return false;
        }
       
        this.setState({

            categoryError: undefined
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

export default CategoriesDropdown;
