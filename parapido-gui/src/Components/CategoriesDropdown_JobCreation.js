
import React, { Component } from 'react';
import {InputLabel, MenuItem, Select} from "@material-ui/core";
import StyledEngineProvider from '@material-ui/styles/StylesProvider';

class CategoriesDropdown_JobCreation extends Component {
    render() {
        return (
            <div>
                 <StyledEngineProvider injectFirst>
            <div >
                <InputLabel></InputLabel>
                <Select
                    // labelId="cities-dropdown-label"
                    // id={"cities-dropdown"}
                    // value={city}
                    // onChange={this.handleOnchangeCity}
                    className="job-creation-dropdown">

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
            </div>
        )
    }
}

export default CategoriesDropdown_JobCreation;
