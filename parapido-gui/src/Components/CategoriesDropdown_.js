
import React, { Component } from 'react';
import {MenuItem, Select} from "@material-ui/core";
import StyledEngineProvider from '@material-ui/styles/StylesProvider';


class CategoriesDropdown extends Component {

    constructor(props) {
        super(props);

        this.state = {
            category: this.props.initial_value !== ''? this.props.initial_value : undefined,
        };

        // event method - before render method

        this.handleOnChangeCategory = this.handleOnChangeCategory.bind(this);
        
    }

    handleOnChangeCategory(event) {
        this.setState({
            category: event.target.value.toString()

        });
    }

    render() {
        const {category} = this.state;

        return (
            <StyledEngineProvider injectFirst>
                <div>
                    
                    <Select
                        value={category}
                        onChange={this.handleOnChangeCategory}
                        className="job-creation-dropdown"
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
                </div>
            </StyledEngineProvider>  
        )
    }
}


export default CategoriesDropdown;