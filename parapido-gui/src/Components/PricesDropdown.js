
import React, { Component } from 'react';
import {MenuItem, Select} from "@material-ui/core";
import StyledEngineProvider from '@material-ui/styles/StylesProvider';


class PricesDropdown extends Component {

    constructor(props) {
        super(props);

        this.state = {
            price: this.props.initial_value !== ''? this.props.initial_value : undefined,
        };

        // event method - before render method

        this.handleOnChangePrice = this.handleOnChangePrice.bind(this);
        
    }

    handleOnChangePrice(event) {
        this.setState({
            price: event.target.value.toString()

        });
    }

    render() {
        const {price} = this.state;

        return (
            <StyledEngineProvider injectFirst>
                <div>
                    
                    <Select
                        value={price}
                        onChange={this.handleOnChangePrice}
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
                        <MenuItem value={1} style={{marginLeft: 2}}>Less than $20.00</MenuItem>
                        <MenuItem value={2}>$20.00 to $40.00</MenuItem>
                        <MenuItem value={3}>$50.00 to $60.00</MenuItem>
                        <MenuItem value={4}>$70.00 to $100.00</MenuItem>
                        <MenuItem value={5}>More than $100.00</MenuItem>                   
                    </Select>
                </div>
            </StyledEngineProvider>  
        )
    }
}


export default PricesDropdown;